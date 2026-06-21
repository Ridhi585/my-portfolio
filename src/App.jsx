import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Skills", "Experience", "Projects", "Education", "Certifications", "Contact"];

const SKILLS = {
  Frontend: ["HTML5", "CSS3", "JavaScript", "React.js", "Bootstrap"],
  Backend: ["Node.js", "Express.js", "REST APIs"],
  Database: ["MongoDB", "MySQL", "Supabase"],
  Languages: ["Java", "JavaScript"],
  "Core Concepts": ["Data Structures", "OOP", "JDBC", "DBMS", "Responsive Design"],
  "Soft Skills": ["Leadership", "Communication", "Team Collaboration", "Problem Solving", "Time Management"],
};

const SKILL_ICONS = {
  "HTML5": "🌐", "CSS3": "🎨", "JavaScript": "⚡", "React.js": "⚛️", "Bootstrap": "🅱️",
  "Node.js": "🟢", "Express.js": "🚂", "REST APIs": "🔗",
  "MongoDB": "🍃", "MySQL": "🐬", "Supabase": "⚡",
  "Java": "☕", 
  "Data Structures": "🌲", "OOP": "📦", "JDBC": "🔌", "DBMS": "🗄️", "Responsive Design": "📱",
  "Leadership": "🎯", "Communication": "💬", "Team Collaboration": "🤝", "Problem Solving": "🧩", "Time Management": "⏰",
};

const PROJECTS = [
  {
    title: "Fit Route",
    subtitle: "AI-Powered Gym Aggregator Platform",
    stack: ["React.js", "Node.js", "Express.js", "Supabase"],
    desc: "A full-stack gym aggregation platform enabling users to discover gyms, compare membership plans, and connect with fitness centers through a centralized platform with AI capabilities.",
    features: ["Gym discovery & comparison", "Membership management", "Owner dashboard", "AI fitness assistant", "Analytics dashboard", "AI gym image verification"],
    github: "https://github.com/Ridhi585",
    demo: "#",
    emoji: "🏋️",
    color: "#3B82F6",
  },
  {
    title: "Hotel Management System",
    subtitle: "Full-Stack Automation Platform",
    stack: ["Java", "MySQL"],
    desc: "A hotel management application that automates room management, employee management, and check-in/check-out operations with secure database integration.",
    features: ["Room management", "Employee management", "Booking system", "Check-in/out tracking", "Database integration"],
    github: "https://github.com/Ridhi585",
    demo: "#",
    emoji: "🏨",
    color: "#8B5CF6",
  },
  {
    title: "Simon Says Game",
    subtitle: "Interactive Memory Game",
    stack: ["JavaScript", "HTML", "CSS"],
    desc: "An interactive memory-based game with dynamic color patterns, sound effects, score tracking, and responsive gameplay built with vanilla JavaScript.",
    features: ["Dynamic color patterns", "Sound effects", "Score tracking", "Responsive gameplay", "Progressive difficulty"],
    github: "https://github.com/Ridhi585",
    demo: "#",
    emoji: "🎮",
    color: "#10B981",
  },
  {
    title: "Online Banking System",
    subtitle: "Secure Banking Application",
    stack: ["Java", "JDBC", "MySQL"],
    desc: "A banking application managing customer accounts, transactions, and banking operations through a secure database-driven system developed during internship training.",
    features: ["Account management", "Transaction tracking", "Secure authentication", "Database integration", "Customer portal"],
    github: "https://github.com/Ridhi585",
    demo: "#",
    emoji: "🏦",
    color: "#F59E0B",
  },
];

const CERTS = [
  { title: "Certified Java Developer", org: "Skill India, Government of India", icon: "🇮🇳", color: "#FF9933" },
  { title: "Certified Java Developer", org: "Ansh Infotech", icon: "☕", color: "#3B82F6" },
  { title: "Core Java Training Program", org: "Ansh Infotech", icon: "🎓", color: "#8B5CF6" },
];

// Animated counter hook
function useCounter(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

// Intersection observer hook
function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function ParticleBackground() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.5 + 0.1,
    }));
    let animId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.speedX; p.y += p.speedY;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${p.opacity})`;
        ctx.fill();
      });
      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const d = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.15 * (1 - d / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      animId = requestAnimationFrame(animate);
    };
    animate();
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }} />;
}

function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? (theme === "dark" ? "rgba(15,23,42,0.95)" : "rgba(255,255,255,0.95)") : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? `1px solid ${theme === "dark" ? "rgba(59,130,246,0.2)" : "rgba(59,130,246,0.15)"}` : "none",
      transition: "all 0.3s ease", padding: "0 2rem",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 70 }}>
        <div style={{ fontWeight: 800, fontSize: "1.3rem", background: "linear-gradient(135deg, #3B82F6, #8B5CF6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "-0.5px" }}>
          RT<span style={{ color: "#3B82F6" }}>.</span>
        </div>
        {/* Desktop nav */}
        <div style={{ display: "flex", gap: "0.25rem", alignItems: "center" }} className="desktop-nav">
          {NAV_LINKS.map(link => (
            <button key={link} onClick={() => scrollTo(link)} style={{
              background: "none", border: "none", cursor: "pointer", padding: "0.5rem 0.85rem",
              color: theme === "dark" ? "#94A3B8" : "#475569", fontSize: "0.88rem", fontWeight: 500,
              borderRadius: 8, transition: "all 0.2s", fontFamily: "inherit",
            }}
              onMouseEnter={e => { e.target.style.color = "#3B82F6"; e.target.style.background = "rgba(59,130,246,0.08)"; }}
              onMouseLeave={e => { e.target.style.color = theme === "dark" ? "#94A3B8" : "#475569"; e.target.style.background = "none"; }}
            >{link}</button>
          ))}
          <button onClick={toggleTheme} style={{
            background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.3)",
            borderRadius: 8, padding: "0.5rem 0.75rem", cursor: "pointer", color: "#3B82F6", fontSize: "1rem", marginLeft: 8,
          }}>{theme === "dark" ? "☀️" : "🌙"}</button>
        </div>
        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", color: "#3B82F6", fontSize: "1.5rem" }} className="mobile-menu-btn">
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>
      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          background: theme === "dark" ? "rgba(15,23,42,0.98)" : "rgba(255,255,255,0.98)",
          backdropFilter: "blur(20px)", padding: "1rem", borderTop: "1px solid rgba(59,130,246,0.2)",
        }}>
          {NAV_LINKS.map(link => (
            <button key={link} onClick={() => scrollTo(link)} style={{
              display: "block", width: "100%", textAlign: "left", background: "none", border: "none",
              cursor: "pointer", padding: "0.75rem 1rem", color: theme === "dark" ? "#94A3B8" : "#475569",
              fontSize: "0.95rem", fontWeight: 500, fontFamily: "inherit", borderRadius: 8,
            }}>{link}</button>
          ))}
        </div>
      )}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
}

function Hero({ theme }) {
  const [typed, setTyped] = useState("");
  const titles = ["MERN Stack Developer", "Full-Stack Engineer", "React.js Specialist", "AI Integration Dev"];
  const [titleIdx, setTitleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = titles[titleIdx];
    const timeout = setTimeout(() => {
      if (!deleting && charIdx < current.length) {
        setTyped(current.slice(0, charIdx + 1));
        setCharIdx(c => c + 1);
      } else if (!deleting && charIdx === current.length) {
        setTimeout(() => setDeleting(true), 1800);
      } else if (deleting && charIdx > 0) {
        setTyped(current.slice(0, charIdx - 1));
        setCharIdx(c => c - 1);
      } else if (deleting && charIdx === 0) {
        setDeleting(false);
        setTitleIdx(i => (i + 1) % titles.length);
      }
    }, deleting ? 60 : 100);
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, titleIdx]);

  return (
    <section id="about-anchor" style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden",
      background: theme === "dark" ? "linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)" : "linear-gradient(135deg, #EFF6FF 0%, #F8FAFC 50%, #EFF6FF 100%)",
      padding: "6rem 2rem 4rem",
    }}>
      <ParticleBackground />
      {/* Glow orbs */}
      <div style={{ position: "absolute", top: "20%", left: "10%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)", filter: "blur(40px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "20%", right: "10%", width: 250, height: 250, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)", filter: "blur(40px)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 900, textAlign: "center", position: "relative", zIndex: 1 }}>
        {/* Badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8, padding: "0.5rem 1.25rem",
          background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.3)",
          borderRadius: 100, marginBottom: "2rem", color: "#3B82F6", fontSize: "0.85rem", fontWeight: 600, letterSpacing: "0.05em",
        }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10B981", display: "inline-block", animation: "pulse 2s infinite" }} />
          Available for opportunities
        </div>
        <h1 style={{
          fontSize: "clamp(3rem, 7vw, 5.5rem)", fontWeight: 900, lineHeight: 1.05, marginBottom: "1rem",
          color: theme === "dark" ? "#F8FAFC" : "#0F172A", letterSpacing: "-2px",
        }}>
          Ridhi<br />
          <span style={{ background: "linear-gradient(135deg, #3B82F6, #8B5CF6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Trehan</span>
        </h1>
        <div style={{ fontSize: "clamp(1.2rem, 3vw, 1.7rem)", fontWeight: 600, color: "#3B82F6", marginBottom: "1.5rem", minHeight: "2.5rem", letterSpacing: "-0.5px" }}>
          {typed}<span style={{ borderRight: "2px solid #3B82F6", animation: "blink 1s infinite", marginLeft: 2 }} />
        </div>
        <p style={{ fontSize: "clamp(1rem, 2.5vw, 1.15rem)", color: theme === "dark" ? "#94A3B8" : "#64748B", maxWidth: 620, margin: "0 auto 2.5rem", lineHeight: 1.7 }}>
          Building scalable web applications, integrating AI-powered solutions, and creating seamless digital experiences.
        </p>
        {/* CTA Buttons */}
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "3rem" }}>
          {[
            { label: "View Projects", href: "#projects", primary: true },
            { label: "Open Resume", href: "/Ridhi_Trehan_resume.pdf", target: "_blank", primary: false },
            { label: "Contact Me", href: "#contact", primary: false },
          ].map(btn => (
            <a key={btn.label} href={btn.href} target={btn.target || "_self"} style={{
              padding: "0.85rem 1.75rem", borderRadius: 12, textDecoration: "none", fontWeight: 600, fontSize: "0.95rem",
              transition: "all 0.25s",
              ...(btn.primary
                ? { background: "linear-gradient(135deg, #3B82F6, #2563EB)", color: "#fff", boxShadow: "0 4px 20px rgba(59,130,246,0.35)" }
                : { background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.35)", color: "#3B82F6" }),
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(59,130,246,0.4)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = btn.primary ? "0 4px 20px rgba(59,130,246,0.35)" : "none"; }}
            >{btn.label}</a>
          ))}
        </div>
        {/* Social links */}
        <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
          {[
            { label: "GitHub", href: "https://github.com/Ridhi585", icon: "⌨️" },
            { label: "LinkedIn", href: "https://www.linkedin.com/in/ridhi-trehan-06a5702b0/", icon: "💼" },
            { label: "Email", href: "mailto:ridhitrehan585@gmail.com", icon: "✉️" },
          ].map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" style={{
              display: "flex", alignItems: "center", gap: 6, color: theme === "dark" ? "#94A3B8" : "#64748B",
              textDecoration: "none", fontSize: "0.9rem", fontWeight: 500, transition: "color 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.color = "#3B82F6"; }}
              onMouseLeave={e => { e.currentTarget.style.color = theme === "dark" ? "#94A3B8" : "#64748B"; }}
            >
              <span>{s.icon}</span>{s.label}
            </a>
          ))}
          <span style={{ color: theme === "dark" ? "#94A3B8" : "#64748B", fontSize: "0.9rem" }}>📍 Amritsar, Punjab, India</span>
        </div>
      </div>
      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes blink { 0%,50%{opacity:1} 51%,100%{opacity:0} }
      `}</style>
    </section>
  );
}

function SectionHeader({ title, subtitle, theme }) {
  return (
    <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
      <div style={{ display: "inline-block", background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.25)", borderRadius: 100, padding: "0.35rem 1rem", color: "#3B82F6", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem" }}>
        {subtitle}
      </div>
      <h2 style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 800, color: theme === "dark" ? "#F8FAFC" : "#0F172A", margin: 0, letterSpacing: "-1px" }}>
        {title}
      </h2>
    </div>
  );
}

function About({ theme }) {
  const [ref, inView] = useInView();
  const stats = [
    { label: "Projects Completed", value: "4+", icon: "🚀" },
    { label: "Internships", value: "2", icon: "💼" },
    { label: "Certifications", value: "3", icon: "🏆" },
    { label: "Tech Stack", value: "10+", icon: "⚙️" },
  ];
  return (
    <section id="about" ref={ref} style={{ padding: "6rem 2rem", background: theme === "dark" ? "#1E293B" : "#F8FAFC" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionHeader title="About Me" subtitle="Who I Am" theme={theme} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "center" }} className="about-grid">
          <div style={{ opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-30px)", transition: "all 0.7s ease" }}>
            {/* Avatar placeholder */}
            <div style={{
              width: 260, height: 260, borderRadius: "50%", margin: "0 auto 2rem",
              background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "6rem", boxShadow: "0 20px 60px rgba(59,130,246,0.3)",
              position: "relative",
            }}>
              👩‍💻
              <div style={{ position: "absolute", bottom: 10, right: 10, width: 40, height: 40, borderRadius: "50%", background: "#10B981", border: "3px solid white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>✓</div>
            </div>
            {/* Stat cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {stats.map((s, i) => (
                <div key={i} style={{
                  background: theme === "dark" ? "rgba(15,23,42,0.6)" : "rgba(255,255,255,0.8)",
                  border: "1px solid rgba(59,130,246,0.15)", borderRadius: 12, padding: "1rem",
                  textAlign: "center", backdropFilter: "blur(10px)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                }}>
                  <div style={{ fontSize: "1.5rem", marginBottom: 4 }}>{s.icon}</div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#3B82F6" }}>{s.value}</div>
                  <div style={{ fontSize: "0.75rem", color: theme === "dark" ? "#94A3B8" : "#64748B", fontWeight: 500 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(30px)", transition: "all 0.7s ease 0.2s" }}>
            <h3 style={{ fontSize: "1.6rem", fontWeight: 700, color: theme === "dark" ? "#F8FAFC" : "#0F172A", marginBottom: "1.5rem", letterSpacing: "-0.5px" }}>
              Hello! I'm Ridhi Trehan 👋
            </h3>
            <p style={{ color: theme === "dark" ? "#94A3B8" : "#475569", lineHeight: 1.8, marginBottom: "1.25rem", fontSize: "0.97rem" }}>
              A passionate <strong style={{ color: "#3B82F6" }}>MERN Stack Developer</strong> and Computer Science Engineering student with a strong interest in full-stack web development, software engineering, and AI-powered applications.
            </p>
            <p style={{ color: theme === "dark" ? "#94A3B8" : "#475569", lineHeight: 1.8, marginBottom: "1.25rem", fontSize: "0.97rem" }}>
              I enjoy transforming ideas into scalable, user-friendly digital solutions using modern technologies such as <strong style={{ color: "#3B82F6" }}>React.js, Node.js, Express.js, MongoDB, Java,</strong> and <strong style={{ color: "#3B82F6" }}>MySQL</strong>. Through internships and project-based learning, I've gained hands-on experience in developing full-stack applications, designing databases, integrating APIs, and implementing responsive user interfaces.
            </p>
            <p style={{ color: theme === "dark" ? "#94A3B8" : "#475569", lineHeight: 1.8, fontSize: "0.97rem" }}>
              I continuously strive to improve my technical expertise, learn emerging technologies, and contribute to impactful software solutions that solve real-world problems.
            </p>
            <div style={{ display: "flex", gap: "1rem", marginTop: "2rem", flexWrap: "wrap" }}>
              <a href="mailto:ridhitrehan585@gmail.com" style={{ padding: "0.75rem 1.5rem", background: "linear-gradient(135deg, #3B82F6, #2563EB)", color: "#fff", borderRadius: 10, textDecoration: "none", fontWeight: 600, fontSize: "0.9rem", boxShadow: "0 4px 15px rgba(59,130,246,0.3)" }}>
                📧 Get in Touch
              </a>
              <a href="https://github.com/Ridhi585" target="_blank" rel="noopener noreferrer" style={{ padding: "0.75rem 1.5rem", background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.3)", color: "#3B82F6", borderRadius: 10, textDecoration: "none", fontWeight: 600, fontSize: "0.9rem" }}>
                ⌨️ View GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) { .about-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

function Skills({ theme }) {
  const [ref, inView] = useInView();
  const [active, setActive] = useState("Frontend");
  return (
    <section id="skills" ref={ref} style={{ padding: "6rem 2rem", background: theme === "dark" ? "#0F172A" : "#EFF6FF" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionHeader title="Skills & Technologies" subtitle="What I Know" theme={theme} />
        {/* Category tabs */}
        <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "2.5rem" }}>
          {Object.keys(SKILLS).map(cat => (
            <button key={cat} onClick={() => setActive(cat)} style={{
              padding: "0.5rem 1.25rem", borderRadius: 100, border: "1px solid",
              cursor: "pointer", fontWeight: 600, fontSize: "0.85rem", fontFamily: "inherit",
              transition: "all 0.2s",
              ...(active === cat
                ? { background: "#3B82F6", borderColor: "#3B82F6", color: "#fff", boxShadow: "0 4px 15px rgba(59,130,246,0.35)" }
                : { background: "transparent", borderColor: "rgba(59,130,246,0.3)", color: theme === "dark" ? "#94A3B8" : "#64748B" }),
            }}>{cat}</button>
          ))}
        </div>
        {/* Skills grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "1rem" }}>
          {SKILLS[active].map((skill, i) => (
            <div key={skill} style={{
              background: theme === "dark" ? "rgba(30,41,59,0.8)" : "rgba(255,255,255,0.9)",
              border: "1px solid rgba(59,130,246,0.15)", borderRadius: 14, padding: "1.5rem 1rem",
              textAlign: "center", backdropFilter: "blur(10px)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
              opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)",
              transition: `all 0.5s ease ${i * 0.06}s`,
              cursor: "default",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = "rgba(59,130,246,0.5)"; e.currentTarget.style.boxShadow = "0 12px 30px rgba(59,130,246,0.15)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "rgba(59,130,246,0.15)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)"; }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{SKILL_ICONS[skill] || "💡"}</div>
              <div style={{ fontWeight: 600, fontSize: "0.9rem", color: theme === "dark" ? "#F8FAFC" : "#0F172A" }}>{skill}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience({ theme }) {
  const [ref, inView] = useInView();
  const experiences = [
    {
      role: "MERN Stack Developer Intern",
      company: "Global Migration",
      period: "Recent",
      color: "#3B82F6",
      icon: "⚛️",
      points: [
        "Developed and maintained full-stack web applications using MongoDB, Express.js, React.js, and Node.js.",
        "Built responsive and reusable React components to improve user experience.",
        "Integrated REST APIs and managed database operations for efficient application performance.",
        "Collaborated with development teams to implement new features and resolve technical issues.",
        "Participated in development, testing, debugging, and deployment processes.",
      ],
    },
    {
      role: "Java Intern",
      company: "Pratinik InfoTech",
      period: "Jan 2026 – Mar 2026",
      color: "#8B5CF6",
      icon: "☕",
      points: [
        "Developed and maintained Java-based applications using Core Java and OOP principles.",
        "Assisted in backend development using Java and JDBC.",
        "Worked extensively with MySQL databases for storage and optimization.",
        "Contributed to the development of an Online Banking System using Java and MySQL.",
      ],
    },
  ];
  return (
    <section id="experience" ref={ref} style={{ padding: "6rem 2rem", background: theme === "dark" ? "#1E293B" : "#F8FAFC" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <SectionHeader title="Work Experience" subtitle="Career Journey" theme={theme} />
        <div style={{ position: "relative" }}>
          {/* Timeline line */}
          <div style={{ position: "absolute", left: 28, top: 0, bottom: 0, width: 2, background: "linear-gradient(to bottom, #3B82F6, #8B5CF6)", borderRadius: 2 }} />
          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
            {experiences.map((exp, i) => (
              <div key={i} style={{
                display: "flex", gap: "2rem",
                opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(40px)",
                transition: `all 0.7s ease ${i * 0.2}s`,
              }}>
                {/* Icon */}
                <div style={{
                  width: 56, height: 56, borderRadius: "50%", flexShrink: 0,
                  background: `linear-gradient(135deg, ${exp.color}22, ${exp.color}44)`,
                  border: `2px solid ${exp.color}`, display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: "1.4rem", zIndex: 1,
                  boxShadow: `0 0 20px ${exp.color}33`,
                }}>{exp.icon}</div>
                {/* Card */}
                <div style={{
                  flex: 1, background: theme === "dark" ? "rgba(15,23,42,0.7)" : "rgba(255,255,255,0.9)",
                  border: `1px solid ${exp.color}22`, borderRadius: 16, padding: "1.75rem",
                  backdropFilter: "blur(10px)", boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
                    <div>
                      <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: theme === "dark" ? "#F8FAFC" : "#0F172A", margin: 0, marginBottom: 4 }}>{exp.role}</h3>
                      <div style={{ color: exp.color, fontWeight: 600, fontSize: "0.95rem" }}>{exp.company}</div>
                    </div>
                    <span style={{ background: `${exp.color}18`, border: `1px solid ${exp.color}44`, color: exp.color, padding: "0.3rem 0.85rem", borderRadius: 100, fontSize: "0.8rem", fontWeight: 600 }}>{exp.period}</span>
                  </div>
                  <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                    {exp.points.map((p, j) => (
                      <li key={j} style={{ display: "flex", gap: "0.75rem", color: theme === "dark" ? "#94A3B8" : "#475569", fontSize: "0.92rem", lineHeight: 1.6 }}>
                        <span style={{ color: exp.color, flexShrink: 0, marginTop: 2 }}>▸</span>{p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects({ theme }) {
  const [ref, inView] = useInView(0.1);
  return (
    <section id="projects" ref={ref} style={{ padding: "6rem 2rem", background: theme === "dark" ? "#0F172A" : "#EFF6FF" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionHeader title="Featured Projects" subtitle="My Work" theme={theme} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(520px, 1fr))", gap: "1.75rem" }} className="projects-grid">
          {PROJECTS.map((proj, i) => (
            <div key={i} style={{
              background: theme === "dark" ? "rgba(30,41,59,0.8)" : "rgba(255,255,255,0.95)",
              border: `1px solid ${proj.color}22`, borderRadius: 20, overflow: "hidden",
              backdropFilter: "blur(10px)", boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
              opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)",
              transition: `all 0.7s ease ${i * 0.15}s`,
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = `0 20px 50px ${proj.color}22`; e.currentTarget.style.borderColor = `${proj.color}44`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 30px rgba(0,0,0,0.1)"; e.currentTarget.style.borderColor = `${proj.color}22`; }}
            >
              {/* Project header */}
              <div style={{ background: `linear-gradient(135deg, ${proj.color}18, ${proj.color}08)`, borderBottom: `1px solid ${proj.color}15`, padding: "1.75rem 1.75rem 1.25rem", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>{proj.emoji}</div>
                  <h3 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 800, color: theme === "dark" ? "#F8FAFC" : "#0F172A" }}>{proj.title}</h3>
                  <p style={{ margin: "0.2rem 0 0", color: proj.color, fontSize: "0.85rem", fontWeight: 600 }}>{proj.subtitle}</p>
                </div>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                </div>
              </div>
              <div style={{ padding: "1.5rem 1.75rem" }}>
                <p style={{ color: theme === "dark" ? "#94A3B8" : "#475569", fontSize: "0.92rem", lineHeight: 1.7, marginBottom: "1.25rem" }}>{proj.desc}</p>
                {/* Features */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.25rem" }}>
                  {proj.features.map(f => (
                    <span key={f} style={{ background: `${proj.color}10`, border: `1px solid ${proj.color}25`, color: proj.color, padding: "0.25rem 0.65rem", borderRadius: 100, fontSize: "0.75rem", fontWeight: 600 }}>✓ {f}</span>
                  ))}
                </div>
                {/* Tech stack */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  {proj.stack.map(t => (
                    <span key={t} style={{ background: theme === "dark" ? "rgba(59,130,246,0.12)" : "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.25)", color: "#3B82F6", padding: "0.25rem 0.75rem", borderRadius: 8, fontSize: "0.78rem", fontWeight: 700 }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) { .projects-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

function Education({ theme }) {
  const [ref, inView] = useInView();
  const edu = [
    {
      degree: "B.Tech (Computer Science & Engineering)",
      institution: "Global Group of Institutes",
      period: "2023 – 2027",
      icon: "🎓",
      color: "#3B82F6",
      detail: "Pursuing undergraduate degree in CSE",
    },
    {
      degree: "Higher Secondary Education",
      institution: "Holy Heart Presidency School",
      period: "Score: 92%",
      icon: "📚",
      color: "#8B5CF6",
      detail: "Class XII",
    },
    {
      degree: "Secondary Education",
      institution: "Holy Heart Presidency School",
      period: "Score: 92.8%",
      icon: "🏫",
      color: "#10B981",
      detail: "Class X",
    },
  ];
  return (
    <section id="education" ref={ref} style={{ padding: "6rem 2rem", background: theme === "dark" ? "#1E293B" : "#F8FAFC" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <SectionHeader title="Education" subtitle="Academic Background" theme={theme} />
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {edu.map((e, i) => (
            <div key={i} style={{
              display: "flex", gap: "1.5rem", alignItems: "flex-start",
              opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(25px)",
              transition: `all 0.6s ease ${i * 0.15}s`,
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: 14, flexShrink: 0,
                background: `linear-gradient(135deg, ${e.color}22, ${e.color}44)`,
                border: `2px solid ${e.color}`, display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: "1.5rem",
              }}>{e.icon}</div>
              <div style={{
                flex: 1, background: theme === "dark" ? "rgba(15,23,42,0.7)" : "rgba(255,255,255,0.9)",
                border: `1px solid ${e.color}22`, borderRadius: 14, padding: "1.5rem",
                boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.5rem" }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700, color: theme === "dark" ? "#F8FAFC" : "#0F172A", marginBottom: 4 }}>{e.degree}</h3>
                    <div style={{ color: e.color, fontWeight: 600, fontSize: "0.9rem" }}>{e.institution}</div>
                    <div style={{ color: theme === "dark" ? "#94A3B8" : "#64748B", fontSize: "0.85rem", marginTop: 4 }}>{e.detail}</div>
                  </div>
                  <span style={{ background: `${e.color}15`, border: `1px solid ${e.color}35`, color: e.color, padding: "0.3rem 0.85rem", borderRadius: 100, fontSize: "0.82rem", fontWeight: 600, whiteSpace: "nowrap" }}>{e.period}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Certifications({ theme }) {
  const [ref, inView] = useInView();
  return (
    <section id="certifications" ref={ref} style={{ padding: "6rem 2rem", background: theme === "dark" ? "#0F172A" : "#EFF6FF" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <SectionHeader title="Certifications" subtitle="Credentials" theme={theme} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {CERTS.map((cert, i) => (
            <div key={i} style={{
              background: theme === "dark" ? "rgba(30,41,59,0.8)" : "rgba(255,255,255,0.95)",
              border: `1px solid ${cert.color}25`, borderRadius: 16, padding: "2rem 1.5rem",
              textAlign: "center", backdropFilter: "blur(10px)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(25px)",
              transition: `all 0.6s ease ${i * 0.15}s`,
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = `0 16px 40px ${cert.color}20`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)"; }}
            >
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{cert.icon}</div>
              <div style={{ background: `${cert.color}15`, border: `1px solid ${cert.color}30`, borderRadius: 8, padding: "0.3rem 0.75rem", color: cert.color, fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", display: "inline-block", marginBottom: "0.75rem" }}>Certified</div>
              <h3 style={{ margin: 0, fontSize: "1rem", fontWeight: 700, color: theme === "dark" ? "#F8FAFC" : "#0F172A", marginBottom: "0.5rem" }}>{cert.title}</h3>
              <p style={{ margin: 0, color: theme === "dark" ? "#94A3B8" : "#64748B", fontSize: "0.85rem" }}>{cert.org}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact({ theme }) {
  const [ref, inView] = useInView();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); setForm({ name: "", email: "", message: "" }); }, 1500);
  };

  const inputStyle = {
    width: "100%", padding: "0.85rem 1rem", borderRadius: 10, fontFamily: "inherit",
    background: theme === "dark" ? "rgba(15,23,42,0.7)" : "rgba(255,255,255,0.9)",
    border: `1px solid ${theme === "dark" ? "rgba(59,130,246,0.2)" : "rgba(59,130,246,0.25)"}`,
    color: theme === "dark" ? "#F8FAFC" : "#0F172A", fontSize: "0.95rem",
    outline: "none", boxSizing: "border-box", transition: "border-color 0.2s",
  };

  return (
    <section id="contact" ref={ref} style={{ padding: "6rem 2rem", background: theme === "dark" ? "#1E293B" : "#F8FAFC" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionHeader title="Get In Touch" subtitle="Contact Me" theme={theme} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "3rem", alignItems: "flex-start" }} className="contact-grid">
          {/* Info */}
          <div style={{ opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-25px)", transition: "all 0.7s ease" }}>
            <h3 style={{ fontSize: "1.4rem", fontWeight: 700, color: theme === "dark" ? "#F8FAFC" : "#0F172A", marginBottom: "1rem" }}>Let's work together</h3>
            <p style={{ color: theme === "dark" ? "#94A3B8" : "#475569", lineHeight: 1.7, marginBottom: "2rem" }}>
              I'm open to new opportunities, collaborations, and interesting projects. Feel free to reach out!
            </p>
            {[
              { icon: "✉️", label: "Email", value: "ridhitrehan585@gmail.com", href: "mailto:ridhitrehan585@gmail.com" },
              { icon: "📞", label: "Phone", value: "+91 9888403120", href: "tel:+919888403120" },
              { icon: "📍", label: "Location", value: "Amritsar, Punjab, India", href: null },
              { icon: "⌨️", label: "GitHub", value: "github.com/Ridhi585", href: "https://github.com/Ridhi585" },
              { icon: "💼", label: "LinkedIn", value: "linkedin.com/in/ridhi-trehan", href: "https://www.linkedin.com/in/ridhi-trehan-06a5702b0/" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "1.25rem" }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", flexShrink: 0 }}>{item.icon}</div>
                <div>
                  <div style={{ color: theme === "dark" ? "#94A3B8" : "#64748B", fontSize: "0.78rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{item.label}</div>
                  {item.href
                    ? <a href={item.href} target="_blank" rel="noopener noreferrer" style={{ color: "#3B82F6", fontSize: "0.9rem", fontWeight: 500, textDecoration: "none" }}>{item.value}</a>
                    : <span style={{ color: theme === "dark" ? "#F8FAFC" : "#0F172A", fontSize: "0.9rem", fontWeight: 500 }}>{item.value}</span>
                  }
                </div>
              </div>
            ))}
          </div>
          {/* Form */}
          <div style={{
            background: theme === "dark" ? "rgba(15,23,42,0.6)" : "rgba(255,255,255,0.95)",
            border: "1px solid rgba(59,130,246,0.15)", borderRadius: 20, padding: "2rem",
            backdropFilter: "blur(10px)", boxShadow: "0 4px 30px rgba(0,0,0,0.08)",
            opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(25px)",
            transition: "all 0.7s ease 0.2s",
          }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
                <h3 style={{ color: "#10B981", fontWeight: 700, marginBottom: "0.5rem" }}>Message Sent!</h3>
                <p style={{ color: theme === "dark" ? "#94A3B8" : "#64748B" }}>Thanks for reaching out. I'll get back to you soon!</p>
                <button onClick={() => setSent(false)} style={{ marginTop: "1.5rem", padding: "0.75rem 1.5rem", background: "#3B82F6", color: "#fff", border: "none", borderRadius: 10, cursor: "pointer", fontWeight: 600, fontFamily: "inherit" }}>Send Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div>
                  <label style={{ display: "block", color: theme === "dark" ? "#94A3B8" : "#64748B", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.5rem" }}>Your Name</label>
                  <input type="text" placeholder="Ridhi Trehan" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} style={inputStyle}
                    onFocus={e => e.target.style.borderColor = "#3B82F6"}
                    onBlur={e => e.target.style.borderColor = theme === "dark" ? "rgba(59,130,246,0.2)" : "rgba(59,130,246,0.25)"}
                  />
                </div>
                <div>
                  <label style={{ display: "block", color: theme === "dark" ? "#94A3B8" : "#64748B", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.5rem" }}>Email Address</label>
                  <input type="email" placeholder="you@company.com" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} style={inputStyle}
                    onFocus={e => e.target.style.borderColor = "#3B82F6"}
                    onBlur={e => e.target.style.borderColor = theme === "dark" ? "rgba(59,130,246,0.2)" : "rgba(59,130,246,0.25)"}
                  />
                </div>
                <div>
                  <label style={{ display: "block", color: theme === "dark" ? "#94A3B8" : "#64748B", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.5rem" }}>Message</label>
                  <textarea placeholder="Tell me about your project or opportunity..." required rows={5} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} style={{ ...inputStyle, resize: "vertical", minHeight: 130 }}
                    onFocus={e => e.target.style.borderColor = "#3B82F6"}
                    onBlur={e => e.target.style.borderColor = theme === "dark" ? "rgba(59,130,246,0.2)" : "rgba(59,130,246,0.25)"}
                  />
                </div>
                <button type="submit" disabled={loading} style={{
                  padding: "0.9rem", background: loading ? "rgba(59,130,246,0.5)" : "linear-gradient(135deg, #3B82F6, #2563EB)",
                  color: "#fff", border: "none", borderRadius: 10, cursor: loading ? "not-allowed" : "pointer",
                  fontWeight: 700, fontSize: "1rem", fontFamily: "inherit", transition: "all 0.2s",
                  boxShadow: "0 4px 15px rgba(59,130,246,0.3)",
                }}>
                  {loading ? "Sending..." : "Send Message ✈️"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) { .contact-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

function Footer({ theme }) {
  return (
    <footer style={{
      background: theme === "dark" ? "#0F172A" : "#1E293B",
      borderTop: "1px solid rgba(59,130,246,0.15)", padding: "2.5rem 2rem", textAlign: "center",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", marginBottom: "1.5rem" }}>
          {[
            { href: "https://github.com/Ridhi585", icon: "⌨️", label: "GitHub" },
            { href: "https://www.linkedin.com/in/ridhi-trehan-06a5702b0/", icon: "💼", label: "LinkedIn" },
            { href: "mailto:ridhitrehan585@gmail.com", icon: "✉️", label: "Email" },
          ].map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" style={{
              width: 44, height: 44, borderRadius: 10, background: "rgba(59,130,246,0.1)",
              border: "1px solid rgba(59,130,246,0.25)", display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: "1.2rem", textDecoration: "none", transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(59,130,246,0.25)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(59,130,246,0.1)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >{s.icon}</a>
          ))}
        </div>
        <p style={{ color: "#94A3B8", fontSize: "0.9rem", margin: 0 }}>
          Designed & Developed by{" "}
          <span style={{ background: "linear-gradient(135deg, #3B82F6, #8B5CF6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontWeight: 700 }}>Ridhi Trehan</span>
        </p>
        <p style={{ color: "#475569", fontSize: "0.8rem", marginTop: "0.5rem" }}>© 2025 All Rights Reserved</p>
      </div>
    </footer>
  );
}

function ScrollToTop({ theme }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return visible ? (
    <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{
      position: "fixed", bottom: "2rem", right: "2rem", zIndex: 999,
      width: 48, height: 48, borderRadius: "50%",
      background: "linear-gradient(135deg, #3B82F6, #2563EB)",
      border: "none", cursor: "pointer", color: "#fff", fontSize: "1.2rem",
      boxShadow: "0 4px 20px rgba(59,130,246,0.4)", transition: "all 0.2s",
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.1) translateY(-2px)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "scale(1) translateY(0)"; }}
    >↑</button>
  ) : null;
}

export default function App() {
  const [theme, setTheme] = useState("dark");
  const toggleTheme = () => setTheme(t => t === "dark" ? "light" : "dark");

  const bgColor = theme === "dark" ? "#0F172A" : "#F8FAFC";
  const textColor = theme === "dark" ? "#F8FAFC" : "#0F172A";

  return (
    <div style={{ fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif", background: bgColor, color: textColor, minHeight: "100vh" }}>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${theme === "dark" ? "#0F172A" : "#F1F5F9"}; }
        ::-webkit-scrollbar-thumb { background: #3B82F6; border-radius: 3px; }
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
      `}</style>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Hero theme={theme} />
      <About theme={theme} />
      <Skills theme={theme} />
      <Experience theme={theme} />
      <Projects theme={theme} />
      <Education theme={theme} />
      <Certifications theme={theme} />
      <Contact theme={theme} />
      <Footer theme={theme} />
      <ScrollToTop theme={theme} />
    </div>
  );
}