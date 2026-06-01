import { useState } from "react";

export default function FounderLogin() {
  const [key, setKey] = useState("");
  const [message, setMessage] = useState("");

  async function enter(e) {
    e.preventDefault();

    const response = await fetch("/api/founder-gate", {
      headers: { "x-brianco-founder-key": key }
    });

    const data = await response.json();

    if (data.allowed) {
      localStorage.setItem("brianco_founder_key", key);
      window.location.href = "/founder-approvals";
      return;
    }

    setMessage("Founder access was not approved.");
  }

  return (
    <main style={{
      minHeight: "100vh",
      padding: "42px",
      fontFamily: "Georgia, serif",
      background: "linear-gradient(135deg,#f7f1e8,#ffffff)",
      color: "#1f1a17"
    }}>
      <section style={{
        maxWidth: "760px",
        margin: "0 auto",
        padding: "34px",
        border: "1px solid rgba(31,26,23,.16)",
        borderRadius: "28px",
        background: "rgba(255,255,255,.78)"
      }}>
        <p style={{letterSpacing:".18em",textTransform:"uppercase",fontSize:"12px"}}>
          Brian & Co Founder Private
        </p>
        <h1 style={{fontSize:"44px",lineHeight:"1.08"}}>
          Founder access
        </h1>
        <p style={{fontSize:"18px",lineHeight:"1.7"}}>
          Enter Brian’s private founder access key to open the native Brian & Co admin and green-check approval queue.
        </p>

        <form onSubmit={enter} style={{marginTop:"24px",display:"grid",gap:"14px"}}>
          <input
            required
            type="password"
            placeholder="Founder access key"
            value={key}
            onChange={e=>setKey(e.target.value)}
            style={{
              padding:"14px 16px",
              borderRadius:"14px",
              border:"1px solid rgba(31,26,23,.2)",
              fontSize:"16px"
            }}
          />
          <button style={{
            padding:"14px 18px",
            borderRadius:"999px",
            border:"0",
            cursor:"pointer",
            fontSize:"16px"
          }}>
            Open Brian & Co Admin UI
          </button>
        </form>

        {message && <p style={{marginTop:"18px"}}>{message}</p>}

        <p style={{fontSize:"13px",lineHeight:"1.6",opacity:.72,marginTop:"22px"}}>
          This page is for Brian only. Public Shopify/admin access remains avoided for routine operations.
        </p>
      </section>
    </main>
  );
}
