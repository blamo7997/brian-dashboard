import { useEffect, useState } from "react";
import { theme } from "../../lib/brianco-native/ui";

export default function CommunicationHub(){
  const [data,setData] = useState(null);

  useEffect(()=>{
    fetch("/api/communication-hub/summary")
      .then(r=>r.json())
      .then(setData)
      .catch(()=>setData(null));
  },[]);

  return(
    <main style={theme.page}>
      <section style={theme.shell}>
        <h1 style={{fontSize:48,color:theme.gold,marginBottom:8}}>
          Brian & Co Communication Hub
        </h1>

        <p style={{fontSize:18,lineHeight:1.7,maxWidth:1120}}>
          Native Brian & Co communication readiness for website messaging,
          text concierge, future SMS/MMS, role notifications, founder alerts,
          approvals, accessibility, localization, and event notifications.
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
                <h2 style={{color:theme.gold}}>Routing</h2>
                {data.routing.map(item=><p key={item.trigger}>◆ {item.trigger} → {item.route}</p>)}
              </article>

              <article style={theme.card}>
                <h2 style={{color:theme.gold}}>Notification Types</h2>
                {data.notificationTypes.map(item=><p key={item}>→ {item}</p>)}
              </article>

              <article style={theme.card}>
                <h2 style={{color:theme.gold}}>Safeguards</h2>
                {data.safeguards.map(item=><p key={item}>✓ {item}</p>)}
              </article>
            </section>

            <section style={{marginTop:24,...theme.card}}>
              <h2 style={{color:theme.gold}}>Native Standard</h2>
              <p>
                Messages, alerts, requests, approvals, and future SMS/MMS flows should feel like Brian & Co.
                Provider infrastructure remains behind the scenes wherever feasible and compliant.
              </p>
              <a href="/text-interaction" style={{color:theme.gold}}>Open Text Interaction Layer</a>
            </section>
          </>
        )}
      </section>
    </main>
  );
}
