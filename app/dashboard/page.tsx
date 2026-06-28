export const dynamic = "force-dynamic";

import Link from "next/link";
import { createServerClient } from "@/lib/supabase";
import { StageTag } from "@/app/components/dashboard/StageTag";
import { TrackBadge } from "@/app/components/dashboard/TrackBadge";

async function getClients() {
  const db = createServerClient();
  const { data } = await db
    .from("clients")
    .select("*")
    .order("created_at", { ascending: false });
  return data ?? [];
}

function StatBox({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="card-vault p-4">
      <div className="kicker mb-1">{label}</div>
      <div className="text-2xl font-black text-vault-cream">{value}</div>
    </div>
  );
}

function fmtMoney(n: number | null) {
  if (!n) return "—";
  if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `$${(n / 1000).toFixed(0)}K`;
  return `$${n}`;
}

export default async function DashboardPage() {
  const clients = await getClients();

  const activeClients = clients.filter((c) => c.stage !== "funded");
  const fundedClients = clients.filter((c) => c.stage === "funded");
  const totalPipeline = activeClients.reduce(
    (sum, c) => sum + (c.funding_amount_requested ?? 0),
    0
  );
  const totalRevenue = clients.reduce(
    (sum, c) => sum + (c.fee_collected ?? 0),
    0
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="kicker block mb-1">Capital Vault</span>
          <h1 className="text-xl font-black text-vault-cream">Pipeline</h1>
        </div>
        <Link href="/dashboard/new" className="btn-gold text-sm">
          + Add Client
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        <StatBox label="Active Clients" value={activeClients.length} />
        <StatBox label="Funded" value={fundedClients.length} />
        <StatBox label="Pipeline Value" value={fmtMoney(totalPipeline)} />
        <StatBox label="Fees Collected" value={fmtMoney(totalRevenue)} />
      </div>

      {/* Client Table */}
      {clients.length === 0 ? (
        <div className="card-vault p-8 text-center text-vault-muted">
          <p className="mb-4">No clients yet.</p>
          <Link href="/dashboard/new" className="btn-outline text-sm">
            Add your first client
          </Link>
        </div>
      ) : (
        <div className="card-vault overflow-hidden">
          <table className="w-full text-sm">
            <thead className="border-b border-vault-border">
              <tr>
                <th className="text-left py-3 px-4 kicker text-[10px] font-bold">Business</th>
                <th className="text-left py-3 px-4 kicker text-[10px] font-bold">Track</th>
                <th className="text-left py-3 px-4 kicker text-[10px] font-bold">Stage</th>
                <th className="text-left py-3 px-4 kicker text-[10px] font-bold">Revenue/mo</th>
                <th className="text-left py-3 px-4 kicker text-[10px] font-bold">Industry</th>
                <th className="py-3 px-4" />
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr
                  key={client.id}
                  className="border-b border-vault-border last:border-0 hover:bg-vault-gold/5 transition-colors"
                >
                  <td className="py-3 px-4">
                    <div className="font-medium text-vault-cream">
                      {client.business_name}
                    </div>
                    <div className="text-xs text-vault-muted">{client.owner_name}</div>
                  </td>
                  <td className="py-3 px-4">
                    {client.track && <TrackBadge track={client.track} showLabel />}
                  </td>
                  <td className="py-3 px-4">
                    <StageTag stage={client.stage} />
                  </td>
                  <td className="py-3 px-4 text-vault-muted">
                    {client.monthly_revenue
                      ? `$${client.monthly_revenue.toLocaleString()}`
                      : "—"}
                  </td>
                  <td className="py-3 px-4 text-vault-muted capitalize">
                    {client.industry ?? "—"}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      href={`/dashboard/${client.id}`}
                      className="text-xs text-vault-gold hover:underline whitespace-nowrap"
                    >
                      View →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
