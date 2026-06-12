import { useEffect, useState } from "react";
import { theme } from "../../lib/brianco-native/ui";

export default function CommerceIntelligence(){

  const [data,setData] = useState(null);

  useEffect(()=>{
    fetch("/api/commerce-intelligence/dashboard")
      .then(r=>r.json())
      .then(setData)
      .catch(()=>setData(null));
  },[]);

  return(
    <main style={theme.page}>
      <section style={theme.shell}>

        <h1 style={{fontSize:48,color:theme.gold}}>
          Brian & Co Commerce Intelligence
        </h1>

        <p style={{fontSize:18,lineHeight:1.7,maxWidth:1100}}>
          Membership intelligence, bundle intelligence,
          digital product intelligence, role-based opportunity intelligence,
          revenue opportunity intelligence, and founder commerce readiness.
        </p>

        {data && (
          <>

            <section style={{
              display:"grid",
              gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",
              gap:16,
              marginTop:24
            }}>
              {data.founderCommerceCards.map(card=>(
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
                  Memberships
                </h2>

                {data.memberships.map(item=>
                  <p key={item}>◆ {item}</p>
                )}
              </article>

              <article style={theme.card}>
                <h2 style={{color:theme.gold}}>
                  Commerce Signals
                </h2>

                {data.commerceSignals.map(item=>
                  <p key={item}>◆ {item}</p>
                )}
              </article>

              <article style={theme.card}>
                <h2 style={{color:theme.gold}}>
                  Revenue Opportunities
                </h2>

                {data.revenueOpportunities.map(item=>
                  <p key={item}>→ {item}</p>
                )}
              </article>

            </section>

            <section style={{
              marginTop:24,
              ...theme.card
            }}>
              <h2 style={{color:theme.gold}}>
                Native Brian & Co Standard
              </h2>

              <p>
                Commerce intelligence remains founder-controlled,
                approval-gated, role-aware, accessibility-aware,
                localization-aware, and native Brian & Co.
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
