import { NextRequest, NextResponse } from "next/server";
import { predictLenders } from "@/lib/predictor";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const ficoBand = searchParams.get("fico") ?? "";
  const monthlyRevenue = Number(searchParams.get("revenue") ?? 0);
  const tibMonths = Number(searchParams.get("tib") ?? 0);
  const positions = Number(searchParams.get("positions") ?? 0);
  const industry = searchParams.get("industry") ?? "";

  if (!ficoBand || !monthlyRevenue) {
    return NextResponse.json({ error: "fico and revenue required" }, { status: 400 });
  }

  const result = predictLenders({ ficoBand, monthlyRevenue, tibMonths, positions, industry });

  return NextResponse.json(result);
}
