# Capital Vault — Design System

Extracted from the live site at thecapitalvault.com. Every new page and component must pull from these tokens. No hardcoded hex values. No improvised layouts.

---

## Colors

| Token | Class | Hex | Use |
|---|---|---|---|
| vault-black | `bg-vault-black` / `text-vault-black` | `#0a0a0a` | Page background |
| vault-surface | `bg-vault-surface` | `#161616` | Card / raised layer above black |
| vault-border | `border-vault-border` | `#2a2a2a` | Card borders, dividers |
| vault-gold | `bg-vault-gold` / `text-vault-gold` | `#d4af37` | Primary accent — headings, icons, stats |
| vault-cream | `text-vault-cream` | `#f7f4ed` | Primary body text on dark bg |
| vault-muted | `text-vault-muted` | `#9a948a` | Secondary text, captions, labels |
| vault-ink | `text-vault-ink` | `#16130d` | Text on light/gold backgrounds |
| hairline | `border-hairline` | `rgba(212,175,55,0.20)` | Subtle dividers on dark bg |

### Gold opacity utilities
| Class | Value |
|---|---|
| `bg-vault-gold/5` | Gold at 5% — section backgrounds |
| `bg-vault-gold/10` | Gold at 10% — hover states |
| `bg-vault-gold/20` | Gold at 20% — active states |
| `border-vault-gold/30` | Gold at 30% — input borders |
| `border-vault-gold/40` | Gold at 40% — form card borders |

---

## Typography

| Role | Font | Class / Usage |
|---|---|---|
| Display headings | Playfair Display | `.heading-lg`, `.heading-md`, or `font-serif` |
| Body / UI | Sora | Default — all body copy, buttons, labels |
| Kicker / eyebrow | Sora | `.kicker` — 0.75rem, 600, uppercase, letter-spacing 0.28em |

### Heading scale
| Class | Mobile | Tablet | Desktop |
|---|---|---|---|
| `.heading-lg` | 2.25rem | 3rem | 3.75rem |
| `.heading-md` | 1.5rem | 1.875rem | 2.25rem |

Section h2s that are NOT Playfair use `font-black` (900) in Sora — see webinar page headings.

---

## Buttons

| Class | Shape | Use |
|---|---|---|
| `.btn-gold` | Pill (border-radius: 9999px) | Standard CTA — book call, see if I qualify |
| `.btn-outline` | Pill | Secondary CTA — on dark bg |
| `.btn-gold-gradient` | Rounded rect (0.5rem) | Event CTAs, urgency CTAs — webinar/register pages |

### btn-gold
```
background: #d4af37 · color: #0a0a0a · font-weight: 600
padding: 0.875rem 2rem · border-radius: 9999px
hover: opacity 0.9
```

### btn-gold-gradient
```
background: linear-gradient(135deg, #d4af37 0%, #ffd700 50%, #b8860b 100%)
color: #0a0a0a · font-weight: 900 · text-transform: uppercase
padding: 1rem 2.5rem · border-radius: 0.5rem
hover: translateY(-2px) + box-shadow gold glow
```

---

## Cards

| Class | Use |
|---|---|
| `.card-vault` | Standard dark card — `bg #161616, border #2a2a2a, radius 1rem` |
| `.card-vault-glow` | Card with gold ambient glow — hero section, featured cards |
| `.card-vault-gold` | Card with solid gold border — "This Is For You" / selected state |

---

## Special Elements

### Kicker / Eyebrow
```css
.kicker — uppercase, 0.75rem (md: 0.875rem), font-weight 600, letter-spacing 0.28em, color #d4af37
```

### Urgency Bar
```css
.urgency-bar — gradient 90deg: #b8860b → #d4af37 → #b8860b · text: vault-ink · font-black uppercase
```

### Gold Circle (numbered beats)
```css
.circle-gold — 3.5rem circle, gold gradient bg, vault-ink text, font-black · use for numbered lists
```

### Input
```css
.input-vault — bg vault-black, border gold/35, radius 0.5rem, padding 0.75rem 1rem
focus: border-color vault-gold
```

---

## Root Defaults (layout.tsx — do not override)

| Property | Value | Note |
|---|---|---|
| Background | `bg-vault-black` (`#0a0a0a`) | Set on `<body>` |
| Default text | `text-vault-cream` (`#f7f4ed`) | Set on `<body>` — NEVER use `text-vault-ink` on body |
| Font | `font-sans` (Sora) | Set on `<body>` |

`text-vault-ink` (`#16130d`) is reserved for text ON gold or light surfaces only (inside `.btn-gold`, `.urgency-bar`, `.gold-gradient` elements). Never apply it to the body or to sections with dark backgrounds.

---

## Layout

| Token | Value |
|---|---|
| `.container-vault` | max-width 64rem, padding 1.5rem (md: 2.5rem, lg: 3rem) |
| Max content width (wide pages) | `max-w-6xl mx-auto` |
| Max content width (text pages) | `max-w-3xl mx-auto` |
| Section vertical padding | `.section-padding` = `py-16 md:py-24` (4rem / 6rem) |

---

## Animation

| Class | Effect |
|---|---|
| `.scroll-reveal` | fadeUp on load — opacity 0 → 1, translateY 20px → 0 |
| `.delay-1` through `.delay-4` | 0.1s increments |

---

## FBads Funnel Design System

The `/FBads` route uses its own warm design system extracted from the reference (`capital-vault-funnel/FBads.html`). It is completely separate from the vault-black design. All tokens are scoped to `.fbads` in `app/FBads/fbads.css`. Never apply vault-black tokens to this page.

| Token | Value | Use |
|---|---|---|
| `--bg` | `#FDFCF8` | Page background |
| `--bg2` | `#F8F3EA` | Alt section background |
| `--dark` | `#1C1506` | Hero, case studies, footer, final CTA |
| `--card` | `#FFFFFF` | Card backgrounds |
| `--gold` | `#C8960C` | Primary gold accent |
| `--gold2` | `#E8B420` | Gold gradient highlight |
| `--text` | `#1C1506` | Body text |
| `--text-mid` | `#6B5E3A` | Secondary text |
| `--border` | `#EDE6D2` | Card / section borders |
| `--green` | `#166534` | Qualified check color |
| Font | Outfit 400-900 | All text (loaded via next/font) |
| Radius | `8px` | All elements |

CTAs use `linear-gradient(135deg, #E8B420 0%, #C8960C 100%)` with white text. Button style in `.fbads .btn-gold`. Do not use `.btn-gold` from globals.css on this page.

---

## Existing Components (reuse — do not rebuild)

| Component | Path | Use |
|---|---|---|
| `FunnelForm` | `app/components/FunnelForm.tsx` | Name/phone/email/revenue → GHL + Turnstile. Use for diagnostic/application funnels. |
| `WebinarForm` | `app/components/WebinarForm.tsx` | Name/email/phone → /api/register → Zoom. Use for webinar registration pages. |
| `VSLPlayer` | `app/components/VSLPlayer.tsx` | Wistia embed. Use on VSL pages. |
