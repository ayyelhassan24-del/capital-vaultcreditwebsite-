"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import "./fbads.css";

// vTurb (a Brazilian player) renders its resume/unmute overlays in Portuguese
// from per-player config inside a CLOSED shadow root, so neither a `language`
// attribute nor normal DOM access can reach the text. We run this BEFORE the
// player loads: force new shadow roots open as they're created, then sweep +
// observe them to swap the known Portuguese strings to English.
// DISABLED 2026-07-21: this patch force-opens the vTurb players' CLOSED shadow
// roots and sweeps/mutates them every 500ms. That black-screens click-to-play
// testimonial videos when their play/resume overlay renders. Flip VTURB_TRANSLATE
// back to true only with a non-invasive translation approach.
const VTURB_TRANSLATE = false;
if (VTURB_TRANSLATE && typeof window !== "undefined" && !(window as { __vturbEn?: number }).__vturbEn) {
  (window as { __vturbEn?: number }).__vturbEn = 1;
  const MAP: Record<string, string> = {
    "Continuar assistindo?": "Continue watching?",
    "Assistir do início?": "Watch from the beginning?",
    "Você já começou a assistir esse vídeo": "You already started watching this video",
    "Clique para ouvir": "Click to unmute",
    "Clique para ativar o som": "Click to unmute",
  };
  const roots: ShadowRoot[] = [];
  const repl = (s: string) => {
    for (const k in MAP) if (s.indexOf(k) > -1) s = s.split(k).join(MAP[k]);
    return s;
  };
  const fixNode = (n: Node) => {
    if (n.nodeType === 3) {
      const v = n.nodeValue || "";
      const nv = repl(v);
      if (nv !== v) n.nodeValue = nv;
      return;
    }
    if (n.nodeType !== 1) return;
    const el = n as Element;
    for (const a of ["aria-label", "title", "alt", "value", "placeholder", "data-text"]) {
      const av = el.getAttribute?.(a);
      if (av) {
        const na = repl(av);
        if (na !== av) el.setAttribute(a, na);
      }
    }
  };
  const fixTree = (root: Node) => {
    try {
      fixNode(root);
      const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
      let c: Node | null;
      while ((c = w.nextNode())) {
        fixNode(c);
        const sr = (c as Element).shadowRoot;
        if (sr) fixTree(sr);
      }
    } catch {
      /* ignore */
    }
  };
  let obs: MutationObserver | null = null;
  const sweep = () => {
    fixTree(document);
    for (const r of roots) fixTree(r);
  };
  const observe = (t: Node) => {
    if (!obs) obs = new MutationObserver(sweep);
    obs.observe(t, { childList: true, subtree: true, characterData: true, attributes: true });
  };
  const orig = Element.prototype.attachShadow;
  Element.prototype.attachShadow = function (init: ShadowRootInit) {
    const open = init && init.mode === "closed" ? { ...init, mode: "open" as const } : init;
    const r = orig.call(this, open);
    roots.push(r);
    observe(r);
    fixTree(r);
    return r;
  };
  const start = () => {
    if (document.body) {
      observe(document.body);
      sweep();
    } else {
      setTimeout(start, 30);
    }
  };
  start();
  let n = 0;
  const iv = setInterval(() => {
    sweep();
    if (++n > 120) clearInterval(iv);
  }, 500);
}

// www.thecapitalvault.com only proxies the exact /FBads path to this app, so the
// post-booking redirect must target the dark app directly or it 404s.
// Must be the SAME domain the ad traffic lands on (fb.thecapitalvault.com), not
// the raw vercel.app host. Meta's _fbp/_fbc attribution cookies are per-domain —
// a cross-domain redirect after booking makes the /thanks Lead fire as an
// unattributed session, so Meta can't tie the booking back to the ad click.
const THANKS_URL = "https://fb.thecapitalvault.com/thanks";
const ICLOSED_ORIGIN = "https://app.iclosed.io";

export interface Variant {
  kicker: string;
  headline: string;
  accent: string;
  sub: string;
  cta: string;
  campaign: string;
}

const VTURB_ACCOUNT = "a3649cf1-35b1-4b5e-ac40-e070f7b4f3fd";

// Hero "Trusted by" logo strip. Drop client logo files (PNG/SVG) into
// public/assets/clients/ and add { src, alt } rows here. Empty = the strip
// renders nothing (no broken images), so the page ships safely before assets
// land. Logos render grayscale/low-opacity and lift to full on hover.
const CLIENT_LOGOS: { src: string; alt: string }[] = [
  // { src: "/assets/clients/example.png", alt: "Example Co" },
];

// Hero results band — the same four proof numbers, surfaced above the fold.
const HERO_STATS = [
  { n: "$81M+",  l: "Capital Deployed" },
  { n: "500+",   l: "Institutional Lenders" },
  { n: "24 hrs", l: "Fastest Placement" },
  { n: "0%",     l: "Promotional Rate" },
];

// Client placement cards — vTurb SmartPlayer video (vertical 9:16) over the
// documented placement copy.
const CASE_STUDIES = [
  {
    videoId: "6a41c2244117dbb4095f3b4c",
    name: "Brandon",
    label: "Cleaning Service",
    amount: "$90,000",
    desc: "Required capital to hire and deploy crews for commercial contract work. Placed at 0% interest within 4 days. Capital was deployed the same week — no high-interest debt, no equity dilution.",
    result: "Placed in 4 days · 0% interest",
  },
  {
    videoId: "6a41c221d7338761a2d24bf9",
    name: "Benjamin",
    label: "Transportation",
    amount: "$145,000",
    desc: "Deployed $145,000 at zero percent to expand fleet capacity and open new routes. Standard bank declined due to cash flow structure. Lender match resolved in 5 days.",
    result: "Placed in 5 days · 0% interest",
  },
  {
    videoId: "6a41c225641d860e23c4b2c8",
    name: "Victor Rancour",
    label: "HVAC & Private Equity",
    amount: "$190,000",
    desc: "Following the sale of an HVAC company, returned for $190,000 in zero-percent capital to fund the next venture's marketing infrastructure. Placed in 6 days.",
    result: "Placed in 6 days · 0% interest",
  },
];

const FAQS = [
  {
    q: "Does this affect my personal credit score?",
    a: "Initial qualification requires only a soft inquiry — no impact to your score. A hard pull occurs only if you choose to proceed with a specific lender offer, and that decision rests entirely with you. The majority of our clients complete the full process without triggering a hard inquiry until they are ready to accept funding.",
  },
  {
    q: "How does zero percent interest work on a business loan?",
    a: "These are business credit line products issued with 0% promotional APR periods of 12 to 18 months. We structure the capital placement to maximize the duration of your zero-percent window, so you can deploy the capital and generate a return before standard rates apply. The clients you see above ran this same math.",
  },
  {
    q: "I have been declined by banks before. Does that disqualify me?",
    a: "Prior bank declines are the most common situation we encounter — and they are not disqualifying here. Traditional banks underwrite through models designed for salaried employees, not service businesses. Our 500+ lender network uses actual cash flow and business trajectory as their primary underwriting criteria. A bank's no is not our no.",
  },
  {
    q: "What are the minimum requirements?",
    a: "$500,000 or more in annual business revenue. At least 6 months in operation. Personal credit 620 or above. No open bankruptcies. Additional variables are reviewed on the assessment call — but if you meet those four, the conversation is worth having.",
  },
  {
    q: "What is a realistic funding timeline?",
    a: "Fastest documented placement: 24 hours post-approval. Typical range: 5 to 11 business days, depending on the lender and documentation response time. Your assessment call will produce an accurate estimate based on your specific file — not a generic range.",
  },
  {
    q: "What does this cost me?",
    a: "Nothing prior to funding. No consulting fee. No application fee. No retainer. Our compensation is collected from the lender at the point of placement — and only if placement occurs. Determining what your business qualifies for costs you nothing except a 30-minute call.",
  },
];

export default function FBAdsFull({ variant, fontVariable }: { variant: Variant; fontVariable: string }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  // Which testimonial videos the visitor has clicked to play. The vTurb players
  // autoplay the instant their script loads, so loading all four on page load
  // made the hero VSL + 3 testimonials play at once. We now load each
  // testimonial player only on click — nothing autoplays except the hero VSL.
  const navRef = useRef<HTMLElement>(null);
  const router = useRouter();

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Bind the vTurb SmartPlayer to the Meta pixel so we can build audiences off
  // who actually watches — play + 25/50/75/95% watch milestones. Event names
  // are kept identical to the prior Wistia wiring so existing Meta custom
  // audiences keep firing after the player swap.
  useEffect(() => {
    const VSL_ID = "6a630ec0627039667ff3cd78";
    type Inst = {
      on: (event: string, cb: () => void) => void;
      video?: { currentTime: number; duration: number };
    };
    const w = window as unknown as { fbq?: (...a: unknown[]) => void };

    let bound = false;
    const bind = (inst: Inst) => {
      if (bound || !inst || typeof inst.on !== "function") return;
      bound = true;
      const fire = (event: string) => w.fbq?.("trackCustom", event);
      // Distinct named events per milestone so each is selectable in Meta
      // Events Manager for custom audiences and conversions. Ladder = VSLPlay
      // (0% / start) → 25 → 50 → 75 → VSLView100 (true completion, below).
      const milestones: Array<[number, string]> = [
        [25, "VSLView25"],
        [50, "VSLView50"],
        [75, "VSLView75"],
      ];
      const hit: Record<number, boolean> = {};
      let played = false;
      let completed = false;
      const complete = () => {
        if (completed) return;
        completed = true;
        fire("VSLView100");
      };
      inst.on("play", () => {
        if (played) return;
        played = true;
        fire("VSLPlay");
      });
      inst.on("timeupdate", () => {
        const v = inst.video;
        if (!v || !v.duration) return;
        const p = Math.round((v.currentTime / v.duration) * 100);
        for (const [m, name] of milestones) {
          if (p >= m && !hit[m]) {
            hit[m] = true;
            fire(name);
            if (m === 50)
              w.fbq?.("track", "ViewContent", { content_name: "FBads VSL 50%" });
          }
        }
        // timeupdate rarely reports an exact 100%, so >=98% counts as complete.
        // This is the guaranteed completion path.
        if (p >= 98) complete();
      });
      // `ended` is the ideal completion signal; best-effort in case the vTurb
      // build doesn't emit it (the 98% fallback above covers that case). Both
      // are guarded by `completed`, so VSLView100 fires at most once.
      inst.on("ended", complete);
    };

    // Testimonial (case-study) players. Track play + 50% watched per person so
    // we can see which proof video actually gets consumed, segmented by name.
    const TESTIMONIALS: Record<string, string> = {
      "6a41c2244117dbb4095f3b4c": "Brandon",
      "6a41c221d7338761a2d24bf9": "Benjamin",
      "6a41c225641d860e23c4b2c8": "Victor Rancour",
    };
    const boundT: Record<string, boolean> = {};
    const bindTestimonial = (id: string, inst: Inst) => {
      const who = TESTIMONIALS[id];
      if (!who || boundT[id] || !inst || typeof inst.on !== "function") return;
      boundT[id] = true;
      let tPlayed = false;
      let tHalf = false;
      inst.on("play", () => {
        if (tPlayed) return;
        tPlayed = true;
        w.fbq?.("trackCustom", "TestimonialPlay", { content_name: who });
      });
      inst.on("timeupdate", () => {
        const v = inst.video;
        if (!v || !v.duration || tHalf) return;
        if ((v.currentTime / v.duration) * 100 >= 50) {
          tHalf = true;
          w.fbq?.("trackCustom", "TestimonialView50", { content_name: who });
        }
      });
    };

    // The page hosts multiple vTurb players (VSL + 3 testimonials). Route each
    // ready event by id: the main VSL gets the full 0/25/50/75/100 ladder,
    // testimonials get play + 50% engagement.
    function onReady(e: Event) {
      const detail = (e as CustomEvent).detail || {};
      const id = detail?.config?.id as string | undefined;
      if (id === VSL_ID) bind(detail.player as Inst);
      else if (id && TESTIMONIALS[id]) {
        // Disable the player's "expand on play" immersive/theater mode for the
        // testimonials. In the 3-up card grid it takes over the viewport and,
        // clipped by the card's overflow, renders as a black sliver (this was
        // Victor's black card on desktop). Verified: flipping this off keeps the
        // video in its 9:16 slot. VSL keeps immersive (it's full-width).
        try {
          const cfg = (detail.player as { __config?: { immersiveMode?: { active?: boolean } } }).__config;
          if (cfg?.immersiveMode) cfg.immersiveMode.active = false;
        } catch {
          /* config not present — ignore */
        }
        bindTestimonial(id, detail.player as Inst);
      }
    }
    document.addEventListener("player:ready", onReady);
    return () => document.removeEventListener("player:ready", onReady);
  }, []);

  // Autoplay belongs to the hero VSL ALONE. vTurb autoplays every player it
  // initializes (the setting lives in each video's dashboard config, which we
  // can't reach from here), so on load all 3 testimonials would start at once —
  // a wall of talking heads. The hydrated <vturb-smartplayer> element exposes a
  // real .pause(); we hold each testimonial paused on its poster until the
  // visitor actually clicks that card, then let vTurb play it normally.
  useEffect(() => {
    const TESTIMONIAL_IDS = [
      "6a41c2244117dbb4095f3b4c",
      "6a41c221d7338761a2d24bf9",
      "6a41c225641d860e23c4b2c8",
    ];
    type PlayerEl = HTMLElement & { pause?: () => void };
    const wanted = new Set<string>();

    // A real click on a card = intent to watch. Capture-phase so we record it
    // before vTurb's own handler starts playback, and from then on we leave
    // that player alone.
    const cleanups: Array<() => void> = [];
    for (const id of TESTIMONIAL_IDS) {
      const el = document.getElementById(`vid-${id}`);
      if (!el) continue;
      const onClick = () => wanted.add(id);
      el.addEventListener("click", onClick, true);
      cleanups.push(() => el.removeEventListener("click", onClick, true));
    }

    // Suppress the initial autoplay for ~8s after load. That covers the window
    // in which vTurb hydrates and tries to auto-start each testimonial; a
    // user-clicked card is skipped so its playback is never interrupted.
    let ticks = 0;
    const iv = window.setInterval(() => {
      for (const id of TESTIMONIAL_IDS) {
        if (wanted.has(id)) continue;
        const el = document.getElementById(`vid-${id}`) as PlayerEl | null;
        if (el && typeof el.pause === "function") {
          try {
            el.pause();
          } catch {
            /* not hydrated yet — a later tick catches it */
          }
        }
      }
      if (++ticks > 40) window.clearInterval(iv);
    }, 200);

    return () => {
      window.clearInterval(iv);
      for (const c of cleanups) c();
    };
  }, []);

  // Fire a pixel event on every "Schedule a Call" CTA click. The CTAs are
  // bare #book-call anchors, so without this the click is invisible to Meta —
  // delegated listener catches all of them (hero, nav, mid-page, final CTA).
  useEffect(() => {
    const w = window as unknown as { fbq?: (...a: unknown[]) => void };
    function onClick(e: MouseEvent) {
      const target = (e.target as HTMLElement | null)?.closest(
        'a[href="#book-call"]'
      );
      if (!target) return;
      // Segment by which CTA on the page was clicked (nav / hero / mid / proof /
      // final) via the anchor's data-cta attribute, so Meta shows which link
      // actually drives intent.
      const placement = (target as HTMLElement).dataset.cta || "unknown";
      w.fbq?.("trackCustom", "BookCallClick", { content_name: placement });
      // InitiateCheckout = the upper-funnel signal for the CTA click. This is the
      // event the ad set should optimize on while booking volume is low (clicks
      // have enough volume to exit the learning phase). Lead is intentionally NOT
      // fired here — Lead fires ONLY on /thanks after a confirmed booking, so it
      // stays a clean conversion signal. Firing Lead on click pollutes it with
      // clickers and makes Meta optimize toward cheap clicks, not bookings.
      w.fbq?.("track", "InitiateCheckout", { content_name: `Book Call · ${placement}` });
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Orchestrate playback: only ONE vTurb video runs at a time. On mobile the
  // browser typically grants a single hardware video decoder — the hero VSL
  // autoplaying while the visitor taps a testimonial can starve the new player
  // of a decoder and leave it stuck on a black frame (reported on Victor's card
  // on iPhone). On any tap of a player, pause + mute every OTHER player so the
  // tapped one gets the decoder to itself. Verified live: a tap retargets to the
  // <vturb-smartplayer> host and pause() succeeds on the others.
  useEffect(() => {
    const SEL = "vturb-smartplayer";
    const onDown = (e: Event) => {
      const el = (e.target as HTMLElement | null)?.closest?.(SEL);
      if (!el) return;
      document.querySelectorAll(SEL).forEach((other) => {
        if (other === el) return;
        const pl = other as unknown as { pause?: () => void; mute?: () => void };
        try {
          pl.pause?.();
          pl.mute?.();
        } catch {
          /* player not ready yet — ignore */
        }
      });
    };
    document.addEventListener("pointerdown", onDown, true);
    return () => document.removeEventListener("pointerdown", onDown, true);
  }, []);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (!event.origin.includes("iclosed.io")) return;
      try {
        const data = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
        const isBookingDone =
          data?.type === "booking-confirmed" ||
          data?.type === "booking_confirmed" ||
          data?.type === "booking:confirmed" ||
          data?.type === "iclosed:booking:submitted" ||
          data?.event === "booking_confirmed" ||
          data?.event === "booking_complete" ||
          data?.status === "confirmed" ||
          data?.action === "booking_complete";
        // Fire a distinct submission-moment signal the instant the widget
        // confirms — captured even if the /thanks redirect is blocked or slow.
        // Lead is NOT fired here; it stays the clean conversion on /thanks.
        if (isBookingDone) {
          (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq?.(
            "trackCustom",
            "SubmitApplication"
          );
          window.location.href = THANKS_URL;
        }
      } catch {
        // non-JSON messages from the widget — ignore
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [router]);

  return (
    <div className={`fbads ${fontVariable}`}>

      {/* Warm the TLS handshake to vTurb's CDNs before any player.js is
          requested — cuts the cold-click black-placeholder window. */}
      <link rel="preconnect" href="https://scripts.converteai.net" crossOrigin="" />
      <link rel="preconnect" href="https://cdn.converteai.net" crossOrigin="" />
      <link rel="preconnect" href="https://images.converteai.net" crossOrigin="" />

      {/* Hero VSL + all 3 testimonial players load on page load, so vTurb's
          player.js initializes each <vturb-smartplayer> while it is already in
          the DOM. The old approach injected a testimonial's script only on
          click, after its element mounted — the player never initialized and
          the card went black. Testimonials are click-to-play (poster shown);
          only the hero autoplays. */}
      <Script
        src="https://scripts.converteai.net/a3649cf1-35b1-4b5e-ac40-e070f7b4f3fd/players/6a630ec0627039667ff3cd78/v4/player.js"
        strategy="afterInteractive"
      />
      {CASE_STUDIES.map((cs) => (
        <Script
          key={cs.videoId}
          src={`https://scripts.converteai.net/${VTURB_ACCOUNT}/players/${cs.videoId}/v4/player.js`}
          strategy="afterInteractive"
        />
      ))}

      {/* NAV */}
      <nav className="nav" ref={navRef}>
        <div className="wrap nav-in">
          <a href="https://capital-vault-website.vercel.app/" className="nav-logo">
            <img
              src="/assets/logo.png"
              alt="The Capital Vault"
              height={52}
              onError={(e) => { (e.target as HTMLImageElement).src = "/assets/logo.svg"; }}
            />
          </a>
          <a href="#book-call" data-cta="nav" className="btn btn-gold btn-gold-sm">Schedule a Call</a>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="hero">
        <div className="wrap-sm">
          <div className="hero-tag">{variant.kicker}</div>
          <h1>
            {variant.headline}{" "}
            <span className="accent">{variant.accent}</span>
          </h1>
          <p className="hero-sub">{variant.sub}</p>

          {/* Above-the-fold social proof: star line → logo strip → results band */}
          <div className="hero-stars">
            <div className="stars">
              {[1, 2, 3, 4, 5].map((s) => (
                <span key={s} className="star">&#9733;</span>
              ))}
            </div>
            <span className="hero-stars-label">
              Trusted by 500+ operators the banks turned down
            </span>
          </div>

          {CLIENT_LOGOS.length > 0 && (
            <div className="hero-logos">
              <span className="hero-logos-eyebrow">Trusted by operators at</span>
              <div className="hero-logos-row">
                {CLIENT_LOGOS.map((logo) => (
                  <img
                    key={logo.src}
                    src={logo.src}
                    alt={logo.alt}
                    className="hero-logo"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="hero-stats">
            {HERO_STATS.map(({ n, l }) => (
              <div key={n} className="hero-stat">
                <span className="hero-stat-n">{n}</span>
                <span className="hero-stat-l">{l}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="wrap">
          <div
            className="vsl-player"
            dangerouslySetInnerHTML={{
              __html:
                `<vturb-smartplayer id="vid-6a630ec0627039667ff3cd78" style="display:block;margin:0 auto;width:100%;"><div class="vturb-player-placeholder" style="position:relative;width:100%;padding:56.25% 0 0;z-index:0;background:#000 url('https://images.converteai.net/${VTURB_ACCOUNT}/players/6a630ec0627039667ff3cd78/cover.jpg') center/cover no-repeat;"></div></vturb-smartplayer>`,
            }}
          />
        </div>
        <div className="wrap-sm">
          <div className="hero-cta" style={{ marginTop: 40 }}>
            <a href="#book-call" data-cta="hero" className="btn btn-gold btn-gold-lg">
              {variant.cta}
            </a>
            <div className="hero-guarantee">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2 4 5v6c0 5 3.4 8.5 8 11 4.6-2.5 8-6 8-11V5l-8-3Z" />
                <polyline points="8.5,12 11,14.5 15.5,9.5" />
              </svg>
              <span>
                <strong>Zero-Risk Guarantee</strong> — you pay nothing until capital is placed in your account.
              </span>
            </div>
            <span className="hero-note">
              No credit inquiry &nbsp;·&nbsp; No upfront fees &nbsp;·&nbsp; No obligation
            </span>
          </div>
        </div>
      </section>

      {/* ── VIDEO TESTIMONIALS (moved directly under the hero so cold traffic
             sees proof before anything is asked of them) ──────────────── */}
      <section className="sec-dark sec-proof">
        <div className="wrap">
          <div className="tc">
            <div className="sec-eyebrow">Documented Results</div>
            <h2 className="sec-title">
              Verified Client Placements
            </h2>
            <p className="sec-sub" style={{ margin: "0 auto", maxWidth: 640 }}>
              Each of the following represents a business that met our qualification criteria and completed the placement process. Watch them describe the experience directly.
            </p>
          </div>

          <div className="cases-grid">
            {CASE_STUDIES.map((cs) => (
              <div key={cs.videoId} className="case-card">
                <div
                  className="case-vid"
                  dangerouslySetInnerHTML={{
                    __html: `<vturb-smartplayer id="vid-${cs.videoId}" style="display:block;margin:0 auto;width:100%;"><div class="vturb-player-placeholder" style="position:relative;width:100%;padding:177.77777777777777% 0 0;z-index:0;background:#000 url('https://images.converteai.net/${VTURB_ACCOUNT}/players/${cs.videoId}/cover.jpg') center/cover no-repeat;"></div></vturb-smartplayer>`,
                  }}
                />
                <div className="case-body">
                  <span className="case-label">{cs.label}</span>
                  <div className="case-amount">{cs.amount}</div>
                  <p className="case-desc">{cs.desc}</p>
                  <div className="case-hr" />
                  <div className="case-name">{cs.name}</div>
                  <div className="case-result">{cs.result}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="tc" style={{ marginTop: 52 }}>
            <a href="#book-call" data-cta="proof" className="btn btn-gold btn-gold-lg">
              Schedule Your Assessment Call
            </a>
          </div>
        </div>
      </section>

      {/* ── QUALIFY ───────────────────────────────────────────────── */}
      <section className="sec" id="qualify">
        <div className="wrap">
          <div className="qualify-intro">
            <div className="sec-eyebrow">Who This Is For</div>
            <h2 className="sec-title qualify-title">
              Your Business Generates Revenue.<br />The Capital System Was Not Built for You.
            </h2>
            <p className="sec-sub qualify-sub">
              Traditional banks score businesses through underwriting models designed for salaried employees — not contractors, not seasonal operators, not service businesses. Our 500+ lender network was built specifically for businesses like yours.
            </p>
          </div>

          <div className="qualify-grid">
            <div className="qualify-col">
              <div className="qualify-col-label qualify-col-yes">You Likely Qualify</div>
              <div className="check-list">
                {[
                  "$500,000 or more in annual business revenue",
                  "Operating for at least 6 months",
                  "Seeking capital to scale, hire, or manage seasonal cash flow",
                  "Unwilling to take on merchant cash advance rates or give up equity",
                  "Personal credit score 620 or above",
                ].map((item) => (
                  <div key={item} className="check-row">
                    <div className="chk">
                      <svg viewBox="0 0 12 12"><polyline points="2,6 5,9 10,3" /></svg>
                    </div>
                    <span className="check-text">{item}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 28 }}>
                <a href="#book-call" data-cta="mid" className="btn btn-gold" style={{ maxWidth: "100%" }}>
                  Request Your Capital Assessment
                </a>
              </div>
            </div>

            <div className="qualify-col qualify-col-no-box">
              <div className="qualify-col-label qualify-col-no">This Program Is Not for You If</div>
              <p className="qualify-no-sub">
                We work exclusively with businesses we can serve. If any of the following apply, we will tell you clearly on the first call rather than waste your time.
              </p>
              <div className="x-list">
                {[
                  "Annual revenue below $500,000",
                  "Less than 6 months in operation",
                  "Open bankruptcy or active tax lien",
                  "Personal credit below 620",
                  "Seeking personal or consumer credit",
                ].map((item) => (
                  <div key={item} className="x-row">
                    <div className="xk">
                      <svg viewBox="0 0 12 12">
                        <line x1="2" y1="2" x2="10" y2="10" />
                        <line x1="10" y1="2" x2="2" y2="10" />
                      </svg>
                    </div>
                    <span className="x-text">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── HOW IT WORKS ─────────────────────────────────────────── */}
      <section className="sec">
        <div className="wrap">
          <div className="tc">
            <div className="sec-eyebrow">The Process</div>
            <h2 className="sec-title">From Assessment to Funded — Three Steps</h2>
            <p className="sec-sub" style={{ margin: "0 auto", maxWidth: 580 }}>
              No committee reviews. No document loops that go nowhere. No terms that change after you have already agreed.
            </p>
          </div>

          <div className="steps-grid">
            {[
              {
                num: "01",
                title: "Capital Assessment Call",
                desc: "30 minutes with a senior advisor. We review your revenue, credit profile, and capital objectives. You receive a clear picture of what your business may qualify for — or an honest answer if it does not. No ambiguity.",
              },
              {
                num: "02",
                title: "Institutional Lender Match",
                desc: "We run your file against 500+ institutional lenders and present your strongest options with complete terms before you commit to anything. Zero-percent programs are prioritized when your profile qualifies.",
              },
              {
                num: "03",
                title: "Capital Placed",
                desc: "Funds reach your business account in as little as 24 hours post-approval. Standard timeline: 5 to 11 business days. You receive 12 to 18 months at 0% to deploy and build. Our fee is collected from the lender — only at close.",
              },
            ].map(({ num, title, desc }) => (
              <div key={num} className="step-card">
                <div className="step-num">{num}</div>
                <div className="step-title">{title}</div>
                <p className="step-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── TESTIMONIALS ──────────────────────────────────────────── */}
      <section className="sec-dark">
        <div className="wrap">
          <div className="tc">
            <div className="sec-eyebrow">Client Feedback</div>
            <h2 className="sec-title">From the Operators We Have Served</h2>
          </div>

          <div className="testi-grid">
            {[
              {
                q: "I had been declined by three institutions before speaking with Capital Vault. Within 11 days, we had $185,000 placed at zero percent. The impact on the business has been significant.",
                name: "Marcus R.",
                role: "General Contractor · Atlanta, GA",
                init: "M",
              },
              {
                q: "Seven days from the initial call to funded. The zero-percent structure meant I could actually afford to grow without interest charges eroding my margin every month.",
                name: "Derek J.",
                role: "HVAC Owner · Dallas, TX",
                init: "D",
              },
              {
                q: "Our company was 18 months old and I was skeptical we would qualify for this level of capital. They identified lenders our bank had never presented to us. It changed our trajectory entirely.",
                name: "Terrence W.",
                role: "Service Business Owner · Houston, TX",
                init: "T",
              },
            ].map(({ q, name, role, init }) => (
              <div key={name} className="testi-card">
                <div className="stars">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} className="star">&#9733;</span>
                  ))}
                </div>
                <p className="testi-quote">&ldquo;{q}&rdquo;</p>
                <div className="testi-author">
                  <div className="testi-av">{init}</div>
                  <div>
                    <div className="testi-name">{name}</div>
                    <div className="testi-role">{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────── */}
      <section className="sec">
        <div className="wrap-xs">
          <div className="tc">
            <div className="sec-eyebrow">Due Diligence</div>
            <h2 className="sec-title">Frequently Asked Questions</h2>
          </div>

          <div className="faq-list">
            {FAQS.map((faq, i) => (
              <div key={i} className="faq-item">
                <div
                  className="faq-q"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{faq.q}</span>
                  <div className={`faq-icon${openFaq === i ? " open" : ""}`}>
                    <svg viewBox="0 0 14 14">
                      <line x1="7" y1="1" x2="7" y2="13" />
                      <line x1="1" y1="7" x2="13" y2="7" />
                    </svg>
                  </div>
                </div>
                <div className={`faq-a${openFaq === i ? " open" : ""}`}>{faq.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── GUARANTEE ─────────────────────────────────────────────── */}
      <section className="sec sec-alt">
        <div className="wrap">
          <div className="guarantee-box">
            <div className="g-badge">
              <div className="g-badge-top">Our</div>
              <div className="g-badge-mid">Zero<br />Risk</div>
              <div className="g-badge-bot">Commitment</div>
            </div>
            <div className="g-text">
              <h3>You Pay Nothing Until Capital Is Placed</h3>
              <p>
                No consulting fee. No application fee. No retainer of any kind. Our compensation is collected from the lender at the point of placement — and only if placement occurs. If we cannot place capital for your business, you leave the conversation having invested nothing but 30 minutes.
              </p>
              <p style={{ marginTop: 12 }}>
                That is the only commitment we ask you to make.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── BOOK YOUR CALL ────────────────────────────────────────── */}
      <section className="sec" id="book-call">
        <div className="wrap">
          <div className="tc" style={{ marginBottom: 48 }}>
            <div className="sec-eyebrow">Schedule Your Assessment</div>
            <h2 className="sec-title">Request Your Free Capital Assessment</h2>
            <p className="sec-sub" style={{ margin: "0 auto", maxWidth: 560 }}>
              Select a time below. A senior advisor will review your business profile and provide a clear, direct answer on what your business qualifies for.
            </p>
          </div>

          <div className="cal-outer">
            <div
              className="iclosed-widget"
              data-url={`${ICLOSED_ORIGIN}/e/thecapitalvault/FBVault?redirect_url=${encodeURIComponent(THANKS_URL)}`}
              title="Business Funding with The Capital Vault"
              style={{ width: "100%", height: 620 }}
            />
            <Script
              src="https://app.iclosed.io/assets/widget.js"
              strategy="lazyOnload"
            />
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────── */}
      <div className="final-cta">
        <div className="wrap tc">
          <h2>Your Business Is Producing.<br />Make the Capital Work For You.</h2>
          <p>
            One 30-minute call determines exactly what your business qualifies for. No fees. No obligation. No ambiguity.
          </p>
          <a href="#book-call" data-cta="final" className="btn btn-gold btn-gold-lg">
            Schedule My Free Assessment
          </a>
          <p className="final-note">
            No credit inquiry required &nbsp;·&nbsp; No fees unless funded
          </p>
        </div>
      </div>

      {/* ── FOOTER ────────────────────────────────────────────────── */}
      <footer className="site-footer">
        <div className="wrap footer-in">
          <a href="https://www.thecapitalvault.com/" className="footer-logo">
            <img
              src="/assets/logo.png"
              alt="The Capital Vault"
              height={44}
              style={{ width: "auto" }}
              onError={(e) => { (e.target as HTMLImageElement).src = "/assets/logo.svg"; }}
            />
          </a>
          <p className="footer-copy">&copy; 2026 The Capital Vault. All rights reserved.</p>
          <nav className="footer-links">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
          </nav>
        </div>
        <div className="wrap">
          <p className="footer-disc">
            This is an advertisement. Individual results vary and are not guaranteed. Approval is not guaranteed within any specific timeframe. Capital access is subject to lender approval, creditworthiness, and business revenue verification. The Capital Vault is a capital advisory firm and is not a direct lender — we do not make credit decisions or guarantee loan approval. Zero-percent rates refer to promotional APR periods only; standard rates apply upon expiration. Past client results are not indicative of future outcomes. This content is intended for informational purposes and does not constitute financial, legal, or tax advice.
          </p>
        </div>
      </footer>

    </div>
  );
}
