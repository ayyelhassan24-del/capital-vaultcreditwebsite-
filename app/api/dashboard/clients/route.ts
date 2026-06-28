import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import { predictLenders } from "@/lib/predictor";

export async function GET() {
  const db = createServerClient();
  const { data, error } = await db
    .from("clients")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const {
    ownerName,
    businessName,
    email,
    phone,
    ficoBand,
    monthlyRevenue,
    tibMonths,
    positions,
    industry,
    entityType,
    businessState,
    hasTaxLien,
    nsfCount,
    ownershipPct,
    fundingAmountRequested,
    feeCollected,
    notes,
  } = body;

  if (!ownerName || !businessName || !ficoBand || !monthlyRevenue || tibMonths == null || positions == null) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const prediction = predictLenders({
    ficoBand,
    monthlyRevenue: Number(monthlyRevenue),
    tibMonths: Number(tibMonths),
    positions: Number(positions),
    industry: industry ?? "",
  });

  const db = createServerClient();
  const { data, error } = await db
    .from("clients")
    .insert({
      owner_name: ownerName,
      business_name: businessName,
      email: email ?? null,
      phone: phone ?? null,
      fico_band: ficoBand,
      monthly_revenue: Number(monthlyRevenue),
      tib_months: Number(tibMonths),
      positions: Number(positions),
      industry: industry ?? null,
      entity_type: entityType ?? null,
      business_state: businessState ?? null,
      has_tax_lien: hasTaxLien ?? false,
      nsf_count: Number(nsfCount ?? 0),
      ownership_pct: Number(ownershipPct ?? 100),
      track: prediction.track,
      track_reason: prediction.trackReason,
      stage: "onboarded",
      funding_amount_requested: fundingAmountRequested ? Number(fundingAmountRequested) : null,
      fee_collected: feeCollected ? Number(feeCollected) : 7500,
      notes: notes ?? null,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
