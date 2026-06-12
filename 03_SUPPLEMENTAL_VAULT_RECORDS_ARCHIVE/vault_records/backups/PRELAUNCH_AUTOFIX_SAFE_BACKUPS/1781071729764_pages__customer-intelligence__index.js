import { useEffect, useState } from "react";
import { theme, NativeCard } from "../../lib/brianco-native/ui";

export default function CustomerIntelligence(){
  const [data,setData] = useState(null);

  useEffect(()=>{
    fetch("/api/customer-intelligence/summary")
      .then(r=>r.json())
      .then(setData)
      .catch(()=>setData(null));
  },[]);

  const cards = data?.cards || [];
  const intel = data?.intelligence;

  return(
    <main style={theme.page}>
      <section style={theme.shell}>
        <h1 style={{fontSize:48,color:theme.gold,marginBottom:8}}>
          Brian & Co Customer Intelligence
        </h1>

        <p style={{fontSize:18,lineHeight:1.7,maxWidth:1100}}>
          Customer intelligence for viewed items, saved interests, memberships, bundles,
          digital products, accessibility preferences, language preferences, and recommended next actions.
        </p>

        <section style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:16,marginTop:24}}>
          {cards.map(card=>(
            <NativeCard
              key={card.title}
              title={card.title}
              value={card.value}
              note="Prepared for consent-aware customer intelligence."
              trend={card.trend}
            />
          ))}
        </section>

        {intel && (
          <section style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",gap:16,marginTop:24}}>
            <article style={theme.card}>
              <h2 style={{color:theme.gold}}>Membership Interest</h2>
              {intel.membershipInterest.map(item=><p key={item}>◆ {item}</p>)}
            </article>

            <article style={theme.card}>
              <h2 style={{color:theme.gold}}>Bundle Interest</h2>
              {intel.bundleInterest.map(item=><p key={item}>◆ {item}</p>)}
            </article>

            <article style={theme.card}>
              <h2 style={{color:theme.gold}}>Digital Product Interest</h2>
              {intel.digitalProductInterest.map(item=><p key={item}>◆ {item}</p>)}
            </article>

            <article style={theme.card}>
              <h2 style={{color:theme.gold}}>Recommended Next Actions</h2>
              {intel.recommendedNextActions.map(item=><p key={item}>→ {item}</p>)}
            </article>
          </section>
        )}
      </section>
    </main>
  );
}
