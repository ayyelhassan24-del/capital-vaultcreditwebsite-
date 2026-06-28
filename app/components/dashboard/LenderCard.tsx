"use client";

import { LenderMatch } from "@/lib/predictor";

const STATUS_CONFIG = {
  COMPAT: {
    label: "SUBMIT NOW",
    cls: "text-green-400 border border-green-400/30 bg-green-400/5",
  },
  POSSIBLE: {
    label: "POSSIBLE",
    cls: "text-vault-gold border border-vault-gold/30 bg-vault-gold/5",
  },
  NO: {
    label: "EXCLUDED",
    cls: "text-vault-muted border border-vault-border",
  },
};

interface Props {
  match: LenderMatch;
  onLogSubmission?: (match: LenderMatch) => void;
  isSubmitted?: boolean;
}

export function LenderCard({ match, onLogSubmission, isSubmitted }: Props) {
  const { lender, status, flags } = match;
  const cfg = STATUS_CONFIG[status];

  return (
    <div
      className={`card-vault p-4 flex items-start justify-between gap-4 ${
        status === "NO" ? "opacity-50" : ""
      }`}
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span
            className={`inline-flex items-center px-2 py-0.5 text-[10px] font-bold tracking-widest rounded-sm ${cfg.cls}`}
          >
            {cfg.label}
          </span>
          <span className="text-sm font-semibold text-vault-cream truncate">
            {lender.name}
          </span>
          {lender.commissionPts && (
            <span className="text-[10px] text-vault-gold ml-auto shrink-0">
              {lender.commissionPts}pts
            </span>
          )}
        </div>
        <div className="text-xs text-vault-muted mb-1">
          {lender.products.join(" · ")}
          {lender.maxAmount && (
            <span className="ml-1">
              · up to ${(lender.maxAmount / 1000).toFixed(0)}K
            </span>
          )}
        </div>
        {flags.length > 0 && (
          <ul className="mt-1 space-y-0.5">
            {flags.map((f, i) => (
              <li key={i} className="text-xs text-vault-muted flex items-start gap-1">
                <span className="mt-0.5 shrink-0 text-red-400/70">✕</span>
                {f}
              </li>
            ))}
          </ul>
        )}
        {lender.notes && status !== "NO" && (
          <p className="text-[11px] text-vault-muted mt-1 italic">{lender.notes}</p>
        )}
      </div>

      {status !== "NO" && onLogSubmission && !isSubmitted && (
        <button
          onClick={() => onLogSubmission(match)}
          className="shrink-0 text-xs px-3 py-1.5 btn-outline"
        >
          Log
        </button>
      )}
      {isSubmitted && (
        <span className="shrink-0 text-[10px] text-vault-muted italic">submitted</span>
      )}
    </div>
  );
}
