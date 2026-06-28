@AGENTS.md

# Design Token Rule

Before writing any JSX or CSS, read DESIGN.md. Every page must pull from the documented token system - never hardcode a hex value, never improvise colors or button styles.

The project has TWO design systems:

1. **Vault-black** (main site) - dark background `#0B0B0F`, gold `#D4AF37`, Playfair + Sora. Use `bg-vault-black`, `text-vault-gold`, `.card-vault`, `.btn-gold`, `.kicker`, `.heading-lg` etc. from globals.css.

2. **FBads funnel** (`/FBads` route only) - warm `#FDFCF8` background, gold `#C8960C`, Outfit font. All styles live in `app/FBads/fbads.css` scoped to `.fbads`. Do not mix vault-black tokens onto the FBads page.

When building a new page: identify which system applies, import only those tokens, reuse `FunnelForm`, `VSLPlayer`, `WebinarForm` from `app/components/` before building anything new.
