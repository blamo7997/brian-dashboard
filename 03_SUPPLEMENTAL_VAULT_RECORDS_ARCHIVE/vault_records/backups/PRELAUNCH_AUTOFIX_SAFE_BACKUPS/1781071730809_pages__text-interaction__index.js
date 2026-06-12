import { useEffect, useState } from "react";
import { theme } from "../../lib/brianco-native/ui";

export default function TextInteractionLayer(){
  const [data,setData] = useState(null);

  useEffect(()=>{
    fetch("/api/text-interaction/readiness")
      .then(r=>r.json())
      .then(setData)
      .catch(()=>setData(null));
  },[]);

  return(
    <main style={theme.page}>
      <section style={theme.shell}>
        <h1 style={{fontSize:48,color:theme.gold,marginBottom:8}}>
          Brian & Co Text Interaction
        </h1>

        <p style={{fontSize:18,lineHeight:1.7,maxWidth:1120}}>
          Native Brian & Co text interaction readiness for website text concierge,
          future SMS/MMS, role-aware routing, accessibility-aware messaging,
          localization, reminders, approvals, and founder alerts.
        </p>

        {data && (
          <>
            <section style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:16,marginTop:24}}>
              {data.channels.map(channel=>(
                <article key={channel.id} style={theme.card}>
                  <h2 style={{color:theme.gold}}>{channel.label}</h2>
                  <p>Status: {channel.status}</p>
                </article>
              ))}
            </section>

            <section style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",gap:16,marginTop:24}}>
              <article style={theme.card}>
                <h2 style={{color:theme.gold}}>Text Flows</h2>
                {data.textFlows.map(item=><p key={item}>◆ {item}</p>)}
              </article>

              <article style={theme.card}>
                <h2 style={{color:theme.gold}}>Preferences</h2>
                {data.preferences.map(item=><p key={item}>✓ {item}</p>)}
              </article>

              <article style={theme.card}>
                <h2 style={{color:theme.gold}}>Provider Requirements</h2>
                {data.nextProviderRequirements.map(item=><p key={item}>→ {item}</p>)}
              </article>
            </section>

            <section style={{marginTop:24,...theme.card}}>
              <h2 style={{color:theme.gold}}>Native Standard</h2>
              <p>
                Users should feel they are texting Brian & Co, not a third-party platform.
                Provider infrastructure remains behind the scenes wherever feasible and compliant.
              </p>
              <a href="/text-concierge" style={{color:theme.gold}}>Open Text Concierge</a>
            </section>
          </>
        )}
      </section>
    </main>
  );
}
