const TRACK_CONFIG: Record<
  number,
  { label: string; sub: string; cls: string }
> = {
  1: {
    label: "T1",
    sub: "Full Stack",
    cls: "card-vault-gold text-vault-gold",
  },
  2: {
    label: "T2",
    sub: "MCA Only",
    cls: "bg-vault-gold/10 text-vault-gold border border-vault-gold/30",
  },
  3: {
    label: "T3",
    sub: "Card Stack",
    cls: "card-vault text-vault-muted",
  },
  4: {
    label: "T4",
    sub: "Consolidation",
    cls: "card-vault text-red-400",
  },
};

export function TrackBadge({
  track,
  showLabel = false,
}: {
  track: number;
  showLabel?: boolean;
}) {
  const cfg = TRACK_CONFIG[track] ?? {
    label: `T${track}`,
    sub: "",
    cls: "card-vault text-vault-muted",
  };

  if (showLabel) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-sm ${cfg.cls}`}
      >
        {cfg.label}
        <span className="font-normal opacity-70">{cfg.sub}</span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-xs font-bold rounded-sm ${cfg.cls}`}
    >
      {cfg.label}
    </span>
  );
}
