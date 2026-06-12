import { useEffect, useState } from "react";
import { theme } from "../../lib/brianco-native/ui";

export default function ApprovalAutomation(){
  const [data,setData] = useState(null);

  useEffect(()=>{
    fetch("/api/approval-automation/queues")
      .then(r=>r.json())
      .then(setData)
      .catch(()=>setData(null));
  },[]);

  return(
    <main style={theme.page}>
      <section style={theme.shell}>
        <h1 style={{fontSize:48,color:theme.gold,marginBottom:8}}>
          Brian & Co Approval Automation
        </h1>

        <p style={{fontSize:18,lineHeight:1.7,maxWidth:1120}}>
          Founder green-check preparation for website changes, theme updates,
          legal review, accounting review, banker review, role approvals,
          commerce recommendations, event opportunities, and protected deployment workflows.
        </p>

        {data && (
          <>
            <section style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:16,marginTop:24}}>
              {data.approvalQueues.map(item=>(
                <article key={item.title} style={theme.card}>
                  <h2 style={{color:theme.gold}}>{item.title}</h2>
                  <p>Status: {item.status}</p>
                  <a href={item.route} style={{color:theme.gold}}>Open</a>
                </article>
              ))}
            </section>

            <section style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",gap:16,marginTop:24}}>
              <article style={theme.card}>
                <h2 style={{color:theme.gold}}>Approval Types</h2>
                {data.approvalTypes.map(item=><p key={item}>◆ {item}</p>)}
              </article>

              <article style={theme.card}>
                <h2 style={{color:theme.gold}}>Automation Rules</h2>
                {data.automationRules.map(item=><p key={item}>✓ {item}</p>)}
              </article>

              <article style={theme.card}>
                <h2 style={{color:theme.gold}}>Green-Check States</h2>
                {data.greenCheckStates.map(item=><p key={item}>→ {item}</p>)}
              </article>
            </section>

            <section style={{marginTop:24,...theme.card}}>
              <h2 style={{color:theme.gold}}>Protected Founder Standard</h2>
              <p>
                This layer prepares approval automation without changing products, collections,
                OAuth, payments, secrets, pricing, public claims, purchases, or commitments.
                Protected live changes still require explicit founder approval.
              </p>
              <a href="/command-center" style={{color:theme.gold}}>Open Ecosystem Command Center</a>
            </section>
          </>
        )}
      </section>
    </main>
  );
}
