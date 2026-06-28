import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { turnstileToken, ...formData } = body;

  if (!turnstileToken) {
    return NextResponse.json({ error: "Missing verification token" }, { status: 400 });
  }

  const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      secret: process.env.TURNSTILE_SECRET_KEY,
      response: turnstileToken,
      remoteip: req.headers.get("x-forwarded-for") ?? undefined,
    }),
  });

  const verifyData = await verifyRes.json();
  if (!verifyData.success) {
    return NextResponse.json({ error: "Bot verification failed" }, { status: 403 });
  }

  const webhookUrl = process.env.GHL_INTAKE_WEBHOOK_URL ?? process.env.GHL_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  const ghlRes = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...formData, source: "client_intake" }),
  });

  if (!ghlRes.ok) {
    return NextResponse.json({ error: "Submission failed" }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
