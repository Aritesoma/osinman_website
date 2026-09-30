import React, { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowRight, MapPin, Mail, Phone, Send, CheckCircle2, HeartHandshake, MessageCircle } from "lucide-react";

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
  { label: "Get to Know Us", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Events", href: "/events" },
  { label: "The Team", href: "/team" },
];

// Paystack — replace with your real public key from the Paystack dashboard
// (Settings > API Keys & Webhooks). Keep it a "pk_..." key, never the secret key.
const PAYSTACK_PUBLIC_KEY = "pk_test_replace_with_your_public_key";

// Sends the form straight to osimanfoundation@gmail.com via Formspree.
// Replace YOUR_FORM_ID with the ID Formspree gives you.
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xrpbkpr";

export default function GetInvolvedPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [donationAmount, setDonationAmount] = useState(5000);

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
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSending(true);
    setError("");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: `New message from ${form.name} via the OSINMAN website`,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError("Something went wrong sending your message. Please try again.");
      }
    } catch {
      setError("Couldn't reach the server. Check your connection and try again.");
    } finally {
      setSending(false);
    }
  };

  // Opens Paystack's inline popup checkout for a one-off donation.
  // Requires the Paystack script tag in index.html — see setup notes.
  const handleDonate = () => {
    const email = window.prompt("Enter your email to continue with your donation:");
    if (!email) return;
    if (typeof window.PaystackPop === "undefined") {
      alert("Paystack isn't loaded yet. Make sure the Paystack script tag is added to index.html.");
      return;
    }
    const handler = window.PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email,
      amount: donationAmount * 100, // Paystack expects the amount in kobo
      currency: "NGN",
      ref: `osinman_${Date.now()}`,
      callback: function (response) {
        alert("Thank you for your donation! Reference: " + response.reference);
      },
      onClose: function () {},
    });
    handler.openIframe();
  };

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
        .btn-primary:disabled { opacity: 0.65; cursor: default; transform: none; }

        .btn-outline {
          display: inline-flex; align-items: center; gap: 0.5rem;
          background: transparent; color: var(--cream);
          border: 1.5px solid rgba(251,245,236,0.4);
          padding: 0.85rem 1.6rem; border-radius: 999px; font-weight: 600;
          transition: all 0.35s ease;
        }
        .btn-outline:hover { border-color: var(--gold); color: var(--gold); transform: translateY(-3px); }

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

        .card-give {
          background: var(--white);
          border-radius: 1.5rem;
          padding: 2.25rem;
          box-shadow: 0 4px 20px -8px rgba(36,28,23,0.1);
        }

        .field {
          width: 100%;
          background: var(--cream);
          border: 1.5px solid rgba(36,28,23,0.12);
          color: var(--ink);
          border-radius: 0.9rem;
          padding: 0.9rem 1.1rem;
          font-family: 'Inter', sans-serif;
          transition: border-color 0.3s ease, background 0.3s ease;
        }
        .field::placeholder { color: rgba(36,28,23,0.4); }
        .field:focus { outline: none; border-color: var(--burnt); background: var(--white); }

        .social-dot {
          width: 40px; height: 40px; border-radius: 999px;
          display: flex; align-items: center; justify-content: center;
          border: 1.5px solid rgba(251,245,236,0.25); color: var(--cream);
          transition: all 0.3s ease;
        }
        .social-dot:hover { background: var(--burnt); border-color: var(--burnt); transform: translateY(-3px); }

        @media (prefers-reduced-motion: reduce) {
          .reveal, .nav-enter { transition: none !important; animation: none !important; filter: none !important; }
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
              <a key={l.label} href={l.href} className={`nav-link ${l.label === "Get Involved" ? "is-active" : ""}`}>
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
          <a href="#give" onClick={closeMenu} className="btn-primary w-full justify-center">
            Donate Now <ArrowRight size={16} />
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
            <p className="eyebrow on-dark mb-4">Get Involved</p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="text-cream font-display font-medium" style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", lineHeight: 1.12 }}>
              Support the work, one way or another.
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="text-cream mt-5 max-w-lg" style={{ opacity: 0.75, lineHeight: 1.75 }}>
              Make a donation that goes straight to a program, or send us a message about
              volunteering, partnerships, or anything else on your mind.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- DONATE ----------------
      <section id="give" className="bg-cream py-16 md:py-20">
        <div className="max-w-2xl mx-auto px-6">
          <Reveal className="reveal-pop">
            <div className="card-give text-center">
              <div
                className="flex items-center justify-center rounded-full mx-auto mb-5"
                style={{ width: 54, height: 54, background: "var(--cream-deep)" }}
              >
                <HeartHandshake size={24} color="var(--burnt)" />
              </div>
              <p className="eyebrow mb-2">Make a Donation</p>
              <h2 className="font-display font-medium mb-3" style={{ fontSize: "1.6rem" }}>
                Every naira reaches a program directly.
              </h2>
              <p className="text-inksoft mb-7" style={{ lineHeight: 1.65, fontSize: "0.92rem" }}>
                Enter an amount, then check out securely through Paystack.
              </p>

              <div className="flex items-center justify-center gap-2 mb-7">
                <span className="text-inksoft" style={{ fontSize: "0.85rem" }}>Amount (₦):</span>
                <input
                  type="number"
                  min="100"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(Number(e.target.value) || 0)}
                  className="field"
                  style={{ width: 120, padding: "0.5rem 0.75rem", textAlign: "center" }}
                />
              </div>

              <button onClick={handleDonate} className="btn-primary justify-center w-full sm:w-auto">
                Donate Now <ArrowRight size={16} />
              </button>
            </div>
          </Reveal>
        </div>
      </section>
      ---------------------------------------- */}

      {/* ---------------- CONTACT FORM ---------------- */}
      <section className="bg-ink py-16 md:py-20">
        <div className="max-w-2xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-8">
              <div
                className="flex items-center justify-center rounded-full mx-auto mb-5"
                style={{ width: 54, height: 54, background: "rgba(251,245,236,0.08)" }}
              >
                <MessageCircle size={24} color="var(--gold)" />
              </div>
              <p className="eyebrow on-dark mb-2">Say Hello</p>
              <h2 className="text-cream font-display font-medium" style={{ fontSize: "1.6rem" }}>
                Volunteer, partner with us, or just ask a question.
              </h2>
            </div>
          </Reveal>

          <Reveal delay={80}>
            {submitted ? (
              <div className="p-8 rounded-2xl text-center" style={{ background: "rgba(251,245,236,0.06)" }}>
                <CheckCircle2 size={32} color="var(--gold)" className="mx-auto" />
                <h3 className="text-cream font-display font-medium mt-4 mb-2" style={{ fontSize: "1.3rem" }}>
                  Thank you, {form.name.split(" ")[0]}.
                </h3>
                <p className="text-cream" style={{ opacity: 0.7, lineHeight: 1.6 }}>
                  Your message has been sent straight to our team's inbox. We'll reply as soon as
                  we can.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" required className="field" />
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Your email" required className="field" />
                <textarea name="message" value={form.message} onChange={handleChange} placeholder="Your message" required rows={5} className="field" style={{ resize: "vertical" }} />
                {error && <p style={{ color: "var(--gold)", fontSize: "0.85rem" }}>{error}</p>}
                <button type="submit" disabled={sending} className="btn-primary justify-center mt-1">
                  {sending ? "Sending..." : "Send Message"} <Send size={16} />
                </button>
              </form>
            )}
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
