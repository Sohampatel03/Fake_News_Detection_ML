import { useState } from "react";
import ResultCard from "../components/ResultCard";
import { predictNews } from "../services/api";

const DetectionPage = ({ onBack }) => {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

  const handleSubmit = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setResult(null);
    setError("");
    try {
      const data = await predictNews(text);

// Detect mode using word count
const wc = text.trim().split(/\s+/).length;

data.mode = wc < 25 ? "headline_analysis" : "article_analysis";

setResult(data);
setTimeout(() => {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth"
  });
}, 200);
    } catch {
      setError("Could not reach prediction service. Make sure backend is running on port 5001.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setText("");
    setResult(null);
    setError("");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#080808",
        padding: "2rem 1rem 4rem",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:wght@400;700&family=Inter:wght@300;400;500;600&display=swap');

        .back-btn:hover  { color: #fbbf24 !important; border-color: #fbbf24 !important; }
        .clear-btn:hover { color: #ef4444 !important; }
        .run-btn:hover:not(:disabled) {
          background: #fff !important;
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(251,191,36,0.25) !important;
        }
        textarea:focus {
          outline: none;
          border-color: #fbbf24 !important;
          box-shadow: 0 0 0 3px rgba(251,191,36,0.08) !important;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <div style={{ maxWidth: 720, margin: "0 auto" }}>

        {/* ── Top bar ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "2.5rem",
          }}
        >
          <button
            onClick={onBack}
            className="back-btn"
            style={{
              background: "none",
              border: "1px solid #1a1a1a",
              color: "#555",
              padding: "0.5rem 1rem",
              borderRadius: 8,
              cursor: "pointer",
              fontSize: "0.72rem",
              letterSpacing: "0.1em",
              fontFamily: "'Space Mono', monospace",
              transition: "color 0.2s, border-color 0.2s",
              whiteSpace: "nowrap",
            }}
          >
            ← BACK
          </button>
          <div style={{ height: 1, flex: 1, background: "#1a1a1a" }} />
          <div
            style={{
              fontSize: "0.65rem",
              color: "#2a2a2a",
              letterSpacing: "0.15em",
              fontFamily: "'Space Mono', monospace",
              whiteSpace: "nowrap",
            }}
          >
            TRUTHSCAN v2.0
          </div>
        </div>

        {/* ── Heading ── */}
        <h1
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            letterSpacing: "0.05em",
            color: "#fff",
            lineHeight: 1,
            marginBottom: "0.5rem",
          }}
        >
          ANALYZE
          <br />
          <span style={{ color: "#fbbf24" }}>YOUR NEWS</span>
        </h1>
        <p
          style={{
            color: "#555",
            fontSize: "0.9rem",
            marginBottom: "2rem",
            lineHeight: 1.7,
          }}
        >
          Paste a headline or full article below. ML model detects
          misinformation patterns in real-time.
        </p>

        {/* ── Mode indicators ── */}
        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            marginBottom: "1.25rem",
            flexWrap: "wrap",
          }}
        >
          {[
            {
              label: "HEADLINE MODE",
              desc: "< 25 words",
              active: wordCount > 0 && wordCount < 25,
            },
            {
              label: "ARTICLE MODE",
              desc: "≥ 25 words",
              active: wordCount >= 25,
            },
          ].map(({ label, desc, active }) => (
            <div
              key={label}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: 8,
                border: `1px solid ${active ? "#fbbf24" : "#1a1a1a"}`,
                background: active ? "rgba(251,191,36,0.08)" : "transparent",
                transition: "all 0.3s",
              }}
            >
              <div
                style={{
                  fontSize: "0.6rem",
                  letterSpacing: "0.15em",
                  color: active ? "#fbbf24" : "#333",
                  fontFamily: "'Space Mono', monospace",
                }}
              >
                {label}
              </div>
              <div
                style={{ fontSize: "0.65rem", color: active ? "#888" : "#222" }}
              >
                {desc}
              </div>
            </div>
          ))}

          {/* Word count */}
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: "0.7rem",
                color: "#2a2a2a",
                fontFamily: "'Space Mono', monospace",
              }}
            >
              {wordCount} WORDS
            </span>
          </div>
        </div>

        {/* ── Textarea ── */}
        <div style={{ position: "relative" }}>
          <textarea
            rows={8}
            placeholder="Paste your news headline or full article here..."
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              if (result) setResult(null);
              if (error) setError("");
            }}
            style={{
              width: "100%",
              background: "#0d0d0d",
              border: "1px solid #1a1a1a",
              borderRadius: 12,
              padding: "1.25rem",
              paddingRight: text ? "4.5rem" : "1.25rem",
              color: "#e5e5e5",
              fontSize: "0.95rem",
              lineHeight: 1.7,
              resize: "vertical",
              fontFamily: "'Inter', sans-serif",
              transition: "border-color 0.2s, box-shadow 0.2s",
              boxSizing: "border-box",
            }}
          />
          {text && (
            <button
              onClick={handleClear}
              className="clear-btn"
              style={{
                position: "absolute",
                top: "0.8rem",
                right: "0.8rem",
                background: "none",
                border: "none",
                color: "#2a2a2a",
                cursor: "pointer",
                fontSize: "0.65rem",
                letterSpacing: "0.1em",
                fontFamily: "'Space Mono', monospace",
                transition: "color 0.2s",
              }}
            >
              CLEAR ✕
            </button>
          )}
        </div>

        {/* ── Submit button ── */}
        <button
          onClick={handleSubmit}
          disabled={loading || !text.trim()}
          className="run-btn"
          style={{
            width: "100%",
            marginTop: "1rem",
            padding: "1rem",
            background: text.trim() ? "#fbbf24" : "#0f0f0f",
            color: text.trim() ? "#000" : "#2a2a2a",
            border: `1px solid ${text.trim() ? "#fbbf24" : "#1a1a1a"}`,
            borderRadius: 12,
            cursor: text.trim() && !loading ? "pointer" : "not-allowed",
            fontSize: "0.85rem",
            fontWeight: 700,
            letterSpacing: "0.15em",
            fontFamily: "'Space Mono', monospace",
            transition: "all 0.2s",
          }}
        >
          {loading ? (
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.6rem",
              }}
            >
              <span
                style={{
                  width: 14,
                  height: 14,
                  border: "2px solid #000",
                  borderTopColor: "transparent",
                  borderRadius: "50%",
                  display: "inline-block",
                  animation: "spin 0.8s linear infinite",
                }}
              />
              ANALYZING...
            </span>
          ) : (
            "RUN DETECTION →"
          )}
        </button>

        {/* ── Error ── */}
        {error && (
          <div
            style={{
              marginTop: "1rem",
              padding: "1rem 1.25rem",
              background: "rgba(239,68,68,0.06)",
              border: "1px solid rgba(239,68,68,0.25)",
              borderRadius: 12,
              color: "#ef4444",
              fontSize: "0.78rem",
              fontFamily: "'Space Mono', monospace",
              lineHeight: 1.6,
            }}
          >
            ⚠ {error}
          </div>
        )}

        {/* ── Result ── */}
        {result && <ResultCard result={result} />}
      </div>
    </div>
  );
};

export default DetectionPage;