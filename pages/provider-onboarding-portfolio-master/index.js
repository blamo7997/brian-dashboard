import fs from "fs";
import path from "path";

export async function getStaticProps(){
  const file=path.join(process.cwd(),"data","provider-onboarding-portfolio-master.json");
  let data={title:"Provider Onboarding Portfolio Master",modules:[],rules:[],summary:""};
  try{data=JSON.parse(fs.readFileSync(file,"utf8"));}catch(e){}
  return {props:{data}};
}

export default function Page({data}){
  const modules=data.modules||[];
  const rules=data.rules||[];
  return (
    <main style={{minHeight:"100vh",padding:"48px",background:"radial-gradient(circle at top left,rgba(242,201,92,.15),transparent 35%),linear-gradient(135deg,#030303,#111,#2a210f)",color:"#f7e7b4",fontFamily:"Georgia, serif"}}>
      <section style={{maxWidth:1240,margin:"0 auto",border:"1px solid rgba(242,201,92,.38)",borderRadius:30,padding:34,background:"rgba(0,0,0,.48)",boxShadow:"0 34px 90px rgba(0,0,0,.55)"}}>
        <p style={{letterSpacing:3,textTransform:"uppercase",color:"#d7b75f"}}>{data.bundle} · {data.phase}</p>
        <h1 style={{fontSize:48,lineHeight:1.04,margin:"12px 0"}}>{data.title}</h1>
        <p style={{fontSize:18,color:"#f3dfaa",maxWidth:960,lineHeight:1.65}}>{data.summary}</p>

        <div style={{marginTop:24,padding:18,border:"1px solid rgba(242,201,92,.35)",borderRadius:20,background:"rgba(255,255,255,.035)"}}>
          <strong>Status:</strong> {data.status} · <strong>Protection:</strong> {data.protection}
        </div>

        <h2 style={{marginTop:34}}>Included Features</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:14}}>
          {modules.map((m,i)=><div key={i} style={panel}><strong>{m}</strong><p style={small}>Protected, founder-aware, additive by default.</p></div>)}
        </div>

        <h2 style={{marginTop:34}}>Protection Rules</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(270px,1fr))",gap:14}}>
          {rules.map((r,i)=><div key={i} style={rule}>✓ {r}</div>)}
        </div>

        <div style={{marginTop:36,padding:22,border:"1px solid rgba(242,201,92,.35)",borderRadius:20}}>
          <a href="/brianco-live-feature-hub" style={{color:"#f7e7b4"}}>Return to Brian & Co Live Feature Hub →</a>
        </div>
      </section>
    </main>
  );
}

const panel={border:"1px solid rgba(242,201,92,.25)",borderRadius:20,padding:18,background:"rgba(255,255,255,.045)"};
const rule={border:"1px solid rgba(242,201,92,.22)",borderRadius:16,padding:14,background:"rgba(255,255,255,.035)",color:"#f4e3ad"};
const small={color:"#d9c891",lineHeight:1.55};
