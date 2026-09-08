"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronDown,
  Code2,
  Download,
  ExternalLink,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  Menu,
  Moon,
  MoveUpRight,
  Sparkles,
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
      "Sustained zero critical CVEs for 30+ months across a 10+ microservice observability footprint.",
    ],
    stack: ["Next.js 14", "Java 21/25", "AWS", "Nx", "Kubernetes", "AI Agents"],
  },
  {
    number: "02",
    company: "TIAA",
    role: "Senior Software Developer",
    dates: "Oct 2022 — Aug 2024",
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
    company: "Arkansas State University",
    role: "Graduate Assistant & Web Specialist",
    dates: "Aug 2021 — Oct 2022",
    location: "Jonesboro, AR",
    color: "blue",
    intro: "Modernized academic systems, data architecture, and departmental infrastructure while pursuing my Master's degree.",
    points: [
      "Overhauled the department web platform to modernize UX and improve mobile responsiveness for students and faculty.",
      "Restructured departmental database schemas with enforced normalization and optimized SQL query plans.",
      "Supported professors in quantitative analysis and data organization using advanced Excel modeling and automated data pipelines.",
      "Managed local lab network administration, hardware troubleshooting, and technical academic correspondence.",
    ],
    stack: ["HTML5 / CSS3", "JavaScript", "SQL", "Database Modeling", "Network Administration"],
  },
  {
    number: "04",
    company: "Wipro × FedEx Express",
    role: "Project Engineer",
    dates: "June 2019 — Aug 2021",
    location: "Hyderabad, India",
    color: "coral",
    intro: "Turning global logistics complexity into dependable software operations.",
    points: [
      "Managed four major subsystems (VAGIS, WARP, SFS, VMARS) handling global vehicle asset lifecycles across US, Canada, EMEA, LAC, and APAC.",
      "Developed and supported the Traffic Ops Log billing tracking platform using Java, Spring Boot, JSF, IceFaces, and Oracle 12c.",
      "Rewrote 40+ underperforming Oracle stored procedures, eliminating recurring production timeouts and reducing report generation time by 15%.",
      "Earned formal client appreciation from FedEx leadership for maintaining zero P1 incidents over 6 consecutive months.",
    ],
    stack: ["Java 11", "Spring Boot", "JSF / IceFaces", "Oracle 12c", "Linux", "Splunk"],
  },
  {
    number: "05",
    company: "Bharat Heavy Electricals Limited (BHEL)",
    role: "Engineering Intern — Industrial Automation",
    dates: "May 2017 — June 2018",
    location: "Hyderabad, India",
    color: "coral",
    intro: "Hands-on technical study of Computer Numerical Control machinery, programmable logic controllers, and industrial automation protocols.",
    points: [
      "Conducted hands-on technical study of CNC machinery, PLCs, industrial automation protocols, and manufacturing telemetry.",
      "Analyzed electronic control units and sensory telemetry systems for large-scale industrial manufacturing operations.",
      "Documented automation workflows and control-system behaviors to improve maintenance procedures.",
    ],
    stack: ["Embedded C", "Arduino", "CNC Systems", "PLCs", "Industrial Automation", "Electronic Control Units"],
  },
];

const skillGroups: [string, string, string[]][] = [
  ["01", "Modern Frontend", ["Next.js 14", "React 18", "Angular 15+", "TypeScript", "Tailwind CSS", "Storybook", "Redux Toolkit", "NgRx", "RxJS", "WCAG 2.1 AA"]],
  ["02", "Backend & Microservices", ["Java 21 / 25", "Spring Boot 3", "Spring Security", "Spring Batch", "Node.js", "Hibernate", "REST", "GraphQL", "Apache Kafka", "Resilience4j"]],
  ["03", "Cloud & Data", ["AWS (Lambda, SQS, S3)", "Kubernetes / EKS", "Docker", "MongoDB", "PostgreSQL", "Redis", "Oracle 19c / 12c", "IBM DB2", "MySQL"]],
  ["04", "DevOps & IaC", ["Terraform", "Helm Charts", "Jenkins CI/CD", "GitHub Actions", "Azure DevOps", "Prometheus & Grafana", "Splunk", "Dynatrace"]],
  ["05", "Architecture", ["Nx Monorepo", "Micro-frontends", "Module Federation", "DDD", "Event-driven Architecture", "SOLID Principles", "Observability"]],
  ["06", "AI & Security", ["Claude AI Agents", "GitHub Copilot", "Devin AI", "LangChain", "OAuth 2.0 / OIDC", "SAML 2.0", "OWASP", "SOC2 Type II", "JWT"]],
];

const stats = [
  { value: 93, suffix: "%", label: "Test coverage", detail: "up from 58% via AI-driven test generation" },
  { value: 500, suffix: "K+", label: "Daily transactions", detail: "processed across financial workflows" },
  { value: 15, suffix: "K+", label: "Users on enterprise SSO", detail: "across 12 internal platforms" },
  { value: 30, suffix: "+ mo", label: "Zero critical CVEs", detail: "maintained across fintech platforms" },
];

const projects = [
  {
    number: "01",
    title: "Employee Compensation & Equity Monorepo",
    company: "Goldman Sachs",
    description: "Unified financial processing and equity administration platform serving employees worldwide for Benefits, Deferred Comp, Stock Plans, and Carry.",
    highlights: [
      "Next.js 14 App Router micro-frontends across an Nx Monorepo for 8+ products.",
      "Java 21 / Spring Boot 3 event-driven architecture processing 500K+ daily transactions via AWS Lambda, SQS, and Kafka.",
      "Figma-to-code design system (60+ components, Storybook) with 95% UI consistency.",
      "Enterprise SAML 2.0 / OAuth 2.0 SSO eliminating credential sprawl for 15,000+ users.",
      "AI agent workflows (Claude, Copilot, Devin) lifting test coverage from 58% to 93%.",
    ],
    stack: ["Next.js 14", "React 18", "Nx Monorepo", "Java 21", "Spring Boot 3", "AWS SQS", "MongoDB"],
  },
  {
    number: "02",
    title: "Client Retirement Services (CRS) & SIA Portal",
    company: "TIAA",
    description: "Consolidated retirement planning, annuity investment tracking, and benefit elections platform serving over 5 million participants and plan sponsors.",
    highlights: [
      "Modular Angular 15 UI component library (40+ components) adopted across 4 business lines.",
      "Spring Boot REST APIs with Oracle DB query tuning, cutting latency from 320ms to 95ms.",
      "Full WCAG 2.1 AA accessibility compliance with zero accessibility regressions.",
      "Parallelized Spring Batch reconciliation jobs cutting runtime from 4.5 hours to 55 minutes.",
      "SOC2 Type II compliance achieved 3 weeks ahead of regulatory schedule.",
    ],
    stack: ["Angular 15+", "TypeScript", "RxJS / NgRx", "Spring Boot", "Oracle 19c", "Spring Batch"],
  },
  {
    number: "03",
    title: "Global Fleet Operations (MAVIS & TOL)",
    company: "FedEx Express / Wipro",
    description: "Worldwide fleet asset lifecycle management and non-revenue freight billing platform powering operations for FedEx Express across North America, EMEA, LAC, and APAC.",
    highlights: [
      "Managed MAVIS subsystems (VAGIS, WARP, SFS, VMARS) for global vehicle tracking.",
      "Developed Traffic Ops Log (TOL) non-revenue freight billing tracking platform.",
      "Rewrote 40+ Oracle stored procedures, eliminating production timeouts and boosting throughput by 22%.",
      "Zero P1 incidents achieved over 6 months, receiving formal client appreciation.",
      "Splunk monitoring and Linux shell automation cutting MTTR by 45%.",
    ],
    stack: ["Java 11", "Spring Boot", "JSF / IceFaces", "WebLogic 12c", "Oracle 12c", "Linux Bash", "Splunk"],
  },
  {
    number: "04",
    title: "Autonomous Maze-Solving Robot",
    company: "IJSRET Published Research",
    description: "Autonomous robotic vehicle that navigates unknown maze topologies using sensory object detection, decision heuristics, and wall-following algorithms.",
    highlights: [
      "Designed and implemented the decision-making obstacle avoidance heuristic algorithm.",
      "Multi-directional object proximity detection with left/right/reverse branch logic.",
      "Real-time telemetry output displayed directly on an onboard LCD screen.",
      "Published in the peer-reviewed International Journal of Scientific Research and Engineering Trends (IJSRET).",
    ],
    stack: ["Embedded C", "Arduino", "IR & Ultrasonic Sensors", "LCD Telemetry", "Algorithms"],
  },
  {
    number: "05",
    title: "Contactless RFID Attendance System",
    company: "KL University",
    description: "Low-cost, stand-alone automated attendance logging system designed to replace manual register rolls in academic and corporate environments.",
    highlights: [
      "Integrated RFID RC522 Reader with Arduino microcontrollers for contactless card authentication.",
      "Built API and MySQL backend connection for automated timestamping and record verification.",
      "Engineered with extreme cost efficiency: total bill of materials under 700 INR.",
    ],
    stack: ["Embedded C", "RFID RC522", "Arduino", "MySQL", "API Development"],
  },
  {
    number: "06",
    title: "Academic Portal & Database Modernization",
    company: "Arkansas State University",
    description: "Comprehensive redesign of university departmental web assets, faculty data pipelines, and SQL database schema optimization.",
    highlights: [
      "Restructured university database schemas to enforce normalization and prevent data drift.",
      "Redesigned department website for intuitive navigation and accessibility.",
      "Created Excel data models and automated reports for academic faculty.",
    ],
    stack: ["HTML5 / CSS3", "JavaScript", "SQL", "Data Modeling", "Network Administration"],
  },
];

const publications = [
  {
    title: '"Design and Implementation of a Robot for Maze-Solving using Wall Following Algorithm"',
    journal: "International Journal of Scientific Research and Engineering Trends (IJSRET)",
    volume: "Vol. 5, Issue 2",
    date: "Mar-Apr 2019",
    issn: "ISSN (Online): 2395-566X",
    description:
      "Presents an autonomous decision-making algorithm for maze navigation utilizing embedded sensors and robotics. The vehicle detects obstacles in real-time and executes collision prevention heuristics: if objects are detected on the right and front, the robot executes a left turn; if on the left and front, it turns right; if obstacles block the front, left, and right simultaneously, it safely reverses or stops. Real-time directional telemetry and sensor states are displayed on an onboard LCD screen to visualize algorithm decision paths.",
  },
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
          <a href="#impact" onClick={() => setMenuOpen(false)}>Impact</a>
          <a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a>
          <a href="#work" onClick={() => setMenuOpen(false)}>Work</a>
          <a href="#publications" onClick={() => setMenuOpen(false)}>Research</a>
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
              <a className="button button-primary" href="#impact">View selected work <ArrowDownRight size={17} /></a>
              <a className="button button-ghost" href="mailto:koyirajesh97@gmail.com">Download resume <Download size={16} /></a>
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

      <section className="projects-section section-pad" id="projects">
        <div className="section-intro">
          <Reveal><p className="kicker">02 / PROJECTS</p></Reveal>
          <Reveal delay={0.1}><h2>Selected<br /><em>systems.</em></h2></Reveal>
          <Reveal delay={0.2}><p className="muted intro-copy">Production platforms architected and delivered across financial services, global logistics, academic research, and autonomous systems.</p></Reveal>
        </div>
        <div className="projects-list">
          {projects.map((project, i) => (
            <Reveal delay={(i % 3) * 0.08} key={project.number}>
              <div className="project-card">
                <div className="project-header">
                  <div className="project-meta">
                    <span className="project-number">{project.number}</span>
                    <span className="project-company">{project.company}</span>
                  </div>
                  <h3>{project.title}</h3>
                  <p className="project-desc">{project.description}</p>
                </div>
                <div className="project-body">
                  <ul>{project.highlights.map((point) => <li key={point}><Check size={14} />{point}</li>)}</ul>
                  <div className="chip-wrap">{project.stack.map((skill) => <span className="chip" key={skill}>{skill}</span>)}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="skills-section section-pad" id="approach">
        <div className="section-intro">
          <Reveal><p className="kicker">03 / CAPABILITIES</p></Reveal>
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
          <Reveal><p className="kicker">04 / EXPERIENCE</p></Reveal>
          <Reveal delay={0.1}><h2>Selected<br /><em>chapters.</em></h2></Reveal>
          <Reveal delay={0.2}><p className="muted intro-copy">Eight years of turning high-stakes complexity into software people can depend on.</p></Reveal>
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
        <Reveal><p className="kicker">05 / RECOGNITION</p></Reveal>
        <div className="recognition-grid">
          <Reveal><h2>Proof of<br /><em>the practice.</em></h2></Reveal>
          <div className="recognition-list">
            <Reveal delay={0.1}><div className="recognition-item"><span>01</span><p>Formal client appreciation from FedEx operations leadership for eliminating all P1 incidents over six months.</p><ArrowUpRight size={20} /></div></Reveal>
            <Reveal delay={0.2}><div className="recognition-item"><span>02</span><p>Recognized by TIAA&apos;s VP of Engineering for delivering SOC2 compliance three weeks early.</p><ArrowUpRight size={20} /></div></Reveal>
            <Reveal delay={0.3}><div className="recognition-item"><span>03</span><p>18 consecutive months of zero critical CVEs — the highest security record in the organization.</p><ArrowUpRight size={20} /></div></Reveal>
          </div>
        </div>
      </section>

      <section className="publications-section section-pad" id="publications">
        <div className="section-intro">
          <Reveal><p className="kicker">06 / RESEARCH</p></Reveal>
          <Reveal delay={0.1}><h2>Peer-reviewed<br /><em>work.</em></h2></Reveal>
          <Reveal delay={0.2}><p className="muted intro-copy">Academic research published in the International Journal of Scientific Research and Engineering Trends.</p></Reveal>
        </div>
        <div className="publications-list">
          {publications.map((pub, i) => (
            <Reveal delay={i * 0.1} key={pub.title}>
              <div className="publication-card">
                <div className="publication-header">
                  <BookOpen size={28} strokeWidth={1} />
                  <div className="publication-meta">
                    <span className="publication-journal">{pub.journal}</span>
                    <span className="publication-volume">{pub.volume} · {pub.date}</span>
                    <span className="publication-issn">{pub.issn}</span>
                  </div>
                </div>
                <h3>{pub.title}</h3>
                <p className="publication-abstract">{pub.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="about-section section-pad" id="about">
        <div className="about-mark"><GraduationCap size={42} strokeWidth={1} /><span>EST.<br />1997</span></div>
        <div className="about-copy">
          <Reveal><p className="kicker">07 / BEYOND THE CODE</p></Reveal>
          <Reveal delay={0.1}><h2>Curious by default.<br /><em>Precise by design.</em></h2></Reveal>
          <Reveal delay={0.2}>          <p className="muted">I like hard problems, clear interfaces, and teams that care about the details. When I&apos;m shaping resilient systems, I&apos;m exploring the next wave of developer tooling, mentoring engineers, or finding a better way to explain a complex idea.</p></Reveal>
          <Reveal delay={0.3}>
            <div className="education">
              <div>
                <span>MASTER&apos;S DEGREE</span>
                <strong>MS, Computer &amp; Information Sciences</strong>
                <small>Arkansas State University · 2023 · GPA: 3.5</small>
              </div>
              <div>
                <span>BACHELOR&apos;S DEGREE</span>
                <strong>B.Tech, Electronics &amp; Communication</strong>
                <small>Koneru Lakshmaiah Educational Foundation · 2019 · GPA: 3.73</small>
              </div>
              <div>
                <span>CERTIFICATIONS</span>
                <strong>AWS Developer – Associate</strong>
                <small>In Progress, Q3 2026</small>
              </div>
              <div>
                <span>CERTIFICATIONS</span>
                <strong>Next.js Foundations — Vercel</strong>
                <small>Vercel Certified</small>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-glow" />
        <div className="section-pad contact-inner">
          <Reveal><p className="kicker">08 / NEXT MOVE</p></Reveal>
          <Reveal delay={0.1}><h2>Have a good<br /><em>problem?</em></h2></Reveal>
          <Reveal delay={0.2}><p className="contact-copy">I&apos;m always interested in ambitious products, thoughtful teams, and the kind of engineering challenge that demands a better answer.</p></Reveal>
          <Reveal delay={0.3}><a className="contact-link" href="mailto:koyirajesh97@gmail.com">koyirajesh97@gmail.com <MoveUpRight size={22} /></a></Reveal>
          <Reveal delay={0.4}><div className="contact-meta"><span>Dallas, TX · Open to remote / relocation</span><div><a href="https://www.linkedin.com/in/koyirajesh" target="_blank" rel="noreferrer">LinkedIn <ExternalLink size={14} /></a><a href="mailto:koyirajesh97@gmail.com">Email <Mail size={14} /></a><a href="https://github.com" target="_blank" rel="noreferrer">GitHub <Github size={14} /></a></div></div></Reveal>
        </div>
      </section>

      <footer className="footer">
        <span>© 2026 Rajesh Koyi</span>
        <span>Engineered with intent.</span>
        <div className="footer-social"><a href="https://github.com" aria-label="GitHub"><Github size={16} /></a><a href="https://www.linkedin.com/in/koyirajesh" aria-label="LinkedIn"><Linkedin size={16} /></a></div>
      </footer>
    </main>
  );
}
