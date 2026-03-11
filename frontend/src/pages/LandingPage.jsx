import { useState, useEffect } from "react";
import ParticleBg from "../components/ParticleBg";
import Counter from "../components/Counter";

const LandingPage = ({ onDetect }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div style={{ background: "#080808", minHeight: "100vh", color: "#e5e5e5", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:wght@400;700&family=Inter:wght@300;400;500;600&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        .cta-btn { transition: all 0.25s !important; }
        .cta-btn:hover { background: #fff !important; color: #000 !important; transform: translateY(-3px); box-shadow: 0 20px 40px rgba(251,191,36,0.2) !important; }
        .feature-card { transition: all 0.3s; }
        .feature-card:hover { border-color: #fbbf24 !important; transform: translateY(-4px); background: rgba(251,191,36,0.04) !important; }
        .nav-link:hover { color: #fbbf24 !important; }
        @keyframes heroFadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.4; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-inner { animation: ticker 20s linear infinite; display: flex; white-space: nowrap; }
        .ticker-inner:hover { animation-play-state: paused; }
      `}</style>

      <ParticleBg />

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "1rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(8,8,8,0.95)" : "transparent",
        borderBottom: scrolled ? "1px solid #111" : "none",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        transition: "all 0.3s",
      }}>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.4rem", letterSpacing: "0.1em", color: "#fbbf24" }}>
          TRUTHSCAN
        </div>
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          {["How It Works", "Features", "About"].map((item) => (
            <a key={item} href="#" className="nav-link" style={{
              color: "#555", textDecoration: "none", fontSize: "0.75rem",
              letterSpacing: "0.1em", fontFamily: "'Space Mono', monospace",
              transition: "color 0.2s",
            }}>{item}</a>
          ))}
          <button onClick={onDetect} style={{
            background: "#fbbf24", color: "#000", border: "none",
            padding: "0.5rem 1.25rem", borderRadius: 6, cursor: "pointer",
            fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em",
            fontFamily: "'Space Mono', monospace", transition: "all 0.2s",
          }}
          onMouseEnter={e => { e.target.style.background = "#fff"; }}
          onMouseLeave={e => { e.target.style.background = "#fbbf24"; }}
          >
            TRY NOW →
          </button>
        </div>
      </nav>

      {/* TICKER */}
      <div style={{ background: "#fbbf24", padding: "0.5rem 0", overflow: "hidden", position: "relative", zIndex: 10, marginTop: 0 }}>
        <div className="ticker-inner">
          {Array(4).fill("BREAKING: AI-POWERED FAKE NEWS DETECTION  ·  REAL-TIME ANALYSIS  ·  ML-BACKED RESULTS  ·  HEADLINE & ARTICLE MODES  ·  BUILT WITH SCIKIT-LEARN  ·  ").map((t, i) => (
            <span key={i} style={{ color: "#000", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em", fontFamily: "'Space Mono', monospace", paddingRight: "0" }}>{t}</span>
          ))}
        </div>
      </div>

      {/* HERO */}
      <section style={{ position: "relative", zIndex: 1, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "6rem 2rem 4rem" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <div style={{ animation: "heroFadeIn 0.8s ease forwards" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              border: "1px solid #1a1a1a", borderRadius: 20, padding: "0.4rem 1rem",
              marginBottom: "2rem", background: "rgba(251,191,36,0.05)",
            }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", position: "relative" }}>
                <div style={{
                  position: "absolute", inset: -3, borderRadius: "50%",
                  border: "1px solid #22c55e", animation: "pulse-ring 1.5s ease-out infinite",
                }} />
              </div>
              <span style={{ fontSize: "0.65rem", color: "#666", letterSpacing: "0.15em", fontFamily: "'Space Mono', monospace" }}>MODEL ACTIVE — 94.2% ACCURACY</span>
            </div>

            <h1 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(4rem, 12vw, 9rem)",
              letterSpacing: "0.02em",
              lineHeight: 0.9,
              marginBottom: "1.5rem",
            }}>
              <span style={{ color: "#fff" }}>DETECT</span><br />
              <span style={{ color: "#fbbf24", WebkitTextStroke: "2px #fbbf24", WebkitTextFillColor: "transparent" }}>FAKE NEWS</span><br />
              <span style={{ color: "#fff" }}>INSTANTLY</span>
            </h1>

            <p style={{ color: "#555", fontSize: "1.05rem", lineHeight: 1.8, maxWidth: 560, margin: "0 auto 3rem", fontWeight: 300 }}>
              Powered by Machine Learning and trained on{" "}
              <span style={{ color: "#fbbf24" }}>44,000+ verified articles</span>.
              Paste any headline or article — get an instant verdict.
            </p>

            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <button onClick={onDetect} className="cta-btn" style={{
                background: "#fbbf24", color: "#000", border: "none",
                padding: "1rem 2.5rem", borderRadius: 10, cursor: "pointer",
                fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.15em",
                fontFamily: "'Space Mono', monospace",
              }}>
                ANALYZE NEWS →
              </button>
              <a href="#how" style={{
                background: "transparent", color: "#555", border: "1px solid #1a1a1a",
                padding: "1rem 2rem", borderRadius: 10, cursor: "pointer",
                fontSize: "0.8rem", letterSpacing: "0.1em", textDecoration: "none",
                fontFamily: "'Space Mono', monospace", display: "inline-flex", alignItems: "center",
                transition: "color 0.2s, border-color 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#333"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "#555"; e.currentTarget.style.borderColor = "#1a1a1a"; }}
              >
                HOW IT WORKS ↓
              </a>
            </div>
          </div>

          {/* Stats */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px",
            marginTop: "5rem", border: "1px solid #111", borderRadius: 16, overflow: "hidden",
            background: "#111", animation: "heroFadeIn 1s ease 0.3s both",
          }}>
            {[
              { value: 44000, suffix: "+", label: "TRAINING ARTICLES" },
              { value: 94, suffix: ".2%", label: "MODEL ACCURACY" },
              { value: 2, suffix: " MODES", label: "HEADLINE & ARTICLE" },
            ].map(({ value, suffix, label }) => (
              <div key={label} style={{ background: "#0d0d0d", padding: "2rem 1rem", textAlign: "center" }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2.5rem", color: "#fbbf24", letterSpacing: "0.05em" }}>
                  <Counter target={value} suffix={suffix} />
                </div>
                <div style={{ fontSize: "0.6rem", color: "#444", letterSpacing: "0.15em", marginTop: "0.25rem", fontFamily: "'Space Mono', monospace" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" style={{ position: "relative", zIndex: 1, padding: "5rem 2rem", borderTop: "1px solid #0f0f0f" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ marginBottom: "3.5rem" }}>
            <div style={{ fontSize: "0.65rem", color: "#fbbf24", letterSpacing: "0.2em", fontFamily: "'Space Mono', monospace", marginBottom: "0.75rem" }}>PROCESS</div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", color: "#fff", letterSpacing: "0.03em" }}>HOW IT WORKS</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1px", background: "#111", borderRadius: 16, overflow: "hidden" }}>
            {[
              { step: "01", title: "PASTE TEXT", desc: "Drop a headline or full article. No character limit.", icon: "📋" },
              { step: "02", title: "AUTO DETECT", desc: "System auto-detects headline vs article mode based on word count.", icon: "🔍" },
              { step: "03", title: "ML ANALYSIS", desc: "TF-IDF vectorization + Logistic Regression classifies the text.", icon: "🧠" },
              { step: "04", title: "GET VERDICT", desc: "Receive a probability score: Real, Fake, or Uncertain.", icon: "⚡" },
            ].map(({ step, title, desc, icon }) => (
              <div key={step} className="feature-card" style={{
                background: "#0d0d0d", padding: "2rem",
                border: "1px solid transparent", cursor: "default",
              }}>
                <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>{icon}</div>
                <div style={{ fontSize: "0.6rem", color: "#fbbf24", letterSpacing: "0.2em", fontFamily: "'Space Mono', monospace", marginBottom: "0.5rem" }}>STEP {step}</div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.4rem", color: "#fff", letterSpacing: "0.05em", marginBottom: "0.75rem" }}>{title}</div>
                <div style={{ fontSize: "0.85rem", color: "#555", lineHeight: 1.6 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ position: "relative", zIndex: 1, padding: "5rem 2rem", borderTop: "1px solid #0f0f0f" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ marginBottom: "3.5rem" }}>
            <div style={{ fontSize: "0.65rem", color: "#fbbf24", letterSpacing: "0.2em", fontFamily: "'Space Mono', monospace", marginBottom: "0.75rem" }}>CAPABILITIES</div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", color: "#fff", letterSpacing: "0.03em" }}>WHAT MAKES US<br /><span style={{ color: "#fbbf24" }}>DIFFERENT</span></h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
            {[
              { title: "Dual Analysis Modes", desc: "Headline mode uses sensationalism scoring. Article mode uses pure ML classification.", badge: "SMART" },
              { title: "Sensationalism Detection", desc: "60+ clickbait patterns, ALL-CAPS detection, and excessive punctuation analysis.", badge: "UNIQUE" },
              { title: "Probability Scores", desc: "Not just a label — get exact fake/real probability percentages for every prediction.", badge: "PRECISE" },
              { title: "Multi-Dataset Training", desc: "Trained on Kaggle + Indian news datasets for diverse geographic coverage.", badge: "ROBUST" },
              { title: "Fast Inference", desc: "Sub-second predictions powered by a lightweight TF-IDF + LR pipeline.", badge: "FAST" },
              { title: "Open Architecture", desc: "Node.js proxy + Flask ML API. Clean separation of concerns.", badge: "MODULAR" },
            ].map(({ title, desc, badge }) => (
              <div key={title} className="feature-card" style={{
                background: "#0a0a0a", border: "1px solid #111",
                borderRadius: 12, padding: "1.5rem",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.85rem", fontWeight: 700, color: "#e5e5e5" }}>{title}</div>
                  <span style={{ fontSize: "0.55rem", background: "rgba(251,191,36,0.1)", color: "#fbbf24", padding: "0.2rem 0.5rem", borderRadius: 4, letterSpacing: "0.1em", whiteSpace: "nowrap", marginLeft: "0.5rem", fontFamily: "'Space Mono', monospace" }}>{badge}</span>
                </div>
                <div style={{ fontSize: "0.82rem", color: "#444", lineHeight: 1.6 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{ position: "relative", zIndex: 1, padding: "5rem 2rem", borderTop: "1px solid #0f0f0f" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{
            background: "linear-gradient(135deg, rgba(251,191,36,0.08), rgba(251,191,36,0.02))",
            border: "1px solid rgba(251,191,36,0.15)",
            borderRadius: 20, padding: "4rem 3rem", textAlign: "center",
          }}>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#fff", letterSpacing: "0.03em", marginBottom: "1rem" }}>
              READY TO DETECT<br /><span style={{ color: "#fbbf24" }}>FAKE NEWS?</span>
            </div>
            <p style={{ color: "#555", marginBottom: "2rem", fontSize: "0.9rem" }}>No signup required. Free to use. Instant results.</p>
            <button onClick={onDetect} className="cta-btn" style={{
              background: "#fbbf24", color: "#000", border: "none",
              padding: "1.1rem 3rem", borderRadius: 10, cursor: "pointer",
              fontSize: "0.9rem", fontWeight: 700, letterSpacing: "0.15em",
              fontFamily: "'Space Mono', monospace",
            }}>
              START ANALYZING →
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ position: "relative", zIndex: 1, padding: "2rem", borderTop: "1px solid #0f0f0f", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.2rem", color: "#fbbf24", letterSpacing: "0.1em" }}>TRUTHSCAN</div>
        <div style={{ fontSize: "0.65rem", color: "#333", fontFamily: "'Space Mono', monospace", letterSpacing: "0.1em" }}>
          BUILT WITH REACT · FLASK · SCIKIT-LEARN
        </div>
        <div style={{ fontSize: "0.65rem", color: "#222", fontFamily: "'Space Mono', monospace" }}>
          ML MODEL: LOGISTIC REGRESSION + TF-IDF
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;