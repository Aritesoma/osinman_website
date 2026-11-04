import React, { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowRight, MapPin, Mail, Phone, Send, CheckCircle2, MessageCircle, Copy, Check } from "lucide-react";

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

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Get to Know Us", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Events", href: "/events" },
  { label: "The Team", href: "/team" },
];

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xrpbakpr";

export default function GetInvolvedPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Donation Form State
  const [donationForm, setDonationForm] = useState({ name: "", phone: "", email: "", amount: "" });
  const [donationSubmitted, setDonationSubmitted] = useState(false);
  const [donationSending, setDonationSending] = useState(false);
  const [donationError, setDonationError] = useState("");
  const [copiedAccount, setCopiedAccount] = useState("");

  // General Contact Form State
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleDonationChange = (e) => {
    setDonationForm({ ...donationForm, [e.target.name]: e.target.value });
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(type);
    setTimeout(() => setCopiedAccount(""), 2500);
  };

  // Submit the donation details to Formspree
  const handleDonationSubmit = async (e) => {
    e.preventDefault();
    setDonationSending(true);
    setDonationError("");

    const data = new FormData();
    data.append("_subject", `New Donation Submission ${donationForm.name ? "from " + donationForm.name : ""}`);
    data.append("form_type", "Donation details");
    data.append("name", donationForm.name || "Anonymous Donor");
    data.append("phone", donationForm.phone || "Not Provided");
    data.append("amount", donationForm.amount || "Not Specified");

    // Formspree checks that a field called "email" is a real email address,
    // so a placeholder like "Not Provided" can make the whole submission fail.
    // Only send the field when the donor actually filled it in.
    if (donationForm.email.trim()) {
      data.append("email", donationForm.email.trim());
    }

    try {
      // NOTE: Do not set 'Content-Type' header manually when sending FormData via fetch.
      // The browser automatically assigns multipart/form-data along with the required boundary.
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: data,
      });

      if (res.ok) {
        setDonationSubmitted(true);
      } else {
        // Read Formspree's own explanation so a failure isn't a mystery.
        const json = await res.json().catch(() => ({}));
        console.error("Formspree donation error:", res.status, json);
        const reason =
          json.error ||
          (Array.isArray(json.errors) && json.errors.map((er) => er.message).filter(Boolean).join(", ")) ||
          "";
        setDonationError(
          `Failed to submit donation details (error ${res.status}${reason ? `: ${reason}` : ""}). Please try again.`
        );
      }
    } catch (err) {
      console.error("Donation submit network error:", err);
      setDonationError("Network error. Please check your connection and try again.");
    } finally {
      setDonationSending(false);
    }
  };

  // Submit General Message Form to Formspree Endpoint
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
        .btn-primary:hover { background: var(--burnt-dark); transform: translateY(-3px); }

        .nav-wrap { transition: background 0.4s ease, box-shadow 0.4s ease, padding 0.3s ease; }
        .nav-link {
          position: relative; color: var(--ink); font-weight: 500; font-size: 0.92rem;
          transition: color 0.25s ease;
        }
        .nav-link:hover { color: var(--burnt); }
        .nav-link.is-active { color: var(--burnt); }

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
        }
        .field:focus { outline: none; border-color: var(--burnt); background: var(--white); }

        .account-box {
          background: var(--cream-deep);
          border-radius: 1rem;
          padding: 1.25rem;
          text-align: left;
          margin-bottom: 1.5rem;
        }
      `}</style>

      {/* ---------------- NAV ---------------- */}
      <header className="nav-wrap fixed top-0 left-0 right-0 z-50 bg-cream shadow-sm">
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
              <a key={l.label} href={l.href} className={`nav-link ${l.label === "Volunteer" ? "is-active" : ""}`}>
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* ---------------- PAGE HERO ---------------- */}
      <section className="bg-ink pt-36 pb-16 md:pt-44 md:pb-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <p className="eyebrow on-dark mb-4">Support Our Mission</p>
          </Reveal>
          <Reveal delay={60}>
            <h1 className="text-cream font-display font-medium" style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", lineHeight: 1.12 }}>
              Make a Donation & Get Involved
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-cream mt-5 max-w-lg mx-auto" style={{ opacity: 0.75, lineHeight: 1.75 }}>
              Contribute directly via bank transfer or get in touch with our team.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- DONATION SECTION ---------------- */}
      <section id="donate-section" className="bg-cream py-16 md:py-20">
        <div className="max-w-2xl mx-auto px-6">
          <Reveal className="reveal-pop">
            <div className="card-give text-center">
              <h2 className="font-display font-medium mb-6" style={{ fontSize: "1.8rem" }}>
                Bank Account Details
              </h2>
              <p className="text-inksoft mb-6 text-sm">
                Bank Name: <strong>United Bank for Africa (UBA)</strong>
              </p>

              {/* Domestic Account */}
              <div className="account-box">
                <p className="text-xs font-bold uppercase tracking-wider text-burnt mb-1">Domestic Account</p>
                <p className="text-sm">Account Name: <strong>Osinman Foundation</strong></p>
                <div className="flex items-center justify-between mt-2 bg-white p-3 rounded-lg border border-stone-200">
                  <span className="font-mono font-bold text-base">Account Number: 2143163576</span>
                  <button 
                    type="button"
                    onClick={() => copyToClipboard("2143163576", "domestic")}
                    className="flex items-center gap-1 text-xs bg-stone-100 hover:bg-stone-200 py-1.5 px-3 rounded font-medium transition-colors"
                  >
                    {copiedAccount === "domestic" ? <><Check size={14} className="text-green-600"/> Copied</> : <><Copy size={14}/> Copy</>}
                  </button>
                </div>
              </div>

              {/* Domiciliary / Foreign Accounts */}
              <div className="account-box">
                <p className="text-xs font-bold uppercase tracking-wider text-burnt mb-1">Domiciliary / Foreign Accounts</p>
                <p className="text-sm mb-2">Account Name: <strong>Osi-nman Foundation</strong></p>
                
                <div className="flex items-center justify-between mt-2 bg-white p-3 rounded-lg border border-stone-200 mb-2">
                  <span className="font-mono text-sm">1. Dollar: <strong>3005247463</strong></span>
                  <button 
                    type="button"
                    onClick={() => copyToClipboard("3005247463", "dollar")}
                    className="flex items-center gap-1 text-xs bg-stone-100 hover:bg-stone-200 py-1.5 px-3 rounded font-medium"
                  >
                    {copiedAccount === "dollar" ? <><Check size={14} className="text-green-600"/> Copied</> : <><Copy size={14}/> Copy</>}
                  </button>
                </div>

                <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-stone-200">
                  <span className="font-mono text-sm">2. Euro: <strong>3005247401</strong></span>
                  <button 
                    type="button"
                    onClick={() => copyToClipboard("3005247401", "euro")}
                    className="flex items-center gap-1 text-xs bg-stone-100 hover:bg-stone-200 py-1.5 px-3 rounded font-medium"
                  >
                    {copiedAccount === "euro" ? <><Check size={14} className="text-green-600"/> Copied</> : <><Copy size={14}/> Copy</>}
                  </button>
                </div>

                <div className="mt-3 text-left text-xs text-stone-600 space-y-1">
                  <p>Swift Code: <strong className="font-mono">UNAFNGLA</strong></p>
                  <p>Sort Code: <strong className="font-mono">033083641</strong></p>
                </div>
              </div>

              <hr className="my-8 border-stone-200" />

              <h3 className="font-display font-medium mb-2 text-left" style={{ fontSize: "1.2rem" }}>
                Submit Donation Details
              </h3>
              <p className="text-stone-600 text-xs text-left mb-4">
                *Note: All fields below are entirely optional to accommodate anonymous or private donations.
              </p>

              {donationSubmitted ? (
                <div className="p-6 rounded-2xl text-center bg-stone-50 border border-stone-200">
                  <CheckCircle2 size={32} color="var(--burnt)" className="mx-auto" />
                  <h4 className="font-display font-medium mt-3 mb-3" style={{ fontSize: "1.1rem" }}>
                    Thank you for your generous support!
                  </h4>
                  <p className="text-stone-600 text-sm mb-3">
                    Your donation details have been successfully sent to the{" "}
                    <strong>Osinman Foundation team.</strong>
                  </p>
                  <p className="text-stone-600 text-sm mb-3">
                    <strong>Optional:</strong> To help us verify your transfer, you may share your
                    transaction receipt with us via WhatsApp:
                  </p>
                  <p className="text-sm mb-3">
                    <a
                      href="https://wa.me/2348037051210"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="break-all underline font-medium"
                      style={{ color: "var(--burnt)" }}
                    >
                      https://wa.me/2348037051210
                    </a>
                  </p>
                  <p className="text-stone-600 text-sm">
                    Thank you for supporting the work of Osinman Foundation.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleDonationSubmit} className="flex flex-col gap-4 text-left">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-stone-700">Full Name (Optional)</label>
                    <input name="name" value={donationForm.name} onChange={handleDonationChange} placeholder="Enter your full name" className="field" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-stone-700">Phone Number (Optional)</label>
                    <input name="phone" type="tel" value={donationForm.phone} onChange={handleDonationChange} placeholder="Enter your phone number" className="field" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-stone-700">Email Address (Optional)</label>
                    <input name="email" type="email" value={donationForm.email} onChange={handleDonationChange} placeholder="Enter your email address" className="field" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-stone-700">Amount Donated (Optional)</label>
                    <input name="amount" value={donationForm.amount} onChange={handleDonationChange} placeholder="e.g. ₦10,000" className="field" />
                  </div>
                  {donationError && <p className="text-red-600 text-xs mt-1">{donationError}</p>}
                  <button type="submit" disabled={donationSending} className="btn-primary justify-center mt-2 w-full">
                    {donationSending ? "Submitting..." : "Submit Donation Info"} <Send size={16} />
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- CONTACT & VOLUNTEER FORM ---------------- */}
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
                Volunteer, partner with us, or ask a question.
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
                  Your message has been sent straight to our team's inbox.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" required className="field" style={{ background: "rgba(251,245,236,0.06)", color: "var(--cream)", borderColor: "rgba(251,245,236,0.22)" }} />
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Your email" required className="field" style={{ background: "rgba(251,245,236,0.06)", color: "var(--cream)", borderColor: "rgba(251,245,236,0.22)" }} />
                <textarea name="message" value={form.message} onChange={handleChange} placeholder="Your message" required rows={5} className="field" style={{ background: "rgba(251,245,236,0.06)", color: "var(--cream)", borderColor: "rgba(251,245,236,0.22)", resize: "vertical" }} />
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
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-8">
            <p className="text-cream" style={{ opacity: 0.45, fontSize: "0.82rem" }}>
              © {new Date().getFullYear()} Osinman Foundation. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}