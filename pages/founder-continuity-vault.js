import registry from "../data/brianco-live-membership-product-registry.json";

const button = {padding:"12px 18px",borderRadius:999,border:"1px solid #f5c25b",background:"#f5c25b",color:"#111",fontWeight:700,cursor:"pointer"};

export default function FounderContinuityVault() {
  return (
    <main style={{minHeight:"100vh",background:"radial-gradient(circle at top left,#5a3b06,#12100c 42%,#050505)",color:"#fff3d0",fontFamily:"Georgia,serif",padding:"48px 24px"}}>
      <section style={{maxWidth:1180,margin:"0 auto"}}>
        <p style={{letterSpacing:4,color:"#f5c25b",textTransform:"uppercase"}}>Brian & Co</p>
        <h1 style={{fontSize:56,margin:"0 0 12px",color:"#f5c25b"}}>Founder Continuity Vault™</h1>
        <p style={{fontSize:20,lineHeight:1.65,maxWidth:900}}>Premium continuity, stewardship, governance intelligence, update clarity, and preservation systems for people who want their digital life and business ecosystem protected, explained, and continuously improved.</p>

        <h2>Memberships</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:18}}>
          {registry.memberships.map((m)=>(
            <article key={m.handle} style={{border:"1px solid rgba(245,194,91,.35)",borderRadius:22,padding:22,background:"rgba(0,0,0,.28)"}}>
              <h3 style={{color:"#f5c25b"}}>{m.title}</h3>
              <p style={{fontSize:24}}>${m.price}/mo</p>
              <p>{m.trialLabel || `${m.trialDays}-Day Trial`}</p>
              <p>{m.description}</p>
              <a href={`/api/brianco/gateway?product=${m.handle}`}><button style={button}>Review Membership</button></a>
            </article>
          ))}
        </div>

        <h2 style={{marginTop:42}}>À La Carte Enhancements</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:18}}>
          {registry.alacarte.map((p)=>(
            <article key={p.handle} style={{border:"1px solid rgba(245,194,91,.25)",borderRadius:22,padding:22,background:"rgba(255,255,255,.045)"}}>
              <h3 style={{color:"#f5c25b"}}>{p.title}</h3>
              <p style={{fontSize:24}}>${p.price}</p>
              <p>{p.description}</p>
              <a href={`/api/brianco/gateway?product=${p.handle}`}><button style={{...button,background:"transparent",color:"#f5c25b"}}>View Upgrade</button></a>
            </article>
          ))}
        </div>

        <section style={{marginTop:42,border:"1px solid rgba(245,194,91,.45)",borderRadius:24,padding:24}}>
          <h2>Purchase Preservation™</h2>
          <p>{registry.preservationRules.join(" ")}</p>
        </section>
      </section>
    </main>
  );
}
