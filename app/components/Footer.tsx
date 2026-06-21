export default function Footer() {
  return (
    <footer className="bg-vault-black border-t border-hairline py-16">
      <div className="container-vault">
        <div className="text-center mb-12">
          <h2 className="font-serif font-bold text-vault-gold text-2xl mb-2">The Capital Vault</h2>
          <p className="text-vault-cream font-medium mb-4">Transforming Credit. Building Dreams.</p>
          <p className="text-vault-muted text-sm max-w-md mx-auto leading-relaxed">
            We help entrepreneurs escape credit prison and access real business funding with a proven
            6-month system.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 mb-12 text-sm text-vault-muted">
          <p>
            <span className="text-vault-cream font-medium">Phone:</span>{" "}
            <a href="tel:8554424127" className="hover:text-vault-gold transition-colors">
              (855) 442-4127
            </a>
          </p>
          <p>
            <span className="text-vault-cream font-medium">Email:</span>{" "}
            <a
              href="mailto:support@thecapitalvault.com"
              className="hover:text-vault-gold transition-colors"
            >
              support@thecapitalvault.com
            </a>
          </p>
          <p>
            <span className="text-vault-cream font-medium">Hours:</span> Mon–Fri · 9am–6pm CST
          </p>
        </div>

        <div className="border-t border-hairline pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-vault-muted">
          <p>© 2025 The Capital Vault. All Rights Reserved.</p>
          <div className="flex gap-6">
            {[
              { label: "Privacy Policy", href: "#" },
              { label: "Terms of Service", href: "#" },
              { label: "Disclaimer", href: "#" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-vault-gold transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
