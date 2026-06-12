import { useEffect, useState } from "react";
import { theme } from "../../lib/brianco-native/ui";

export default function AccessibilityIntelligence(){

  const [data,setData] = useState(null);

  useEffect(()=>{
    fetch("/api/accessibility-intelligence/dashboard")
      .then(r=>r.json())
      .then(setData)
      .catch(()=>setData(null));
  },[]);

  return(
    <main style={theme.page}>
      <section style={theme.shell}>

        <h1 style={{fontSize:48,color:theme.gold}}>
          Brian & Co Accessibility Intelligence
        </h1>

        <p style={{fontSize:18,lineHeight:1.7,maxWidth:1100}}>
          Accessibility profiles, support routing,
          recommendation intelligence, caregiver support,
          veteran support, and founder accessibility readiness.
        </p>

        {data && (
          <>

            <section style={{
              display:"grid",
              gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",
              gap:16,
              marginTop:24
            }}>
              {data.founderAccessibilityCards.map(card=>(
                <article key={card.title} style={theme.card}>
                  <h2 style={{color:theme.gold}}>
                    {card.title}
                  </h2>
                  <p>{card.value}</p>
                </article>
              ))}
            </section>

            <section style={{
              display:"grid",
              gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",
              gap:16,
              marginTop:24
            }}>

              <article style={theme.card}>
                <h2 style={{color:theme.gold}}>
                  Accessibility Profiles
                </h2>

                {data.accessibilityProfiles.map(item=>
                  <p key={item}>◆ {item}</p>
                )}
              </article>

              <article style={theme.card}>
                <h2 style={{color:theme.gold}}>
                  Intelligence Signals
                </h2>

                {data.intelligenceSignals.map(item=>
                  <p key={item}>◆ {item}</p>
                )}
              </article>

              <article style={theme.card}>
                <h2 style={{color:theme.gold}}>
                  Routing
                </h2>

                {data.routing.map(item=>
                  <p key={item}>→ {item}</p>
                )}
              </article>

            </section>

            <section style={{
              marginTop:24,
              ...theme.card
            }}>
              <h2 style={{color:theme.gold}}>
                Native Accessibility Standard
              </h2>

              <p>
                Accessibility remains free for individuals where applicable,
                founder-controlled, approval-aware, privacy-aware,
                and integrated into the native Brian & Co experience.
              </p>

              <a
                href="/command-center"
                style={{color:theme.gold}}
              >
                Open Unified Ecosystem Dashboard
              </a>

            </section>

          </>
        )}

      </section>
    </main>
  );
}
