import { useEffect, useState } from "react";
import { theme } from "../../lib/brianco-native/ui";

export default function ThemeIntelligence(){
  const [data,setData] = useState(null);

  useEffect(()=>{
    fetch("/api/theme-intelligence/dashboard")
      .then(r=>r.json())
      .then(setData)
      .catch(()=>setData(null));
  },[]);

  return(
    <main style={theme.page}>
      <section style={theme.shell}>
        <h1 style={{fontSize:48,color:theme.gold,marginBottom:8}}>
          Brian & Co Theme Intelligence
        </h1>

        <p style={{fontSize:18,lineHeight:1.7,maxWidth:1120}}>
          Live theme health readiness for navigation, accessibility, language controls,
          concierge presence, route monitoring, asset review, SEO readiness,
          deployment review, and founder green-check protection.
        </p>

        {data && (
          <>
            <section style={{marginTop:24,...theme.card}}>
              <h2 style={{color:theme.gold}}>Protected Live Theme</h2>
              <p>Expected theme: {data.liveTheme.expectedThemeId}</p>
              <p>Status: {data.liveTheme.status}</p>
              <p>Change mode: {data.liveTheme.changeMode}</p>
            </section>

            <section style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",gap:16,marginTop:24}}>
              <article style={theme.card}>
                <h2 style={{color:theme.gold}}>Theme Health Signals</h2>
                {data.themeHealthSignals.map(item=><p key={item}>◆ {item}</p>)}
              </article>

              <article style={theme.card}>
                <h2 style={{color:theme.gold}}>Theme Review Queues</h2>
                {data.themeReviewQueues.map(item=><p key={item.title}>✓ {item.title}: {item.status}</p>)}
              </article>

              <article style={theme.card}>
                <h2 style={{color:theme.gold}}>Route Watch</h2>
                {data.routeWatch.map(item=><p key={item}>→ {item}</p>)}
              </article>

              <article style={theme.card}>
                <h2 style={{color:theme.gold}}>Safeguards</h2>
                {data.safeguards.map(item=><p key={item}>✓ {item}</p>)}
              </article>
            </section>

            <section style={{marginTop:24,...theme.card}}>
              <h2 style={{color:theme.gold}}>Protected Native Theme Standard</h2>
              <p>
                Theme intelligence is prepared for Brian & Co native review. Live theme changes,
                Shopify pushes, public copy changes, pricing, product, collection, payment, OAuth,
                or secret changes remain protected unless explicitly approved.
              </p>
              <a href="/approval-automation" style={{color:theme.gold}}>Open Approval Automation</a>
            </section>
          </>
        )}
      </section>
    </main>
  );
}
