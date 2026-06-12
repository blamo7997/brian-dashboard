import { useEffect, useState } from "react";
import { theme } from "../../lib/brianco-native/ui";

export default function ProductionStability(){
  const [data,setData] = useState(null);

  useEffect(()=>{
    fetch("/api/production-stability/dashboard")
      .then(r=>r.json())
      .then(setData)
      .catch(()=>setData(null));
  },[]);

  const seed = data?.seed || {};
  const systems = data?.systems || [];

  return(
    <main style={theme.page}>
      <section style={theme.shell}>
        <h1 style={{fontSize:48,color:theme.gold,marginBottom:8}}>
          Brian & Co Production Stability
        </h1>

        <p style={{fontSize:18,lineHeight:1.7,maxWidth:1120}}>
          Production stabilization readiness for website health, command center health,
          API health, theme intelligence, approval automation, event intake,
          interaction logging, accessibility, localization, commerce, and native identity.
        </p>

        {data && (
          <>
            <section style={{marginTop:24,...theme.card}}>
              <h2 style={{color:theme.gold}}>Stability Status</h2>
              <p>{seed.status}</p>
              <p>{seed.protectedPhases}</p>
            </section>

            <section style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:16,marginTop:24}}>
              {systems.map(item=>(
                <article key={item.route} style={theme.card}>
                  <h2 style={{color:theme.gold}}>{item.name}</h2>
                  <p>Status: {item.status}</p>
                  <a href={item.route} style={{color:theme.gold}}>Open</a>
                </article>
              ))}
            </section>

            <section style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",gap:16,marginTop:24}}>
              <article style={theme.card}>
                <h2 style={{color:theme.gold}}>Monitoring Areas</h2>
                {seed.monitoringAreas.map(item=><p key={item}>◆ {item}</p>)}
              </article>

              <article style={theme.card}>
                <h2 style={{color:theme.gold}}>Stabilization Rules</h2>
                {seed.stabilizationRules.map(item=><p key={item}>✓ {item}</p>)}
              </article>

              <article style={theme.card}>
                <h2 style={{color:theme.gold}}>Escalation Rules</h2>
                {data.escalationRules.map(item=><p key={item.trigger}>→ {item.trigger}: {item.reviewer}</p>)}
              </article>
            </section>

            <section style={{marginTop:24,...theme.card}}>
              <h2 style={{color:theme.gold}}>Protected Stability Standard</h2>
              <p>
                This phase prepares production monitoring and readiness scoring only. It does not edit products,
                collections, OAuth, payments, secrets, pricing, public claims, purchases, or commitments.
              </p>
              <a href="/command-center" style={{color:theme.gold}}>Open Command Center</a>
            </section>
          </>
        )}
      </section>
    </main>
  );
}
