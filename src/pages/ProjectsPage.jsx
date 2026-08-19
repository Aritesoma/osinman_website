import React, { useEffect, useRef, useState } from "react";
import {
  Menu,
  X,
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Mail,
  Phone,
  Droplets,
  BookOpen,
  HeartPulse,
  Handshake,
  CheckCircle2,
} from "lucide-react";

/* Same design system as the rest of the site. */

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

const NAV_LINKS = [
  { label: "Get to Know Us", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Events", href: "/events" },
  { label: "The Team", href: "/team" },
];

// Served from the /public folder. Update these paths to match your own
// files (e.g. public/images/projects/food-relief.jpg).
const ONGOING_PROJECTS = [
  {
    icon: Droplets,
    title: "Food Relief Initiative",
    body: "Supplying lacking communities with food and basic necessities to help them through difficult times.",
    tag: "Food",
    photo: "/images/food.avif",
    since: "2018",
    location: "Plateau & Niger States",
  },
  {
    icon: Handshake,
    title: "Youths in Trade",
    body: "Empowering youths with high-value skills to make a positive contribution to society.",
    tag: "Skills Training",
    photo: "/images/skill.avif",
    since: "2019",
    location: "Osinman Skills Center, Plateau State",
  },
  {
    icon: HeartPulse,
    title: "Community Health Outreach",
    body: "Mobile clinics bringing free basic healthcare, screenings, and health education to hard-to-reach villages.",
    tag: "Health",
    photo: "/images/health.avif",
    since: "2016",
    location: "Kaduna & Nasarawa States",
  },
  {
    icon: BookOpen,
    title: "Bright Futures Literacy",
    body: "Providing scholarships to outstanding students in the local environment.",
    tag: "Education",
    photo: "/images/sch.avif",
    since: "2007",
    location: "Plateau State",
  },
];

const COMPLETED_PROJECTS = [
  {
    year: "2019",
    title: "Osinman Skills Center Construction",
    body: "Built the foundation's first permanent training facility, giving the vocational program a real home after five years of borrowed spaces.",
    location: "Plateau State",
  },
  {
    year: "2020",
    title: "Community Borehole Project — Phase 1",
    body: "Delivered clean, reliable water access to five rural communities that previously relied on hours-long walks to the nearest source.",
    location: "Kaduna State",
  },
  {
    year: "2020–2021",
    title: "COVID-19 Community Response",
    body: "Distributed PPE and hygiene kits, ran public health education campaigns, and provided emergency food support through the height of the pandemic.",
    location: "Abuja, FCT & Plateau State",
  },
  {
    year: "2022",
    title: "Emergency Flood Relief Response",
    body: "Coordinated emergency shelter, food, and medical support for families displaced by seasonal flooding.",
    location: "Niger State",
  },
];

export default function ProjectsPage() {
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
        .osf-root { font-family: 'Inter', sans-serif; color: var(--ink); background: var(--cream); }
        .osf-root h1, .osf-root h2, .osf-root h3, .osf-root .font-display { font-family: 'Fraunces', serif; }

        .bg-ink { background: var(--ink); }
        .bg-cream { background: var(--cream); }
        .bg-cream-deep { background: var(--cream-deep); }
        .bg-white { background: var(--white); }
        .text-cream { color: var(--cream); }
        .text-inksoft { color: var(--ink-soft); }
        .text-gold { color: var(--gold); }

        .eyebrow {
          font-family: 'Inter', sans-serif; font-weight: 700; font-size: 0.72rem;
          letter-spacing: 0.18em; text-transform: uppercase; color: var(--burnt);
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

        .btn-ghost-ink {
          display: inline-flex; align-items: center; gap: 0.4rem;
          color: var(--burnt); font-weight: 600;
          transition: gap 0.3s ease, color 0.3s ease;
        }
        .btn-ghost-ink:hover { gap: 0.7rem; color: var(--burnt-dark); }

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

        .card-project {
          background: var(--white);
          border-radius: 1.25rem;
          overflow: hidden;
          transition: transform 0.5s cubic-bezier(.2,.8,.2,1), box-shadow 0.5s cubic-bezier(.2,.8,.2,1);
          box-shadow: 0 2px 12px -6px rgba(36,28,23,0.12);
        }
        .card-project:hover { transform: translateY(-8px); box-shadow: 0 20px 36px -16px rgba(36,28,23,0.22); }

        .project-photo-wrap { overflow: hidden; position: relative; aspect-ratio: 16 / 10; }
        .project-photo {
          width: 100%; height: 100%; object-fit: cover; display: block;
          filter: grayscale(15%);
          transform: scale(1);
          transition: transform 0.8s cubic-bezier(.2,.8,.2,1), filter 0.6s ease;
        }
        .card-project:hover .project-photo { transform: scale(1.08); filter: grayscale(0%); }

        .status-chip {
          display: inline-flex; align-items: center; gap: 0.4rem;
          padding: 0.3rem 0.75rem;
          border-radius: 999px;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
        .status-chip.ongoing { background: rgba(193,80,46,0.12); color: var(--burnt); }
        .status-chip.completed { background: rgba(62,77,58,0.12); color: var(--green); }

        .icon-badge {
          position: relative;
          margin-top: -22px;
          border: 3px solid var(--white);
          box-shadow: 0 6px 16px -6px rgba(36,28,23,0.3);
          transition: transform 0.5s cubic-bezier(.2,.8,.2,1), background-color 0.4s ease;
        }
        .card-project:hover .icon-badge { transform: rotate(-8deg) scale(1.08); background-color: var(--gold) !important; }

        .completed-row {
          display: flex; gap: 1.5rem; align-items: flex-start;
          padding: 1.75rem 0;
          border-bottom: 1px solid rgba(36,28,23,0.08);
          transition: transform 0.4s ease;
        }
        .completed-row:last-child { border-bottom: none; }
        .completed-row:hover { transform: translateX(6px); }
        .completed-year {
          font-family: 'Fraunces', serif;
          font-size: 1.1rem;
          color: var(--burnt);
          flex-shrink: 0;
          width: 90px;
        }

        .social-dot {
          width: 40px; height: 40px; border-radius: 999px;
          display: flex; align-items: center; justify-content: center;
          border: 1.5px solid rgba(251,245,236,0.25); color: var(--cream);
          transition: all 0.3s ease;
        }
        .social-dot:hover { background: var(--burnt); border-color: var(--burnt); transform: translateY(-3px); }

        @media (prefers-reduced-motion: reduce) {
          .reveal, .nav-enter, .card-project, .completed-row { transition: none !important; animation: none !important; filter: none !important; }
          .reveal { opacity: 1 !important; transform: none !important; }
        }
      `}</style>

      {/* ---------------- NAV ---------------- */}
      <header
        className={`nav-wrap nav-enter fixed top-0 left-0 right-0 z-50 ${scrolled ? "bg-cream shadow-md" : "bg-cream"}`}
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
            <span className="font-display font-semibold text-lg tracking-tight">OSINMAN</span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <a key={l.label} href={l.href} className={`nav-link ${l.label === "Projects" ? "is-active" : ""}`}>
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
            <a key={l.label} href={l.href} onClick={closeMenu} className="text-cream py-3 border-b" style={{ borderColor: "rgba(251,245,236,0.1)", fontSize: "1.05rem" }}>
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
      <section className="bg-ink pt-36 pb-16 md:pt-44 md:pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <a href="/" className="text-cream inline-flex items-center gap-1 mb-6" style={{ opacity: 0.6, fontSize: "0.85rem" }}>
              ← Back to Home
            </a>
          </Reveal>
          <Reveal delay={60}>
            <p className="eyebrow on-dark mb-4">Our Projects</p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="text-cream font-display font-medium" style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", lineHeight: 1.12 }}>
              What we're building, and what we've already built.
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="text-cream mt-5 max-w-lg" style={{ opacity: 0.75, lineHeight: 1.75 }}>
              From food relief to skills training, every OSINMAN project starts with a real need
              in a real community — and stays until it's genuinely met.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- ONGOING PROJECTS ---------------- */}
      <section className="bg-cream py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <p className="eyebrow mb-4">Right Now</p>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="font-display font-medium mb-12" style={{ fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)" }}>
              Ongoing Projects
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {ONGOING_PROJECTS.map((p, i) => (
              <Reveal key={p.title} delay={i * 100} className="reveal-pop">
                <div className="card-project h-full flex flex-col">
                  <div className="project-photo-wrap">
                    <img src={p.photo} alt={p.title} className="project-photo" />
                  </div>
                  <div className="p-6 pt-0 flex flex-col flex-1">
                    <div
                      className="icon-badge flex items-center justify-center rounded-full mb-4"
                      style={{ width: 46, height: 46, background: "var(--cream-deep)" }}
                    >
                      <p.icon size={19} color="var(--burnt)" />
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="status-chip ongoing">Ongoing since {p.since}</span>
                    </div>
                    <p className="eyebrow mb-1.5" style={{ letterSpacing: "0.12em" }}>
                      {p.tag}
                    </p>
                    <h3 className="font-display font-medium mb-2" style={{ fontSize: "1.2rem" }}>
                      {p.title}
                    </h3>
                    <p className="text-inksoft flex-1" style={{ lineHeight: 1.6, fontSize: "0.92rem" }}>
                      {p.body}
                    </p>
                    <p className="text-inksoft mt-3 flex items-center gap-1.5" style={{ fontSize: "0.8rem", opacity: 0.7 }}>
                      <MapPin size={13} /> {p.location}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- COMPLETED PROJECTS ---------------- */}
      <section className="bg-cream-deep py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <p className="eyebrow mb-4">Looking Back</p>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="font-display font-medium mb-4" style={{ fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)" }}>
              Completed Projects
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-inksoft mb-10" style={{ lineHeight: 1.7, maxWidth: 560 }}>
              A finished project isn't one we walked away from — it's one that's still standing,
              still being used, years later.
            </p>
          </Reveal>

          <div>
            {COMPLETED_PROJECTS.map((p, i) => (
              <Reveal key={p.title} delay={i * 80}>
                <div className="completed-row">
                  <span className="completed-year">{p.year}</span>
                  <div>
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className="status-chip completed">
                        <CheckCircle2 size={11} /> Completed
                      </span>
                    </div>
                    <h3 className="font-display font-medium mb-1.5" style={{ fontSize: "1.1rem" }}>
                      {p.title}
                    </h3>
                    <p className="text-inksoft" style={{ lineHeight: 1.65, fontSize: "0.92rem" }}>
                      {p.body}
                    </p>
                    <p className="text-inksoft mt-2 flex items-center gap-1.5" style={{ fontSize: "0.8rem", opacity: 0.7 }}>
                      <MapPin size={13} /> {p.location}
                    </p>
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
            <p className="eyebrow on-dark mb-4">Want to Help?</p>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="text-cream font-display font-medium mb-5" style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)" }}>
              Every project needs hands, not just funding.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-cream mb-8" style={{ opacity: 0.72, lineHeight: 1.7 }}>
              Volunteer your time, donate to a specific initiative, or partner with us on the
              next one.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <a href="/get-involved" className="btn-primary">
              Get Involved <ArrowRight size={16} />
            </a>
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
                Growing communities across Nigeria, one program at a time, since 2014.
              </p>
            </div>

            <div>
              <p className="eyebrow on-dark mb-4">Contact</p>
              <div className="flex flex-col gap-3 text-cream" style={{ opacity: 0.75, fontSize: "0.92rem" }}>
                <span className="flex items-start gap-2">
                  <MapPin size={16} className="mt-0.5 shrink-0" color="var(--gold)" />
                  12 Ripple Street, Wuse II, Abuja, FCT, Nigeria
                </span>
                <a href="mailto:hello@osinmanfoundation.org" className="flex items-center gap-2 hover:text-gold transition-colors">
                  <Mail size={16} color="var(--gold)" /> hello@osinmanfoundation.org
                </a>
                <a href="tel:+2348000000000" className="flex items-center gap-2 hover:text-gold transition-colors">
                  <Phone size={16} color="var(--gold)" /> +234 800 000 0000
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
                <a href="#" aria-label="Facebook" className="social-dot"><FacebookIcon size={17} /></a>
                <a href="#" aria-label="Twitter" className="social-dot"><TwitterIcon size={17} /></a>
                <a href="#" aria-label="Instagram" className="social-dot"><InstagramIcon size={17} /></a>
                <a href="#" aria-label="LinkedIn" className="social-dot"><LinkedinIcon size={17} /></a>
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
