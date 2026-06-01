import fs from "fs";
import path from "path";

export async function getStaticProps() {
  const file = path.join(process.cwd(), "data", "founder-command-center.json");
  let data = {};
  try {
    data = JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (e) {
    data = { status: "missing", modules: [], rules: [] };
  }
  return { props: { data } };
}

export default function FounderCommandCenter({ data }) {
  const modules = data.modules || [];
  const rules = data.rules || [];
  const state = data.latest_known_state || {};

  return (
    <main style={{
      minHeight: "100vh",
      padding: "48px",
      background: "linear-gradient(135deg,#050505,#17120a,#2a210f)",
      color: "#f7e7b4",
      fontFamily: "Georgia, serif"
    }}>
      <section style={{
        maxWidth: 1180,
        margin: "0 auto",
        border: "1px solid rgba(242,201,92,.35)",
        borderRadius: 28,
        padding: 32,
        background: "rgba(0,0,0,.42)",
        boxShadow: "0 30px 80px rgba(0,0,0,.45)"
      }}>
        <p style={{letterSpacing: 3, textTransform: "uppercase", color: "#d7b75f"}}>
          Brian & Co Protected Founder Layer
        </p>

        <h1 style={{fontSize: 46, lineHeight: 1.05, margin: "12px 0"}}>
          Founder Command Center
        </h1>

        <p style={{fontSize: 18, color: "#f3dfaa", maxWidth: 860}}>
          A protected command layer for founder approvals, legal review, role portals,
          continuity reporting, supplier intelligence, luxury outreach, local event visibility,
          and next-best-action guidance.
        </p>

        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:16,marginTop:28}}>
          <Card title="Build Status" value={state.build || "unknown"} />
          <Card title="Static Pages" value={String(state.static_pages || "unknown")} />
          <Card title="Vault" value={state.vault || "unknown"} />
          <Card title="Handoff" value={state.absolute_master_handoff || "unknown"} />
        </div>

        <h2 style={{marginTop:36}}>Protected Modules</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:14}}>
          {modules.map((m, i) => (
            <div key={i} style={panelStyle}>
              <strong>{m}</strong>
              <p style={smallText}>Founder-visible. Approval-gated. Additive by default.</p>
            </div>
          ))}
        </div>

        <h2 style={{marginTop:36}}>Protection Rules</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:14}}>
          {rules.map((r, i) => (
            <div key={i} style={ruleStyle}>✓ {r}</div>
          ))}
        </div>

        <div style={{marginTop:36,padding:22,border:"1px solid rgba(242,201,92,.35)",borderRadius:20}}>
          <h3 style={{marginTop:0}}>Next Recommended Bundle</h3>
          <p style={smallText}>
            Wire approval queues, legal review cards, Cheyenne event alerts, supplier recruitment,
            luxury outreach, and role portal controls into this command center.
          </p>
        </div>
      </section>
    </main>
  );
}

function Card({title,value}) {
  return (
    <div style={panelStyle}>
      <div style={{fontSize:13,color:"#d7b75f",textTransform:"uppercase",letterSpacing:1}}>{title}</div>
      <div style={{fontSize:26,marginTop:8}}>{value}</div>
    </div>
  );
}

const panelStyle = {
  border: "1px solid rgba(242,201,92,.25)",
  borderRadius: 20,
  padding: 18,
  background: "rgba(255,255,255,.045)"
};

const ruleStyle = {
  border: "1px solid rgba(242,201,92,.22)",
  borderRadius: 16,
  padding: 14,
  background: "rgba(255,255,255,.035)",
  color: "#f4e3ad"
};

const smallText = {color:"#d9c891",lineHeight:1.55};
