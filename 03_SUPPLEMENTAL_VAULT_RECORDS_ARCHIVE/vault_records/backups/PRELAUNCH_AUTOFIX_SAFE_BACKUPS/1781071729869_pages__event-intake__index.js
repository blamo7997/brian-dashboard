import { useEffect, useState } from "react";
import { theme } from "../../lib/brianco-native/ui";

export default function EventIntake(){
  const [data,setData] = useState(null);

  useEffect(()=>{
    fetch("/api/event-intake/dashboard")
      .then(r=>r.json())
      .then(setData)
      .catch(()=>setData(null));
  },[]);

  const items = data?.seed?.eventIntakeItems || [];

  return(
    <main style={theme.page}>
      <section style={theme.shell}>
        <h1 style={{fontSize:48,color:theme.gold,marginBottom:8}}>
          Brian & Co Event Intake
        </h1>

        <p style={{fontSize:18,lineHeight:1.7,maxWidth:1120}}>
          Real event intake preparation for Cheyenne, Wyoming, vendor opportunities,
          Frontier Days readiness, source review, founder approval routing,
          accessibility review, localization review, and protected event decision workflows.
        </p>

        {data && (
          <>
            <section style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:16,marginTop:24}}>
              {items.map(item=>(
                <article key={item.title} style={theme.card}>
                  <h2 style={{color:theme.gold}}>{item.title}</h2>
                  <p>{item.category}</p>
                  <p>Status: {item.status}</p>
                  <p>Approval: {item.approvalState}</p>
                  <a href={item.route} style={{color:theme.gold}}>Open Review</a>
                </article>
              ))}
            </section>

            <section style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",gap:16,marginTop:24}}>
              <article style={theme.card}>
                <h2 style={{color:theme.gold}}>Intake Fields</h2>
                {data.intakeFields.map(item=><p key={item}>◆ {item}</p>)}
              </article>

              <article style={theme.card}>
                <h2 style={{color:theme.gold}}>Source Review Rules</h2>
                {data.sourceReviewRules.map(item=><p key={item}>✓ {item}</p>)}
              </article>

              <article style={theme.card}>
                <h2 style={{color:theme.gold}}>Approval Routing</h2>
                {data.approvalRouting.map(item=><p key={item.trigger}>→ {item.trigger}: {item.reviewer}</p>)}
              </article>
            </section>

            <section style={{marginTop:24,...theme.card}}>
              <h2 style={{color:theme.gold}}>Protected Event Standard</h2>
              <p>
                This phase prepares event intake only. It does not purchase booths, submit applications,
                publish claims, change products, change collections, touch OAuth, touch payments,
                print secrets, or make commitments. Founder approval remains required.
              </p>
              <a href="/approval-automation" style={{color:theme.gold}}>Open Approval Automation</a>
            </section>
          </>
        )}
      </section>
    </main>
  );
}
