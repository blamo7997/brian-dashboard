import { useEffect, useState } from "react";
import { theme } from "../../lib/brianco-native/ui";

export default function InteractionLogging(){
  const [data,setData] = useState(null);

  useEffect(()=>{
    fetch("/api/interaction-logging/dashboard")
      .then(r=>r.json())
      .then(setData)
      .catch(()=>setData(null));
  },[]);

  const seed = data?.seed || {};

  return(
    <main style={theme.page}>
      <section style={theme.shell}>
        <h1 style={{fontSize:48,color:theme.gold,marginBottom:8}}>
          Brian & Co Consent-Aware Interaction Logging
        </h1>

        <p style={{fontSize:18,lineHeight:1.7,maxWidth:1120}}>
          Consent-aware logging readiness for chatbot summaries, role signals,
          accessibility preferences, localization preferences, event interest,
          commerce interest, approval audit actions, and protected founder review.
        </p>

        {data && (
          <>
            <section style={{marginTop:24,...theme.card}}>
              <h2 style={{color:theme.gold}}>Logging Status</h2>
              <p>{seed.loggingStatus}</p>
              <p>This layer prepares privacy-aware logging rules. It does not collect live personal data by itself.</p>
            </section>

            <section style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",gap:16,marginTop:24}}>
              <article style={theme.card}>
                <h2 style={{color:theme.gold}}>Consent Rules</h2>
                {seed.consentRules.map(item=><p key={item}>✓ {item}</p>)}
              </article>

              <article style={theme.card}>
                <h2 style={{color:theme.gold}}>Log Categories</h2>
                {seed.logCategories.map(item=><p key={item}>◆ {item}</p>)}
              </article>

              <article style={theme.card}>
                <h2 style={{color:theme.gold}}>Logging Flows</h2>
                {data.loggingFlows.map(item=><p key={item.flow}>→ {item.flow}: {item.consent}</p>)}
              </article>

              <article style={theme.card}>
                <h2 style={{color:theme.gold}}>Privacy Safeguards</h2>
                {data.privacySafeguards.map(item=><p key={item}>✓ {item}</p>)}
              </article>
            </section>

            <section style={{marginTop:24,...theme.card}}>
              <h2 style={{color:theme.gold}}>Protected Privacy Standard</h2>
              <p>
                This phase prepares interaction logging only. It does not store secrets, payment data,
                OAuth tokens, raw credentials, or sensitive personal data by default. Legal/privacy review
                remains required before relying on regulated data workflows.
              </p>
              <a href="/approval-automation" style={{color:theme.gold}}>Open Approval Automation</a>
            </section>
          </>
        )}
      </section>
    </main>
  );
}
