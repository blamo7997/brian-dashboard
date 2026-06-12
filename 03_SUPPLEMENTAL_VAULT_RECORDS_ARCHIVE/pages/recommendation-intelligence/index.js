import { useEffect, useState } from "react";
import { theme } from "../../lib/brianco-native/ui";

export default function RecommendationIntelligence(){
  const [data,setData] = useState(null);

  useEffect(()=>{
    fetch("/api/recommendation-intelligence/dashboard")
      .then(r=>r.json())
      .then(setData)
      .catch(()=>setData(null));
  },[]);

  const seed = data?.data || {};
  const map = data?.recommendationMap || [];

  return(
    <main style={theme.page}>
      <section style={theme.shell}>
        <h1 style={{fontSize:48,color:theme.gold,marginBottom:8}}>
          Brian & Co Recommendation Intelligence
        </h1>

        <p style={{fontSize:18,lineHeight:1.7,maxWidth:1120}}>
          Unified recommendation coordination for commerce, roles, accessibility,
          localization, events, opportunities, suppliers, artisans, creators,
          influencers, investors, founder approvals, and protected decision scoring.
        </p>

        {data && (
          <>
            <section style={{marginTop:24,...theme.card}}>
              <h2 style={{color:theme.gold}}>Recommendation Status</h2>
              <p>{seed.status}</p>
              <p>{seed.protectedPhases}</p>
            </section>

            <section style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:16,marginTop:24}}>
              {map.map(item=>(
                <article key={item.area} style={theme.card}>
                  <h2 style={{color:theme.gold}}>{item.area}</h2>
                  <p>{item.purpose}</p>
                  <a href={item.route} style={{color:theme.gold}}>Open</a>
                </article>
              ))}
            </section>

            <section style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",gap:16,marginTop:24}}>
              <article style={theme.card}>
                <h2 style={{color:theme.gold}}>Recommendation Areas</h2>
                {seed.recommendationAreas.map(item=><p key={item}>◆ {item}</p>)}
              </article>

              <article style={theme.card}>
                <h2 style={{color:theme.gold}}>Scoring Model</h2>
                {data.scoringModel.map(item=><p key={item}>✓ {item}</p>)}
              </article>

              <article style={theme.card}>
                <h2 style={{color:theme.gold}}>Safeguards</h2>
                {data.safeguards.map(item=><p key={item}>✓ {item}</p>)}
              </article>
            </section>

            <section style={{marginTop:24,...theme.card}}>
              <h2 style={{color:theme.gold}}>Protected Recommendation Standard</h2>
              <p>
                This phase coordinates recommendations only. It does not edit products,
                collections, OAuth, payments, secrets, pricing, public claims, purchases,
                or commitments. Founder approval remains required for protected recommendations.
              </p>
              <a href="/opportunity-intelligence" style={{color:theme.gold}}>Open Opportunity Intelligence</a>
            </section>
          </>
        )}
      </section>
    </main>
  );
}
