import { useEffect, useState } from "react";

export default function LumenSetup(){
  const [data,setData] = useState(null);

  async function refresh(){
    const res = await fetch("/api/lumen/live-complete-setup");
    const json = await res.json();
    setData(json.result);
  }

  useEffect(()=>{ refresh(); },[]);

  const services = data?.services || [];

  return (
    <main style={{
      minHeight:"100vh",
      padding:"40px",
      fontFamily:"Inter, system-ui, Arial",
      background:"linear-gradient(135deg,#f8f4ec,#eef3fb,#fff8ed)",
      color:"#18202c"
    }}>
      <section style={{
        maxWidth:"1120px",
        margin:"0 auto",
        background:"rgba(255,255,255,.82)",
        border:"1px solid rgba(30,40,60,.12)",
        borderRadius:"30px",
        padding:"34px",
        boxShadow:"0 24px 80px rgba(20,30,60,.14)"
      }}>
        <h1 style={{fontSize:"40px",margin:"0 0 8px"}}>Lumen Live Setup</h1>
        <p style={{fontSize:"18px",lineHeight:1.55,maxWidth:"780px"}}>
          {data?.lumenVoice || "I’ll guide you through setup clearly and only ask for what is necessary."}
        </p>

        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:"16px",marginTop:"28px"}}>
          <Card title="Ready Services" value={`${services.filter(s=>s.configured).length}/${services.length}`} />
          <Card title="Tokens Assumed" value={data?.tokensAssumed ? "Yes" : "No"} />
          <Card title="Secrets Shown" value={data?.secretsShown ? "Yes" : "No"} />
          <Card title="Mode" value="Live Workspace" />
        </div>

        <h2 style={{marginTop:"34px"}}>Service Setup</h2>
        <div style={{display:"grid",gap:"12px"}}>
          {services.map(s=>(
            <div key={s.id} style={{
              padding:"18px",
              borderRadius:"20px",
              background:s.configured ? "rgba(228,247,237,.95)" : "rgba(255,246,226,.95)",
              border:"1px solid rgba(30,40,60,.10)"
            }}>
              <strong>{s.configured ? "✓" : "•"} {s.name}</strong>
              <div style={{marginTop:"6px",opacity:.82}}>{s.configured ? "Configured or locally ready." : s.needs}</div>
              {s.link ? (
                <button onClick={()=>window.open(s.link,"_blank","noopener,noreferrer")} style={buttonStyle}>
                  Open Setup Page
                </button>
              ) : null}
            </div>
          ))}
        </div>

        <h2 style={{marginTop:"34px"}}>Local Tools</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(230px,1fr))",gap:"12px"}}>
          {Object.entries(data?.tools || {}).map(([k,v])=>(
            <div key={k} style={{padding:"14px",borderRadius:"16px",background:"rgba(255,255,255,.74)",border:"1px solid rgba(30,40,60,.10)"}}>
              <strong>{k}</strong>
              <div style={{fontSize:"13px",marginTop:"6px",whiteSpace:"pre-wrap"}}>{v || "Not detected"}</div>
            </div>
          ))}
        </div>

        <h2 style={{marginTop:"34px"}}>Actions</h2>
        <div style={{display:"flex",gap:"12px",flexWrap:"wrap"}}>
          <button onClick={refresh} style={buttonStyle}>Refresh Status</button>
          <button onClick={()=>alert("Open .env.local from the Desktop setup window. Lumen does not print secrets here.")} style={buttonStyle}>Enter Keys Locally</button>
          <button onClick={()=>window.open("/lumen/control","_self")} style={buttonStyle}>Continue to Lumen</button>
        </div>

        <p style={{marginTop:"26px",fontSize:"14px",opacity:.7}}>
          Lumen does not assume tokens. Lumen only uses keys after you enter them locally.
        </p>
      </section>
    </main>
  );
}

function Card({title,value}){
  return (
    <div style={{padding:"18px",borderRadius:"20px",background:"rgba(255,255,255,.75)",border:"1px solid rgba(30,40,60,.10)"}}>
      <div style={{fontSize:"13px",opacity:.7}}>{title}</div>
      <div style={{fontSize:"24px",fontWeight:800,marginTop:"6px"}}>{value}</div>
    </div>
  );
}

const buttonStyle = {
  marginTop:"12px",
  border:"0",
  borderRadius:"999px",
  padding:"12px 18px",
  background:"#1d2430",
  color:"white",
  cursor:"pointer",
  fontWeight:800
};
