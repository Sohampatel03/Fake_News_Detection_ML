import { useState, useEffect, useRef } from "react";
import LandingPage from "./pages/LandingPage";
import DetectionPage from "./pages/DetectionPage";

const FLASK_PING_URL =
  (process.env.REACT_APP_API_URL || "http://localhost:5001")
    .replace(/\/$/, "") + "/api/ping";

const WakeupScreen = ({ onReady }) => {
  const [dots, setDots] = useState("");
  const [seconds, setSeconds] = useState(0);
  const [status, setStatus] = useState("Pinging ML service...");

  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;

    // Animate loading dots
    const dotInterval = setInterval(() => {
      setDots((d) => (d.length >= 3 ? "" : d + "."));
    }, 500);

    // Timer
    const secInterval = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);

    // Poll backend until it wakes up
    const ping = async () => {
      try {
        const res = await fetch(FLASK_PING_URL, {
          method: "GET",
        });

        if (res.ok) {
          if (!isMounted.current) return;

          setStatus("✅ ML service is ready!");

          clearInterval(dotInterval);
          clearInterval(secInterval);

          // Small delay so user can see ready state
          setTimeout(() => {
            if (isMounted.current) {
              onReady();
            }
          }, 800);

          return;
        }
      } catch (error) {
        if (isMounted.current) {
          setStatus("Waking up ML service...");
        }
      }

      // Retry every 3 seconds
      if (isMounted.current) {
        setTimeout(ping, 3000);
      }
    };

    ping();

    return () => {
      isMounted.current = false;

      clearInterval(dotInterval);
      clearInterval(secInterval);
    };
  }, [onReady]);

  const isReady = status.startsWith("✅");

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#080808",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Space Mono', monospace",
        padding: "2rem",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:wght@400;700&display=swap');

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes barGrow {
          0% {
            width: 0%;
          }
          50% {
            width: 70%;
          }
          80% {
            width: 88%;
          }
          100% {
            width: 95%;
          }
        }
      `}</style>

      {/* Logo */}
      <div
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "3rem",
          color: "#fbbf24",
          letterSpacing: "0.1em",
          marginBottom: "0.25rem",
          animation: "fadeIn 0.6s ease forwards",
        }}
      >
        TRUTHSCAN
      </div>

      <div
        style={{
          fontSize: "0.6rem",
          color: "#333",
          letterSpacing: "0.2em",
          marginBottom: "3rem",
          animation: "fadeIn 0.6s ease 0.1s both",
        }}
      >
        AI-POWERED FAKE NEWS DETECTOR
      </div>

      {/* Loader */}
      <div
        style={{
          width: 64,
          height: 64,
          marginBottom: "2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          animation: "fadeIn 0.6s ease 0.2s both",
        }}
      >
        {isReady ? (
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: "rgba(34,197,94,0.1)",
              border: "2px solid #22c55e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.8rem",
            }}
          >
            ✓
          </div>
        ) : (
          <div
            style={{
              width: 48,
              height: 48,
              border: "3px solid #1a1a1a",
              borderTopColor: "#fbbf24",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />
        )}
      </div>

      {/* Progress Bar */}
      {!isReady && (
        <div
          style={{
            width: "100%",
            maxWidth: 340,
            height: 4,
            background: "#111",
            borderRadius: 4,
            overflow: "hidden",
            marginBottom: "1.5rem",
            animation: "fadeIn 0.6s ease 0.3s both",
          }}
        >
          <div
            style={{
              height: "100%",
              background: "linear-gradient(90deg, #92400e, #fbbf24)",
              borderRadius: 4,
              animation: "barGrow 25s ease forwards",
            }}
          />
        </div>
      )}

      {/* Status */}
      <div
        style={{
          fontSize: "0.75rem",
          color: isReady ? "#22c55e" : "#555",
          letterSpacing: "0.1em",
          marginBottom: "1rem",
          minHeight: "1.2rem",
          animation: "fadeIn 0.6s ease 0.3s both",
          transition: "color 0.3s",
        }}
      >
        {isReady
          ? "✅ ML SERVICE IS READY!"
          : `WAKING UP ML SERVICE${dots}`}
      </div>

      {/* Timer */}
      {!isReady && (
        <div
          style={{
            fontSize: "0.6rem",
            color: "#2a2a2a",
            letterSpacing: "0.1em",
            marginBottom: "2.5rem",
          }}
        >
          {seconds}s elapsed
        </div>
      )}

      {/* Notice */}
      {!isReady && (
        <div
          style={{
            maxWidth: 380,
            padding: "1.25rem 1.5rem",
            background: "rgba(251,191,36,0.04)",
            border: "1px solid rgba(251,191,36,0.12)",
            borderRadius: 12,
            animation: "fadeIn 0.6s ease 0.4s both",
          }}
        >
          <div
            style={{
              fontSize: "0.6rem",
              color: "#fbbf24",
              letterSpacing: "0.15em",
              marginBottom: "0.6rem",
            }}
          >
            ⚡ FREE TIER NOTICE
          </div>

          <div
            style={{
              fontSize: "0.75rem",
              color: "#444",
              lineHeight: 1.8,
            }}
          >
            This app runs on{" "}
            <span style={{ color: "#666" }}>
              Render's free tier
            </span>.
            The ML service sleeps after inactivity and takes{" "}
            <span style={{ color: "#fbbf24" }}>
              15–30 seconds
            </span>{" "}
            to wake up.
            <br />
            <br />
            Hang tight — this only happens on the first visit! ☕
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [page, setPage] = useState("landing");
  const [ready, setReady] = useState(false);

  return !ready ? (
    <WakeupScreen onReady={() => setReady(true)} />
  ) : page === "landing" ? (
    <LandingPage onDetect={() => setPage("detect")} />
  ) : (
    <DetectionPage onBack={() => setPage("landing")} />
  );
}