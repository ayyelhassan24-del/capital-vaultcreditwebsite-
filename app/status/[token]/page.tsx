"use client";

import { useState, useEffect } from "react";
import { CVLogoMark } from "@/app/components/CVLogo";

type AppInfo = {
  id: string;
  lenderName: string;
  status: string;
  submittedAt: string;
  businessName: string | null;
};

export default function LenderStatusPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const [token, setToken] = useState<string | null>(null);
  const [app, setApp] = useState<AppInfo | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    newStatus: "",
    approvedAmount: "",
    rate: "",
    terms: "",
    notes: "",
  });

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  useEffect(() => {
    params.then((p) => setToken(p.token));
  }, [params]);

  useEffect(() => {
    if (!token) return;
    fetch(`/api/status/${token}`)
      .then(async (res) => {
        if (!res.ok) { setNotFound(true); return; }
        setApp(await res.json());
      })
      .catch(() => setNotFound(true));
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch(`/api/status/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          newStatus: form.newStatus,
          approvedAmount: form.approvedAmount ? Number(form.approvedAmount) : undefined,
          rate: form.rate || undefined,
          terms: form.terms || undefined,
          notes: form.notes || undefined,
        }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        setError(d.error ?? "Submission failed");
        return;
      }
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const showAmountFields =
    form.newStatus === "approved" || form.newStatus === "more-info";

  return (
    <div className="min-h-screen bg-vault-bg flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8 justify-center">
          <CVLogoMark size={28} />
          <span className="text-sm font-bold text-vault-cream tracking-widest uppercase">
            Capital Vault
          </span>
        </div>

        {/* Not found */}
        {notFound && (
          <div className="card-vault p-6 text-center">
            <p className="text-vault-muted text-sm">
              This link is invalid or has expired.
            </p>
          </div>
        )}

        {/* Loading */}
        {!app && !notFound && (
          <div className="card-vault p-6 text-center text-vault-muted text-sm animate-pulse">
            Loading…
          </div>
        )}

        {/* Success */}
        {submitted && (
          <div className="card-vault p-6 text-center">
            <div className="text-green-400 text-2xl mb-3">✓</div>
            <p className="text-vault-cream font-bold mb-1">Update received.</p>
            <p className="text-vault-muted text-sm">
              Abu will follow up within 24 hours if there&apos;s anything additional needed.
            </p>
          </div>
        )}

        {/* Form */}
        {app && !submitted && (
          <div className="card-vault p-6">
            <div className="kicker mb-1 text-[10px]">Lender Update Form</div>
            <h1 className="font-black text-vault-cream text-lg mb-1">
              {app.businessName ?? "Application"} Update
            </h1>
            <p className="text-sm text-vault-muted mb-5">
              Application submitted to{" "}
              <strong className="text-vault-cream">{app.lenderName}</strong> ·{" "}
              {new Date(app.submittedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="kicker block mb-2 text-[10px]">Decision</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: "approved", label: "Approved" },
                    { value: "denied", label: "Denied" },
                    { value: "more-info", label: "Need More Info" },
                    { value: "withdrawn", label: "Withdrawn" },
                  ].map((opt) => (
                    <label
                      key={opt.value}
                      className={`flex items-center gap-2 p-3 cursor-pointer rounded-sm border text-sm transition-colors ${
                        form.newStatus === opt.value
                          ? "border-vault-gold bg-vault-gold/10 text-vault-gold"
                          : "border-vault-border text-vault-muted hover:border-vault-gold/40"
                      }`}
                    >
                      <input
                        type="radio"
                        name="status"
                        value={opt.value}
                        checked={form.newStatus === opt.value}
                        onChange={(e) => set("newStatus", e.target.value)}
                        className="sr-only"
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>

              {showAmountFields && (
                <>
                  <div>
                    <label className="kicker block mb-1.5 text-[10px]">
                      Approved Amount ($)
                    </label>
                    <input
                      type="number"
                      className="input-vault"
                      placeholder="150000"
                      value={form.approvedAmount}
                      onChange={(e) => set("approvedAmount", e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="kicker block mb-1.5 text-[10px]">
                        Rate / Factor
                      </label>
                      <input
                        className="input-vault"
                        placeholder="factor 1.25 or 18% APR"
                        value={form.rate}
                        onChange={(e) => set("rate", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="kicker block mb-1.5 text-[10px]">Terms</label>
                      <input
                        className="input-vault"
                        placeholder="9 months"
                        value={form.terms}
                        onChange={(e) => set("terms", e.target.value)}
                      />
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="kicker block mb-1.5 text-[10px]">
                  Notes (optional)
                </label>
                <textarea
                  className="input-vault min-h-[80px] resize-y"
                  placeholder="Conditions, stipulations, missing docs, etc."
                  value={form.notes}
                  onChange={(e) => set("notes", e.target.value)}
                />
              </div>

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={!form.newStatus || submitting}
                className="btn-gold w-full text-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "Submitting…" : "Submit Update"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
