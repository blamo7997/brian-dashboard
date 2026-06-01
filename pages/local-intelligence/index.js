import { useEffect, useState } from "react";
import { theme } from "../../lib/brianco-native/ui";

export default function LocalIntelligence(){
  const [data,setData] = useState(null);

  useEffect(()=>{
    fetch("/api/local-intelligence/events")
      .then(r=>r.json())
      .then(setData)
      .catch(()=>setData(null));
  },[]);

  return(
    <main style={theme.page}>
      <section style={theme.shell}>
        <h1 style={{fontSize:48,color:theme.gold,marginBottom:8}}>
          Brian & Co Local & Event Intelligence
        </h1>

        <p style={{fontSize:18,lineHeight:1.7,maxWidth:1120}}>
          Cheyenne and Wyoming event intelligence for vendor opportunities,
          Cheyenne Frontier Days readiness, booth planning, local resources,
          accessibility-aware event support, role-aware recommendations,
          and founder approval workflows.
        </p>

        {data && (
          <>
            <section style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:16,marginTop:24}}>
              {data.eventIntelligence.map(item=>(
                <article key={item.title} style={theme.card}>
                  <h2 style={{color:theme.gold}}>{item.title}</h2>
                  <p>{item.category}</p>
                  <p>Status: {item.status}</p>
                </article>
              ))}
            </section>

            <section style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",gap:16,marginTop:24}}>
              <article style={theme.card}>
                <h2 style={{color:theme.gold}}>Cost Signals</h2>
                {data.costSignals.map(item=><p key={item}>◆ {item}</p>)}
              </article>

              <article style={theme.card}>
                <h2 style={{color:theme.gold}}>Founder Alerts</h2>
                {data.founderAlerts.map(item=><p key={item}>→ {item}</p>)}
              </article>

              <article style={theme.card}>
                <h2 style={{color:theme.gold}}>Role Recommendations</h2>
                {data.roleRecommendations.map(item=><p key={item.role}>✓ {item.role}: {item.recommendation}</p>)}
              </article>

              <article style={theme.card}>
                <h2 style={{color:theme.gold}}>Protected Requirements</h2>
                {data.nextProviderRequirements.map(item=><p key={item}>✓ {item}</p>)}
              </article>
            </section>

            <section style={{marginTop:24,...theme.card}}>
              <h2 style={{color:theme.gold}}>Native Standard</h2>
              <p>
                Local intelligence should appear inside Brian & Co as a founder-controlled,
                verified, approval-gated intelligence layer. No booth spending, public claims,
                legal reliance, tax reliance, or automatic purchasing happens without approval.
              </p>
              <a href="/command-center" style={{color:theme.gold}}>Open Unified Dashboard</a>
            </section>
          </>
        )}
      </section>
    </main>
  );
}
