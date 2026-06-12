import fs from "fs";
import path from "path";

export async function getStaticProps() {
  const file = path.join(process.cwd(), "data", "digital-product-growth-command.json");
  let data = {};
  try { data = JSON.parse(fs.readFileSync(file, "utf8")); }
  catch (e) { data = { title: "Digital Product Growth Command", modules: [], rules: [], summary: "Registry not found." }; }
  return { props: { data } };
}

export default function Page({ data }) {
  const modules = data.modules || [];
  const rules = data.rules || [];
  return (
    <main style={{minHeight:"100vh",padding:"48px",background:"linear-gradient(135deg,#050505,#15110a,#2a210f)",color:"#f7e7b4",fontFamily:"Georgia, serif"}}>
      <section style={{maxWidth:1180,margin:"0 auto",border:"1px solid rgba(242,201,92,.35)",borderRadius:28,padding:32,background:"rgba(0,0,0,.42)",boxShadow:"0 30px 80px rgba(0,0,0,.45)"}}>
        <p style={{letterSpacing:3,textTransform:"uppercase",color:"#d7b75f"}}>Brian & Co Protected Two-Phase Layer</p>
        <h1 style={{fontSize:46,lineHeight:1.05,margin:"12px 0"}}>{data.title}</h1>
        <p style={{fontSize:18,color:"#f3dfaa",maxWidth:900,lineHeight:1.6}}>{data.summary}</p>
        <div style={{marginTop:24,padding:18,border:"1px solid rgba(242,201,92,.35)",borderRadius:18}}>
          <strong>Status:</strong> {data.status} · <strong>Protection:</strong> {data.protection}
        </div>
        <h2 style={{marginTop:34}}>Modules</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:14}}>
          {modules.map((m,i)=><div key={i} style={panelStyle}><strong>{m}</strong><p style={smallText}>Protected, founder-aware, additive by default.</p></div>)}
        </div>
        <h2 style={{marginTop:34}}>Protection Rules</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:14}}>
          {rules.map((r,i)=><div key={i} style={ruleStyle}>✓ {r}</div>)}
        </div>
        <div style={{marginTop:36,padding:22,border:"1px solid rgba(242,201,92,.35)",borderRadius:20}}>
          <h3 style={{marginTop:0}}>Return to Feature Hub</h3>
          <p style={smallText}><a href="/brianco-live-feature-hub" style={{color:"#f7e7b4"}}>Open Brian & Co Live Feature Hub →</a></p>
        </div>
      </section>
    </main>
  );
}
const panelStyle={border:"1px solid rgba(242,201,92,.25)",borderRadius:20,padding:18,background:"rgba(255,255,255,.045)"};
const ruleStyle={border:"1px solid rgba(242,201,92,.22)",borderRadius:16,padding:14,background:"rgba(255,255,255,.035)",color:"#f4e3ad"};
const smallText={color:"#d9c891",lineHeight:1.55};
