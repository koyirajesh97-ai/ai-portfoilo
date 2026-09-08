"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  Code2,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Menu,
  Moon,
  MoveUpRight,
  Sun,
  X,
} from "lucide-react";

const experiences = [
  {
    number: "01",
    company: "Goldman Sachs",
    role: "Senior Software Engineer",
    dates: "Aug 2024 — Present",
    location: "Dallas, TX",
    color: "gold",
    intro: "Building the financial infrastructure behind how employees understand and move their wealth.",
    points: [
      "Architected an Nx monorepo micro-frontend platform across 8+ internal financial products, accelerating delivery by 35%.",
      "Delivered SAML 2.0 / OAuth 2.0 SSO across 12 platforms, securing access for 15,000+ users.",
      "Scaled LLM-powered test generation from 58% → 93% coverage with zero manual authoring overhead.",
      "Sustained zero critical CVEs for 12+ months across a 10+ microservice observability footprint.",
    ],
    stack: ["Next.js 14", "Java 21/25", "AWS", "Nx", "Kubernetes", "AI Agents"],
  },
  {
    number: "02",
    company: "TIAA",
    role: "Senior Software Developer",
    dates: "Oct 2022 — Jun 2024",
    location: "Charlotte, NC",
    color: "blue",
    intro: "Making retirement services faster, safer, and more accessible for millions of people.",
    points: [
      "Designed an Angular 15 component library adopted across 4 product lines serving 5M+ customers.",
      "Cut average API response time from 320ms to 95ms through indexing, query analysis, and pool tuning.",
      "Achieved SOC2 Type II compliance 3 weeks early while closing 6 critical authentication vulnerabilities.",
      "Built resilient market-data integrations reaching 99.95% availability with circuit breakers.",
    ],
    stack: ["Angular 15", "Spring Boot", "Oracle", "Jenkins", "EKS", "Resilience4j"],
  },
  {
    number: "03",
    company: "Wipro × FedEx",
    role: "Project Engineer",
    dates: "Jan 2020 — Aug 2021",
    location: "Hyderabad, India",
    color: "coral",
    intro: "Turning global logistics complexity into dependable software operations.",
    points: [
      "Developed 3 Spring Boot applications supporting $500M+ in annual shipment operations.",
      "Improved throughput by 22% with async processing, thread-pool tuning, and Redis caching.",
      "Led a 5-member production squad, reducing MTTR by 45% and downtime by 30% year over year.",
      "Eliminated recurring timeouts by redesigning schemas and rewriting 40+ stored procedures.",
    ],
    stack: ["Java 11", "Spring Boot", "Oracle", "Redis", "Docker", "Splunk"],
  },
];

const skillGroups: [string, string, string[]][] = [
  ["01", "Frontend", ["React 18", "Next.js 14", "Angular 15", "TypeScript", "Tailwind", "Storybook"]],
  ["02", "Backend", ["Java 21 / 25", "Spring Boot 3", "Node.js", "REST", "GraphQL", "Kafka"]],
  ["03", "Cloud & Data", ["AWS", "Lambda", "SQS", "MongoDB", "PostgreSQL", "Redis"]],
  ["04", "DevOps & IaC", ["Kubernetes / EKS", "Docker", "Terraform", "Helm", "Jenkins", "Grafana"]],
  ["05", "Architecture", ["Nx Monorepo", "Micro-frontends", "Module Federation", "DDD", "Event-driven", "SOLID"]],
  ["06", "AI & Security", ["Copilot Agents", "Claude Agents", "Devin AI", "OAuth 2.0", "SAML 2.0", "OWASP"]],
];

const stats = [
  { value: 93, suffix: "%", label: "Test coverage", detail: "up from 58% via AI-driven test generation" },
  { value: 95, suffix: "ms", label: "API response time", detail: "down from 320ms at TIAA" },
  { value: 500, suffix: "K+", label: "Daily transactions", detail: "processed across financial workflows" },
  { value: 15, suffix: "K+", label: "Users on enterprise SSO", detail: "across 12 internal platforms" },
];

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1200;
    const step = (time: number) => {
      if (!start) start = time;
      const progress = Math.min((time - start) / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value]);
  return <span ref={ref}>{count}{suffix}</span>;
}

function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 450, damping: 35 });
  const springY = useSpring(y, { stiffness: 450, damping: 35 });
  useEffect(() => {
    const move = (event: MouseEvent) => { x.set(event.clientX); y.set(event.clientY); };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);
  return <motion.div className="cursor-dot" style={{ x: springX, y: springY }} />;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [light, setLight] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = ["Senior Software Engineer", "AI-Augmented Builder", "Fintech Systems Architect"];

  useEffect(() => {
    const saved = localStorage.getItem("rk-theme");
    if (saved === "light") setLight(true);
    const interval = window.setInterval(() => setRoleIndex((index) => (index + 1) % roles.length), 2800);
    return () => window.clearInterval(interval);
  }, [roles.length]);

  useEffect(() => {
    document.documentElement.dataset.theme = light ? "light" : "dark";
    localStorage.setItem("rk-theme", light ? "light" : "dark");
  }, [light]);

  return (
    <main>
      <Cursor />
      <div className="grain" aria-hidden="true" />
      <nav className="nav">
        <a className="brand" href="#top" aria-label="Rajesh Koyi home">
          <span className="brand-mark">RK<span>.</span></span>
          <span className="brand-name">RAJESH KOYI</span>
        </a>
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <a href="#work" onClick={() => setMenuOpen(false)}>Work</a>
          <a href="#approach" onClick={() => setMenuOpen(false)}>Approach</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </div>
        <div className="nav-actions">
          <button className="theme-toggle" onClick={() => setLight((value) => !value)} aria-label="Toggle color theme">
            {light ? <Moon size={15} /> : <Sun size={15} />}
          </button>
          <a className="nav-cta" href="#contact">Let&apos;s talk <ArrowUpRight size={15} /></a>
          <button className="menu-toggle" onClick={() => setMenuOpen((value) => !value)} aria-label="Toggle menu">
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      <section className="hero" id="top">
        <div className="hero-orbit orbit-one" />
        <div className="hero-orbit orbit-two" />
        <div className="hero-grid" />
        <div className="hero-content">
          <motion.div className="eyebrow" initial={{ y: 16 }} animate={{ y: 0 }} transition={{ delay: 0.2 }}>
            <span className="status-dot" /> Available for senior / staff opportunities
          </motion.div>
          <motion.p className="role-line" initial={{ y: 10 }} animate={{ y: 0 }} transition={{ delay: 0.4 }}>
            <span className="role-index">0{roleIndex + 1}</span> / 03 <span className="role-arrow">→</span> {roles[roleIndex]}
          </motion.p>
          <motion.h1 initial={{ y: 34 }} animate={{ y: 0 }} transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
            Building what&apos;s <em>next.</em>
          </motion.h1>
          <motion.div className="hero-bottom" initial={{ y: 22 }} animate={{ y: 0 }} transition={{ delay: 0.65 }}>
            <p className="hero-copy">I&apos;m Rajesh — a senior engineer designing fault-tolerant platforms, elegant interfaces, and AI-augmented systems that move critical work forward.</p>
            <div className="hero-buttons">
              <a className="button button-primary" href="#work">View selected work <ArrowDownRight size={17} /></a>
              <a className="button button-ghost" href="#contact">Download resume <Download size={16} /></a>
            </div>
          </motion.div>
        </div>
        <div className="scroll-cue"><span>Scroll to explore</span><ArrowDownRight size={16} /></div>
        <div className="hero-coordinate">32° 46&apos; N / 96° 47&apos; W</div>
      </section>

      <section className="stats-section section-pad" id="impact">
        <div className="section-intro">
          <Reveal><p className="kicker">01 / IMPACT</p></Reveal>
          <Reveal delay={0.1}><h2>Numbers that<br /><em>carry weight.</em></h2></Reveal>
          <Reveal delay={0.2}><p className="muted intro-copy">The best engineering is measurable. A snapshot of the outcomes behind the code.</p></Reveal>
        </div>
        <div className="stats-grid">
          {stats.map((stat, i) => (
            <Reveal delay={i * 0.08} key={stat.label}>
              <div className="stat-card">
                <div className="stat-value"><CountUp value={stat.value} suffix={stat.suffix} /></div>
                <div className="stat-label">{stat.label}</div>
                <p>{stat.detail}</p>
                <span className="stat-index">0{i + 1}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="skills-section section-pad" id="approach">
        <div className="section-intro">
          <Reveal><p className="kicker">02 / CAPABILITIES</p></Reveal>
          <Reveal delay={0.1}><h2>The full<br /><em>stack.</em></h2></Reveal>
          <Reveal delay={0.2}><p className="muted intro-copy">From the first system diagram to the last pixel — comfortable in the spaces between disciplines.</p></Reveal>
        </div>
        <div className="skills-grid">
          {skillGroups.map(([number, title, skills], i) => (
            <Reveal delay={(i % 3) * 0.08} key={title}>
              <div className="skill-group">
                <span className="skill-number">{number}</span>
                <h3>{title}</h3>
                <div className="chip-wrap">{(skills as string[]).map((skill) => <span className="chip" key={skill}>{skill}</span>)}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="experience-section section-pad" id="work">
        <div className="section-intro experience-heading">
          <Reveal><p className="kicker">03 / EXPERIENCE</p></Reveal>
          <Reveal delay={0.1}><h2>Selected<br /><em>chapters.</em></h2></Reveal>
          <Reveal delay={0.2}><p className="muted intro-copy">Six years of turning high-stakes complexity into software people can depend on.</p></Reveal>
        </div>
        <div className="experience-stack">
          {experiences.map((experience, i) => (
            <div className={`experience-card ${experience.color}`} key={experience.company} style={{ top: `calc(76px + ${i * 28}px)` }}>
              <div className="experience-top">
                <span className="experience-number">{experience.number}</span>
                <span className="experience-dates">{experience.dates}</span>
              </div>
              <div className="experience-main">
                <div className="experience-title">
                  <p className="kicker">{experience.location}</p>
                  <h3>{experience.company}</h3>
                  <p className="experience-role">{experience.role}</p>
                </div>
                <div className="experience-detail">
                  <p className="experience-intro">{experience.intro}</p>
                  <ul>{experience.points.map((point) => <li key={point}><Check size={14} />{point}</li>)}</ul>
                  <div className="chip-wrap">{experience.stack.map((skill) => <span className="chip" key={skill}>{skill}</span>)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="recognition-section section-pad">
        <Reveal><p className="kicker">04 / RECOGNITION</p></Reveal>
        <div className="recognition-grid">
          <Reveal><h2>Proof of<br /><em>the practice.</em></h2></Reveal>
          <div className="recognition-list">
            <Reveal delay={0.1}><div className="recognition-item"><span>01</span><p>Formal client appreciation from FedEx operations leadership for eliminating all P1 incidents over six months.</p><ArrowUpRight size={20} /></div></Reveal>
            <Reveal delay={0.2}><div className="recognition-item"><span>02</span><p>Recognized by TIAA&apos;s VP of Engineering for delivering SOC2 compliance three weeks early.</p><ArrowUpRight size={20} /></div></Reveal>
            <Reveal delay={0.3}><div className="recognition-item"><span>03</span><p>18 consecutive months of zero critical CVEs — the highest security record in the organization.</p><ArrowUpRight size={20} /></div></Reveal>
          </div>
        </div>
      </section>

      <section className="about-section section-pad" id="about">
        <div className="about-mark"><Code2 size={42} strokeWidth={1} /><span>EST.<br />1997</span></div>
        <div className="about-copy">
          <Reveal><p className="kicker">05 / BEYOND THE CODE</p></Reveal>
          <Reveal delay={0.1}><h2>Curious by default.<br /><em>Precise by design.</em></h2></Reveal>
          <Reveal delay={0.2}><p className="muted">I like hard problems, clear interfaces, and teams that care about the details. When I&apos;m not shaping resilient systems, I&apos;m exploring the next wave of developer tooling, mentoring engineers, or finding a better way to explain a complex idea.</p></Reveal>
          <Reveal delay={0.3}><div className="education"><div><span>EDUCATION</span><strong>MS, Computer &amp; Information Sciences</strong><small>Arkansas State University · 2023</small></div><div><span>ALSO</span><strong>Next.js Foundations — Vercel</strong><small>AWS Developer Associate · In progress</small></div></div></Reveal>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-glow" />
        <div className="section-pad contact-inner">
          <Reveal><p className="kicker">06 / NEXT MOVE</p></Reveal>
          <Reveal delay={0.1}><h2>Have a good<br /><em>problem?</em></h2></Reveal>
          <Reveal delay={0.2}><p className="contact-copy">I&apos;m always interested in ambitious products, thoughtful teams, and the kind of engineering challenge that demands a better answer.</p></Reveal>
          <Reveal delay={0.3}><a className="contact-link" href="mailto:koyirajesh97@gmail.com">koyirajesh97@gmail.com <MoveUpRight size={22} /></a></Reveal>
          <Reveal delay={0.4}><div className="contact-meta"><span>Dallas, TX · Open to remote / relocation</span><div><a href="https://www.linkedin.com" target="_blank" rel="noreferrer">LinkedIn <ExternalLink size={14} /></a><a href="mailto:koyirajesh97@gmail.com">Email <Mail size={14} /></a></div></div></Reveal>
        </div>
      </section>

      <footer className="footer">
        <span>© 2026 Rajesh Koyi</span>
        <span>Engineered with intent.</span>
        <div className="footer-social"><a href="https://github.com" aria-label="GitHub"><Github size={16} /></a><a href="https://www.linkedin.com" aria-label="LinkedIn"><Linkedin size={16} /></a></div>
      </footer>
    </main>
  );
}