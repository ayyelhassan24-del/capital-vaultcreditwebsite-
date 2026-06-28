import Link from "next/link";
import { CVLogoMark } from "@/app/components/CVLogo";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-vault-bg text-vault-cream">
      {/* Sidebar */}
      <aside className="w-48 shrink-0 border-r border-vault-border flex flex-col py-6 px-4 bg-vault-card sticky top-0 h-screen">
        <div className="flex items-center gap-2 mb-8">
          <CVLogoMark size={24} />
          <span className="kicker text-vault-muted text-[10px]">Dashboard</span>
        </div>

        <nav className="flex flex-col gap-1 flex-1">
          <Link
            href="/dashboard"
            className="text-sm text-vault-cream hover:text-vault-gold px-2 py-2 rounded-sm hover:bg-vault-gold/5 transition-colors"
          >
            Pipeline
          </Link>
          <Link
            href="/dashboard/new"
            className="text-sm text-vault-cream hover:text-vault-gold px-2 py-2 rounded-sm hover:bg-vault-gold/5 transition-colors"
          >
            + Add Client
          </Link>
        </nav>

        <div className="mt-auto pt-4 border-t border-vault-border">
          <Link
            href="/"
            className="text-xs text-vault-muted hover:text-vault-gold"
          >
            ← Public site
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0 p-6">{children}</main>
    </div>
  );
}
