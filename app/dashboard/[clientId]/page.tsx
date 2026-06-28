"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { StageTag, STAGE_LABELS } from "@/app/components/dashboard/StageTag";
import { TrackBadge } from "@/app/components/dashboard/TrackBadge";
import { LenderCard } from "@/app/components/dashboard/LenderCard";
import { ApplicationRow } from "@/app/components/dashboard/ApplicationRow";
import type { LenderMatch, PredictorResult } from "@/lib/predictor";

const STAGES = Object.keys(STAGE_LABELS);

type Client = {
  id: string;
  owner_name: string;
  business_name: string;
  email: string | null;
  phone: string | null;
  fico_band: string;
  monthly_revenue: number;
  tib_months: number;
  positions: number;
  industry: string | null;
  track: number;
  track_reason: string | null;
  stage: string;
  funding_amount_requested: number | null;
  fee_collected: number | null;
  notes: string | null;
};

type Application = {
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
};

export default function ClientDetailPage({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) {
  const [clientId, setClientId] = useState<string | null>(null);
  const [client, setClient] = useState<Client | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [prediction, setPrediction] = useState<PredictorResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [stageLoading, setStageLoading] = useState(false);
  const [logModal, setLogModal] = useState<LenderMatch | null>(null);
  const [logging, setLogging] = useState(false);
  const [portalCopied, setPortalCopied] = useState(false);

  useEffect(() => {
    params.then((p) => setClientId(p.clientId));
  }, [params]);

  const loadData = useCallback(async (id: string) => {
    const res = await fetch(`/api/dashboard/clients/${id}`);
    if (!res.ok) return;
    const { client: c, applications: apps } = await res.json();
    setClient(c);
    setApplications(apps);

    // Run predictor with current profile
    const qs = new URLSearchParams({
      fico: c.fico_band,
      revenue: String(c.monthly_revenue),
      tib: String(c.tib_months),
      positions: String(c.positions),
      industry: c.industry ?? "",
    });
    const pRes = await fetch(`/api/dashboard/predict?${qs}`);
    if (pRes.ok) setPrediction(await pRes.json());
    setLoading(false);
  }, []);

  useEffect(() => {
    if (clientId) loadData(clientId);
  }, [clientId, loadData]);

  const updateStage = async (stage: string) => {
    if (!client) return;
    setStageLoading(true);
    await fetch(`/api/dashboard/clients/${client.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stage }),
    });
    setClient((c) => (c ? { ...c, stage } : c));
    setStageLoading(false);
  };

  const logSubmission = async (match: LenderMatch) => {
    if (!client) return;
    setLogging(true);
    const res = await fetch(`/api/dashboard/clients/${client.id}/applications`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lenderName: match.lender.name,
        lenderType: match.lender.tier,
        predictedScore: match.status,
        submissionOrder: match.submissionOrder,
      }),
    });
    if (res.ok) {
      const app = await res.json();
      setApplications((apps) => [...apps, app]);
    }
    setLogModal(null);
    setLogging(false);
  };

  const submittedLenderIds = new Set(
    applications.map((a) => a.lender_name)
  );

  const copyPortalLink = () => {
    if (!client) return;
    const url = `${window.location.origin}/client/${client.id}`;
    navigator.clipboard.writeText(url).then(() => {
      setPortalCopied(true);
      setTimeout(() => setPortalCopied(false), 2000);
    });
  };

  if (loading) {
    return (
      <div className="text-vault-muted text-sm animate-pulse">Loading…</div>
    );
  }

  if (!client) {
    return (
      <div className="text-red-400 text-sm">
        Client not found.{" "}
        <Link href="/dashboard" className="underline">
          Back
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="text-vault-muted hover:text-vault-gold text-sm">
            ← Pipeline
          </Link>
          <span className="text-vault-border">/</span>
          <span className="text-vault-cream font-medium text-sm">
            {client.business_name}
          </span>
        </div>
        <button
          onClick={copyPortalLink}
          className="btn-outline text-xs whitespace-nowrap"
        >
          {portalCopied ? "✓ Copied" : "Share Portal Link"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left — Client Profile */}
        <div className="space-y-4">
          <div className="card-vault p-4">
            <h1 className="font-black text-vault-cream text-lg mb-0.5">
              {client.business_name}
            </h1>
            <p className="text-sm text-vault-muted mb-3">{client.owner_name}</p>
            {client.email && (
              <p className="text-xs text-vault-muted">{client.email}</p>
            )}
            {client.phone && (
              <p className="text-xs text-vault-muted">{client.phone}</p>
            )}
          </div>

          {/* Track */}
          {prediction && (
            <div className="card-vault p-4">
              <div className="kicker mb-2 text-[10px]">Track Assignment</div>
              <TrackBadge track={prediction.track} showLabel />
              <p className="text-xs text-vault-muted mt-2">{prediction.trackReason}</p>
              {prediction.stopReason && (
                <p className="text-xs text-red-400 mt-1">{prediction.stopReason}</p>
              )}
            </div>
          )}

          {/* Score Inputs */}
          <div className="card-vault p-4 space-y-2">
            <div className="kicker mb-1 text-[10px]">Profile</div>
            {[
              ["FICO Band", client.fico_band],
              ["Monthly Revenue", `$${client.monthly_revenue.toLocaleString()}`],
              ["Time in Business", `${client.tib_months} months`],
              ["Existing Positions", String(client.positions)],
              ["Industry", client.industry ?? "—"],
            ].map(([label, val]) => (
              <div key={label} className="flex justify-between text-xs">
                <span className="text-vault-muted">{label}</span>
                <span className="text-vault-cream font-medium capitalize">{val}</span>
              </div>
            ))}
          </div>

          {/* Stage Selector */}
          <div className="card-vault p-4">
            <div className="kicker mb-2 text-[10px]">Pipeline Stage</div>
            <div className="mb-2">
              <StageTag stage={client.stage} />
            </div>
            <select
              className="input-vault text-xs"
              value={client.stage}
              disabled={stageLoading}
              onChange={(e) => updateStage(e.target.value)}
            >
              {STAGES.map((s) => (
                <option key={s} value={s}>
                  {STAGE_LABELS[s]}
                </option>
              ))}
            </select>
          </div>

          {client.notes && (
            <div className="card-vault p-4">
              <div className="kicker mb-1 text-[10px]">Notes</div>
              <p className="text-xs text-vault-muted whitespace-pre-wrap">{client.notes}</p>
            </div>
          )}
        </div>

        {/* Right — Predictor + Applications */}
        <div className="lg:col-span-2 space-y-6">
          {/* Lender Predictor */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-vault-cream">Lender Ranking</h2>
              <span className="text-[10px] text-vault-muted">
                Click "Log" to record a submission
              </span>
            </div>

            {prediction && prediction.rankedLenders.length > 0 ? (
              <div className="space-y-2">
                {prediction.rankedLenders.map((m) => (
                  <LenderCard
                    key={m.lender.id}
                    match={m}
                    isSubmitted={submittedLenderIds.has(m.lender.name)}
                    onLogSubmission={setLogModal}
                  />
                ))}
              </div>
            ) : prediction?.track === 4 ? (
              <div className="card-vault p-4 text-sm text-red-400">
                Track 4 — Consolidation only. Reach out to consolidation lenders directly.
              </div>
            ) : (
              <div className="card-vault p-4 text-sm text-vault-muted">
                No lenders available for this profile.
              </div>
            )}
          </div>

          {/* Applications Submitted */}
          <div>
            <h2 className="text-sm font-bold text-vault-cream mb-3">
              Applications ({applications.length})
            </h2>
            {applications.length === 0 ? (
              <div className="card-vault p-4 text-sm text-vault-muted">
                No applications logged yet. Click "Log" on a lender above to track a submission.
              </div>
            ) : (
              <div className="card-vault overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="border-b border-vault-border">
                    <tr>
                      <th className="text-left py-2 px-4 kicker text-[10px]">Lender</th>
                      <th className="text-left py-2 px-4 kicker text-[10px]">Status</th>
                      <th className="text-left py-2 px-4 kicker text-[10px]">Amount</th>
                      <th className="text-left py-2 px-4 kicker text-[10px]">Rate / Terms</th>
                      <th className="py-2 px-4" />
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((app) => (
                      <ApplicationRow key={app.id} app={app} />
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Log Submission Modal */}
      {logModal && (
        <div className="fixed inset-0 bg-vault-black/80 flex items-center justify-center z-50 p-4">
          <div className="card-vault p-6 max-w-sm w-full">
            <h3 className="font-bold text-vault-cream mb-1">Log Submission</h3>
            <p className="text-sm text-vault-muted mb-4">
              Recording that you submitted{" "}
              <strong className="text-vault-cream">{client.business_name}</strong> to{" "}
              <strong className="text-vault-cream">{logModal.lender.name}</strong>.
            </p>
            <div className="flex gap-3">
              <button
                className="btn-gold flex-1"
                disabled={logging}
                onClick={() => logSubmission(logModal)}
              >
                {logging ? "Logging…" : "Confirm"}
              </button>
              <button
                className="btn-outline"
                onClick={() => setLogModal(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
