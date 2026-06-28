"use client";

import { useState } from "react";

const STATUS_CLASSES: Record<string, string> = {
  submitted: "text-vault-muted",
  approved: "text-green-400",
  denied: "text-red-400",
  "more-info": "text-vault-gold",
  withdrawn: "text-vault-muted opacity-50",
};

const STATUS_LABELS: Record<string, string> = {
  submitted: "Submitted",
  approved: "Approved",
  denied: "Denied",
  "more-info": "Needs Info",
  withdrawn: "Withdrawn",
};

interface Application {
  id: string;
  lender_name: string;
  lender_type: string | null;
  status: string;
  predicted_score: string | null;
  approved_amount: number | null;
  rate: string | null;
  terms: string | null;
  lender_notes: string | null;
  status_token: string;
  created_at: string;
}

export function ApplicationRow({ app }: { app: Application }) {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    const url = `${window.location.origin}/status/${app.status_token}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const statusCls = STATUS_CLASSES[app.status] ?? "text-vault-muted";
  const statusLabel = STATUS_LABELS[app.status] ?? app.status;

  return (
    <tr className="border-b border-vault-border last:border-0 hover:bg-vault-card/50">
      <td className="py-3 pr-4">
        <div className="text-sm font-medium text-vault-cream">{app.lender_name}</div>
        {app.lender_type && (
          <div className="text-[11px] text-vault-muted capitalize">{app.lender_type}</div>
        )}
      </td>
      <td className="py-3 pr-4">
        <span className={`text-sm font-medium ${statusCls}`}>{statusLabel}</span>
      </td>
      <td className="py-3 pr-4 text-sm text-vault-muted">
        {app.approved_amount
          ? `$${app.approved_amount.toLocaleString()}`
          : "—"}
      </td>
      <td className="py-3 pr-4 text-sm text-vault-muted">
        {app.rate ?? "—"}
        {app.terms && <span className="ml-1 text-[11px]">/ {app.terms}</span>}
      </td>
      <td className="py-3">
        <button
          onClick={copyLink}
          className="text-xs text-vault-gold hover:underline whitespace-nowrap"
        >
          {copied ? "Copied!" : "Copy status link"}
        </button>
      </td>
    </tr>
  );
}
