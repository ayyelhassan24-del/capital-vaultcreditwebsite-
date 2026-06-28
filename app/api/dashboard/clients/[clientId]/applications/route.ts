import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

type Params = { params: Promise<{ clientId: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  const { clientId } = await params;
  const db = createServerClient();

  const { data, error } = await db
    .from("applications")
    .select("*")
    .eq("client_id", clientId)
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(req: NextRequest, { params }: Params) {
  const { clientId } = await params;
  const body = await req.json();

  const { lenderName, lenderType, predictedScore, submissionOrder } = body;

  if (!lenderName) {
    return NextResponse.json({ error: "lenderName required" }, { status: 400 });
  }

  const db = createServerClient();
  const { data, error } = await db
    .from("applications")
    .insert({
      client_id: clientId,
      lender_name: lenderName,
      lender_type: lenderType ?? null,
      predicted_score: predictedScore ?? null,
      submission_order: submissionOrder ?? null,
      status: "submitted",
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
