import products from "../data/brianco-live-products-memberships.json";
import rules from "../data/brianco-entitlement-rules.json";

export default function StewardshipIntelligence() {
  return (
    <main style={{minHeight:"100vh",background:"radial-gradient(circle at top left,#5a3b06,#12100c 42%,#050505)",color:"#fff3d0",fontFamily:"Georgia,serif",padding:"48px 24px"}}>
      <section style={{maxWidth:1180,margin:"0 auto"}}>
        <p style={{letterSpacing:4,color:"#f5c25b",textTransform:"uppercase"}}>Brian & Co</p>
        <h1 style={{fontSize:56,margin:"0 0 12px",color:"#f5c25b"}}>Stewardship Intelligence</h1>
        <p style={{fontSize:20,lineHeight:1.6,maxWidth:860}}>Dynamic update intelligence, Continuum Vault preservation, Guardian device stewardship, membership expansion, and optional  la carte upgradeswithout taking away what customers already purchased.</p>

        <h2>Memberships</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:18}}>
          {products.memberships.map((m)=>(
            <article key={m.title} style={{border:"1px solid rgba(245,194,91,.45)",borderRadius:22,padding:22,background:"rgba(255,255,255,.06)"}}>
              <h3 style={{color:"#f5c25b"}}>{m.title}</h3>
              <p>${m.monthly}/mo</p>
              <p>{m.includes.join("  ")}</p>
              <button style={{padding:"12px 18px",borderRadius:999,border:"1px solid #f5c25b",background:"#f5c25b",color:"#111"}}>Review Membership</button>
            </article>
          ))}
        </div>

        <h2 style={{marginTop:42}}> La Carte AI+ Enhancements</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:18}}>
          {products.alacarte.map((p)=>(
            <article key={p.title} style={{border:"1px solid rgba(245,194,91,.35)",borderRadius:22,padding:22,background:"rgba(0,0,0,.28)"}}>
              <h3 style={{color:"#f5c25b"}}>{p.title}</h3>
              <p>${p.price}</p>
              <p>{p.upgradeRule}</p>
              <button style={{padding:"12px 18px",borderRadius:999,border:"1px solid #f5c25b",background:"transparent",color:"#f5c25b"}}>View Upgrade</button>
            </article>
          ))}
        </div>

        <section style={{marginTop:42,border:"1px solid rgba(245,194,91,.45)",borderRadius:24,padding:24}}>
          <h2>Purchase Preservation</h2>
          <p>{rules.rules.join(" ")}</p>
        </section>
      </section>
    </main>
  );
}
