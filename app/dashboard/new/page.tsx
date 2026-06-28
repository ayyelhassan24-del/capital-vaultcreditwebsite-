"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LenderCard } from "@/app/components/dashboard/LenderCard";
import { TrackBadge } from "@/app/components/dashboard/TrackBadge";
import type { PredictorResult } from "@/lib/predictor";

const FICO_BANDS = [
  { value: "below-580", label: "Below 580" },
  { value: "580-649", label: "580–649" },
  { value: "650-699", label: "650–699" },
  { value: "700-749", label: "700–749" },
  { value: "750+", label: "750+" },
];

const TIB_OPTIONS = [
  { value: "3", label: "Under 6 months" },
  { value: "9", label: "6–12 months" },
  { value: "18", label: "1–2 years" },
  { value: "30", label: "2–3 years" },
  { value: "48", label: "3–5 years" },
  { value: "72", label: "5+ years" },
];

const ENTITY_TYPES = ["LLC", "S-Corp", "C-Corp", "Sole Prop", "Partnership"];

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA",
  "KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT",
  "VA","WA","WV","WI","WY",
];

export default function NewClientPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [prediction, setPrediction] = useState<PredictorResult | null>(null);
  const [predicting, setPredicting] = useState(false);

  const [form, setForm] = useState({
    ownerName: "",
    businessName: "",
    email: "",
    phone: "",
    ficoBand: "",
    monthlyRevenue: "",
    tibMonths: "",
    positions: "0",
    industry: "",
    entityType: "",
    businessState: "",
    hasTaxLien: false,
    nsfCount: "0",
    ownershipPct: "100",
    fundingAmountRequested: "",
    feeCollected: "7500",
    notes: "",
  });

  const set = (field: string, value: string | boolean) =>
    setForm((f) => ({ ...f, [field]: value }));

  const runPreview = useCallback(async (updated: typeof form) => {
    const { ficoBand, monthlyRevenue, tibMonths, positions, industry } = updated;
    if (!ficoBand || !monthlyRevenue || !tibMonths) return;
    setPredicting(true);
    try {
      const qs = new URLSearchParams({
        fico: ficoBand,
        revenue: monthlyRevenue,
        tib: tibMonths,
        positions: positions || "0",
        industry: industry,
      });
      const res = await fetch(`/api/dashboard/predict?${qs}`);
      if (res.ok) setPrediction(await res.json());
    } finally {
      setPredicting(false);
    }
  }, []);

  const handleChange = (field: string, value: string | boolean) => {
    const updated = { ...form, [field]: value };
    setForm(updated);
    const predictor_fields = ["ficoBand", "monthlyRevenue", "tibMonths", "positions", "industry"];
    if (predictor_fields.includes(field)) {
      runPreview(updated);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/dashboard/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          monthlyRevenue: Number(form.monthlyRevenue),
          tibMonths: Number(form.tibMonths),
          positions: Number(form.positions),
          nsfCount: Number(form.nsfCount),
          ownershipPct: Number(form.ownershipPct),
          fundingAmountRequested: form.fundingAmountRequested
            ? Number(form.fundingAmountRequested)
            : undefined,
          feeCollected: Number(form.feeCollected),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Failed to add client");
        return;
      }
      router.push(`/dashboard/${data.id}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/dashboard" className="text-vault-muted hover:text-vault-gold text-sm">
          ← Pipeline
        </Link>
        <span className="text-vault-border">/</span>
        <span className="kicker">Add Client</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <h1 className="text-lg font-black text-vault-cream mb-4">New Client</h1>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="kicker block mb-1.5 text-[10px]">Owner Name</label>
              <input
                className="input-vault"
                required
                value={form.ownerName}
                onChange={(e) => set("ownerName", e.target.value)}
              />
            </div>
            <div>
              <label className="kicker block mb-1.5 text-[10px]">Business Name</label>
              <input
                className="input-vault"
                required
                value={form.businessName}
                onChange={(e) => set("businessName", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="kicker block mb-1.5 text-[10px]">Email</label>
              <input
                type="email"
                className="input-vault"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
              />
            </div>
            <div>
              <label className="kicker block mb-1.5 text-[10px]">Phone</label>
              <input
                type="tel"
                className="input-vault"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="kicker block mb-1.5 text-[10px]">FICO Band</label>
              <select
                className="input-vault"
                required
                value={form.ficoBand}
                onChange={(e) => handleChange("ficoBand", e.target.value)}
              >
                <option value="">Select…</option>
                {FICO_BANDS.map((b) => (
                  <option key={b.value} value={b.value}>
                    {b.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="kicker block mb-1.5 text-[10px]">Monthly Revenue ($)</label>
              <input
                type="number"
                className="input-vault"
                required
                min={0}
                placeholder="85000"
                value={form.monthlyRevenue}
                onChange={(e) => handleChange("monthlyRevenue", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="kicker block mb-1.5 text-[10px]">Time in Business</label>
              <select
                className="input-vault"
                required
                value={form.tibMonths}
                onChange={(e) => handleChange("tibMonths", e.target.value)}
              >
                <option value="">Select…</option>
                {TIB_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="kicker block mb-1.5 text-[10px]">Existing Positions</label>
              <input
                type="number"
                className="input-vault"
                min={0}
                max={10}
                value={form.positions}
                onChange={(e) => handleChange("positions", e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="kicker block mb-1.5 text-[10px]">Industry</label>
            <input
              className="input-vault"
              placeholder="e.g. hvac, trucking, restaurant"
              value={form.industry}
              onChange={(e) => handleChange("industry", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="kicker block mb-1.5 text-[10px]">Entity Type</label>
              <select
                className="input-vault"
                value={form.entityType}
                onChange={(e) => set("entityType", e.target.value)}
              >
                <option value="">Select…</option>
                {ENTITY_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="kicker block mb-1.5 text-[10px]">State</label>
              <select
                className="input-vault"
                value={form.businessState}
                onChange={(e) => set("businessState", e.target.value)}
              >
                <option value="">Select…</option>
                {US_STATES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="kicker block mb-1.5 text-[10px]">NSF Count (90 days)</label>
              <input
                type="number"
                className="input-vault"
                min={0}
                value={form.nsfCount}
                onChange={(e) => set("nsfCount", e.target.value)}
              />
            </div>
            <div>
              <label className="kicker block mb-1.5 text-[10px]">Ownership %</label>
              <input
                type="number"
                className="input-vault"
                min={1}
                max={100}
                value={form.ownershipPct}
                onChange={(e) => set("ownershipPct", e.target.value)}
              />
            </div>
            <div className="flex items-end pb-0.5">
              <label className="flex items-center gap-2 text-sm text-vault-muted cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.hasTaxLien}
                  onChange={(e) => set("hasTaxLien", e.target.checked)}
                  className="accent-vault-gold"
                />
                Tax lien
              </label>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="kicker block mb-1.5 text-[10px]">Amount Requested ($)</label>
              <input
                type="number"
                className="input-vault"
                placeholder="250000"
                value={form.fundingAmountRequested}
                onChange={(e) => set("fundingAmountRequested", e.target.value)}
              />
            </div>
            <div>
              <label className="kicker block mb-1.5 text-[10px]">Fee Collected ($)</label>
              <input
                type="number"
                className="input-vault"
                value={form.feeCollected}
                onChange={(e) => set("feeCollected", e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="kicker block mb-1.5 text-[10px]">Notes</label>
            <textarea
              className="input-vault min-h-[80px] resize-y"
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="btn-gold w-full text-center"
          >
            {submitting ? "Adding…" : "Add Client"}
          </button>
        </form>

        {/* Live Predictor Preview */}
        <div>
          <h2 className="text-sm font-bold text-vault-cream mb-3 flex items-center gap-2">
            Lender Predictor
            {predicting && (
              <span className="text-xs text-vault-muted font-normal animate-pulse">
                Updating…
              </span>
            )}
          </h2>

          {!prediction && (
            <div className="card-vault p-6 text-center text-vault-muted text-sm">
              Fill in FICO, revenue, and TIB to see the ranked lender list.
            </div>
          )}

          {prediction && (
            <div className="space-y-3">
              <div className="card-vault p-3 flex items-start gap-3">
                <TrackBadge track={prediction.track} showLabel />
                <p className="text-xs text-vault-muted">{prediction.trackReason}</p>
              </div>

              {prediction.stopReason && (
                <div className="text-sm text-red-400 px-1">{prediction.stopReason}</div>
              )}

              {prediction.rankedLenders.length > 0 && (
                <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
                  {prediction.rankedLenders.map((m) => (
                    <LenderCard key={m.lender.id} match={m} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
