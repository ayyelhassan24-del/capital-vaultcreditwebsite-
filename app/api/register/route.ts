import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, phone } = body;

  if (!name || !email || !phone) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // GHL is best-effort — never blocks the response
  const webhookUrl = process.env.GHL_WEBHOOK_URL;
  if (webhookUrl) {
    fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        phone,
        source: "webinar",
        campaign: "webinar_register",
      }),
    }).catch(() => {});
  }

  // Kit — add subscriber to webinar form
  const kitApiKey = process.env.KIT_API_KEY;
  if (kitApiKey) {
    const [firstName, ...rest] = name.trim().split(" ");
    fetch("https://api.kit.com/v4/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${kitApiKey}`,
      },
      body: JSON.stringify({
        email_address: email,
        first_name: firstName,
        last_name: rest.join(" ") || undefined,
        custom_fields: { phone },
        tags: ["webinar-registrant"],
      }),
    }).catch(() => {});
  }

  return NextResponse.json({ success: true });
}
