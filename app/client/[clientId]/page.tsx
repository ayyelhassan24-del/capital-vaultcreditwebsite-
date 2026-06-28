"use client";

import { useState, useEffect } from "react";
import { CVLogoMark } from "@/app/components/CVLogo";

type Application = {
  id: string;
  lender_name: string;
  status: string;
  approved_amount: number | null;
  rate: string | null;
  terms: string | null;
  created_at: string;
};

type ClientData = {
  business_name: string;
  owner_name: string;
  stage: string;
};

const STATUS_CONFIG: Record<string, { label: string; color: string; dot: string }> = {
  submitted: { label: "Under Review", color: "text-vault-muted", dot: "bg-yellow-500" },
  approved: { label: "Approved", color: "text-green-400", dot: "bg-green-500" },
  denied: { label: "Not a Match", color: "text-vault-muted", dot: "bg-vault-border" },
  "more-info": { label: "Additional Info Needed", color: "text-yellow-400", dot: "bg-yellow-400" },
  withdrawn: { label: "Withdrawn", color: "text-vault-muted", dot: "bg-vault-border" },
};

function fmtMoney(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n}`;
}

function getNextStepMessage(apps: Application[]) {
  if (apps.length === 0) return null;
  const hasApproved = apps.some((a) => a.status === "approved");
  const hasMoreInfo = apps.some((a) => a.status === "more-info");
  const allDone = apps.every((a) => ["approved", "denied", "withdrawn"].includes(a.status));

  if (hasApproved) {
    return "You have an active offer. Your advisor will contact you within 24 hours to walk through next steps.";
  }
  if (hasMoreInfo) {
    return "A lender has requested additional documentation. Your advisor will reach out with exactly what's needed — no action required on your end yet.";
  }
  if (allDone) {
    return "All decisions are in. Your advisor is reviewing options and will be in touch shortly.";
  }
  return "Your applications are being processed. Decisions typically arrive within 24–72 hours. No action needed from you.";
}

export default function ClientPortalPage({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) {
  const [clientId, setClientId] = useState<string | null>(null);
  const [client, setClient] = useState<ClientData | null>(null);
  const [apps, setApps] = useState<Application[]>([]);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    params.then((p) => setClientId(p.clientId));
  }, [params]);

  useEffect(() => {
    if (!clientId) return;
    fetch(`/api/client/${clientId}`)
      .then(async (res) => {
        if (!res.ok) { setNotFound(true); return; }
        const data = await res.json();
        setClient(data.client);
        setApps(data.applications);
      })
      .catch(() => setNotFound(true));
  }, [clientId]);

  const nextStep = getNextStepMessage(apps);

  return (
    <div className="min-h-screen bg-vault-bg flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-xl">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-10">
          <CVLogoMark size={28} />
          <span className="text-sm font-bold text-vault-cream tracking-widest uppercase">
            Capital Vault
          </span>
        </div>

        {notFound && (
          <div className="card-vault p-6 text-center">
            <p className="text-vault-muted text-sm">This link is invalid or has expired.</p>
          </div>
        )}

        {!client && !notFound && (
          <div className="card-vault p-6 text-center text-vault-muted text-sm animate-pulse">
            Loading your portal…
          </div>
        )}

        {client && (
          <>
            <div className="mb-6">
              <span className="kicker text-[10px] block mb-1">Application Status</span>
              <h1 className="text-2xl font-black text-vault-cream">{client.business_name}</h1>
              <p className="text-sm text-vault-muted mt-1">{client.owner_name}</p>
            </div>

            {/* Next step callout */}
            {nextStep && (
              <div className="bg-vault-gold/5 border border-vault-gold/20 rounded-sm p-4 mb-6">
                <div className="kicker text-[10px] mb-1 text-vault-gold">What Happens Next</div>
                <p className="text-sm text-vault-cream">{nextStep}</p>
              </div>
            )}

            {/* Applications */}
            <div className="space-y-3">
              {apps.length === 0 ? (
                <div className="card-vault p-5 text-sm text-vault-muted">
                  No applications submitted yet. Your advisor will notify you when submissions begin.
                </div>
              ) : (
                apps.map((app, i) => {
                  const cfg = STATUS_CONFIG[app.status] ?? STATUS_CONFIG.submitted;
                  return (
                    <div key={app.id} className="card-vault p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full shrink-0 mt-1.5 ${cfg.dot}`} />
                          <div>
                            <div className="text-sm font-semibold text-vault-cream">
                              Application {i + 1}
                            </div>
                            <div className="text-xs text-vault-muted mt-0.5">
                              Submitted {new Date(app.created_at).toLocaleDateString("en-US", {
                                month: "short", day: "numeric", year: "numeric",
                              })}
                            </div>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <div className={`text-sm font-bold ${cfg.color}`}>{cfg.label}</div>
                          {app.status === "approved" && app.approved_amount && (
                            <div className="text-green-400 font-black text-base mt-0.5">
                              {fmtMoney(app.approved_amount)}
                            </div>
                          )}
                          {app.status === "approved" && app.rate && (
                            <div className="text-xs text-vault-muted mt-0.5">
                              {app.rate}{app.terms ? ` · ${app.terms}` : ""}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div className="mt-8 text-center">
              <p className="text-xs text-vault-muted">
                Questions? Reply to your onboarding email or contact{" "}
                <a
                  href="mailto:abu@thecapitalvault.com"
                  className="text-vault-gold hover:underline"
                >
                  abu@thecapitalvault.com
                </a>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
