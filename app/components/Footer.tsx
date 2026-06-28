import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-vault-bg border-t border-vault-border">
      <div className="container-vault section-padding">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-16 md:mb-20">
          <div>
            <h3 className="font-serif font-bold text-vault-gold text-lg mb-6">
              THE VAULT
            </h3>
            <p className="text-sm text-vault-muted leading-relaxed">
              Non-dilutive capital for established business operators.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-vault-ink mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Why Vault", href: "#why-vault" },
                { label: "Funding", href: "#funding" },
                { label: "How It Works", href: "#how-we-work" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-vault-muted hover:text-vault-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-vault-ink mb-4">
              Company
            </h4>
            <ul className="space-y-2">
              {[
                { label: "About", href: "#" },
                { label: "Contact", href: "#" },
                { label: "Blog", href: "#" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-vault-muted hover:text-vault-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-vault-ink mb-4">
              Legal
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Privacy", href: "#" },
                { label: "Terms", href: "#" },
                { label: "Disclosures", href: "#" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-vault-muted hover:text-vault-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-vault-border pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-vault-muted">
          <p>© {currentYear} The Capital Vault. All rights reserved.</p>
          <div className="flex gap-6">
            {[
              { label: "LinkedIn", href: "#" },
              { label: "Twitter", href: "#" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="hover:text-vault-gold transition-colors"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
