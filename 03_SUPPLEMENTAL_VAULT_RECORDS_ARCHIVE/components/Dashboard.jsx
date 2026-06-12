export default function Dashboard(){
  return (
    <main style={{
      minHeight:"100vh",
      background:"linear-gradient(135deg,#050505,#6E5A38,#FFF7E6)",
      color:"#fff",
      padding:"32px",
      fontFamily:"Arial"
    }}>
      <h1>Brian & Co Command Center</h1>

      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",
        gap:"16px",
        marginTop:"24px"
      }}>
        {[
          "SEO",
          "Products",
          "Images",
          "Accessibility",
          "Localization",
          "Approvals",
          "Trust & Safety",
          "Subscriptions"
        ].map(card=>(
          <section key={card} style={{
            background:"rgba(0,0,0,.65)",
            borderRadius:"24px",
            padding:"20px",
            border:"1px solid rgba(255,230,180,.35)"
          }}>
            <h2>{card}</h2>
            <p>Brian & Co adaptive module.</p>
          </section>
        ))}
      </div>
    </main>
  );
}
