export const STAGE_LABELS: Record<string, string> = {
  onboarded: "Onboarded",
  "docs-in": "Docs In",
  "apps-out": "Apps Out",
  approvals: "Approvals",
  funded: "Funded",
  stuck: "Stuck",
};

const STAGE_CLASSES: Record<string, string> = {
  onboarded: "text-vault-muted border border-vault-border",
  "docs-in": "text-vault-gold border border-vault-gold/30",
  "apps-out": "bg-vault-gold/10 text-vault-gold border border-vault-gold/30",
  approvals: "bg-vault-gold/20 text-vault-gold border border-vault-gold font-bold",
  funded: "text-green-400 border border-green-400/40",
  stuck: "text-red-400 border border-red-400/40",
};

export function StageTag({ stage }: { stage: string }) {
  const cls = STAGE_CLASSES[stage] ?? "text-vault-muted border border-vault-border";
  const label = STAGE_LABELS[stage] ?? stage;
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-xs rounded-sm whitespace-nowrap ${cls}`}
    >
      {stage === "funded" && <span className="mr-1">✓</span>}
      {label}
    </span>
  );
}
