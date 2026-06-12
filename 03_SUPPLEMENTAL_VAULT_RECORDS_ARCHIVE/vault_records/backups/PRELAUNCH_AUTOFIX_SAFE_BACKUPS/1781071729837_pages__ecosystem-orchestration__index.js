import { useEffect, useState } from "react";
import { theme } from "../../lib/brianco-native/ui";

export default function EcosystemOrchestration(){
  const [data,setData] = useState(null);

  useEffect(()=>{
    fetch("/api/ecosystem-orchestration/dashboard")
      .then(r=>r.json())
      .then(setData)
      .catch(()=>setData(null));
  },[]);

  const seed = data?.seed || {};
  const map = data?.orchestrationMap || [];

  return(
    <main style={theme.page}>
      <section style={theme.shell}>
        <h1 style={{fontSize:48,color:theme.gold,marginBottom:8}}>
          Brian & Co Ecosystem Orchestration
        </h1>

        <p style={{fontSize:18,lineHeight:1.7,maxWidth:1120}}>
          Unified orchestration readiness for founder commands, approval routing,
          theme intelligence, retired-commerce-platform theme health, event intake, interaction logging,
          accessibility, localization, commerce, native identity, production stability,
          and protected ecosystem coordination.
        </p>

        {data && (
          <>
            <section style={{marginTop:24,...theme.card}}>
              <h2 style={{color:theme.gold}}>Orchestration Status</h2>
              <p>{seed.status}</p>
              <p>{seed.protectedPhases}</p>
            </section>

            <section style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:16,marginTop:24}}>
              {map.map(item=>(
                <article key={item.route} style={theme.card}>
                  <h2 style={{color:theme.gold}}>{item.system}</h2>
                  <p>{item.purpose}</p>
                  <a href={item.route} style={{color:theme.gold}}>Open</a>
                </article>
              ))}
            </section>

            <section style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",gap:16,marginTop:24}}>
              <article style={theme.card}>
                <h2 style={{color:theme.gold}}>Orchestration Areas</h2>
                {seed.orchestrationAreas.map(item=><p key={item}>◆ {item}</p>)}
              </article>

              <article style={theme.card}>
                <h2 style={{color:theme.gold}}>Orchestration Rules</h2>
                {seed.orchestrationRules.map(item=><p key={item}>✓ {item}</p>)}
              </article>

              <article style={theme.card}>
                <h2 style={{color:theme.gold}}>Escalation Rules</h2>
                {data.escalationRules.map(item=><p key={item.trigger}>→ {item.trigger}: {item.reviewer}</p>)}
              </article>
            </section>

            <section style={{marginTop:24,...theme.card}}>
              <h2 style={{color:theme.gold}}>Protected Orchestration Standard</h2>
              <p>
                This phase coordinates existing protected systems only. It does not edit products,
                collections, OAuth, payments, secrets, pricing, public claims, purchases, or commitments.
                Founder approval remains required for protected live changes.
              </p>
              <a href="/command-center" style={{color:theme.gold}}>Open Command Center</a>
            </section>
          </>
        )}
      </section>
    </main>
  );
}
