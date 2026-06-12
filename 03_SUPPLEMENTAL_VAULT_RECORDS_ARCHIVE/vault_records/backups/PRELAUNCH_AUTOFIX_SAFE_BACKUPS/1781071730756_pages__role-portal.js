import { useEffect, useState } from "react";

export default function RolePortal() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/roles").then(r => r.json()).then(setData);
  }, []);

  return (
    <main style={{minHeight:"100vh",padding:"42px",fontFamily:"Georgia,serif",background:"linear-gradient(135deg,#f7f1e8,#ffffff)",color:"#1f1a17"}}>
      <section style={{maxWidth:"1100px",margin:"0 auto"}}>
        <p style={{letterSpacing:".18em",textTransform:"uppercase",fontSize:"12px"}}>Brian & Co Native Ecosystem</p>
        <h1 style={{fontSize:"44px",lineHeight:"1.08"}}>Role portal foundation</h1>
        <p style={{fontSize:"18px",lineHeight:"1.7",maxWidth:"800px"}}>
          Brian & Co now has a native role framework for founder, family, girlfriend, lawyers, investors,
          bankers, artisans, creators, influencers, and customers. Each role routes through the website and chatbot first,
          with Brian's green-check approval required before meaningful access, free access, publishing, or protected changes.
        </p>

        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:"18px",marginTop:"30px"}}>
          {(data?.roles || []).map(role => (
            <article key={role} style={{padding:"22px",border:"1px solid rgba(31,26,23,.14)",borderRadius:"22px",background:"rgba(255,255,255,.78)"}}>
              <h2 style={{textTransform:"capitalize"}}>{role}</h2>
              <p style={{lineHeight:"1.6"}}>{data.roleDetails?.[role]}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
