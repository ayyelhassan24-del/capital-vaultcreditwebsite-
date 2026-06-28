<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Design System — Read DESIGN.md Before Writing Any UI

**Before writing a single line of JSX or CSS, read `DESIGN.md`.**

Rules enforced on every page and component:

1. **No hardcoded hex values.** Use Tailwind tokens (`text-vault-gold`, `bg-vault-surface`, `border-vault-border`) or globals.css utility classes (`.card-vault`, `.btn-gold-gradient`, `.kicker`). The only exception is a custom `box-shadow` value not expressible in Tailwind.

2. **No improvised colors.** If a color isn't in `DESIGN.md`, it doesn't exist. Do not invent purples, grays, or new greens.

3. **Reuse existing components.** Check `DESIGN.md` → "Existing Components" before building anything. `FunnelForm`, `WebinarForm`, and `VSLPlayer` are already built. Import them.

4. **No inline `style` props** except for `box-shadow` glows and `background` gradients already defined in DESIGN.md (`.gold-gradient`, `.urgency-bar`). Everything else goes in Tailwind classes or globals.css.

5. **Typography:** Headings use `.heading-lg` / `.heading-md` (Playfair Display) or `font-black` in Sora for bold section titles. Eyebrows use `.kicker`. Body is Sora default.

6. **Buttons:** Use `.btn-gold` (pill, standard CTA), `.btn-outline` (secondary), or `.btn-gold-gradient` (event/urgency CTA). Never invent a new button style.

7. **Cards:** Use `.card-vault`, `.card-vault-glow`, or `.card-vault-gold`. Never use raw `bg-[#161616]` or `border-[#2a2a2a]` — that's what these classes are for.
