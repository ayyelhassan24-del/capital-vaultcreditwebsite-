import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

type Params = { params: Promise<{ clientId: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  const { clientId } = await params;
  const db = createServerClient();

  const { data: client, error } = await db
    .from("clients")
    .select("business_name, owner_name, stage")
    .eq("id", clientId)
    .single();

  if (error || !client) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const { data: apps } = await db
    .from("applications")
    .select("id, lender_name, status, approved_amount, rate, terms, created_at")
    .eq("client_id", clientId)
    .order("created_at", { ascending: true });

  return NextResponse.json({ client, applications: apps ?? [] });
}
