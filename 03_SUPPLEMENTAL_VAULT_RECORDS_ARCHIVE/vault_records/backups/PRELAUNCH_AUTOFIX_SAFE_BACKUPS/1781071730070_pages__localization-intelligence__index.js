import { useEffect, useState } from "react";
import { theme } from "../../lib/brianco-native/ui";

export default function LocalizationIntelligence(){

  const [data,setData] = useState(null);

  useEffect(()=>{
    fetch("/api/localization-intelligence/dashboard")
      .then(r=>r.json())
      .then(setData)
      .catch(()=>setData(null));
  },[]);

  return(
    <main style={theme.page}>
      <section style={theme.shell}>

        <h1 style={{fontSize:48,color:theme.gold}}>
          Brian & Co Localization Intelligence
        </h1>

        <p style={{fontSize:18,lineHeight:1.7,maxWidth:1100}}>
          Language preference intelligence, regional adaptation,
          dialect support, currency-readiness, accessibility-language pairing,
          event localization, commerce localization, and founder localization review.
        </p>

        {data && (
          <>

            <section style={{
              display:"grid",
              gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",
              gap:16,
              marginTop:24
            }}>
              {data.founderLocalizationCards.map(card=>(
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
                  Localization Profiles
                </h2>

                {data.localizationProfiles.map(item=>
                  <p key={item}>◆ {item}</p>
                )}
              </article>

              <article style={theme.card}>
                <h2 style={{color:theme.gold}}>
                  Language Signals
                </h2>

                {data.languageSignals.map(item=>
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

              <article style={theme.card}>
                <h2 style={{color:theme.gold}}>
                  Safeguards
                </h2>

                {data.safeguards.map(item=>
                  <p key={item}>✓ {item}</p>
                )}
              </article>

            </section>

            <section style={{
              marginTop:24,
              ...theme.card
            }}>
              <h2 style={{color:theme.gold}}>
                Native Localization Standard
              </h2>

              <p>
                Localization remains native Brian & Co, founder-controlled,
                accessibility-aware, region-aware, and approval-gated before
                public pricing, legal, policy, tax, or public claim changes.
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
