import { useState } from "react";

export default function LumenControl() {
  const [text, setText] = useState("");
  const [detail, setDetail] = useState(false);
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);

  async function run() {
    setBusy(true);
    setResult(null);

    try {
      const res = await fetch("/api/lumen/do", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-lumen-user-id": "founder" },
        body: JSON.stringify({
          text,
          role: "founder",
          detailRequested: detail,
          consent: true
        })
      });

      const data = await res.json();
      setResult(data);
    } catch (error) {
      setResult({ ok: false, error: String(error?.message || error) });
    }

    setBusy(false);
  }

  return (
    <main style={{
      minHeight: "100vh",
      padding: "44px",
      fontFamily: "Arial, sans-serif",
      background: "linear-gradient(135deg, #f7f3ea, #dfe7ee, #f8d7a1)",
      color: "#1f2933"
    }}>
      <section style={{
        maxWidth: "1100px",
        margin: "0 auto",
        background: "rgba(255,255,255,0.82)",
        borderRadius: "28px",
        padding: "32px",
        boxShadow: "0 24px 80px rgba(31,41,51,0.16)"
      }}>
        <p style={{ letterSpacing: "0.16em", textTransform: "uppercase", fontSize: "12px" }}>
          Lumen Inside Control
        </p>

        <h1 style={{ fontSize: "42px", margin: "8px 0 12px" }}>
          Do everything from inside Lumen.
        </h1>

        <p style={{ fontSize: "17px", lineHeight: 1.6 }}>
          Tell Lumen what to do. Lumen will remember, route the action, run Guardian checks,
          preserve context, and summarize the result. Step-by-step detail is optional.
        </p>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Example: run deep audit, install safe expansions, generate website, show operations status..."
          style={{
            width: "100%",
            minHeight: "150px",
            marginTop: "22px",
            padding: "18px",
            borderRadius: "18px",
            border: "1px solid rgba(31,41,51,0.18)",
            fontSize: "16px"
          }}
        />

        <label style={{ display: "flex", gap: "10px", alignItems: "center", marginTop: "14px" }}>
          <input type="checkbox" checked={detail} onChange={(e) => setDetail(e.target.checked)} />
          Show step-by-step detail
        </label>

        <button
          onClick={run}
          disabled={busy || !text.trim()}
          style={{
            marginTop: "18px",
            padding: "14px 22px",
            borderRadius: "999px",
            border: "0",
            background: "#1f2933",
            color: "white",
            fontSize: "16px",
            cursor: "pointer"
          }}
        >
          {busy ? "Lumen is working..." : "Run inside Lumen"}
        </button>

        {result && (
          <pre style={{
            marginTop: "24px",
            padding: "18px",
            borderRadius: "18px",
            background: "rgba(31,41,51,0.92)",
            color: "white",
            overflow: "auto",
            maxHeight: "480px"
          }}>
            {JSON.stringify(result, null, 2)}
          </pre>
        )}

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "14px",
          marginTop: "28px"
        }}>
          {[
            "Run audit",
            "Run tests",
            "Install safe expansions",
            "Review blocked items",
            "Generate website",
            "Show operations",
            "Use memory",
            "Ask fewer questions"
          ].map((item) => (
            <div key={item} style={{
              padding: "16px",
              borderRadius: "18px",
              background: "rgba(255,255,255,0.75)",
              border: "1px solid rgba(31,41,51,0.08)"
            }}>
              {item}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
