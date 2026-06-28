"use client";

import { useEffect } from "react";

export default function IClosedWidget() {
  useEffect(() => {
    const existing = document.querySelector('script[src="https://app.iclosed.io/assets/widget.js"]');
    if (existing) return;
    const script = document.createElement("script");
    script.src = "https://app.iclosed.io/assets/widget.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div
      className="iclosed-widget"
      data-url="https://app.iclosed.io/e/thecapitalvault/consult-for-home-page"
      title="Consult for Home Page"
      style={{ width: "100%", height: "620px" }}
    />
  );
}
