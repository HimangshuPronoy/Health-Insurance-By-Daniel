"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

/* ── NAV ── */
const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

/* ── CARRIERS ── */
const CARRIERS = [
  { name: "Kaiser Permanente", src: "/logos/kaiser.png" },
  { name: "Molina Healthcare", src: "/logos/molina.png" },
  { name: "Blue Cross Blue Shield", src: "/logos/bluecross.png" },
  { name: "UnitedHealthcare", src: "/logos/united.png" },
  { name: "Aetna", src: "/logos/aetna.png" },
  { name: "Cigna", src: "/logos/cigna.png" },
];

/* ── SERVICES ── */
const SERVICES = [
  {
    icon: "🏥",
    title: "Health Insurance",
    desc: "I\u2019ll dig into your situation — your doctors, your meds, your budget — and find the plan that actually fits. Not just the cheapest option.",
    items: [
      "Individual & Family Plans",
      "Self-Employed Coverage",
      "HSA-Compatible Plans",
      "Short-Term Options",
    ],
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
    items: [
      "Preventive Care",
      "Basic & Major Restorative",
      "Orthodontics",
      "Implant Coverage",
    ],
  },
  {
    icon: "🛡️",
    title: "Supplemental",
    desc: "Your main plan can\u2019t cover everything. I help fill the gaps so you\u2019re protected when life throws a curveball.",
    items: [
      "Critical Illness",
      "Accident Insurance",
      "Hospital Indemnity",
      "Life Insurance",
    ],
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
const ZIP_STATE_MAP: Record<string, string> = {
  AL: "35004-36925",
  AR: "71601-72959",
  CO: "80001-81658",
  DE: "19701-19980",
  FL: "32003-34997",
  GA: "30002-39901",
  IL: "60001-62999",
  IN: "46001-47997",
  IA: "50001-52809",
  KS: "66002-67954",
  KY: "40003-42788",
  LA: "70001-71497",
  MD: "20588-21930",
  MI: "48001-49971",
  MS: "38600-39799",
  MO: "63000-65899",
  MT: "59000-59999",
  NE: "68000-69399",
  NV: "89000-89899",
  NC: "27000-28999",
  OH: "43000-45899",
  OK: "73000-74999",
  SC: "29000-29999",
  SD: "57000-57799",
  TN: "37000-38599",
  TX: "73300,75000-79999",
  UT: "84000-84799",
  VA: "20100,22000-24699",
  WI: "53000-54999",
  WV: "24700-26899",
  WY: "82000-83499",
};

const QUOTE_DATA: Record<string, Record<string, any>> = {
  "M 18-23": { default: "177-269", KS: "147-259", MD: "113-175", NV: "157-259", OH: "160-249", WI: "160-249", WV: "160-249", WY: "160-249", UT: "147-259" },
  "F 18-23": { default: "225-314", KS: "195-289", MD: "135-210", NV: "185-289", UT: "215-295" },
  "M 24-29": { default: "188-295", KS: "147-259", MD: "120-200", NV: "167-286", OH: "167-286", UT: "167-286" },
  "F 24-29": { default: "240-365", CO: "220-349", IL: "228-359", IN: "228-359", IA: "220-349", KS: "210-319", MD: "165-285", NV: "211-319", OH: "211-319", UT: "211-319" },
  "M 30-37": { default: "231-378", IN: "220-355", KS: "197-335", MD: "140-250", NV: "197-335", OH: "221-358", SD: "221-358", UT: "197-335" },
  "F 30-37": { default: "279-429", CO: "250-412", IL: "260-390", IA: "242-380", KS: "242-412", MD: "190-310", NV: "240-389", OH: "260-387", SD: "250-399", UT: "230-380" },
  "M 38-42": { default: "250-392", GA: "240-365", CO: "250-375", IL: "250-375", IN: "240-365", KS: "210-365", MD: "195-289", MS: "250-375", NE: "250-375", NV: "210-365", NC: "250-375", OH: "240-355", TN: "210-365", UT: "210-365" },
  "F 38-42": { default: "302-465", CO: "302-462", IN: "280-425", KS: "280-425", MD: "200-345", NV: "280-422", OH: "300-439", UT: "280-422" },
  "M 43-47": { default: "292-397", MD: "215-310" },
  "F 43-47": { default: "312-474", IL: "302-455", IN: "302-455", IA: "302-455", KS: "302-455", KY: "302-455", LA: "302-455", MD: "225-345", NV: "302-455", OH: "302-455", UT: "292-455" },
  "M 48-52": { default: "375-500", CO: "340-500", MD: "250-350", OK: "340-500" },
  "F 48-52": { default: "365-530", MD: "350-455", UT: "365-500", WI: "365-500", WV: "365-500", WY: "365-500" },
  "M 53-56": { default: "430-575", CO: "350-575", GA: "440-585", KY: "400-575", MD: "300-415", OK: "440-585", SC: "440-585" },
  "F 53-56": { default: "405-550", CO: "395-550", KS: "385-550", LA: "395-550", MD: "332-439", SD: "375-550", TN: "385-550", UT: "394-550" },
  "M 57-60": { default: "495-730", IL: "495-650", IN: "480-575", IA: "480-575", KS: "495-650", KY: "495-650", LA: "495-650", MD: "455-650", MI: "495-650", MS: "495-650", MO: "495-650", MT: "495-650", NE: "495-650", NV: "495-650", NC: "495-650", OH: "495-650", OK: "495-650", SC: "425-650" },
  "F 57-60": { default: "440-585", CO: "375-585", IL: "400-575", IA: "400-575", MD: "350-455", NV: "400-575", OK: "400-575", UT: "390-575" },
  "M 61-64": { default: "514-761", CO: "495-725", FL: "514-788", IN: "504-698", KS: "495-730", MD: "385-580", NV: "495-699", SC: "514-678", UT: "475-650", WV: "514-678" },
  "F 61-64": { default: "485-650", CO: "405-650", MD: "385-550", MI: "400-545", SC: "425-650", UT: "405-620" },
  "Child +": { default: 115, CO: 100, IN: 100, MD: 80 },
};

function getAgeRange(age: number) {
  if (age < 18) return null;
  if (age <= 23) return "18-23";
  if (age <= 29) return "24-29";
  if (age <= 37) return "30-37";
  if (age <= 42) return "38-42";
  if (age <= 47) return "43-47";
  if (age <= 52) return "48-52";
  if (age <= 56) return "53-56";
  if (age <= 60) return "57-60";
  if (age <= 64) return "61-64";
  return null;
}

function calculateRate(age: number, gender: string, state: string) {
  const ageRange = getAgeRange(age);
  if (!ageRange) return null;
  const key = `${gender === "male" ? "M" : "F"} ${ageRange}`;
  const rateObj = QUOTE_DATA[key];
  if (!rateObj) return null;
  const rateStr = rateObj[state] || rateObj.default;
  const [min, max] = rateStr.split("-").map(Number);
  return { min, max };
}

function getStateFromZip(zip: string) {
  for (const [state, range] of Object.entries(ZIP_STATE_MAP)) {
    const parts = range.split(",");
    for (const part of parts) {
      if (part.includes("-")) {
        const [start, end] = part.split("-").map(Number);
        const z = Number(zip);
        if (z >= start && z <= end) return state;
      } else {
        if (part.trim() === zip.trim()) return state;
      }
    }
  }
  return null;
}

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

function QuoteSection() {
  const [zip, setZip] = useState("");
  const [persons, setPersons] = useState([{ age: "", gender: "male" }]);
  const [children, setChildren] = useState(0);
  const [quote, setQuote] = useState<{ min: number; max: number } | null>(null);
  const [error, setError] = useState("");

  const handleAddPerson = () => {
    if (persons.length < 2) {
      setPersons([...persons, { age: "", gender: "female" }]);
    }
  };

  const handleRemovePerson = (index: number) => {
    setPersons(persons.filter((_, i) => i !== index));
  };

  const handlePersonChange = (index: number, key: 'age' | 'gender', value: string) => {
    const newPersons = [...persons];
    (newPersons[index] as any)[key] = value;
    setPersons(newPersons);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setQuote(null);

    const state = getStateFromZip(zip);
    if (!state) {
      setError("Online quoting is not yet available for your state. Please contact Daniel for a manual quote.");
      return;
    }

    let minTotal = 0;
    let maxTotal = 0;

    for (const person of persons) {
      const rate = calculateRate(Number(person.age), person.gender, state);
      if (!rate) {
        setError(`Quote data unavailable for age ${person.age}. We typically cover ages 18-64 online.`);
        return;
      }
      minTotal += rate.min;
      maxTotal += rate.max;
    }

    if (children > 0) {
      const childRate = QUOTE_DATA["Child +"][state] || QUOTE_DATA["Child +"].default;
      minTotal += childRate * children;
      maxTotal += childRate * children;
    }

    setQuote({ min: minTotal, max: maxTotal });
  };

  return (
    <section className="quote-section" id="quote">
      <div className="container">
        <div className="quote-card reveal">
          <div className="quote-card__header">
            <h2 className="quote-card__title">Get an Instant Quote Estimate</h2>
            <p className="quote-card__subtitle">Enter your details for a personalized range based on your location and age.</p>
          </div>
          <form className="quote-form" onSubmit={handleSubmit}>
            <div className="quote-form__row">
              <div className="form-group">
                <label>Zip Code</label>
                <input type="text" placeholder="e.g. 30002" value={zip} onChange={(e) => setZip(e.target.value)} required maxLength={5} />
              </div>
            </div>

            <div className="quote-persons">
              {persons.map((p, i) => (
                <div key={i} className="quote-person-row">
                  <div className="form-group">
                    <label>{i === 0 ? "Your Age" : "Spouse Age"}</label>
                    <input type="number" placeholder="Age" value={p.age} onChange={(e) => handlePersonChange(i, "age", e.target.value)} required min={18} max={64} />
                  </div>
                  <div className="form-group">
                    <label>Gender</label>
                    <select value={p.gender} onChange={(e) => handlePersonChange(i, "gender", e.target.value)}>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  {i > 0 && <button type="button" className="remove-person" onClick={() => handleRemovePerson(i)}>×</button>}
                </div>
              ))}
            </div>

            {persons.length < 2 && (
              <button type="button" className="btn-add-spouse" onClick={handleAddPerson}>+ Add Spouse</button>
            )}

            <div className="quote-form__row" style={{ marginTop: '1rem' }}>
              <div className="form-group">
                <label>Number of Children</label>
                <input type="number" value={children} onChange={(e) => setChildren(Number(e.target.value))} min={0} max={10} />
              </div>
            </div>

            <button type="submit" className="btn btn--primary btn--lg quote-submit">Calculate My Quote Range</button>

            {error && <p className="quote-error">{error}</p>}

            {quote && (
              <div className="quote-result">
                <h3>Estimated Monthly Range</h3>
                <div className="quote-price">
                  <span className="price-val">${quote.min}</span>
                  <span className="price-sep">-</span>
                  <span className="price-val">${quote.max}</span>
                </div>
                <p className="quote-disclaimer">*This is a preliminary estimate. Final rates depend on the specific carrier and plan selection.</p>
                <a href="#contact" className="btn btn--ghost-dark btn--sm" style={{ marginTop: '1rem' }}>Talk to Daniel for Final Rates</a>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [leadForm, setLeadForm] = useState({ name: "", phone: "", type: "" });
  const [contactForm, setContactForm] = useState({
    first: "",
    last: "",
    phone: "",
    type: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const DANIEL_PHONE = "+17736476575";

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  function handleLeadSubmit(e: React.FormEvent) {
    e.preventDefault();
    const body = `New lead from website:%0A- Name: ${leadForm.name}%0A- Phone: ${leadForm.phone}%0A- Looking for: ${leadForm.type || "Not specified"}`;
    window.open(`sms:${DANIEL_PHONE}?&body=${body}`, "_self");
    setLeadSubmitted(true);
  }

  function handleContactSubmit(e: React.FormEvent) {
    e.preventDefault();
    const body = `New inquiry from website:%0A- Name: ${contactForm.first} ${contactForm.last}%0A- Phone: ${contactForm.phone || "Not provided"}%0A- Looking for: ${contactForm.type || "Not specified"}%0A- Message: ${contactForm.message || "None"}`;
    window.open(`sms:${DANIEL_PHONE}?&body=${body}`, "_self");
    setSubmitted(true);
  }

  function handleLeadChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) {
    setLeadForm({ ...leadForm, [e.target.name]: e.target.value });
  }

  function handleContactChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) {
    setContactForm({ ...contactForm, [e.target.name]: e.target.value });
  }

  return (
    <div className="site">
      {/* ══ TOP BAR ══ */}
      <div className="topbar" id="home">
        <div className="container topbar__inner">
          <span>Licensed Independent Broker · Serving All 50 States</span>
          <a href="tel:+17736476575" className="topbar__phone">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.56 21 3 13.44 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z" />
            </svg>
            (773) 647-6575
          </a>
        </div>
      </div>

      {/* ══ HEADER / NAV ══ */}
      <header className="header">
        <div className="container header__inner">
          <a href="#home" className="brand">
            <div>
              <span className="brand__name">Health Insurance</span>
              <span className="brand__by">by Daniel</span>
            </div>
          </a>

          <nav className="nav desktop-nav">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="nav__link">
                {l.label}
              </a>
            ))}
          </nav>

          <a href="#contact" className="btn btn--primary header__cta">
            Let&apos;s Talk
          </a>

          <button
            className="burger"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            ) : (
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
              </svg>
            )}
          </button>
        </div>

        {menuOpen && (
          <nav className="mobile-nav">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="mobile-nav__link"
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              className="btn btn--primary mobile-nav__cta"
              onClick={() => setMenuOpen(false)}
            >
              Let&apos;s Talk
            </a>
          </nav>
        )}
      </header>

      <main>
        {/* ══ HERO ══ */}
        <section className="hero">
          <div className="container hero__inner">
            <div className="hero__copy">
              <div className="hero__pill">
                🤝 Independent Broker · No Extra Cost to You
              </div>
              <h1 className="hero__h1 reveal">
                Health Insurance
                <br />
                <span className="hero__h1-grad">Made Personal.</span>
              </h1>
              <p className="hero__sub reveal reveal--delay-1">
                Hey, I&apos;m Daniel — a licensed independent health insurance
                broker. I work with self-employed professionals, business
                owners, and families to find coverage that actually makes sense.
                I shop every major carrier so <strong>you</strong> don&apos;t
                have to.
              </p>
              <div className="hero__actions reveal reveal--delay-2">
                <a href="#contact" className="btn btn--primary btn--lg">
                  Get My Free Quote
                </a>
                <a href="#about" className="btn btn--outline-light btn--lg">
                  Learn More About Me
                </a>
              </div>
              <div className="hero__proof reveal reveal--delay-3">
                <div className="hero__proof-item">
                  <strong>200+</strong>
                  <span>Plans Compared</span>
                </div>
                <div className="hero__proof-divider" />
                <div className="hero__proof-item">
                  <strong>100%</strong>
                  <span>Free Service</span>
                </div>
                <div className="hero__proof-divider" />
                <div className="hero__proof-item">
                  <strong>All 50</strong>
                  <span>States Licensed</span>
                </div>
              </div>
            </div>

            {/* Lead intake card */}
            <div className="lead-card reveal reveal--delay-4">
              <div className="lead-card__head">
                <Image src="/daniel.png" alt="Daniel" width={64} height={64} className="lead-card__avatar object-cover aspect-square" style={{ borderRadius: '50%', objectPosition: 'center top' }} />
                <div>
                  <p className="lead-card__hi">Hey there 👋 I&apos;m Daniel</p>
                  <p className="lead-card__tagline">
                    Let me find your perfect plan
                  </p>
                </div>
              </div>
              {leadSubmitted ? (
                <div
                  className="contact__success"
                  style={{ padding: "2rem", textAlign: "center" }}
                >
                  <div className="contact__success-icon">🎉</div>
                  <h3>Got it — I&apos;ll be in touch soon!</h3>
                  <p>
                    Thanks for reaching out. I usually get back within a few
                    hours.
                  </p>
                </div>
              ) : (
                <form className="lead-form" onSubmit={handleLeadSubmit}>
                  <div className="lead-form__group">
                    <label htmlFor="lf-name">Your Name</label>
                    <input
                      id="lf-name"
                      name="name"
                      type="text"
                      placeholder="First & Last Name"
                      required
                      onChange={handleLeadChange}
                    />
                  </div>
                  <div className="lead-form__group">
                    <label htmlFor="lf-phone">Phone</label>
                    <input
                      id="lf-phone"
                      name="phone"
                      type="tel"
                      placeholder="(555) 000-0000"
                      required
                      onChange={handleLeadChange}
                    />
                  </div>
                  <div className="lead-form__group">
                    <label htmlFor="lf-type">What are you looking for?</label>
                    <select
                      id="lf-type"
                      name="type"
                      onChange={handleLeadChange}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Pick one…
                      </option>
                      <option>Health Insurance</option>
                      <option>Health + Dental + Vision</option>
                      <option>Supplemental / Gap Coverage</option>
                      <option>Not sure yet — help me figure it out</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="btn btn--primary lead-form__submit"
                  >
                    Get My Free Quote →
                  </button>
                  <p className="lead-form__note">
                    No spam, ever. I&apos;ll personally reach out within 24 hrs.
                  </p>
                </form>
              )}
            </div>
          </div>

          <div className="hero__wave">
            <svg viewBox="0 0 1440 70" preserveAspectRatio="none" fill="white">
              <path d="M0,40 C400,80 1040,0 1440,40 L1440,70 L0,70 Z" />
            </svg>
          </div>
        </section>

        <QuoteSection />

        {/* ══ CARRIERS ══ */}
        <section className="carriers">
          <div className="container">
            <p className="carriers__label">
              Carriers I personally compare for you
            </p>
          </div>
          <div className="carriers__marquee">
            <div className="carriers__track">
              {/* Render lists multiple times to ensure seamless infinite scroll on wide screens */}
              {[...CARRIERS, ...CARRIERS, ...CARRIERS].map((c, i) => (
                <div key={`${c.name}-${i}`} className="carrier-chip">
                  <div className="carrier-logo-wrapper">
                    <Image src={c.src} alt={c.name} fill style={{ objectFit: 'contain' }} />
                  </div>
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
                <Image src="/daniel.png" alt="Daniel" fill className="object-cover" style={{ objectPosition: 'center top' }} />
              </div>
              <div className="about__card-float">
                <div className="about__card-float-icon">⭐</div>
                <div>
                  <strong>5.0 Rating</strong>
                  <p>Based on 80+ client reviews</p>
                </div>
              </div>
            </div>

            <div className="about__copy reveal reveal--delay-1">
              <p className="section-eye">A Little About Me</p>
              <h2 className="section-h2">
                I&apos;m Daniel — your broker,
                <br />
                your advocate.
              </h2>
              <p>
                I got into health insurance because I watched too many people in
                my circle — talented freelancers, small business owners, real
                families — overpaying for coverage they didn&apos;t fully
                understand. That didn&apos;t sit right with me.
              </p>
              <p>
                As an independent broker, I&apos;m not tied to any single
                carrier. That means I work
                <em> for you</em>, not for Kaiser or UnitedHealthcare. My job is
                to find the plan that fits your doctors, your prescriptions, and
                your budget.
              </p>
              <p>
                Whether you&apos;re newly self-employed, growing a family, or
                just tired of paying too much — I make this whole process
                simple, transparent, and honestly kind of painless.
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
                  <span className="about__hl-icon">✓</span>I stick with you
                  after enrollment
                </div>
              </div>
              <a href="#contact" className="btn btn--primary btn--lg">
                Book a Free Call with Me
              </a>
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
                Health, dental, vision, supplemental — I handle it all so you
                don&apos;t have to talk to five different people.
              </p>
            </div>
            <div className="services__grid">
              {SERVICES.map((s, i) => (
                <div
                  key={s.title}
                  className={`service-card reveal reveal--delay-${(i % 4) + 1}`}
                >
                  <div className="service-card__icon">{s.icon}</div>
                  <h3 className="service-card__title">{s.title}</h3>
                  <p className="service-card__desc">{s.desc}</p>
                  <ul className="service-card__list">
                    {s.items.map((item) => (
                      <li key={item}>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="#10b981"
                        >
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a href="#contact" className="service-card__cta">
                    Talk to Me About This →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ SOCIAL PROOF BAND ══ */}
        <section className="proof-band">
          <div className="container proof-band__inner reveal">
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
                Don&apos;t just take my word for it — here&apos;s what my
                clients have to say.
              </p>
            </div>
            <div className="reviews__grid">
              {REVIEWS.map((r, i) => (
                <div
                  key={r.name}
                  className={`review-card reveal reveal--delay-${(i % 3) + 1}`}
                >
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
          <div className="container faq__inner reveal">
            <div className="section-header">
              <p className="section-eye">FAQ</p>
              <h2 className="section-h2">Questions I get a lot</h2>
              <p className="section-sub">
                Everything you need to know before we chat.
              </p>
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
                    <svg
                      className="faq__chevron"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
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
            <div className="contact__copy reveal">
              <p className="section-eye section-eye--light">Get in Touch</p>
              <h2 className="section-h2 section-h2--light">
                Let&apos;s find your
                <br />
                perfect plan.
              </h2>
              <p className="contact__sub">
                Fill out the form and I&apos;ll personally reach out within 24
                hours. No pressure, no obligation — just a real conversation
                about what&apos;s best for you. Rather talk now?
              </p>
              <a href="tel:+17736476575" className="contact__phone-link">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.56 21 3 13.44 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z" />
                </svg>
                (773) 647-6575
              </a>
              <div className="contact__socials">
                <a
                  href="https://www.facebook.com/profile.php?id=61569362900902"
                  className="contact__social-btn"
                  aria-label="Facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/healthinsurancebydaniel"
                  className="contact__social-btn"
                  aria-label="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="5"
                      ry="5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <circle cx="17.5" cy="6.5" r="1" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="contact__form-wrap reveal reveal--delay-1">
              {submitted ? (
                <div className="contact__success">
                  <div className="contact__success-icon">🎉</div>
                  <h3>Got it — I&apos;ll be in touch soon!</h3>
                  <p>
                    Thanks for reaching out. I usually get back to people within
                    a few hours. Looking forward to chatting!
                  </p>
                </div>
              ) : (
                <form className="contact__form" onSubmit={handleContactSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>First Name</label>
                      <input
                        name="first"
                        type="text"
                        placeholder="John"
                        required
                        onChange={handleContactChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Last Name</label>
                      <input
                        name="last"
                        type="text"
                        placeholder="Smith"
                        required
                        onChange={handleContactChange}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      name="phone"
                      type="tel"
                      placeholder="(555) 000-0000"
                      required
                      onChange={handleContactChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>What are you looking for?</label>
                    <select
                      name="type"
                      onChange={handleContactChange}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Pick one…
                      </option>
                      <option>Health Insurance</option>
                      <option>Health + Dental + Vision</option>
                      <option>Supplemental / Gap Coverage</option>
                      <option>Not sure yet — help me figure it out</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Anything else? (optional)</label>
                    <textarea
                      name="message"
                      rows={3}
                      placeholder="Tell me a bit about your situation…"
                      onChange={handleContactChange}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn--primary form-submit"
                  >
                    Send It Over →
                  </button>
                  <p className="form-note">
                    100% free · No obligation · No spam
                  </p>
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
              <Image
                src="/daniel.png"
                alt="Daniel"
                className="brand__icon object-cover aspect-square"
                style={{ borderRadius: "50%", objectPosition: "center top" }}
                width={44}
                height={44}
              />
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
                <a key={l.href} href={l.href}>
                  {l.label}
                </a>
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
              <a href="tel:+17736476575">(773) 647-6575</a>
              <a
                href="https://www.instagram.com/healthinsurancebydaniel"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61569362900902"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
              <span>Available 7 days a week</span>
            </div>
          </div>
        </div>

        <div className="container footer__bottom">
          <p>
            © {new Date().getFullYear()} Health Insurance by Daniel. All rights
            reserved.
          </p>
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
