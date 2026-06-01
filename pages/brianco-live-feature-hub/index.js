export default function Hub(){
  const features = [
    {
      group: "Founder Control",
      title: "Founder Command Center",
      href: "/founder-command-center",
      summary: "Private founder-controlled command layer for approvals, legal review, continuity, role systems, supplier intelligence, local events, audit reporting, and next-best-action guidance."
    },
    {
      group: "Role Intelligence",
      title: "Role Portal Expansion",
      href: "/role-portal-expansion",
      summary: "Native role-aware portal expansion for customers, suppliers, artisans, creators, influencers, lawyers, accountants, investors, bankers, family, and approved Brian & Co users."
    }
  ];

  return (
    <main style={{minHeight:"100vh",padding:"46px",background:"#050505",color:"#f7e7b4",fontFamily:"Georgia, serif"}}>
      <section style={{maxWidth:1320,margin:"0 auto",border:"1px solid rgba(242,201,92,.38)",borderRadius:30,padding:34}}>
        <p>Brian & Co Protected Intelligence Suite</p>
        <h1>Founder-Controlled Feature Hub</h1>

        <a href="/founder-command-center">Founder Command Center</a>
        <br />
        <a href="/role-portal-expansion">Role Portal Expansion</a>

        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:18,marginTop:32}}>
          {features.map((f,i)=>(
            <a key={i} href={f.href} style={{display:"block",color:"#f7e7b4",border:"1px solid rgba(242,201,92,.28)",borderRadius:22,padding:20,textDecoration:"none"}}>
              <div>{f.group}</div>
              <h2>{f.title}</h2>
              <p>{f.summary}</p>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
