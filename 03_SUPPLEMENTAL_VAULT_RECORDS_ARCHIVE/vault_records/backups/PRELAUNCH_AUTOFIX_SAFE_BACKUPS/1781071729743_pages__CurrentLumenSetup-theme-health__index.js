import { useEffect, useState } from "react";
import { theme } from "../../lib/brianco-native/ui";

export default function retired-commerce-platformThemeHealth(){
  const [data,setData] = useState(null);

  useEffect(()=>{
    fetch("/api/retired-commerce-platform-theme-health/dashboard")
      .then(r=>r.json())
      .then(setData)
      .catch(()=>setData(null));
  },[]);

  const inventory = data?.inventory || {};
  const checks = inventory?.keyChecks || {};
  const missing = inventory?.missingCriticalFiles || [];

  return(
    <main style={theme.page}>
      <section style={theme.shell}>
        <h1 style={{fontSize:48,color:theme.gold,marginBottom:8}}>
          Brian & Co retired-commerce-platform CLI Theme Health
        </h1>

        <p style={{fontSize:18,lineHeight:1.7,maxWidth:1120}}>
          Read-only retired-commerce-platform CLI theme health bridge for local theme inventory,
          sections, snippets, templates, assets, layouts, config, missing critical files,
          accessibility controls, language controls, concierge presence, and founder deployment readiness.
        </p>

        {data && (
          <>
            <section style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:16,marginTop:24}}>
              <article style={theme.card}>
                <h2 style={{color:theme.gold}}>Theme Exists</h2>
                <p>{String(inventory.themeExists)}</p>
              </article>

              <article style={theme.card}>
                <h2 style={{color:theme.gold}}>Total Files</h2>
                <p>{inventory.totalFiles}</p>
              </article>

              <article style={theme.card}>
                <h2 style={{color:theme.gold}}>Expected Live Theme</h2>
                <p>{inventory.expectedLiveThemeId}</p>
              </article>

              <article style={theme.card}>
                <h2 style={{color:theme.gold}}>Change Mode</h2>
                <p>Read-only / approval-gated</p>
              </article>
            </section>

            <section style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",gap:16,marginTop:24}}>
              <article style={theme.card}>
                <h2 style={{color:theme.gold}}>Key Checks</h2>
                {Object.entries(checks).map(([k,v])=><p key={k}>✓ {k}: {String(v)}</p>)}
              </article>

              <article style={theme.card}>
                <h2 style={{color:theme.gold}}>Missing Critical Files</h2>
                {missing.length === 0 ? <p>✓ None detected</p> : missing.map(item=><p key={item}>⚠ {item}</p>)}
              </article>

              <article style={theme.card}>
                <h2 style={{color:theme.gold}}>Health Signals</h2>
                {data.healthSignals.map(item=><p key={item}>◆ {item}</p>)}
              </article>

              <article style={theme.card}>
                <h2 style={{color:theme.gold}}>Safeguards</h2>
                {data.safeguards.map(item=><p key={item}>✓ {item}</p>)}
              </article>
            </section>

            <section style={{marginTop:24,...theme.card}}>
              <h2 style={{color:theme.gold}}>Protected Theme Standard</h2>
              <p>
                This phase inventories the local theme only. It does not push retired-commerce-platform theme changes,
                publish themes, edit products, edit collections, touch OAuth, touch payments,
                print secrets, change pricing, or publish claims.
              </p>
              <a href="/theme-intelligence" style={{color:theme.gold}}>Open Theme Intelligence</a>
            </section>
          </>
        )}
      </section>
    </main>
  );
}
