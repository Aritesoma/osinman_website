import React, { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowRight, MapPin, Mail, Phone, Ear, Users2, Wrench, Sparkles, ShieldCheck, HeartHandshake, Layers } from "lucide-react";

/* ---------------------------------------------------------
   Same design system as Home and Team — shared colors, fonts,
   buttons, and reveal-on-scroll so this feels like one site.
--------------------------------------------------------- */

function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const fallback = setTimeout(() => setVisible(true), 1200);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.unobserve(el);
            clearTimeout(fallback);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "reveal-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* Counts up from 0 to `target` once it scrolls into view — a small,
   satisfying on-scroll moment for the stats section. */
function Counter({ target, suffix = "", duration = 1600 }) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            setStarted(true);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setValue(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, target, duration]);

  return (
    <span ref={ref}>
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}

function FacebookIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-8.2h2.75l.41-3.2H13.5V7.5c0-.93.26-1.56 1.59-1.56h1.7V3.1C16.5 3.06 15.5 3 14.35 3 11.9 3 10.25 4.49 10.25 7.2v2.4H7.5v3.2h2.75V21h3.25Z" />
    </svg>
  );
}
function TwitterIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.53 3h3.16l-6.9 7.89L21.9 21h-6.35l-4.97-6.5L4.87 21H1.7l7.38-8.44L2.3 3h6.5l4.5 5.94L17.53 3Zm-1.11 16.17h1.75L7.66 4.73H5.78l10.64 14.44Z" />
    </svg>
  );
}
function InstagramIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function LinkedinIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3.5 9.5h3v11h-3v-11Zm6.5 0h2.9v1.5h.04c.4-.76 1.4-1.56 2.86-1.56 3.06 0 3.62 2.02 3.62 4.63v6.43h-3v-5.7c0-1.36-.02-3.1-1.89-3.1-1.9 0-2.19 1.48-2.19 3v5.8h-3v-11Z" />
    </svg>
  );
}

function WhatsAppIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.48-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35Z" />
      <path d="M12.02 2C6.5 2 2.03 6.42 2.03 11.9c0 1.83.5 3.53 1.35 5l-1.4 5.1 5.24-1.37a10.03 10.03 0 0 0 4.8 1.22h.01c5.52 0 9.99-4.42 9.99-9.9C22.02 6.42 17.55 2 12.02 2Zm5.9 15.75c-.62.62-1.72 1.24-2.53 1.4-.65.14-1.5.25-4.36-.94-3.65-1.5-6-5.2-6.18-5.44-.18-.24-1.48-1.97-1.48-3.76 0-1.79.94-2.66 1.28-3.03.34-.37.73-.46.98-.46h.7c.22 0 .53-.04.8.6.29.68.97 2.36 1.05 2.53.08.17.13.36.02.58-.11.22-.16.36-.32.55-.16.19-.34.42-.48.56-.16.16-.33.34-.14.66.19.32.85 1.4 1.83 2.27 1.26 1.11 2.31 1.46 2.65 1.62.34.16.54.14.74-.08.2-.22.85-.98 1.08-1.32.23-.34.46-.28.77-.17.31.11 1.97.93 2.31 1.1.34.17.56.25.64.4.08.15.08.85-.34 1.47Z" />
    </svg>
  );
}

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Events", href: "/events" },
  { label: "The Team", href: "/team" },
  { label: "Volunteer", href: "/get-involved" },
];

const VALUES = [
  {
    icon: Ear,
    title: "Community-Led",
    body: "We don't design programs in an office and hand them down. Every initiative starts with listening to the people it's meant to serve.",
  },
  {
    icon: ShieldCheck,
    title: "Radical Transparency",
    body: "Every naira is traceable to a name and a purpose. Our books are audited, and our donors see exactly where their support goes.",
  },
  {
    icon: HeartHandshake,
    title: "Dignity Over Charity",
    body: "We build partnerships, not dependency. People we work with are collaborators in their own progress, not recipients of hand-outs.",
  },
  {
    icon: Layers,
    title: "Long-Term Commitment",
    body: "We stay. A borehole without a trained caretaker, or a classroom without a follow-up plan, isn't finished work — it's abandoned work.",
  },
];

const APPROACH_STEPS = [
  {
    number: "01",
    title: "Connect",
    body: "Connect widows with assistance from volunteers, corporations, and government.",
  },
  {
    number: "02",
    title: "Care",
    body: "Restore hope to widows and orphans through advocacy and legal guidance.",
  },
  {
    number: "03",
    title: "Build",
    body: "Establish welfare centres for bereaved, elderly, and challenged individuals.",
  },
  {
    number: "04",
    title: "Sustain",
    body: "Support healthcare programs to reduce maternal and infant mortality.",
  },
];

const REGIONS = [
  { name: "Federal Capital Territory", note: "Headquarters & founding community" },
  { name: "Kaduna State", note: "Health outreach & water initiatives" },
  { name: "Niger State", note: "Women's livelihood & health programs" },
  { name: "Nasarawa State", note: "Literacy & community outreach" },
];

export default function AboutPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="osf-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700;800&display=swap');

        :root {
          --ink: #241C17;
          --ink-soft: #4A3E36;
          --cream: #FBF5EC;
          --cream-deep: #F3E9DA;
          --burnt: #C1502E;
          --burnt-dark: #9A3D22;
          --gold: #D9A15C;
          --green: #3E4E3A;
          --white: #FFFFFF;
        }

        html, body { scroll-behavior: smooth; }
        .osf-root {
          font-family: 'Inter', sans-serif;
          color: var(--ink);
          background: var(--cream);
        }
        .osf-root h1, .osf-root h2, .osf-root h3, .osf-root .font-display {
          font-family: 'Fraunces', serif;
        }

        .bg-ink { background: var(--ink); }
        .bg-cream { background: var(--cream); }
        .bg-cream-deep { background: var(--cream-deep); }
        .bg-white { background: var(--white); }
        .text-cream { color: var(--cream); }
        .text-inksoft { color: var(--ink-soft); }
        .text-gold { color: var(--gold); }

        .eyebrow {
          font-family: 'Inter', sans-serif;
          font-weight: 700;
          font-size: 0.72rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--burnt);
        }
        .eyebrow.on-dark { color: var(--gold); }

        .btn-primary {
          display: inline-flex; align-items: center; gap: 0.5rem;
          background: var(--burnt); color: var(--white);
          padding: 0.85rem 1.6rem; border-radius: 999px; font-weight: 600;
          transition: transform 0.35s cubic-bezier(.2,.8,.2,1), background 0.3s ease, box-shadow 0.35s ease;
          box-shadow: 0 8px 24px -10px rgba(193,80,46,0.55);
        }
        .btn-primary:hover { background: var(--burnt-dark); transform: translateY(-3px); box-shadow: 0 14px 28px -10px rgba(193,80,46,0.65); }

        .btn-outline {
          display: inline-flex; align-items: center; gap: 0.5rem;
          background: transparent; color: var(--cream);
          border: 1.5px solid rgba(251,245,236,0.4);
          padding: 0.85rem 1.6rem; border-radius: 999px; font-weight: 600;
          transition: all 0.35s ease;
        }
        .btn-outline:hover { border-color: var(--gold); color: var(--gold); transform: translateY(-3px); }

        .btn-outline-ink {
          display: inline-flex; align-items: center; gap: 0.5rem;
          background: transparent; color: var(--ink);
          border: 1.5px solid rgba(36,28,23,0.2);
          padding: 0.85rem 1.6rem; border-radius: 999px; font-weight: 600;
          transition: all 0.35s ease;
        }
        .btn-outline-ink:hover { border-color: var(--burnt); color: var(--burnt); background: var(--white); transform: translateY(-3px); }

        /* Nav */
        .nav-wrap { transition: background 0.4s ease, box-shadow 0.4s ease, padding 0.3s ease; }
        .nav-link {
          position: relative; color: var(--ink); font-weight: 500; font-size: 0.92rem;
          transition: color 0.25s ease;
        }
        .nav-link::after {
          content: ''; position: absolute; left: 0; right: 0; bottom: -6px; height: 2px;
          background: var(--burnt); transform: scaleX(0); transform-origin: left;
          transition: transform 0.3s ease;
        }
        .nav-link:hover { color: var(--burnt); }
        .nav-link:hover::after { transform: scaleX(1); }
        .nav-link.is-active { color: var(--burnt); }
        .nav-link.is-active::after { transform: scaleX(1); }

        .mobile-panel { transition: transform 0.45s cubic-bezier(.2,.8,.2,1), opacity 0.4s ease; }
        .mobile-backdrop { transition: opacity 0.4s ease; }

        @keyframes nav-drop-in {
          from { opacity: 0; transform: translateY(-16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .nav-enter { animation: nav-drop-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) both; }

        /* Reveal on scroll */
        .reveal {
          opacity: 0;
          transform: translateY(64px) scale(0.9);
          filter: blur(10px);
          transition:
            opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1),
            transform 1.1s cubic-bezier(0.16, 1, 0.3, 1),
            filter 1.1s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform, filter;
        }
        .reveal-visible { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }

        .reveal.reveal-pop {
          transform: translateY(72px) scale(0.85) rotate(-3deg);
          transition:
            opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1),
            transform 1.15s cubic-bezier(0.22, 1.4, 0.36, 1),
            filter 1.1s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal.reveal-pop.reveal-visible { transform: translateY(0) scale(1) rotate(0deg); }

        .reveal.reveal-image {
          transform: scale(1.18);
          filter: blur(14px);
          transition:
            opacity 1.3s cubic-bezier(0.16, 1, 0.3, 1),
            transform 1.4s cubic-bezier(0.16, 1, 0.3, 1),
            filter 1.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal.reveal-image.reveal-visible { transform: scale(1); filter: blur(0); }

        .reveal.reveal-left { transform: translateX(-70px) scale(0.94); filter: blur(8px); }
        .reveal.reveal-left.reveal-visible { transform: translateX(0) scale(1); filter: blur(0); }
        .reveal.reveal-right { transform: translateX(70px) scale(0.94); filter: blur(8px); }
        .reveal.reveal-right.reveal-visible { transform: translateX(0) scale(1); filter: blur(0); }

        /* About-page-specific cards */
        .card-value {
          background: var(--white);
          border-radius: 1.25rem;
          padding: 2rem;
          height: 100%;
          transition: transform 0.5s cubic-bezier(.2,.8,.2,1), box-shadow 0.5s cubic-bezier(.2,.8,.2,1);
          box-shadow: 0 2px 12px -6px rgba(36,28,23,0.1);
        }
        .card-value:hover { transform: translateY(-8px); box-shadow: 0 20px 36px -18px rgba(36,28,23,0.2); }
        .card-value .icon-badge {
          transition: transform 0.5s cubic-bezier(.2,.8,.2,1), background-color 0.4s ease;
        }
        .card-value:hover .icon-badge { transform: rotate(-8deg) scale(1.08); background-color: var(--gold) !important; }

        .stat-block { text-align: center; }
        .stat-number {
          font-family: 'Fraunces', serif;
          font-weight: 500;
          font-size: clamp(2.2rem, 5vw, 3.2rem);
          color: var(--gold);
        }

        .step-row {
          display: flex; gap: 1.75rem; align-items: flex-start;
          padding: 1.75rem 0;
          border-bottom: 1px solid rgba(36,28,23,0.08);
        }
        .step-row:last-child { border-bottom: none; }
        .step-number {
          font-family: 'Fraunces', serif;
          font-size: 2.2rem;
          color: var(--cream-deep);
          -webkit-text-stroke: 1.5px var(--burnt);
          line-height: 1;
          flex-shrink: 0;
          transition: color 0.4s ease, -webkit-text-stroke 0.4s ease;
        }
        .step-row:hover .step-number { color: var(--burnt); }

        .region-chip {
          background: var(--white);
          border-radius: 1rem;
          padding: 1.25rem 1.5rem;
          display: flex; align-items: center; gap: 1rem;
          transition: transform 0.4s cubic-bezier(.2,.8,.2,1), box-shadow 0.4s ease;
          box-shadow: 0 2px 10px -6px rgba(36,28,23,0.08);
        }
        .region-chip:hover { transform: translateX(6px); box-shadow: 0 12px 24px -14px rgba(36,28,23,0.18); }

        .icon-badge {
          position: relative;
          border: none;
          box-shadow: none;
        }

        .social-dot {
          width: 40px; height: 40px; border-radius: 999px;
          display: flex; align-items: center; justify-content: center;
          border: 1.5px solid rgba(251,245,236,0.25); color: var(--cream);
          transition: all 0.3s ease;
        }
        .social-dot:hover { background: var(--burnt); border-color: var(--burnt); transform: translateY(-3px); }

        @media (prefers-reduced-motion: reduce) {
          .reveal, .nav-enter, .card-value, .step-row, .region-chip { transition: none !important; animation: none !important; filter: none !important; }
          .reveal { opacity: 1 !important; transform: none !important; }
        }
      `}</style>

      {/* ---------------- NAV ---------------- */}
      <header
        className="nav-wrap nav-enter fixed top-0 left-0 right-0 z-50 bg-cream"
        style={{ boxShadow: scrolled ? "0 4px 24px -8px rgba(36,28,23,0.15)" : "none" }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <a href="/" className="flex items-center gap-2">
            <img
              src="/images/logo.avif"
              alt="OSINMAN Foundation logo"
              className="rounded-full object-cover"
              style={{ width: 40, height: 40 }}
            />
            <span className="font-display font-semibold text-lg tracking-tight">OSINMAN FOUNDATION</span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <a key={l.label} href={l.href} className={`nav-link ${l.label === "Get to Know Us" ? "is-active" : ""}`}>
                {l.label}
              </a>
            ))}
          </nav>
          <button className="md:hidden p-2 -mr-2" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
            <Menu size={26} />
          </button>
        </div>
      </header>

      {/* ---------------- MOBILE MENU ---------------- */}
      <div
        className="mobile-backdrop fixed inset-0 z-50 md:hidden"
        style={{ background: "rgba(36,28,23,0.55)", opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? "auto" : "none" }}
        onClick={closeMenu}
      />
      <div
        className="mobile-panel fixed top-0 right-0 bottom-0 z-50 md:hidden flex flex-col"
        style={{ width: "78%", maxWidth: 340, background: "var(--ink)", transform: menuOpen ? "translateX(0)" : "translateX(100%)" }}
      >
        <div className="flex items-center justify-between px-6 py-5">
          <span className="font-display text-cream text-lg font-semibold">Menu</span>
          <button aria-label="Close menu" onClick={closeMenu} className="p-2 text-cream">
            <X size={24} />
          </button>
        </div>
        <nav className="flex flex-col gap-1 px-6 mt-4">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={closeMenu}
              className="text-cream py-3 border-b"
              style={{ borderColor: "rgba(251,245,236,0.1)", fontSize: "1.05rem" }}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="px-6 mt-8">
          <a href="/get-involved" onClick={closeMenu} className="btn-primary w-full justify-center">
            Get Involved <ArrowRight size={16} />
          </a>
        </div>
      </div>

      {/* ---------------- PAGE HERO ---------------- */}
      <section className="bg-ink pt-36 pb-20 md:pt-44 md:pb-24">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal>
            <a href="/" className="text-cream inline-flex items-center gap-1 mb-6" style={{ opacity: 0.6, fontSize: "0.85rem" }}>
              ← Back to Home
            </a>
          </Reveal>
          <Reveal delay={60}>
            <p className="eyebrow on-dark mb-4">Get to Know Us</p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="text-cream font-display font-medium" style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)", lineHeight: 1.12, maxWidth: 720 }}>
              A little charity work turned into a lifelong commitment.
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="text-cream mt-5 max-w-xl" style={{ opacity: 0.75, lineHeight: 1.75 }}>
             OSI-NMAN Foundation is a humanitarian, non-profit organization founded in 2007 with a deep passion for serving the most 
             vulnerable members of society. Built on the core values of compassion, dignity, and selfless service, the foundation is 
             dedicated to improving the quality of life of underserved communities.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- WHO WE ARE ---------------- */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <Reveal className="reveal-left">
            <p className="eyebrow mb-4">Who We Are</p>
            <h2 className="font-display font-medium mb-5" style={{ fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)" }}>
              A community-first foundation, built from the ground up.
            </h2>
            <p className="text-inksoft mb-4" style={{ lineHeight: 1.75 }}>
              OSI-NMAN Foundation is a humanitarian, non-profit organization founded in 2007 with
              a deep passion for serving the most vulnerable members of society. Built on the
              core values of compassion, dignity, and selfless service, the foundation is
              dedicated to improving the quality of life of underserved communities.
            </p>
            <p className="text-inksoft mb-4" style={{ lineHeight: 1.75 }}>
              Since its inception, OSI-NMAN Foundation has remained committed to providing care, support, and advocacy for elderly widows and widowers through initiatives such as food relief, clothing distribution, shelter support, and access to essential healthcare services. 
              In addition, OSI-NMAN Foundation plays an active role in health awareness by providing information and education on cancer screening, care navigation, and emotional support. Through its community-based programs, the organization promotes dignity, peaceful coexistence, hope, and empowerment among individuals and families. 
              Driven by a vision of a more compassionate and inclusive society, OSI-NMAN Foundation continues to touch lives and create lasting impact across communities.
            </p>
            <p className="text-inksoft" style={{ lineHeight: 1.75 }}>
              We're a registered NGO governed by an independent board, staffed by people who are
              mostly from the very communities we serve, and funded by donors who share our
              insistence on transparency and measurable impact.
            </p>
          </Reveal>
          <Reveal delay={100} className="reveal-image">
            <div className="rounded-2xl overflow-hidden" style={{ boxShadow: "0 24px 50px -20px rgba(36,28,23,0.35)" }}>
              <img
                src="/images/medical.avif"
                alt="OSINMAN team members at work in the field"
                className="w-full h-full object-cover block"
                style={{ aspectRatio: "4 / 5" }}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- WHAT WE BELIEVE ---------------- */}
      <section className="bg-cream-deep py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <p className="eyebrow mb-4">What We Believe</p>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="font-display font-medium mb-14" style={{ fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)" }}>
              The principles behind every program.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 100} className="reveal-pop">
                <div className="card-value">
                  <div
                    className="icon-badge flex items-center justify-center rounded-full mb-5"
                    style={{ width: 46, height: 46, background: "var(--cream-deep)" }}
                  >
                    <v.icon size={20} color="var(--burnt)" />
                  </div>
                  <h3 className="font-display font-medium mb-2" style={{ fontSize: "1.15rem" }}>
                    {v.title}
                  </h3>
                  <p className="text-inksoft" style={{ lineHeight: 1.65, fontSize: "0.92rem" }}>
                    {v.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- IMPACT IN NUMBERS ---------------- */}
      <section className="bg-ink py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal>
            <p className="eyebrow on-dark mb-4 text-center" style={{ display: "block" }}>
              Our Impact
            </p>
          </Reveal>
          <Reveal delay={60}>
            <h2
              className="text-cream font-display font-medium mb-14 text-center"
              style={{ fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)" }}
            >
              Nineteen years, told in numbers.
            </h2>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { target: 10234, suffix: "+", label: "Lives touched" },
              { target: 46, suffix: "", label: "Communities served" },
              { target: 214, suffix: "+", label: "Active volunteers" },
              { target: 4, suffix: "", label: "States reached" },
            ].map((s, i) => (
              <Reveal key={s.label} delay={i * 90} className="reveal-pop">
                <div className="stat-block">
                  <div className="stat-number">
                    <Counter target={s.target} suffix={s.suffix} />
                  </div>
                  <p className="text-cream mt-2" style={{ opacity: 0.65, fontSize: "0.85rem" }}>
                    {s.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- HOW WE WORK ---------------- */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <p className="eyebrow mb-4">Our Objectives</p>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="font-display font-medium mb-12" style={{ fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)" }}>
              The same four steps, every time.
            </h2>
          </Reveal>

          <div>
            {APPROACH_STEPS.map((s, i) => (
              <Reveal key={s.number} delay={i * 80}>
                <div className="step-row">
                  <span className="step-number">{s.number}</span>
                  <div>
                    <h3 className="font-display font-medium mb-1.5" style={{ fontSize: "1.2rem" }}>
                      {s.title}
                    </h3>
                    <p className="text-inksoft" style={{ lineHeight: 1.65 }}>
                      {s.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- WHERE WE WORK ---------------- */}
      <section className="bg-cream py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <p className="eyebrow mb-4">Where We Work</p>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="font-display font-medium mb-10" style={{ fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)" }}>
              Four states, one growing map.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {REGIONS.map((r, i) => (
              <Reveal key={r.name} delay={i * 90}>
                <div className="region-chip">
                  <MapPin size={20} color="var(--burnt)" className="shrink-0" />
                  <div>
                    <p className="font-semibold" style={{ fontSize: "0.95rem" }}>{r.name}</p>
                    <p className="text-inksoft" style={{ fontSize: "0.82rem", opacity: 0.75 }}>{r.note}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- CLOSING CTA ---------------- */}
      <section className="bg-ink py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Reveal>
            <p className="eyebrow on-dark mb-4">Be Part of the Story</p>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="text-cream font-display font-medium mb-5" style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)" }}>
              The next chapter is still being written.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-cream mb-8" style={{ opacity: 0.72, lineHeight: 1.7 }}>
              Whether through volunteering, a donation, or simply spreading the word — there's a
              place for you in what we're building.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="/get-involved" className="btn-primary">
                Get in Touch <ArrowRight size={16} />
              </a>
              <a href="/team" className="btn-outline">
                Meet the Team
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="bg-ink border-t" style={{ borderColor: "rgba(251,245,236,0.08)" }}>
        <div className="max-w-6xl mx-auto px-6 pt-16 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-14">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img
              src="/images/logo.avif"
              alt="OSINMAN Foundation logo"
              className="rounded-full object-cover"
              style={{ width: 36, height: 36 }}
            />
                <span className="font-display text-cream font-semibold">OSINMAN</span>
              </div>
              <p className="text-cream" style={{ opacity: 0.55, lineHeight: 1.7, fontSize: "0.9rem" }}>
                Growing communities across Nigeria, one program at a time, since 2007.
              </p>
            </div>

            <div>
              <p className="eyebrow on-dark mb-4">Contact</p>
              <div className="flex flex-col gap-3 text-cream" style={{ opacity: 0.75, fontSize: "0.92rem" }}>
                <span className="flex items-start gap-2">
                  <MapPin size={16} className="mt-0.5 shrink-0" color="var(--gold)" />
                  House 9, Ikogosi Warm Springs, Brookshore Residents (Hall7), Karsana, F.C.T Abuja
                </span>
                <a href="mailto:osinmanfoundation@gmail.com" className="flex items-center gap-2 hover:text-gold transition-colors">
                  <Mail size={16} color="var(--gold)" /> osinmanfoundation@gmail.com
                </a>
                <a href="tel:+2348037051210" className="flex items-center gap-2 hover:text-gold transition-colors">
                  <Phone size={16} color="var(--gold)" /> +234 803 705 1210
                </a>
              </div>
            </div>

            <div>
              <p className="eyebrow on-dark mb-4">Explore</p>
              <div className="flex flex-col gap-3 text-cream" style={{ opacity: 0.75, fontSize: "0.92rem" }}>
                {NAV_LINKS.map((l) => (
                  <a key={l.label} href={l.href} className="hover:text-gold transition-colors w-fit">
                    {l.label}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="eyebrow on-dark mb-4">Follow Along</p>
              <div className="flex gap-3">
                <a href="https://web.facebook.com/osinmanfoundation/?_rdc=1&_rdr#" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="social-dot"><FacebookIcon size={17} /></a>
                <a href="https://wa.me/2348037051210" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="social-dot"><WhatsAppIcon size={17} /></a>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-8 border-t" style={{ borderColor: "rgba(251,245,236,0.08)" }}>
            <p className="text-cream" style={{ opacity: 0.45, fontSize: "0.82rem" }}>
              © {new Date().getFullYear()} Osinman Foundation. All rights reserved.
            </p>
            <p className="text-cream" style={{ opacity: 0.45, fontSize: "0.82rem" }}>
              Registered NGO · Abuja, Nigeria
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
