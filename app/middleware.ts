import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  if (!req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.next();
  }

  const auth = req.headers.get("authorization");
  if (auth) {
    const [type, credentials] = auth.split(" ");
    if (type === "Basic" && credentials) {
      const decoded = Buffer.from(credentials, "base64").toString();
      const colonIdx = decoded.indexOf(":");
      const password = colonIdx !== -1 ? decoded.slice(colonIdx + 1) : "";
      if (password === process.env.DASHBOARD_PASSWORD) {
        return NextResponse.next();
      }
    }
  }

  return new NextResponse("Unauthorized", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Capital Vault"' },
  });
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
