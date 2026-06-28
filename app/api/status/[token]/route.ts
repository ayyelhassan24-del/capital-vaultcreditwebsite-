import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

type Params = { params: Promise<{ token: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  const { token } = await params;
  const db = createServerClient();

  const { data: app, error } = await db
    .from("applications")
    .select("id, lender_name, status, created_at, clients(business_name)")
    .eq("status_token", token)
    .single();

  if (error || !app) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({
    id: app.id,
    lenderName: app.lender_name,
    status: app.status,
    submittedAt: app.created_at,
    businessName: (app.clients as unknown as { business_name: string } | null)?.business_name ?? null,
  });
}

export async function POST(req: NextRequest, { params }: Params) {
  const { token } = await params;
  const body = await req.json();

  const { newStatus, approvedAmount, rate, terms, notes } = body;

  const validStatuses = ["approved", "denied", "more-info", "withdrawn"];
  if (!newStatus || !validStatuses.includes(newStatus)) {
    return NextResponse.json(
      { error: `status must be one of: ${validStatuses.join(", ")}` },
      { status: 400 }
    );
  }

  const db = createServerClient();

  // Look up application by token
  const { data: app, error: lookupErr } = await db
    .from("applications")
    .select("id")
    .eq("status_token", token)
    .single();

  if (lookupErr || !app) {
    return NextResponse.json({ error: "Invalid token" }, { status: 404 });
  }

  // Write to audit log
  await db.from("status_updates").insert({
    application_id: app.id,
    new_status: newStatus,
    approved_amount: approvedAmount ? Number(approvedAmount) : null,
    rate: rate ?? null,
    terms: terms ?? null,
    notes: notes ?? null,
  });

  // Patch the application
  const { error: updateErr } = await db
    .from("applications")
    .update({
      status: newStatus,
      approved_amount: approvedAmount ? Number(approvedAmount) : null,
      rate: rate ?? null,
      terms: terms ?? null,
      lender_notes: notes ?? null,
      token_used_at: new Date().toISOString(),
    })
    .eq("id", app.id);

  if (updateErr) {
    return NextResponse.json({ error: updateErr.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
