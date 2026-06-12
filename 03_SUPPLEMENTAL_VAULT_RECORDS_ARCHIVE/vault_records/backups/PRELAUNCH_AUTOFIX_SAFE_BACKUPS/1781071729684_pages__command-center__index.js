import { useEffect, useState } from "react";
import { theme } from "../../lib/brianco-native/ui";

export default function BrianCoUnifiedCommandCenter(){
  const [data,setData] = useState(null);

  useEffect(()=>{
    fetch("/api/ecosystem-command/master")
      .then(r=>r.json())
      .then(setData)
      .catch(()=>setData(null));
  },[]);

  const cards = data?.masterCards || [];
  const priorities = data?.commandPriorities || [];
  const layers = data?.operatingLayers || [];
  const phases = data?.nextPhases || [];

  return(
    <main style={theme.page}>
      <section style={theme.shell}>

        <h1 style={{fontSize:50,color:theme.gold,marginBottom:8}}>
          Brian & Co Ecosystem Command Center
        </h1>

        <p style={{fontSize:18,lineHeight:1.7,maxWidth:1160}}>
          The master native Brian & Co command center for founder operations,
          provider readiness, chatbot intelligence, role personalization,
          customer intelligence, communication, local events, commerce,
          accessibility, localization, native identity, and approval-safe expansion.
        </p>

        <section style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:16,marginTop:24}}>
          {cards.map(card=>(
            <article key={card.title} style={theme.card}>
              <h2 style={{color:theme.gold}}>{card.title}</h2>
              <p>Status: {card.value}</p>
              <a href={card.route} style={{color:theme.gold}}>Open</a>
            </article>
          ))}
        </section>

        <section style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",gap:16,marginTop:24}}>
          <article style={theme.card}>
            <h2 style={{color:theme.gold}}>Command Priorities</h2>
            {priorities.map(item=><p key={item}>✓ {item}</p>)}
          </article>

          <article style={theme.card}>
            <h2 style={{color:theme.gold}}>Operating Layers</h2>
            {layers.map(item=><p key={item}>◆ {item}</p>)}
          </article>

          <article style={theme.card}>
            <h2 style={{color:theme.gold}}>Next Phases</h2>
            {phases.map(item=><p key={item}>→ {item}</p>)}
          </article>
        </section>

        <section style={{marginTop:24,...theme.card}}>
          <h2 style={{color:theme.gold}}>Protected Native Standard</h2>
          <p>
            Brian & Co remains native-first, founder-controlled, approval-gated,
            accessibility-aware, localization-aware, role-aware, and protected by default.
            Provider infrastructure remains behind the scenes wherever technically feasible.
          </p>
        </section>

      </section>
    </main>
  );
}
