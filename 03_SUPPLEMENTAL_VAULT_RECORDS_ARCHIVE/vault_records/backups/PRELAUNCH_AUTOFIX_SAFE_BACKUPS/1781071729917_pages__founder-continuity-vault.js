import catalog from "../data/brianco-founder-approval-product-catalog.json";

const card={border:"1px solid rgba(245,194,91,.36)",borderRadius:24,padding:24,background:"rgba(0,0,0,.30)"};
const btn={padding:"12px 18px",borderRadius:999,border:"1px solid #f5c25b",background:"#f5c25b",color:"#111",fontWeight:700};

export default function FounderContinuityVault(){
  return <main style={{minHeight:"100vh",background:"radial-gradient(circle at top left,#5a3b06,#12100c 42%,#050505)",color:"#fff3d0",fontFamily:"Georgia,serif",padding:"48px 24px"}}>
    <section style={{maxWidth:1180,margin:"0 auto"}}>
      <p style={{letterSpacing:4,color:"#f5c25b",textTransform:"uppercase"}}>Brian & Co</p>
      <h1 style={{fontSize:56,margin:"0 0 12px",color:"#f5c25b"}}>Founder Continuity Vault™</h1>
      <p style={{fontSize:20,lineHeight:1.65,maxWidth:900}}>Premium continuity, stewardship, governance intelligence, update clarity, and preservation services. The experience is automatic for customers; advanced capabilities unlock through membership or approved à la carte upgrades.</p>

      <h2>Memberships</h2>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:18}}>
        {catalog.memberships.map(m=><article key={m.handle} style={card}>
          <h3 style={{color:"#f5c25b"}}>{m.title}</h3>
          <p style={{fontSize:24}}>${m.price}/mo</p>
          <p>{m.trial}</p>
          <p>{m.positioning}</p>
          <p>{m.features.join(" • ")}</p>
          <a href={`/api/brianco/gateway?membership=${m.handle}`}><button style={btn}>Review Membership</button></a>
        </article>)}
      </div>

      <h2 style={{marginTop:42}}>À La Carte Enhancements</h2>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:18}}>
        {catalog.alacarte.map(p=><article key={p.handle} style={card}>
          <h3 style={{color:"#f5c25b"}}>{p.title}</h3>
          <p style={{fontSize:24}}>${p.price}</p>
          <p>{p.description}</p>
          <a href={`/api/brianco/gateway?product=${p.handle}`}><button style={{...btn,background:"transparent",color:"#f5c25b"}}>View Upgrade</button></a>
        </article>)}
      </div>

      <section style={{marginTop:42,...card}}>
        <h2>Purchase Preservation™</h2>
        <p>Existing purchases remain preserved. New premium capabilities are offered as membership benefits or optional paid upgrades, never by silently removing what a customer already purchased.</p>
      </section>
    </section>
  </main>
}
