import { useState, useEffect } from "react";

const PHOTO = "/photo.jpg";
const LOGO = "/logo.jpg";
const FAULHORN = "/faulhorn.jpg";


const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ink: #16140f;
    --warm: #9a8878;
    --rule: rgba(22,20,15,0.1);
    --serif: 'Cormorant Garamond', Georgia, serif;
    --sans: 'Jost', sans-serif;
  }

  html { scroll-behavior: smooth; }
  body {
    background: #f4f0eb;
    color: var(--ink);
    font-family: var(--sans);
    font-weight: 300;
    -webkit-font-smoothing: antialiased;
    min-height: 100vh;
  }

  /* NAV */
  nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 48px; height: 56px;
    background: rgba(244,240,235,0.92);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--rule);
  }
  .nav-name {
    font-family: var(--serif);
    font-size: 15px; font-weight: 400;
    letter-spacing: 0.08em;
    cursor: pointer;
  }
  .nav-links { display: flex; gap: 40px; }
  .nav-link {
    font-size: 10px; letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(22,20,15,0.45);
    background: none; border: none;
    font-family: var(--sans); font-weight: 300;
    cursor: pointer; transition: color 0.2s;
  }
  .nav-link:hover, .nav-link.active { color: var(--ink); }

  /* PAGES */
  .page { min-height: 100vh; padding-top: 56px; }

  /* ── HOME ── */
  .home {
    height: 100vh;
    display: flex; align-items: center; justify-content: center;
    position: relative; overflow: hidden;
  }
  .home-logo-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
    animation: fadeUp 1s ease both;
  }
  .home-logo-img {
    height: 440px;
    width: auto;
    display: block;
    filter: saturate(0.12) contrast(1.05) brightness(1.02);
    object-fit: contain;
  }
  .home-subtitle {
    font-family: var(--sans);
    font-size: 9px;
    font-weight: 300;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: var(--warm);
    margin-top: 10px;
    text-indent: 0.28em;
  }
  .home-wordmark {
    font-family: var(--serif);
    font-size: 19px;
    font-weight: 300;
    letter-spacing: 0.32em;
    text-transform: uppercase;
    text-indent: 0.32em;
    color: var(--ink);
    margin-top: -4px;
  }

  /* ── ABOUT ── */
  .about-wrap {
    max-width: 1080px; margin: 0 auto;
    padding: 80px 48px 120px;
    display: grid;
    grid-template-columns: 320px 1fr;
    gap: 80px;
    align-items: start;
  }
  .about-photo-col {}
  .about-photo {
    width: 100%;
    aspect-ratio: 3/4;
    object-fit: cover;
    object-position: center top;
    display: block;
    filter: saturate(0.88) contrast(1.02);
  }
  .about-photo-caption {
    margin-top: 14px;
    font-size: 10px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--warm);
  }
  .about-text-col {}
  .section-label {
    font-size: 9px; letter-spacing: 0.28em;
    text-transform: uppercase; color: var(--warm);
    margin-bottom: 28px; display: block;
  }
  .about-bio p {
    font-family: var(--serif);
    font-size: 19px; line-height: 1.78;
    font-weight: 300; color: var(--ink);
    margin-bottom: 22px;
  }
  .about-bio em {
    font-style: italic;
  }
  .about-bio strong {
    font-weight: 500;
  }

  /* ── SLATE ── */
  .slate-wrap {
    max-width: 860px; margin: 0 auto;
    padding: 80px 48px 120px;
  }
  .slate-intro {
    font-family: var(--serif);
    font-size: 17px; line-height: 1.7;
    color: rgba(22,20,15,0.55);
    max-width: 520px;
    margin-bottom: 60px;
    font-weight: 300;
  }
  .project {
    border-top: 1px solid var(--rule);
    padding: 32px 0;
    cursor: pointer;
  }
  .project:last-child { border-bottom: 1px solid var(--rule); }
  .project-header {
    display: flex; align-items: baseline;
    justify-content: space-between; gap: 24px;
    margin-bottom: 6px;
  }
  .project-title {
    font-family: var(--serif);
    font-size: 28px; font-weight: 400;
    letter-spacing: -0.01em;
    transition: color 0.2s;
  }
  .project:hover .project-title { color: var(--warm); }
  .project-status {
    font-size: 8px; letter-spacing: 0.2em;
    text-transform: uppercase;
    padding: 3px 9px; border-radius: 2px;
    white-space: nowrap; flex-shrink: 0;
    font-weight: 400;
  }
  .project-meta {
    font-size: 10px; letter-spacing: 0.16em;
    text-transform: uppercase; color: var(--warm);
    margin-bottom: 14px;
  }
  .project-logline {
    font-family: var(--serif);
    font-size: 16px; line-height: 1.65;
    color: rgba(22,20,15,0.7); font-weight: 300;
    max-width: 640px;
  }
  .project-detail {
    margin-top: 0; max-height: 0; overflow: hidden;
    opacity: 0; transition: max-height 0.3s ease, opacity 0.3s ease, margin-top 0.3s ease;
    font-size: 11px; letter-spacing: 0.04em; line-height: 1.7;
    color: rgba(22,20,15,0.45);
  }
  .project-detail.open {
    max-height: 100px; opacity: 1; margin-top: 14px;
  }

  /* ── CONTACT ── */
  .contact-wrap {
    max-width: 580px; margin: 0 auto;
    padding: 80px 48px 120px;
  }
  .contact-wrap p {
    font-family: var(--serif);
    font-size: 19px; line-height: 1.7;
    color: rgba(22,20,15,0.6); font-weight: 300;
    margin-bottom: 56px;
  }
  .contact-items { display: flex; flex-direction: column; gap: 28px; }
  .contact-item-label {
    font-size: 9px; letter-spacing: 0.26em;
    text-transform: uppercase; color: var(--warm);
    margin-bottom: 6px;
  }
  .contact-item-value {
    font-family: var(--serif); font-size: 18px;
    color: var(--ink);
  }
  .contact-item-value a {
    color: var(--ink); text-decoration: none;
    border-bottom: 1px solid rgba(22,20,15,0.18);
    transition: border-color 0.2s;
  }
  .contact-item-value a:hover { border-color: var(--ink); }

  /* FOOTER */
  footer {
    border-top: 1px solid var(--rule);
    padding: 24px 48px;
    display: flex; justify-content: space-between;
    font-size: 9px; letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(22,20,15,0.3);
  }


  /* ── CONTACT FORM ── */
  .inquiry-form { display: flex; flex-direction: column; gap: 20px; }
  .form-row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .form-field { display: flex; flex-direction: column; gap: 6px; }
  .form-label {
    font-size: 9px; letter-spacing: 0.24em;
    text-transform: uppercase; color: var(--warm);
  }
  .form-input {
    font-family: var(--sans); font-weight: 300;
    font-size: 14px; color: var(--ink);
    background: rgba(22,20,15,0.04);
    border: 1px solid rgba(22,20,15,0.12);
    border-radius: 2px;
    padding: 11px 14px;
    outline: none;
    transition: border-color 0.2s;
    resize: none;
  }
  .form-input:focus { border-color: rgba(22,20,15,0.35); }
  .form-input::placeholder { color: rgba(22,20,15,0.3); }
  .form-textarea { font-family: var(--sans); }
  .form-submit {
    align-self: flex-start;
    font-family: var(--sans); font-weight: 400;
    font-size: 10px; letter-spacing: 0.24em;
    text-transform: uppercase;
    background: var(--ink); color: #f4f0eb;
    border: none; padding: 13px 28px;
    cursor: pointer; transition: opacity 0.2s;
  }
  .form-submit:hover { opacity: 0.75; }
  .form-submit:disabled { opacity: 0.4; cursor: default; }
  .form-error {
    font-size: 11px; color: #a04040;
    letter-spacing: 0.04em;
  }
  .form-email-bottom {
    display: flex; flex-direction: column; gap: 5px;
    padding-top: 4px;
  }
  .form-email-link {
    font-family: var(--serif); font-size: 16px;
    color: var(--ink); text-decoration: none;
    border-bottom: 1px solid rgba(22,20,15,0.18);
    align-self: flex-start;
    transition: border-color 0.2s;
  }
  .form-email-link:hover { border-color: var(--ink); }
  .form-based {
    font-size: 9px; letter-spacing: 0.2em;
    text-transform: uppercase; color: rgba(22,20,15,0.25);
    padding-top: 8px;
  }
  .form-sent { padding: 40px 0; }
  .form-sent-title {
    font-family: var(--serif); font-size: 26px;
    font-weight: 300; margin-bottom: 8px;
  }
  .form-sent-sub {
    font-size: 12px; letter-spacing: 0.12em;
    color: var(--warm);
  }
  @media (max-width: 600px) {
    .form-row-2 { grid-template-columns: 1fr; }
  }

  /* ABOUT BOTTOM PHOTO */
  .about-bottom-photo-wrap {
    max-width: 1080px;
    margin: 0 auto;
    padding: 0 48px 80px;
    display: flex;
    justify-content: center;
  }
  .about-bottom-photo {
    width: 320px;
    display: block;
    object-fit: cover;
  }
  .about-bottom-caption {
    margin-top: 10px;
    font-size: 10px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--warm);
  }

  /* MOBILE */
  @media (max-width: 768px) {
    nav { padding: 0 24px; }
    .nav-links { gap: 24px; }
    .about-wrap { grid-template-columns: 1fr; gap: 40px; padding: 60px 24px 80px; }
    .about-photo { aspect-ratio: 4/3; }
    .slate-wrap, .contact-wrap { padding: 60px 24px 80px; }
    .home-logo-img { height: 300px; }
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const PROJECTS = [
  {
    id: "nak-muay",
    title: "NAK MUAY",
    format: "Feature Film",
    territory: "Thailand",
    genre: "Sports Drama",
    status: "Pre-Production",
    statusBg: "#f0e8d8",
    statusColor: "#9a7040",
    logline: "A celebrated Muay Thai champion, undone by a public breakdown and the weight of a childhood tragedy, retreats to rural Thailand — and must decide if he has one fight left in him.",
    detail: "Director: Tinge Krishnan. Production Company: Disruptive Films UK. Principal photography 2026, Thailand. Chip Signore attached as Co-Producer.",
  },
  {
    id: "bloomability",
    title: "BLOOMABILITY",
    format: "Limited Series",
    territory: "Switzerland · USA",
    genre: "Coming-of-Age",
    status: "Development",
    statusBg: "#e8eee8",
    statusColor: "#4a6e4a",
    logline: "A thirteen-year-old American girl, uprooted and deposited at an international boarding school in Lugano, discovers over the course of a year that the world is larger and more magnificent than anything she left behind.",
    detail: "Based on the novel by Newbery Medal author Sharon Creech. Rights inquiry in progress.",
  },
  {
    id: "taranta",
    title: "TARANTA",
    format: "Short Film → Feature",
    territory: "Puglia, Italy",
    genre: "Folk Horror",
    status: "Development",
    statusBg: "#e8eee8",
    statusColor: "#4a6e4a",
    logline: "In the sun-bleached heel of Italy, a woman is seized by the ancient folk madness of tarantism — and the village must decide whether to cure her or consume her.",
    detail: "Director: Edoardo Brighenti. Producer: Paolo Maria Pedullà. Short first, feature to follow.",
  },
  {
    id: "mirabelle",
    title: "MIRABELLE",
    format: "Feature Film",
    territory: "Puglia, Italy",
    genre: "Psychological Western",
    status: "Development",
    statusBg: "#e8eee8",
    statusColor: "#4a6e4a",
    logline: "Montana, 1890. A woman sentenced to hang for the murder of her family sits across from a sheriff and tells her story — haunted by a phantom version of herself that only she can see.",
    detail: "Written and to be directed by Jesse Nye. Italian co-production structure in development.",
  },
  {
    id: "concertina",
    title: "CONCERTINA",
    format: "Feature Film",
    territory: "Bangkok",
    genre: "Period Thriller",
    status: "Development",
    statusBg: "#e8eee8",
    statusColor: "#4a6e4a",
    logline: "Bangkok, postwar. A city of ghosts, concessions, and dangerous music. A period thriller set in the shadow of empire.",
    detail: "Written and to be directed by Jesse Nye.",
  },
  {
    id: "lily",
    title: "LILY",
    format: "Limited Series",
    territory: "Shanghai",
    genre: "Drama",
    status: "Development",
    statusBg: "#e8eee8",
    statusColor: "#4a6e4a",
    logline: "A portrait of a young woman in contemporary Shanghai — free-spirited, entirely herself — told across three seasons of a life.",
    detail: "Chinese writer attachment in progress.",
  },
];

function HomePage() {
  return (
    <div className="page home">
      <div className="home-logo-wrap">
        <img className="home-logo-img" src={LOGO} alt="Shoveling Rock" />
        <div className="home-wordmark">Shoveling Rock</div>
        <div className="home-subtitle">A Storytelling Enterprise</div>
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <>
    <div className="page">
      <div className="about-wrap">
        <div className="about-photo-col">
          <img className="about-photo" src={PHOTO} alt="Chip Signore" />
          <div className="about-photo-caption">Huangshan, China · 2026</div>
        </div>
        <div className="about-text-col">
          <span className="section-label">About</span>
          <div className="about-bio">
            <p>
              Chip Signore has spent thirty years at the center of American
              film and television. A Producer and DGA First Assistant Director,
              he began his career in the New York independent film explosion of
              the nineties — a truly disruptive moment in the story of American
              cinema. Working persistently in that world, including five collaborations
              with producer Ted Hope that collectively earned four Academy and
              four Emmy Award nominations.
            </p>
            <p>
              Over the three decades that followed, he built a genuinely distinguished body of work
              in American independent film and television. Not by chasing
              franchises — by finding the filmmakers
              with something real to say and putting himself at the center of
              their work. <em>Precious</em> won two Academy Awards. <em>The
              Savages</em>, <em>American Splendor</em>, and <em>Junebug</em>
              earned Oscar nominations. <em>Watchmen</em> won eleven Emmys.
              <em>Cinema Verite</em> was nominated for nine.
              <em>Chappelle's Show</em> changed what television comedy could be.
              Ten of his films premiered at Sundance — three of them won prizes
              there, one opened the festival. It is, by any measure, an
              extraordinary record.
            </p>

            <p>
              Work in Mexico City, Budapest, and Bangkok has inspired a deep
              affection for cross-cultural storytelling. Shoveling Rock is the
              inevitable next chapter — a production company developing and
              executing international projects, with a current slate of films
              set in Thailand, Italy, Switzerland, and Shanghai. The goal is to
              keep fighting to tell meaningful, impactful stories that will
              entertain and challenge audiences to see the world — and
              themselves — in a new way. He is based between Los Angeles
              and Paris.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div className="about-bottom-photo-wrap">
      <div>
        <img className="about-bottom-photo" src={FAULHORN} alt="Faulhorn, Switzerland" />
        <div className="about-bottom-caption">Grindelwald, Switzerland · 2019</div>
      </div>
    </div>
    </>
  );
}

function SlatePage() {
  const [open, setOpen] = useState(null);
  return (
    <div className="page">
      <div className="slate-wrap">
        <span className="section-label">Current Projects</span>
        <div className="project-list">
          {PROJECTS.map((p) => (
            <div
              key={p.id}
              className="project"
              onClick={() => setOpen(open === p.id ? null : p.id)}
            >
              <div className="project-header">
                <div className="project-title">{p.title}</div>
                <div
                  className="project-status"
                  style={{ background: p.statusBg, color: p.statusColor }}
                >
                  {p.status}
                </div>
              </div>
              <div className="project-meta">
                {p.format} &nbsp;·&nbsp; {p.territory} &nbsp;·&nbsp; {p.genre}
              </div>
              <div className="project-logline">{p.logline}</div>
              <div className={`project-detail ${open === p.id ? "open" : ""}`}>
                {p.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ContactPage() {
  const [form, setForm] = useState({ name: "", org: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/mwpkqdnp" /* → shovelingrock@gmail.com */, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          name: form.name,
          organization: form.org,
          email: form.email,
          message: form.message,
        }),
      });
      if (res.ok) { setStatus("sent"); setForm({ name: "", org: "", email: "", message: "" }); }
      else setStatus("error");
    } catch { setStatus("error"); }
  };

  return (
    <div className="page">
      <div className="contact-wrap">
        <span className="section-label">Contact</span>
        <p>
          Shoveling Rock is open to co-production conversations, financing
          partnerships, and producing engagements.
        </p>
        {status === "sent" ? (
          <div className="form-sent">
            <div className="form-sent-title">Message received.</div>
            <div className="form-sent-sub">We\u2019ll be in touch.</div>
          </div>
        ) : (
          <div className="inquiry-form">
            <div className="form-row-2">
              <div className="form-field">
                <label className="form-label">Name *</label>
                <input
                  className="form-input"
                  name="name" value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                />
              </div>
              <div className="form-field">
                <label className="form-label">Organization</label>
                <input
                  className="form-input"
                  name="org" value={form.org}
                  onChange={handleChange}
                  placeholder="Company or project"
                />
              </div>
            </div>
            <div className="form-field">
              <label className="form-label">Email *</label>
              <input
                className="form-input"
                name="email" type="email" value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
              />
            </div>
            <div className="form-field">
              <label className="form-label">Message *</label>
              <textarea
                className="form-input form-textarea"
                name="message" value={form.message}
                onChange={handleChange}
                placeholder="What would you like to discuss?"
                rows={5}
              />
            </div>
            {status === "error" && (
              <div className="form-error">Please fill in all required fields.</div>
            )}
            <button
              className="form-submit"
              onClick={handleSubmit}
              disabled={status === "sending"}
            >
              {status === "sending" ? "Sending\u2026" : "Send Inquiry"}
            </button>
            <div className="form-email-bottom">
              <span className="form-label">Or email directly</span>
              <a className="form-email-link" href="mailto:shovelingrock@gmail.com">shovelingrock@gmail.com</a>
            </div>
            <div className="form-based">Los Angeles · Paris</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  return (
    <>
      <style>{CSS}</style>
      <nav>
        <div className="nav-name" onClick={() => setPage("home")}>
          Shoveling Rock
        </div>
        <div className="nav-links">
          {["about", "slate", "contact"].map((p) => (
            <button
              key={p}
              className={`nav-link ${page === p ? "active" : ""}`}
              onClick={() => setPage(p)}
            >
              {p}
            </button>
          ))}
        </div>
      </nav>

      {page === "home"    && <HomePage />}
      {page === "about"   && <AboutPage />}
      {page === "slate"   && <SlatePage />}
      {page === "contact" && <ContactPage />}

      {page !== "home" && (
        <footer>
          <span>© 2025 Shoveling Rock</span>
          <span>Los Angeles · Paris</span>
        </footer>
      )}
    </>
  );
}
