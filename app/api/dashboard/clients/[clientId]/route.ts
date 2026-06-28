import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

type Params = { params: Promise<{ clientId: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  const { clientId } = await params;
  const db = createServerClient();

  const [clientRes, appsRes] = await Promise.all([
    db.from("clients").select("*").eq("id", clientId).single(),
    db
      .from("applications")
      .select("*")
      .eq("client_id", clientId)
      .order("created_at", { ascending: true }),
  ]);

  if (clientRes.error) {
    return NextResponse.json({ error: clientRes.error.message }, { status: 404 });
  }

  return NextResponse.json({ client: clientRes.data, applications: appsRes.data ?? [] });
}

export async function PATCH(req: NextRequest, { params }: Params) {
  const { clientId } = await params;
  const body = await req.json();
  const db = createServerClient();

  const allowed = [
    "stage",
    "notes",
    "funded_amount",
    "fico_band",
    "monthly_revenue",
    "tib_months",
    "positions",
    "industry",
    "has_tax_lien",
    "nsf_count",
    "ownership_pct",
    "fee_collected",
    "funding_amount_requested",
  ];

  const update: Record<string, unknown> = {};
  for (const key of allowed) {
    if (key in body) update[key] = body[key];
  }

  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
  }

  const { data, error } = await db
    .from("clients")
    .update(update)
    .eq("id", clientId)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
