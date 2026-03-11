const ResultCard = ({ result }) => {
  const isFake = result.prediction === "Fake News";
  const isUncertain = result.prediction === "Uncertain / Needs Verification";
  const isReal = result.prediction === "Real News";
  const isHeadline = result.mode === "headline_analysis";

  const fakeP = result.fake_probability * 100;
  const realP = result.real_probability * 100;

  const verdictColor = isFake ? "#ef4444" : isUncertain ? "#f59e0b" : "#22c55e";
  const verdictBg = isFake
    ? "rgba(239,68,68,0.06)"
    : isUncertain
    ? "rgba(245,158,11,0.06)"
    : "rgba(34,197,94,0.06)";
  const icon = isFake ? "!" : isUncertain ? "?" : "✓";
  const label = isFake ? "FAKE NEWS" : isUncertain ? "UNCERTAIN(Needs Verification)" : "REAL NEWS";

  const confidence = isReal ? realP : isFake ? fakeP : 50 - Math.abs(fakeP - 50);
  const confidenceLabel =
    confidence >= 75 ? "HIGH CONFIDENCE"
    : confidence >= 55 ? "MODERATE CONFIDENCE"
    : "LOW CONFIDENCE — VERIFY MANUALLY";
  const confidenceColor =
    confidence >= 75 ? "#22c55e" : confidence >= 55 ? "#f59e0b" : "#ef4444";
  const filledBlocks = Math.round((confidence / 100) * 5);

  return (
    <div
      style={{
        marginTop: "2rem",
        border: `1px solid ${verdictColor}33`,
        borderRadius: "16px",
        background: verdictBg,
        padding: "2rem",
        animation: "fadeSlideUp 0.5s ease forwards",
      }}
    >
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes growBar { from { width: 0; } }
      `}</style>

      {/* HEADLINE MODE — only icon + verdict label, nothing else */}
      {isHeadline && (
  <>
    <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: "50%",
          flexShrink: 0,
          background: verdictColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.6rem",
          color: "#0a0a0a",
          fontWeight: 900,
          boxShadow: `0 0 28px ${verdictColor}66`,
        }}
      >
        {icon}
      </div>

      <div>
        <div
          style={{
            fontSize: "0.6rem",
            letterSpacing: "0.2em",
            color: "#555",
            fontFamily: "'Space Mono', monospace",
            marginBottom: "0.2rem",
          }}
        >
          VERDICT
        </div>

        <div
          style={{
            fontSize: "2.8rem",
            fontWeight: 800,
            color: verdictColor,
            fontFamily: "'Bebas Neue', sans-serif",
            letterSpacing: "0.06em",
            lineHeight: 1,
          }}
        >
          {label}
        </div>
      </div>
    </div>

    {/* Description + Disclaimer */}
    <div
      style={{
        marginTop: "1.25rem",
        padding: "0.9rem 1rem",
        borderRadius: 10,
        background: "rgba(255,255,255,0.03)",
        border: "1px solid #1a1a1a",
        fontSize: "0.72rem",
        color: "#777",
        lineHeight: 1.6,
        fontFamily: "'Space Mono', monospace",
      }}
    >
      📰 Headline analysis is based on linguistic patterns such as sensational words,
      tone, and writing style.

      <br /><br />

      ⚠ For more accuraccy paste the full article in the input box and get a detailed breakdown of real vs fake signals.
    </div>
  </>
)}

      {/* ARTICLE MODE — full verdict + confidence meter + signal breakdown */}
      {!isHeadline && (
        <>
          {/* Verdict row */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
            <div
              style={{
                width: 52, height: 52, borderRadius: "50%", flexShrink: 0,
                background: verdictColor, display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: "1.3rem", color: "#0a0a0a",
                fontWeight: 900, boxShadow: `0 0 20px ${verdictColor}55`,
              }}
            >
              {icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "0.6rem", letterSpacing: "0.2em", color: "#555", fontFamily: "'Space Mono', monospace" }}>VERDICT</div>
              <div style={{ fontSize: "1.7rem", fontWeight: 800, color: verdictColor, fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em", lineHeight: 1.1 }}>
                {label}
              </div>
            </div>
            <div style={{ fontSize: "0.6rem", letterSpacing: "0.12em", padding: "0.25rem 0.75rem", borderRadius: "20px", border: "1px solid #222", color: "#444", fontFamily: "'Space Mono', monospace", whiteSpace: "nowrap" }}>
              ARTICLE MODE
            </div>
          </div>

          {/* Confidence badge */}
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1.25rem" }}>
            <div style={{ fontSize: "0.6rem", letterSpacing: "0.1em", padding: "0.3rem 0.8rem", borderRadius: "20px", background: `${confidenceColor}18`, border: `1px solid ${confidenceColor}44`, color: confidenceColor, fontFamily: "'Space Mono', monospace" }}>
              {confidenceLabel}
            </div>
          </div>

          {/* Confidence Meter */}
          <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: "12px", padding: "1.25rem", border: "1px solid #1a1a1a", marginBottom: "1.25rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <div style={{ fontSize: "0.6rem", letterSpacing: "0.15em", color: "#555", fontFamily: "'Space Mono', monospace" }}>MODEL CONFIDENCE</div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.6rem", color: confidenceColor, letterSpacing: "0.05em", lineHeight: 1 }}>
                {confidence.toFixed(1)}%
              </div>
            </div>
            <div style={{ display: "flex", gap: "4px" }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} style={{
                  flex: 1, height: 10, borderRadius: 3,
                  background: i < filledBlocks ? confidenceColor : "#111",
                  border: `1px solid ${i < filledBlocks ? confidenceColor + "66" : "#1a1a1a"}`,
                  transition: `background 0.3s ease ${i * 0.08}s`,
                  boxShadow: i < filledBlocks ? `0 0 6px ${confidenceColor}44` : "none",
                }} />
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.5rem", fontSize: "0.55rem", color: "#333", fontFamily: "'Space Mono', monospace" }}>
              <span>NO CONFIDENCE</span><span>FULLY CONFIDENT</span>
            </div>
          </div>

          {/* Signal Breakdown */}
          <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: "12px", padding: "1.25rem", border: "1px solid #1a1a1a" }}>
            <div style={{ fontSize: "0.6rem", letterSpacing: "0.15em", color: "#555", fontFamily: "'Space Mono', monospace", marginBottom: "1rem" }}>SIGNAL BREAKDOWN</div>

            <div style={{ marginBottom: "0.85rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.35rem" }}>
                <span style={{ fontSize: "0.7rem", color: "#22c55e", fontFamily: "'Space Mono', monospace" }}>● REAL SIGNAL</span>
                <span style={{ fontSize: "0.7rem", color: "#22c55e", fontFamily: "'Space Mono', monospace", fontWeight: 700 }}>{realP.toFixed(1)}%</span>
              </div>
              <div style={{ height: 6, background: "#0f0f0f", borderRadius: 3, overflow: "hidden" }}>
                <div style={{ height: "100%", borderRadius: 3, background: "linear-gradient(90deg, #166534, #22c55e)", width: `${realP}%`, animation: "growBar 1s ease forwards" }} />
              </div>
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.35rem" }}>
                <span style={{ fontSize: "0.7rem", color: "#ef4444", fontFamily: "'Space Mono', monospace" }}>● FAKE SIGNAL</span>
                <span style={{ fontSize: "0.7rem", color: "#ef4444", fontFamily: "'Space Mono', monospace", fontWeight: 700 }}>{fakeP.toFixed(1)}%</span>
              </div>
              <div style={{ height: 6, background: "#0f0f0f", borderRadius: 3, overflow: "hidden" }}>
                <div style={{ height: "100%", borderRadius: 3, background: "linear-gradient(90deg, #7f1d1d, #ef4444)", width: `${fakeP}%`, animation: "growBar 1s ease 0.15s forwards" }} />
              </div>
            </div>

            {confidence < 55 && (
              <div style={{ marginTop: "1rem", padding: "0.75rem 1rem", borderRadius: 8, background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.2)", fontSize: "0.72rem", color: "#d97706", lineHeight: 1.6, fontFamily: "'Space Mono', monospace" }}>
                Mixed signals detected — cross-check with a trusted source before sharing.
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ResultCard;