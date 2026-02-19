"use client";
import { useState, useEffect } from "react";

export default function WelcomeModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("cashback-modal-seen");
    if (!seen) {
      setOpen(true);
    }
  }, []);

  function dismiss() {
    sessionStorage.setItem("cashback-modal-seen", "1");
    setOpen(false);
  }

  if (!open) return null;

  return (
    /* Backdrop */
    <div
      onClick={dismiss}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(5, 5, 15, 0.85)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      {/* Modal card */}
      <div
        className="modal-in"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#0d0e1f",
          border: "1px solid #2a2d50",
          borderRadius: 16,
          padding: "40px 36px",
          maxWidth: 560,
          width: "100%",
          position: "relative",
          boxShadow: "0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px #1a1c35",
        }}
      >
        {/* Close button */}
        <button
          onClick={dismiss}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            background: "none",
            border: "none",
            color: "#4a4a6a",
            fontSize: 20,
            cursor: "pointer",
            lineHeight: 1,
            padding: 4,
            transition: "color 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#4a4a6a")}
        >
          ×
        </button>

        {/* Title */}
        <h2 style={{
          fontFamily: "var(--font-sans)",
          fontWeight: 700,
          fontSize: 22,
          color: "#fff",
          textAlign: "center",
          marginBottom: 20,
          letterSpacing: "-0.02em",
        }}>
          How it works
        </h2>

        {/* Intro paragraph */}
        <p style={{
          fontFamily: "var(--font-sans)",
          fontSize: 15,
          color: "#c0c0d8",
          textAlign: "center",
          lineHeight: 1.65,
          marginBottom: 24,
        }}>
          Hold{" "}
          <span style={{ color: "#4ade80", fontWeight: 600 }}>$CASHBACK</span>
          {" "}and earn rewards automatically. Fees distributed will get paid out and allocated based on longer hold times, and rankings will be reflected on the leaderboards.
        </p>

        {/* Steps */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 28 }}>
          {[
            {
              bold: "Step 1:",
              text: <>acquire or hold{" "}<span style={{ color: "#4ade80", fontWeight: 600 }}>$CASHBACK</span>{" "}in your wallet</>,
            },
            {
              bold: "Step 2:",
              text: <>hold{" "}<span style={{ color: "#4ade80", fontWeight: 600 }}>$CASHBACK</span>{" "}longer to increase your allocation and leaderboard position</>,
            },
            {
              bold: "Step 3:",
              text: "receive distributed fees based on your hold duration and ranking",
            },
          ].map((step, i) => (
            <p key={i} style={{
              fontFamily: "var(--font-sans)",
              fontSize: 14,
              color: "#c0c0d8",
              textAlign: "center",
              lineHeight: 1.6,
              margin: 0,
            }}>
              <span style={{ fontWeight: 700, color: "#fff" }}>{step.bold}</span>{" "}
              {step.text}
            </p>
          ))}
        </div>

        {/* Disclaimer */}
        <p style={{
          fontFamily: "var(--font-sans)",
          fontSize: 13,
          color: "#8888aa",
          textAlign: "center",
          lineHeight: 1.6,
          marginBottom: 24,
        }}>
          By clicking this button, you agree to the{" "}
          <span style={{ fontWeight: 700, color: "#c0c0d8" }}>terms and conditions</span>
          {" "}and certify that you are over 18 years old
        </p>

        {/* CTA button */}
        <button
          onClick={dismiss}
          style={{
            width: "100%",
            background: "#86efac",
            color: "#0a0a12",
            fontFamily: "var(--font-sans)",
            fontWeight: 700,
            fontSize: 16,
            padding: "18px 24px",
            borderRadius: 10,
            border: "none",
            cursor: "pointer",
            letterSpacing: "-0.01em",
            transition: "background 0.15s, box-shadow 0.15s",
            boxShadow: "0 0 24px rgba(134,239,172,0.25)",
            marginBottom: 20,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "#4ade80";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 0 32px rgba(74,222,128,0.4)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "#86efac";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 0 24px rgba(134,239,172,0.25)";
          }}
        >
          I'm ready to start earning
        </button>

        {/* Footer links */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: 0,
          alignItems: "center",
        }}>
          {[
            { label: "Privacy policy", href: "#" },
            { label: "Terms of service", href: "#" },
            { label: "Fees", href: "#" },
          ].map((link, i) => (
            <span key={link.label} style={{ display: "flex", alignItems: "center", gap: 0 }}>
              {i > 0 && <span style={{ color: "#2a2d50", margin: "0 10px" }}>|</span>}
              <a
                href={link.href}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 13,
                  color: "#8888aa",
                  textDecoration: "underline",
                  textUnderlineOffset: 2,
                  textDecorationColor: "#2a2d50",
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#8888aa")}
              >
                {link.label}
              </a>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
