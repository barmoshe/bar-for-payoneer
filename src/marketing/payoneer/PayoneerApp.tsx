'use client';

import { useEffect, useRef } from 'react';
import './marketing-base.css';
import './payoneer.css';

/**
 * PayoneerApp — Bar Moshe's generic application page to Payoneer. No specific
 * role or posting: the page addresses the company.
 *
 * Payoneer's REAL visual language, read live off payoneer.com (2026-07-06):
 *
 *   - A clean WHITE, airy, colorful global-fintech surface whose whole
 *     identity is the rainbow ring (the multicolor "O" of the logo).
 *   - A centered hero headline sitting inside a large rainbow gradient arc
 *     (green to blue to purple to magenta), an original inline SVG orbit with
 *     small floating colored orbs riding on it. A purple-gradient pill CTA.
 *   - A 3-up feature card row under an "All you need to ship" heading, one
 *     card carrying a small blue COMING SOON pill for an in-progress build.
 *   - A deep-indigo band, repurposed from Payoneer's "MEET PAYONEER" video
 *     band into a "Meet Bar" band: indigo background, white text, and the
 *     rounded-square rainbow-ring logo tile on a soft pastel field beside it
 *     (a decorative play-button circle, no real video).
 *   - A work grid of ten shipped builds, each with a live link.
 *   - A close/contact section: four rounded tiles with rainbow/violet accents.
 *   - A plain footer with a lowercase wordmark and a disclaimer.
 *
 * Every shape below is drawn fresh as original SVG/CSS; no Payoneer assets are
 * used anywhere. Copy is Bar's plain first-person register. All motion is
 * gated on prefers-reduced-motion; the page is fully legible with no JS.
 */

const EMAIL = 'mailto:1barmoshe1@gmail.com?subject=bar-for-payoneer';
const CV = '/Bar_Moshe_CV_Payoneer.pdf';
const LINKEDIN = 'https://www.linkedin.com/in/barmoshe/';
const GITHUB = 'https://github.com/barmoshe';
const WHATSAPP = 'https://wa.me/972546561465';

/* ── The trio: why hire Bar, as Payoneer-style feature cards. ───────────── */
const TRIO: {
  eyebrow: string;
  h: string;
  p: string;
  glyph: 'stack' | 'ai' | 'ship';
  soon?: boolean;
}[] = [
  {
    eyebrow: 'Full stack',
    h: 'Full stack, end to end',
    p: 'TypeScript, React, Next.js, and Node, with the cloud around them: AWS, Docker, Kubernetes, CI/CD. I build the whole path, front to infra.',
    glyph: 'stack',
  },
  {
    eyebrow: 'AI-native',
    h: 'AI-native by default',
    p: 'Agents, plugins, and pipelines are how I work every day, not a bolt-on. Several of the builds below are AI tooling I shipped.',
    glyph: 'ai',
  },
  {
    eyebrow: 'In progress',
    h: 'Production, and still building',
    p: 'At Joomsy I am the primary full-stack and DevOps engineer on a team of five. On the side I am wiring a payments-flow demo, close to live.',
    glyph: 'ship',
    soon: true,
  },
];

/* ── The work grid: the standard roster, reused verbatim. ───────────────── */
type Glyph =
  | 'deck'
  | 'flow'
  | 'logic'
  | 'harness'
  | 'home'
  | 'plane'
  | 'flower'
  | 'wave'
  | 'silk'
  | 'film';

const REPORTS: { name: string; tag: string; href: string; glyph: Glyph }[] = [
  {
    name: 'MDP',
    tag: 'Compiler · AI tooling',
    href: 'https://barmoshe.github.io/mdp/',
    glyph: 'deck',
  },
  {
    name: 'Temporal Data Service',
    tag: 'Durable workflows',
    href: 'https://temporal.io/code-exchange/cross-language-data-processing-service-with-temporal',
    glyph: 'flow',
  },
  {
    name: 'Entailer',
    tag: 'AI + formal logic',
    href: 'https://barmoshe.github.io/entailer/',
    glyph: 'logic',
  },
  {
    name: 'Creative Harness',
    tag: 'AI agents · Systems',
    href: 'https://github.com/barmoshe/claude-creative-stack',
    glyph: 'harness',
  },
  {
    name: 'Catalogue Orchestrator',
    tag: 'AI video · Orchestration',
    href: 'https://barmoshe.github.io/catalogue-orchestrator/',
    glyph: 'film',
  },
  {
    name: 'Apartment Hunter',
    tag: 'Product · Web app',
    href: 'https://apartment-hunter-one.vercel.app',
    glyph: 'home',
  },
  {
    name: 'Trip Planner',
    tag: 'Product · Web app',
    href: 'https://trip-planner-six-iota.vercel.app',
    glyph: 'plane',
  },
  {
    name: 'Bloom Garden',
    tag: 'Computer vision · Game',
    href: 'https://bloom-garden-five.vercel.app',
    glyph: 'flower',
  },
  {
    name: 'Biome Synth',
    tag: 'Generative · Audio',
    href: 'https://biome-synth.lovable.app',
    glyph: 'wave',
  },
  {
    name: 'Aurora',
    tag: 'WebGL · Graphics',
    href: 'https://aurora-eight-iota.vercel.app',
    glyph: 'silk',
  },
];

/* ── Scroll reveal: adds .is-in when a [data-reveal] enters the viewport. */
function useReveal(rootRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = Array.from(root.querySelectorAll('[data-reveal]'));
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.18 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [rootRef]);
}

/* ── The signature rainbow orbit: an original SVG ring with floating orbs. */
function RainbowOrbit() {
  return (
    <div className="pay-orbit" aria-hidden="true">
      <svg viewBox="0 0 560 560" className="pay-orbit-svg">
        <defs>
          <linearGradient id="pay-ring" x1="0%" y1="20%" x2="100%" y2="80%">
            <stop offset="0%" stopColor="#3fd07f" />
            <stop offset="34%" stopColor="#1f9bde" />
            <stop offset="68%" stopColor="#7b3fe4" />
            <stop offset="100%" stopColor="#e0409b" />
          </linearGradient>
        </defs>
        {/* the big orbit ring, echoing the logo "O" */}
        <circle
          cx="280"
          cy="280"
          r="230"
          fill="none"
          stroke="url(#pay-ring)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray="1080 360"
          transform="rotate(-30 280 280)"
        />
        {/* a lighter inner sweep for depth */}
        <circle
          cx="280"
          cy="280"
          r="196"
          fill="none"
          stroke="url(#pay-ring)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeOpacity="0.35"
          strokeDasharray="300 940"
          transform="rotate(120 280 280)"
        />
      </svg>
      {/* small colored orbs riding on the ring */}
      <span className="pay-orb pay-orb-1" />
      <span className="pay-orb pay-orb-2" />
      <span className="pay-orb pay-orb-3" />
      <span className="pay-orb pay-orb-4" />
    </div>
  );
}

/* ── The rounded-square rainbow-ring logo tile (the "meet Bar" motif). ──── */
function RingTile() {
  return (
    <div className="pay-ringtile" aria-hidden="true">
      <div className="pay-ringtile-square">
        <svg viewBox="0 0 120 120">
          <defs>
            <linearGradient id="pay-tile-ring" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3fd07f" />
              <stop offset="34%" stopColor="#1f9bde" />
              <stop offset="68%" stopColor="#7b3fe4" />
              <stop offset="100%" stopColor="#e0409b" />
            </linearGradient>
          </defs>
          <circle
            cx="60"
            cy="60"
            r="38"
            fill="none"
            stroke="url(#pay-tile-ring)"
            strokeWidth="14"
          />
        </svg>
      </div>
      {/* decorative play-button circle, no real video */}
      <span className="pay-play">
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <circle cx="24" cy="24" r="23" fill="#ffffff" />
          <path d="M19 15l14 9-14 9z" fill="#3D2E7C" />
        </svg>
      </span>
    </div>
  );
}

/* ── Feature-card glyphs for the trio. ──────────────────────────────────── */
function TrioGlyph({ g }: { g: 'stack' | 'ai' | 'ship' }) {
  const s = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2.4,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  } as const;
  switch (g) {
    case 'stack':
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path d="M16 5 28 11 16 17 4 11 16 5Z" {...s} />
          <path d="M4 16l12 6 12-6M4 21l12 6 12-6" {...s} />
        </svg>
      );
    case 'ai':
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <rect x="9" y="9" width="14" height="14" rx="4" {...s} />
          <path d="M16 4v5M16 23v5M4 16h5M23 16h5" {...s} />
          <circle cx="13" cy="14" r="1.4" fill="currentColor" stroke="none" />
          <circle cx="19" cy="14" r="1.4" fill="currentColor" stroke="none" />
          <path d="M13 19h6" {...s} />
        </svg>
      );
    case 'ship':
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path d="M16 4c4 3 6 7 6 12 0 3-1 5-2 7h-8c-1-2-2-4-2-7 0-5 2-9 6-12Z" {...s} />
          <circle cx="16" cy="13" r="2.4" {...s} />
          <path d="M11 24l-3 4M21 24l3 4" {...s} />
        </svg>
      );
  }
}

/* ── Line glyphs for the work grid links. ───────────────────────────────── */
function ReportGlyph({ g }: { g: Glyph }) {
  const s = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2.4,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  } as const;
  switch (g) {
    case 'deck':
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <rect x="5" y="7" width="22" height="15" rx="2.5" {...s} />
          <path d="M11 27h10M13 13h10M13 17h6" {...s} />
        </svg>
      );
    case 'flow':
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <circle cx="8" cy="8" r="4" {...s} />
          <circle cx="24" cy="16" r="4" {...s} />
          <circle cx="8" cy="24" r="4" {...s} />
          <path d="M12 9.5 20 14M12 22.5 20 18" {...s} />
        </svg>
      );
    case 'logic':
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path d="M6 10h8l4 6-4 6H6M18 16h8" {...s} />
          <path d="M23 12l4 4-4 4" {...s} />
        </svg>
      );
    case 'harness':
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <rect x="10" y="10" width="12" height="12" rx="3" {...s} />
          <path d="M16 4v6M16 22v6M4 16h6M22 16h6" {...s} />
        </svg>
      );
    case 'film':
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <rect x="5" y="8" width="22" height="16" rx="3" {...s} />
          <path d="M5 13h22M10 8v16M22 8v16" {...s} />
        </svg>
      );
    case 'home':
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path d="M6 15 16 6l10 9M9 13v12h14V13" {...s} />
          <path d="M13 25v-7h6v7" {...s} />
        </svg>
      );
    case 'plane':
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path d="M4 18 28 8l-7 18-5-7-8 4 5-6Z" {...s} />
        </svg>
      );
    case 'flower':
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <circle cx="16" cy="13" r="3.5" {...s} />
          <path d="M16 5v4M16 17v10M9 10l4 2M23 10l-4 2M10 26c2-4 4-5 6-5s4 1 6 5" {...s} />
        </svg>
      );
    case 'wave':
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path d="M4 16c3-7 6-7 8 0s5 7 8 0 5-7 8 0" {...s} />
        </svg>
      );
    case 'silk':
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path d="M5 22c6-3 8-9 6-14 7 1 11 6 11 12M9 27c8-1 14-6 16-13" {...s} />
        </svg>
      );
  }
}

/* ── Small rainbow-ring glyph for the nav wordmark. ─────────────────────── */
function RingGlyph() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="pay-nav-ring" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3fd07f" />
          <stop offset="34%" stopColor="#1f9bde" />
          <stop offset="68%" stopColor="#7b3fe4" />
          <stop offset="100%" stopColor="#e0409b" />
        </linearGradient>
      </defs>
      <circle cx="16" cy="16" r="10" fill="none" stroke="url(#pay-nav-ring)" strokeWidth="5" />
    </svg>
  );
}

/* ── Line icons for the 4-up contact tiles. ─────────────────────────────── */
function MailIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <rect x="5" y="8" width="22" height="16" rx="2.5" fill="none" stroke="currentColor" strokeWidth="2.2" />
      <path d="m6 10 10 8 10-8" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <path
        d="M16 6c7 0 12 4.6 12 10.3S23 26.6 16 26.6c-1.4 0-2.7-.15-3.9-.45L6 28l1.6-5.4C6 20.7 4 18.7 4 16.3 4 10.6 9 6 16 6Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DocIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <path d="M9 4h10l5 5v19H9z" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M19 4v5h5M13 16h8M13 20h8M13 12h4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <path
        d="M12 10 5 16l7 6M20 10l7 6-7 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════ */

export default function PayoneerApp() {
  const rootRef = useRef<HTMLDivElement>(null);
  useReveal(rootRef);

  return (
    <div className="mp-root pay-root" ref={rootRef}>
      <a className="skip-link" href="#pay-main">
        Skip to content
      </a>

      {/* ── Nav ─────────────────────────────────────────────────────────── */}
      <header className="pay-nav">
        <div className="pay-nav-inner">
          <a className="pay-mark" href="#pay-main" aria-label="bar for payoneer, back to top">
            <span className="pay-mark-glyph" aria-hidden="true">
              <RingGlyph />
            </span>
            <span className="pay-wordmark">bar for payoneer</span>
          </a>
          <nav className="pay-nav-links" aria-label="Page sections">
            <a href="#pay-why">Why me</a>
            <a href="#pay-work">The work</a>
            <a href="#pay-contact">Contact</a>
          </nav>
          <div className="pay-nav-cta">
            <a className="pay-pill pay-pill-violet" href={EMAIL}>
              Say hi
            </a>
          </div>
        </div>
      </header>

      <main id="pay-main">
        {/* ── Hero: centered headline inside the rainbow orbit. ─────────── */}
        <section className="pay-hero" aria-labelledby="pay-hero-h">
          <RainbowOrbit />
          <div className="pay-hero-inner">
            <span className="pay-hero-eyebrow">Application · Payoneer</span>
            <h1 id="pay-hero-h">
              A working site for Payoneer, instead of a CV.
            </h1>
            <p>
              I&apos;m Bar Moshe, a full-stack and AI builder. This whole page is
              the application: real products with live links, built in
              Payoneer&apos;s own visual language.
            </p>
            <div className="pay-hero-cta">
              <a className="pay-pill pay-pill-grad pay-pill-lg" href="#pay-work">
                See the work <span aria-hidden="true">→</span>
              </a>
              <a className="pay-link" href={CV} target="_blank" rel="noreferrer">
                Download CV <span aria-hidden="true">›</span>
              </a>
            </div>
          </div>
        </section>

        {/* ── 3-up feature cards: why hire Bar. ─────────────────────────── */}
        <section className="pay-features" id="pay-why" aria-labelledby="pay-why-h">
          <div className="pay-features-head" data-reveal>
            <span className="pay-eyebrow">Why me</span>
            <h2 id="pay-why-h">All you need to ship, in one builder</h2>
            <p className="pay-sub">
              The same range Payoneer runs on: product, platform, and the
              judgment to move from idea to live.
            </p>
          </div>
          <div className="pay-cards">
            {TRIO.map((t, i) => (
              <article
                className="pay-card"
                key={t.h}
                data-reveal
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <span className="pay-card-icon">
                  <TrioGlyph g={t.glyph} />
                </span>
                <span className="pay-card-eyebrow">
                  {t.eyebrow}
                  {t.soon ? <span className="pay-soon">Coming soon</span> : null}
                </span>
                <h3>{t.h}</h3>
                <p>{t.p}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ── Meet Bar: deep-indigo band with the rainbow-ring tile. ────── */}
        <section className="pay-meet" aria-labelledby="pay-meet-h">
          <div className="pay-meet-inner">
            <div className="pay-meet-copy" data-reveal>
              <span className="pay-meet-eyebrow">Meet Bar</span>
              <h2 id="pay-meet-h">One builder, the whole path from repo to live.</h2>
              <p>
                I break my own bottlenecks so ideas move faster, from a blank
                repo to something running. Global payments are a systems
                problem, and systems are what I like to build. That is the
                whole pitch to Payoneer.
              </p>
              <a className="pay-pill pay-pill-grad" href="#pay-work">
                See the proof <span aria-hidden="true">→</span>
              </a>
            </div>
            <div className="pay-meet-media" data-reveal>
              <RingTile />
            </div>
          </div>
        </section>

        {/* ── Work grid: ten shipped builds. ────────────────────────────── */}
        <section className="pay-work" id="pay-work" aria-labelledby="pay-work-h">
          <div className="pay-work-head" data-reveal>
            <span className="pay-eyebrow">Shipped work</span>
            <h2 id="pay-work-h">Ten builds, all live</h2>
            <p className="pay-sub">
              Every project below is real and shipped. Open one; it runs.
            </p>
          </div>
          <div className="pay-work-grid">
            {REPORTS.map((r, i) => (
              <article
                className="pay-work-card"
                key={r.name}
                data-reveal
                style={{ transitionDelay: `${(i % 3) * 0.07}s` }}
              >
                <span className="pay-work-glyph">
                  <ReportGlyph g={r.glyph} />
                </span>
                <span className="pay-work-tag">{r.tag}</span>
                <h3>{r.name}</h3>
                <a className="pay-link" href={r.href} target="_blank" rel="noreferrer">
                  See it live <span aria-hidden="true">›</span>
                </a>
              </article>
            ))}
          </div>
          <p className="pay-work-note" data-reveal>
            Day job: Joomsy, where I am the primary full stack and DevOps
            engineer on a team of five. Their code stays theirs, so it is named
            here, not linked.
          </p>
        </section>

        {/* ── Close: 4-up rounded tiles. ────────────────────────────────── */}
        <section className="pay-close" id="pay-contact" aria-labelledby="pay-close-h">
          <div className="pay-close-head" data-reveal>
            <h2 id="pay-close-h">Let&apos;s build something for Payoneer.</h2>
            <p>Four ways to reach me, no forms.</p>
          </div>
          <div className="pay-tiles">
            <a className="pay-tile" href={EMAIL} data-reveal>
              <span className="pay-tile-icon">
                <MailIcon />
              </span>
              <span className="pay-tile-label">
                Email <span aria-hidden="true">›</span>
              </span>
            </a>
            <a className="pay-tile" href={WHATSAPP} target="_blank" rel="noreferrer" data-reveal style={{ transitionDelay: '0.06s' }}>
              <span className="pay-tile-icon">
                <ChatIcon />
              </span>
              <span className="pay-tile-label">
                WhatsApp <span aria-hidden="true">›</span>
              </span>
            </a>
            <a className="pay-tile" href={CV} target="_blank" rel="noreferrer" data-reveal style={{ transitionDelay: '0.12s' }}>
              <span className="pay-tile-icon">
                <DocIcon />
              </span>
              <span className="pay-tile-label">
                CV download <span aria-hidden="true">›</span>
              </span>
            </a>
            <a className="pay-tile" href={GITHUB} target="_blank" rel="noreferrer" data-reveal style={{ transitionDelay: '0.18s' }}>
              <span className="pay-tile-icon">
                <CodeIcon />
              </span>
              <span className="pay-tile-label">
                GitHub <span aria-hidden="true">›</span>
              </span>
            </a>
          </div>
        </section>
      </main>

      {/* ── Footer. ────────────────────────────────────────────────────── */}
      <footer className="pay-footer">
        <div className="pay-footer-top">
          <span className="pay-footer-mark">
            <span className="pay-footer-glyph" aria-hidden="true">
              <RingGlyph />
            </span>
            bar for payoneer
          </span>
          <div className="pay-footer-cols">
            <nav aria-label="Work links">
              <span className="pay-footer-col-title">Work</span>
              <a href="#pay-work">The work</a>
              <a href={GITHUB} target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a href={LINKEDIN} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </nav>
            <nav aria-label="Contact links">
              <span className="pay-footer-col-title">Contact</span>
              <a href={EMAIL}>Email</a>
              <a href={WHATSAPP} target="_blank" rel="noreferrer">
                WhatsApp
              </a>
              <a href={CV} target="_blank" rel="noreferrer">
                CV
              </a>
            </nav>
            <nav aria-label="Page sections">
              <span className="pay-footer-col-title">Page</span>
              <a href="#pay-main">Top</a>
              <a href="#pay-why">Why me</a>
              <a href="#pay-contact">Contact</a>
            </nav>
          </div>
        </div>
        <p>
          Bar Moshe © 2026. An application page, not an official Payoneer page;
          Payoneer and its brand belong to Payoneer. Every drawing here is
          original.
        </p>
      </footer>
    </div>
  );
}
