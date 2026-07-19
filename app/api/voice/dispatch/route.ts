import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import { createPhoneCall } from "@/lib/retell";
import { lookupLenderContact } from "@/lib/lender-contacts";

// Dispatcher for the lender status-chase agent.
// Reads the Bureau Board "To Call" queue (applications.status = 'follow-up'),
// resolves each lender's phone, and places a disclosed authorized-rep call via
// Retell with per-call dynamic variables. Protected by a bearer secret because
// it places real outbound phone calls.
//
// POST /api/voice/dispatch            -> dispatch the whole queue
// POST /api/voice/dispatch?dryRun=1   -> list what WOULD be called, place nothing
// Header: Authorization: Bearer <VOICE_DISPATCH_SECRET>

// Skip a row if we already kicked off a call for it within this window.
const DEDUPE_WINDOW_MS = 12 * 60 * 60 * 1000;

type ApplicationRow = {
  id: string;
  lender_name: string;
  created_at: string;
  clients: { first_name: string; last_name: string; business_name: string } | null;
};

function formatDate(d: Date): string {
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export async function POST(req: NextRequest) {
  const secret = process.env.VOICE_DISPATCH_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "VOICE_DISPATCH_SECRET not configured — refusing to expose call dispatch" },
      { status: 500 },
    );
  }
  if (req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const dryRun = new URL(req.url).searchParams.get("dryRun") === "1";
  const db = createServerClient();

  // 1) The To-Call queue.
  const { data: apps, error } = await db
    .from("applications")
    .select("id, lender_name, created_at, clients(first_name, last_name, business_name)")
    .eq("status", "follow-up")
    .order("created_at", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const queue = (apps ?? []) as unknown as ApplicationRow[];

  // 2) Dedupe against calls we already initiated recently.
  const sinceIso = new Date(Date.now() - DEDUPE_WINDOW_MS).toISOString();
  const { data: recent } = await db
    .from("status_updates")
    .select("application_id, created_at")
    .eq("new_status", "call_initiated")
    .gte("created_at", sinceIso);
  const recentlyCalled = new Set((recent ?? []).map((r) => r.application_id));

  const today = formatDate(new Date());
  const dispatched: Array<Record<string, unknown>> = [];
  const skipped: Array<Record<string, unknown>> = [];

  for (const app of queue) {
    if (recentlyCalled.has(app.id)) {
      skipped.push({ id: app.id, lender: app.lender_name, reason: "called within 12h" });
      continue;
    }
    const contact = lookupLenderContact(app.lender_name);
    if (!contact?.phone) {
      skipped.push({ id: app.id, lender: app.lender_name, reason: "no phone on file" });
      continue;
    }
    const client = app.clients;
    if (!client) {
      skipped.push({ id: app.id, lender: app.lender_name, reason: "no client joined" });
      continue;
    }

    const dynamicVariables: Record<string, string> = {
      application_id: app.id,
      client_full_name: [client.first_name, client.last_name].filter(Boolean).join(" ") || client.business_name,
      business_name: client.business_name,
      lender_name: app.lender_name,
      department: contact.department ?? "funding / application status",
      application_ref: app.id.slice(0, 8).toUpperCase(),
      recent_action: `application submitted on ${formatDate(new Date(app.created_at))}`,
      current_date: today,
      agent_name: process.env.RETELL_AGENT_DISPLAY_NAME || "Alex",
    };

    if (dryRun) {
      dispatched.push({ id: app.id, lender: app.lender_name, to: contact.phone, dryRun: true });
      continue;
    }

    try {
      const call = await createPhoneCall({
        toNumber: contact.phone,
        dynamicVariables,
        metadata: { application_id: app.id },
      });
      // Mark initiated so we don't double-dial before the result lands.
      await db.from("status_updates").insert({
        application_id: app.id,
        new_status: "call_initiated",
        notes: `[AI status call] placed to ${app.lender_name} (${contact.phone}), call_id ${call.call_id}`,
      });
      dispatched.push({ id: app.id, lender: app.lender_name, call_id: call.call_id });
    } catch (e) {
      skipped.push({
        id: app.id,
        lender: app.lender_name,
        reason: e instanceof Error ? e.message : "call failed",
      });
    }
  }

  return NextResponse.json({
    ok: true,
    dryRun,
    queued: queue.length,
    dispatched: dispatched.length,
    skipped: skipped.length,
    details: { dispatched, skipped },
  });
}
