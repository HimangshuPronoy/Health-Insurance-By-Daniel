"use client";
import { useState } from "react";

/* ── NAV ── */
const NAV_LINKS = [
  { label: "Home",      href: "#home" },
  { label: "About",     href: "#about" },
  { label: "Services",  href: "#services" },
  { label: "Reviews",   href: "#reviews" },
  { label: "FAQ",       href: "#faq" },
  { label: "Contact",   href: "#contact" },
];

/* ── CARRIERS ── */
const CARRIERS = [
  { name: "Kaiser Permanente", domain: "kaiserpermanente.org" },
  { name: "UnitedHealthcare", domain: "uhc.com" },
  { name: "Blue Cross Blue Shield", domain: "bcbs.com" },
  { name: "Cigna", domain: "cigna.com" },
  { name: "Aetna", domain: "aetna.com" },
  { name: "Humana", domain: "humana.com" },
  { name: "Molina Healthcare", domain: "molinahealthcare.com" },
  { name: "Oscar Health", domain: "hioscar.com" },
];

/* ── SERVICES ── */
const SERVICES = [
  {
    icon: "🏥",
    title: "Health Insurance",
    desc: "I\u2019ll dig into your situation — your doctors, your meds, your budget — and find the plan that actually fits. Not just the cheapest option.",
    items: ["Individual & Family Plans", "Self-Employed Coverage", "HSA-Compatible Plans", "Short-Term Options"],
  },
  {
    icon: "👁️",
    title: "Vision",
    desc: "Standalone or bundled with your health plan — I\u2019ll make sure your eye doctor is covered without you overpaying.",
    items: ["Eye Exams", "Frames & Lenses", "Contacts", "LASIK Discounts"],
  },
  {
    icon: "🦷",
    title: "Dental",
    desc: "From routine cleanings to major work, I\u2019ll find a plan that covers your dentist and won\u2019t surprise you with hidden costs.",
    items: ["Preventive Care", "Basic & Major Restorative", "Orthodontics", "Implant Coverage"],
  },
  {
    icon: "🛡️",
    title: "Supplemental",
    desc: "Your main plan can\u2019t cover everything. I help fill the gaps so you\u2019re protected when life throws a curveball.",
    items: ["Critical Illness", "Accident Insurance", "Hospital Indemnity", "Life Insurance"],
  },
];

/* ── REVIEWS ── */
const REVIEWS = [
  {
    name: "Jessica M.",
    location: "Los Angeles, CA",
    stars: 5,
    text: "Daniel took the time to actually understand my situation as a freelancer. He found me a plan that\u2019s $280/month less than what I was paying and my doctors are still in-network. Can\u2019t recommend him enough!",
    avatar: "JM",
  },
  {
    name: "Carlos & Sofia R.",
    location: "Miami, FL",
    stars: 5,
    text: "We were so overwhelmed by all the options out there. Daniel made it simple \u2014 explained everything in plain English and got our whole family covered. Such a relief.",
    avatar: "CR",
  },
  {
    name: "Marcus T.",
    location: "Houston, TX",
    stars: 5,
    text: "I run a small business and Daniel set up coverage for me and my two employees. Quick, professional, and he genuinely cares. That\u2019s rare in this industry.",
    avatar: "MT",
  },
  {
    name: "Priya K.",
    location: "New York, NY",
    stars: 5,
    text: "As a self-employed consultant I always dreaded open enrollment. Now Daniel handles everything \u2014 I just answer a few questions and he does the rest. 10/10.",
    avatar: "PK",
  },
  {
    name: "Rachel & Tom B.",
    location: "Phoenix, AZ",
    stars: 5,
    text: "Daniel helped us switch from our old plan and we\u2019re saving nearly $400/month with better benefits. He\u2019s our go-to guy now for any insurance questions.",
    avatar: "RB",
  },
  {
    name: "Andre W.",
    location: "Atlanta, GA",
    stars: 5,
    text: "Responsive, knowledgeable, and zero pressure. He laid out all the options and let me decide. Honestly didn\u2019t know brokers like this existed.",
    avatar: "AW",
  },
];

/* ── FAQs ── */
const FAQS = [
  {
    q: "Why should I work with you instead of going straight to an insurance company?",
    a: "When you go direct, they can only show you their plans. I compare plans across Kaiser, UnitedHealthcare, Blue Cross, Cigna, Aetna, and more \u2014 all at once. My job is finding what\u2019s best for you, not for any one company. And my service is completely free.",
  },
  {
    q: "Who do you typically work with?",
    a: "Mostly self-employed professionals, freelancers, business owners, and higher-income families who want more control over their coverage. If you don\u2019t have employer-sponsored insurance, I can almost certainly help.",
  },
  {
    q: "Do I have to pay you anything?",
    a: "Nope \u2014 not a cent. I\u2019m compensated by the insurance carriers when you enroll, so my service is 100% free to you. You don\u2019t pay more by using a broker. In fact, most people save because I know where the deals are.",
  },
  {
    q: "Can I keep my current doctor?",
    a: "That\u2019s literally one of the first things I check. I\u2019ll verify which plans include your doctors and specialists in-network before we even look at pricing.",
  },
  {
    q: "I already have a plan \u2014 can you still help?",
    a: "That\u2019s one of my favorite situations. Send me your current plan details and I\u2019ll run a free comparison. Most people I work with find they can lower their premium, their deductible, or both.",
  },
  {
    q: "How fast can I get covered?",
    a: "Many plans have same-day or next-day effective dates. ACA Marketplace plans follow enrollment windows. We\u2019ll figure out the best timeline for your situation on our call.",
  },
];

/* ── HELPERS ── */
function Stars({ count }: { count: number }) {
  return (
    <div className="stars" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#F5A623">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "", type: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleContact(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <div className="site">

      {/* ══ TOP BAR ══ */}
      <div className="topbar">
        <div className="container topbar__inner">
          <span>Licensed Independent Broker · Serving All 50 States</span>
          <a href="tel:+13235550192" className="topbar__phone">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.56 21 3 13.44 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z" /></svg>
            (323) 555-0192
          </a>
        </div>
      </div>

      {/* ══ HEADER / NAV ══ */}
      <header className="header" id="home">
        <div className="container header__inner">
          <a href="#home" className="brand">
            <span className="brand__icon">D</span>
            <div>
              <span className="brand__name">Health Insurance</span>
              <span className="brand__by">by Daniel</span>
            </div>
          </a>

          <nav className="nav desktop-nav">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="nav__link">{l.label}</a>
            ))}
          </nav>

          <a href="#contact" className="btn btn--primary header__cta">Let&apos;s Talk</a>

          <button className="burger" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen
              ? <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" /></svg>
              : <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" /></svg>
            }
          </button>
        </div>

        {menuOpen && (
          <nav className="mobile-nav">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="mobile-nav__link" onClick={() => setMenuOpen(false)}>{l.label}</a>
            ))}
            <a href="#contact" className="btn btn--primary mobile-nav__cta" onClick={() => setMenuOpen(false)}>Let&apos;s Talk</a>
          </nav>
        )}
      </header>

      <main>
        {/* ══ HERO ══ */}
        <section className="hero">
          <div className="container hero__inner">
            <div className="hero__copy">
              <div className="hero__pill">🤝 Independent Broker · No Extra Cost to You</div>
              <h1 className="hero__h1">
                Health Insurance<br />
                <span className="hero__h1-grad">Made Personal.</span>
              </h1>
              <p className="hero__sub">
                Hey, I&apos;m Daniel — a licensed independent health insurance broker.
                I work with self-employed professionals, business owners, and families
                to find coverage that actually makes sense. I shop every major carrier
                so <strong>you</strong> don&apos;t have to.
              </p>
              <div className="hero__actions">
                <a href="#contact" className="btn btn--primary btn--lg">Get My Free Quote</a>
                <a href="#about" className="btn btn--outline-light btn--lg">Learn More About Me</a>
              </div>
              <div className="hero__proof">
                <div className="hero__proof-item">
                  <strong>200+</strong><span>Plans Compared</span>
                </div>
                <div className="hero__proof-divider" />
                <div className="hero__proof-item">
                  <strong>100%</strong><span>Free Service</span>
                </div>
                <div className="hero__proof-divider" />
                <div className="hero__proof-item">
                  <strong>All 50</strong><span>States Licensed</span>
                </div>
              </div>
            </div>

            {/* Lead intake card */}
            <div className="lead-card">
              <div className="lead-card__head">
                <div className="lead-card__avatar">D</div>
                <div>
                  <p className="lead-card__hi">Hey there 👋 I&apos;m Daniel</p>
                  <p className="lead-card__tagline">Let me find your perfect plan</p>
                </div>
              </div>
              <form className="lead-form" onSubmit={handleContact}>
                <div className="lead-form__group">
                  <label htmlFor="lf-name">Your Name</label>
                  <input id="lf-name" name="name" type="text" placeholder="First & Last Name" required onChange={handleChange} />
                </div>
                <div className="lead-form__group">
                  <label htmlFor="lf-phone">Phone</label>
                  <input id="lf-phone" name="phone" type="tel" placeholder="(555) 000-0000" required onChange={handleChange} />
                </div>
                <div className="lead-form__group">
                  <label htmlFor="lf-type">What are you looking for?</label>
                  <select id="lf-type" name="type" onChange={handleChange} defaultValue="">
                    <option value="" disabled>Pick one…</option>
                    <option>Health Insurance</option>
                    <option>Health + Dental + Vision</option>
                    <option>Supplemental / Gap Coverage</option>
                    <option>Not sure yet — help me figure it out</option>
                  </select>
                </div>
                <button type="submit" className="btn btn--primary lead-form__submit">
                  Get My Free Quote →
                </button>
                <p className="lead-form__note">No spam, ever. I&apos;ll personally reach out within 24 hrs.</p>
              </form>
            </div>
          </div>

          <div className="hero__wave">
            <svg viewBox="0 0 1440 70" preserveAspectRatio="none" fill="white">
              <path d="M0,40 C400,80 1040,0 1440,40 L1440,70 L0,70 Z" />
            </svg>
          </div>
        </section>

        {/* ══ CARRIERS ══ */}
        <section className="carriers">
          <div className="container">
            <p className="carriers__label">Carriers I personally compare for you</p>
          </div>
          <div className="carriers__track">
            <div className="carriers__list">
              {[...CARRIERS, ...CARRIERS].map((c, i) => (
                <div key={i} className="carrier-chip">
                  <img src={`https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://${c.domain}&size=128`} alt={`${c.name} logo`} width="20" height="20" className="carrier-logo" loading="lazy" />
                  {c.name}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ ABOUT ══ */}
        <section className="about" id="about">
          <div className="container about__inner">
            <div className="about__photo">
              <div className="about__photo-frame">
                <div className="about__photo-placeholder">
                  <span className="about__photo-initial">D</span>
                </div>
              </div>
              <div className="about__card-float">
                <div className="about__card-float-icon">⭐</div>
                <div>
                  <strong>5.0 Rating</strong>
                  <p>Based on 80+ client reviews</p>
                </div>
              </div>
            </div>

            <div className="about__copy">
              <p className="section-eye">A Little About Me</p>
              <h2 className="section-h2">I&apos;m Daniel — your broker,<br />your advocate.</h2>
              <p>
                I got into health insurance because I watched too many people in my
                circle — talented freelancers, small business owners, real families —
                overpaying for coverage they didn&apos;t fully understand. That didn&apos;t sit right with me.
              </p>
              <p>
                As an independent broker, I&apos;m not tied to any single carrier. That means I work
                <em> for you</em>, not for Kaiser or UnitedHealthcare. My job is to find the plan
                that fits your doctors, your prescriptions, and your budget.
              </p>
              <p>
                Whether you&apos;re newly self-employed, growing a family, or just tired
                of paying too much — I make this whole process simple, transparent,
                and honestly kind of painless.
              </p>
              <div className="about__highlights">
                <div className="about__hl">
                  <span className="about__hl-icon">✓</span>
                  Licensed in all 50 states
                </div>
                <div className="about__hl">
                  <span className="about__hl-icon">✓</span>
                  Independent — no carrier quotas
                </div>
                <div className="about__hl">
                  <span className="about__hl-icon">✓</span>
                  Always free to you
                </div>
                <div className="about__hl">
                  <span className="about__hl-icon">✓</span>
                  I stick with you after enrollment
                </div>
              </div>
              <a href="#contact" className="btn btn--primary btn--lg">Book a Free Call with Me</a>
            </div>
          </div>
        </section>

        {/* ══ SERVICES ══ */}
        <section className="services" id="services">
          <div className="container">
            <div className="section-header">
              <p className="section-eye">What I Can Help With</p>
              <h2 className="section-h2">One call with me covers everything</h2>
              <p className="section-sub">
                Health, dental, vision, supplemental — I handle it all so you don&apos;t
                have to talk to five different people.
              </p>
            </div>
            <div className="services__grid">
              {SERVICES.map((s) => (
                <div key={s.title} className="service-card">
                  <div className="service-card__icon">{s.icon}</div>
                  <h3 className="service-card__title">{s.title}</h3>
                  <p className="service-card__desc">{s.desc}</p>
                  <ul className="service-card__list">
                    {s.items.map((item) => (
                      <li key={item}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="#10b981"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" /></svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a href="#contact" className="service-card__cta">Talk to Me About This →</a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ SOCIAL PROOF BAND ══ */}
        <section className="proof-band">
          <div className="container proof-band__inner">
            <div className="proof-band__stat">
              <strong>$300+</strong>
              <span>avg monthly savings per client</span>
            </div>
            <div className="proof-band__div" />
            <div className="proof-band__stat">
              <strong>80+</strong>
              <span>five-star reviews</span>
            </div>
            <div className="proof-band__div" />
            <div className="proof-band__stat">
              <strong>8+</strong>
              <span>major carriers compared</span>
            </div>
            <div className="proof-band__div" />
            <div className="proof-band__stat">
              <strong>Same Day</strong>
              <span>quotes available</span>
            </div>
          </div>
        </section>

        {/* ══ REVIEWS ══ */}
        <section className="reviews" id="reviews">
          <div className="container">
            <div className="section-header">
              <p className="section-eye">What People Are Saying</p>
              <h2 className="section-h2">Real people. Real results.</h2>
              <p className="section-sub">
                Don&apos;t just take my word for it — here&apos;s what my clients have to say.
              </p>
            </div>
            <div className="reviews__grid">
              {REVIEWS.map((r) => (
                <div key={r.name} className="review-card">
                  <Stars count={r.stars} />
                  <blockquote className="review-card__text">
                    {r.text}
                  </blockquote>
                  <div className="review-card__author">
                    <div className="review-card__avatar">{r.avatar}</div>
                    <div>
                      <strong>{r.name}</strong>
                      <span>{r.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ FAQ ══ */}
        <section className="faq" id="faq">
          <div className="container faq__inner">
            <div className="section-header">
              <p className="section-eye">FAQ</p>
              <h2 className="section-h2">Questions I get a lot</h2>
              <p className="section-sub">Everything you need to know before we chat.</p>
            </div>
            <div className="faq__list">
              {FAQS.map((item, i) => (
                <div
                  key={i}
                  className={`faq__item${openFaq === i ? " faq__item--open" : ""}`}
                >
                  <button
                    className="faq__q"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                  >
                    <span>{item.q}</span>
                    <svg className="faq__chevron" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                    </svg>
                  </button>
                  {openFaq === i && <p className="faq__a">{item.a}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ CONTACT ══ */}
        <section className="contact" id="contact">
          <div className="container contact__inner">
            <div className="contact__copy">
              <p className="section-eye section-eye--light">Get in Touch</p>
              <h2 className="section-h2 section-h2--light">
                Let&apos;s find your<br />perfect plan.
              </h2>
              <p className="contact__sub">
                Fill out the form and I&apos;ll personally reach out within 24 hours.
                No pressure, no obligation — just a real conversation about what&apos;s
                best for you. Rather talk now?
              </p>
              <a href="tel:+13235550192" className="contact__phone-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.56 21 3 13.44 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z" /></svg>
                (323) 555-0192
              </a>
              <div className="contact__socials">
                <a href="#" className="contact__social-btn" aria-label="Facebook">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>
                </a>
                <a href="#" className="contact__social-btn" aria-label="Instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="17.5" cy="6.5" r="1" /></svg>
                </a>
              </div>
            </div>

            <div className="contact__form-wrap">
              {submitted ? (
                <div className="contact__success">
                  <div className="contact__success-icon">🎉</div>
                  <h3>Got it — I&apos;ll be in touch soon!</h3>
                  <p>
                    Thanks for reaching out. I usually get back to people within a
                    few hours. Looking forward to chatting!
                  </p>
                </div>
              ) : (
                <form className="contact__form" onSubmit={handleContact}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>First Name</label>
                      <input name="first" type="text" placeholder="John" required onChange={handleChange} />
                    </div>
                    <div className="form-group">
                      <label>Last Name</label>
                      <input name="last" type="text" placeholder="Smith" required onChange={handleChange} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input name="email" type="email" placeholder="john@email.com" required onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input name="phone" type="tel" placeholder="(555) 000-0000" onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>What are you looking for?</label>
                    <select name="type" onChange={handleChange} defaultValue="">
                      <option value="" disabled>Pick one…</option>
                      <option>Health Insurance</option>
                      <option>Health + Dental + Vision</option>
                      <option>Supplemental / Gap Coverage</option>
                      <option>Not sure yet — help me figure it out</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Anything else? (optional)</label>
                    <textarea name="message" rows={3} placeholder="Tell me a bit about your situation…" onChange={handleChange} />
                  </div>
                  <button type="submit" className="btn btn--primary form-submit">
                    Send It Over →
                  </button>
                  <p className="form-note">100% free · No obligation · No spam</p>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* ══ FOOTER ══ */}
      <footer className="footer">
        <div className="container footer__inner">
          <div className="footer__brand">
            <a href="#home" className="brand brand--light">
              <span className="brand__icon">D</span>
              <div>
                <span className="brand__name">Health Insurance</span>
                <span className="brand__by">by Daniel</span>
              </div>
            </a>
            <p className="footer__tagline">
              Helping self-employed professionals and families find better
              coverage — one honest conversation at a time.
            </p>
          </div>

          <div className="footer__links">
            <div className="footer-col">
              <h4>Pages</h4>
              {NAV_LINKS.map((l) => (
                <a key={l.href} href={l.href}>{l.label}</a>
              ))}
            </div>
            <div className="footer-col">
              <h4>Services</h4>
              <a href="#services">Health Insurance</a>
              <a href="#services">Vision Plans</a>
              <a href="#services">Dental Coverage</a>
              <a href="#services">Supplemental Plans</a>
            </div>
            <div className="footer-col">
              <h4>Reach Me</h4>
              <a href="tel:+13235550192">(323) 555-0192</a>
              <a href="mailto:daniel@healthinsurancebydaniel.com">daniel@healthinsurance<br />bydaniel.com</a>
              <span>Available 7 days a week</span>
            </div>
          </div>
        </div>

        <div className="container footer__bottom">
          <p>© {new Date().getFullYear()} Health Insurance by Daniel. All rights reserved.</p>
          <div className="footer__legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
            <a href="#">Licensing</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
