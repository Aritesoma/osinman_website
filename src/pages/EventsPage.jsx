import React, { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowRight, MapPin, Mail, Phone, Calendar, Clock } from "lucide-react";

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
// files (e.g. public/images/events/health-fair.jpg).
const UPCOMING_EVENTS = [
  {
    day: "20",
    month: "Sep",
    year: "2026",
    title: "Annual Charity Walk & Fun Run",
    time: "7:00 AM",
    location: "Millennium Park, Abuja, FCT",
    body: "A morning walk/run bringing together donors, volunteers, and the community to raise funds and awareness for our year-round programs.",
  },
  {
    day: "05",
    month: "Sep",
    year: "2026",
    title: "Back-to-School Supply Drive",
    time: "9:00 AM",
    location: "Bright Futures Literacy Center, Plateau State",
    body: "Distributing school bags, books, and uniforms to children in the literacy program ahead of the new academic term.",
  },
  {
    day: "10",
    month: "Oct",
    year: "2026",
    title: "Community Health Fair",
    time: "8:00 AM – 3:00 PM",
    location: "Kaduna State",
    body: "Free health screenings, vaccinations, and wellness talks delivered by volunteer doctors and nurses.",
  },
  {
    day: "15",
    month: "Nov",
    year: "2026",
    title: "Skills Center Graduation Ceremony",
    time: "11:00 AM",
    location: "Osinman Skills Center, Plateau State",
    body: "Celebrating this year's cohort of tailoring, carpentry, and digital literacy trainees as they graduate into independent work.",
  },
];

const PAST_EVENTS = [
  {
    date: "March 22, 2026",
    title: "World Water Day Clean-Up & Awareness Walk",
    location: "Kaduna State",
    recap: "Volunteers and community members cleaned up local water sources and hosted a public awareness session on hygiene and sanitation.",
    photo: "/images/events/water-day.jpg",
  },
  {
    date: "March 8, 2026",
    title: "International Women's Day Empowerment Summit",
    location: "Abuja, FCT",
    recap: "A day of panels and skills workshops for women entrepreneurs, capped off by micro-grant awards to five new small businesses.",
    photo: "/images/events/womens-day.jpg",
  },
  {
    date: "December 2025",
    title: "End-of-Year Appreciation & Fundraising Dinner",
    location: "Abuja, FCT",
    recap: "Donors, volunteers, and partners gathered to celebrate the year's milestones and raise funds for the coming year's programs.",
    photo: "/images/events/year-end-dinner.jpg",
  },
  {
    date: "2024",
    title: "Osinman Skills Center 5th Anniversary",
    location: "Plateau State",
    recap: "Marked five years of the Skills Center with an open house, alumni showcase, and testimonials from graduates now running their own trades.",
    photo: "/images/events/skills-anniversary.jpg",
  },
];

export default function EventsPage() {
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

        .btn-outline-ink {
          display: inline-flex; align-items: center; gap: 0.5rem;
          background: transparent; color: var(--ink);
          border: 1.5px solid rgba(36,28,23,0.2);
          padding: 0.7rem 1.3rem; border-radius: 999px; font-weight: 600; font-size: 0.88rem;
          transition: all 0.35s ease;
        }
        .btn-outline-ink:hover { border-color: var(--burnt); color: var(--burnt); background: var(--white); transform: translateY(-3px); }

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

        /* Upcoming event cards */
        .card-event {
          background: var(--white);
          border-radius: 1.25rem;
          padding: 1.75rem;
          display: flex;
          gap: 1.25rem;
          transition: transform 0.5s cubic-bezier(.2,.8,.2,1), box-shadow 0.5s cubic-bezier(.2,.8,.2,1);
          box-shadow: 0 2px 12px -6px rgba(36,28,23,0.1);
        }
        .card-event:hover { transform: translateY(-6px); box-shadow: 0 18px 34px -18px rgba(36,28,23,0.2); }

        .date-badge {
          flex-shrink: 0;
          width: 64px;
          height: 64px;
          border-radius: 0.9rem;
          background: var(--cream-deep);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transition: background-color 0.4s ease, transform 0.4s ease;
        }
        .card-event:hover .date-badge { background: var(--burnt); transform: rotate(-4deg) scale(1.05); }
        .date-badge .day { font-family: 'Fraunces', serif; font-size: 1.3rem; line-height: 1; color: var(--burnt); transition: color 0.4s ease; }
        .date-badge .month { font-size: 0.68rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ink-soft); transition: color 0.4s ease; }
        .card-event:hover .date-badge .day,
        .card-event:hover .date-badge .month { color: var(--white); }

        /* Past event cards */
        .card-past {
          background: var(--white);
          border-radius: 1.25rem;
          overflow: hidden;
          transition: transform 0.5s cubic-bezier(.2,.8,.2,1), box-shadow 0.5s cubic-bezier(.2,.8,.2,1);
          box-shadow: 0 2px 12px -6px rgba(36,28,23,0.1);
        }
        .card-past:hover { transform: translateY(-8px); box-shadow: 0 20px 36px -18px rgba(36,28,23,0.2); }
        .past-photo-wrap { overflow: hidden; position: relative; aspect-ratio: 16 / 10; }
        .past-photo {
          width: 100%; height: 100%; object-fit: cover; display: block;
          filter: grayscale(20%);
          transform: scale(1);
          transition: transform 0.8s cubic-bezier(.2,.8,.2,1), filter 0.6s ease;
        }
        .card-past:hover .past-photo { transform: scale(1.08); filter: grayscale(0%); }

        .social-dot {
          width: 40px; height: 40px; border-radius: 999px;
          display: flex; align-items: center; justify-content: center;
          border: 1.5px solid rgba(251,245,236,0.25); color: var(--cream);
          transition: all 0.3s ease;
        }
        .social-dot:hover { background: var(--burnt); border-color: var(--burnt); transform: translateY(-3px); }

        @media (prefers-reduced-motion: reduce) {
          .reveal, .nav-enter, .card-event, .card-past { transition: none !important; animation: none !important; filter: none !important; }
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
              <a key={l.label} href={l.href} className={`nav-link ${l.label === "Events" ? "is-active" : ""}`}>
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
            <p className="eyebrow on-dark mb-4">Our Events</p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="text-cream font-display font-medium" style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", lineHeight: 1.12 }}>
              Where the community and the work meet in person.
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="text-cream mt-5 max-w-lg" style={{ opacity: 0.75, lineHeight: 1.75 }}>
              From fundraising dinners to graduation ceremonies, our events are where donors,
              volunteers, and the people we serve get to stand in the same room.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- UPCOMING EVENTS ---------------- */}
      <section className="bg-cream py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <p className="eyebrow mb-4">Mark Your Calendar</p>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="font-display font-medium mb-12" style={{ fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)" }}>
              Upcoming Events
            </h2>
          </Reveal>

          <div className="flex flex-col gap-5">
            {UPCOMING_EVENTS.map((e, i) => (
              <Reveal key={e.title} delay={i * 90} className="reveal-pop">
                <div className="card-event flex-col sm:flex-row">
                  <div className="date-badge">
                    <span className="day">{e.day}</span>
                    <span className="month">{e.month}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-medium mb-2" style={{ fontSize: "1.15rem" }}>
                      {e.title}
                    </h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mb-3 text-inksoft" style={{ fontSize: "0.82rem", opacity: 0.75 }}>
                      <span className="flex items-center gap-1.5"><Clock size={13} /> {e.time}</span>
                      <span className="flex items-center gap-1.5"><MapPin size={13} /> {e.location}</span>
                    </div>
                    <p className="text-inksoft" style={{ lineHeight: 1.6, fontSize: "0.92rem" }}>
                      {e.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- PAST EVENTS ---------------- */}
      <section className="bg-cream-deep py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <p className="eyebrow mb-4">Looking Back</p>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="font-display font-medium mb-12" style={{ fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)" }}>
              Past Events
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {PAST_EVENTS.map((e, i) => (
              <Reveal key={e.title} delay={i * 90} className="reveal-pop">
                <div className="card-past h-full flex flex-col">
                  <div className="past-photo-wrap">
                    <img src={e.photo} alt={e.title} className="past-photo" />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <p className="eyebrow mb-1.5" style={{ letterSpacing: "0.1em" }}>
                      <Calendar size={11} style={{ display: "inline", marginRight: 4, verticalAlign: -1 }} />
                      {e.date}
                    </p>
                    <h3 className="font-display font-medium mb-2" style={{ fontSize: "1.1rem" }}>
                      {e.title}
                    </h3>
                    <p className="text-inksoft flex-1" style={{ lineHeight: 1.6, fontSize: "0.9rem" }}>
                      {e.recap}
                    </p>
                    <p className="text-inksoft mt-3 flex items-center gap-1.5" style={{ fontSize: "0.8rem", opacity: 0.7 }}>
                      <MapPin size={13} /> {e.location}
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
            <p className="eyebrow on-dark mb-4">Don't Miss the Next One</p>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="text-cream font-display font-medium mb-5" style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)" }}>
              Come meet the community you're supporting.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-cream mb-8" style={{ opacity: 0.72, lineHeight: 1.7 }}>
              Reach out and we'll keep you posted on upcoming events near you.
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
