import {useEffect,useState} from "react";
import {theme} from "../../lib/brianco-native/ui";

export default function ExecutiveDecisionIntelligence(){
  const [data,setData] = useState(null);

  useEffect(()=>{
    fetch("/api/executive-decision-intelligence/dashboard")
      .then(r=>r.json())
      .then(setData)
      .catch(()=>setData(null));
  },[]);

  const seed = data?.data || {};
  const map = data?.executiveDecisionMap || [];

  return(
    <main style={theme.page}>
      <section style={theme.shell}>
        <h1 style={{fontSize:48,color:theme.gold}}>
          Brian & Co Executive Decision Intelligence
        </h1>

        {data && (
          <>
            <section style={theme.card}>
              <h2 style={{color:theme.gold}}>Decision Status</h2>
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

            <section style={{marginTop:24,...theme.card}}>
              <h2 style={{color:theme.gold}}>Decision Scoring</h2>
              {data.decisionScoring.map(item=><p key={item}>✓ {item}</p>)}
            </section>

            <section style={{marginTop:24,...theme.card}}>
              <h2 style={{color:theme.gold}}>Protected Decision Standard</h2>
              <p>
                This phase prepares executive decision intelligence only. It does not edit products,
                collections, OAuth, payments, secrets, pricing, public claims, purchases, or commitments.
              </p>
            </section>
          </>
        )}
      </section>
    </main>
  );
}
