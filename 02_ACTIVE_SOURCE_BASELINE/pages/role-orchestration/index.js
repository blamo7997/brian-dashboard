import { useEffect, useState } from "react";
import { theme } from "../../lib/brianco-native/ui";

export default function RoleOrchestration(){
  const [data,setData] = useState(null);

  useEffect(()=>{
    fetch("/api/role-orchestration/dashboard")
      .then(r=>r.json())
      .then(setData)
      .catch(()=>setData(null));
  },[]);

  const seed = data?.seed || {};
  const roleMap = data?.roleMap || [];

  return(
    <main style={theme.page}>
      <section style={theme.shell}>
        <h1 style={{fontSize:48,color:theme.gold,marginBottom:8}}>
          Brian & Co Role Portal Orchestration
        </h1>

        <p style={{fontSize:18,lineHeight:1.7,maxWidth:1120}}>
          Unified role portal orchestration for customers, family, suppliers,
          artisans, creators, influencers, investors, bankers, lawyers, accountants,
          admins, founder operations, accessibility, localization, approval routing,
          and native Brian & Co identity.
        </p>

        {data && (
          <>
            <section style={{marginTop:24,...theme.card}}>
              <h2 style={{color:theme.gold}}>Role Orchestration Status</h2>
              <p>{seed.status}</p>
              <p>{seed.protectedPhases}</p>
            </section>

            <section style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:16,marginTop:24}}>
              {roleMap.map(item=>(
                <article key={item.role} style={theme.card}>
                  <h2 style={{color:theme.gold}}>{item.role}</h2>
                  <p>{item.purpose}</p>
                  <a href={item.route} style={{color:theme.gold}}>Open</a>
                </article>
              ))}
            </section>

            <section style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",gap:16,marginTop:24}}>
              <article style={theme.card}>
                <h2 style={{color:theme.gold}}>Orchestration Rules</h2>
                {seed.orchestrationRules.map(item=><p key={item}>✓ {item}</p>)}
              </article>

              <article style={theme.card}>
                <h2 style={{color:theme.gold}}>Shared Role Systems</h2>
                {data.sharedRoleSystems.map(item=><p key={item}>◆ {item}</p>)}
              </article>

              <article style={theme.card}>
                <h2 style={{color:theme.gold}}>Escalation Rules</h2>
                {data.escalationRules.map(item=><p key={item.trigger}>→ {item.trigger}: {item.reviewer}</p>)}
              </article>
            </section>

            <section style={{marginTop:24,...theme.card}}>
              <h2 style={{color:theme.gold}}>Protected Role Standard</h2>
              <p>
                This phase coordinates existing role portals only. It does not edit products,
                collections, OAuth, payments, secrets, pricing, public claims, purchases, or commitments.
                Founder approval remains required for protected live changes.
              </p>
              <a href="/ecosystem-orchestration" style={{color:theme.gold}}>Open Ecosystem Orchestration</a>
            </section>
          </>
        )}
      </section>
    </main>
  );
}
