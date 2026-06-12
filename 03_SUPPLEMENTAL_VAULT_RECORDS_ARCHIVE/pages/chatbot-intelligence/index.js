import { useEffect, useState } from "react";
import { theme, NativeCard } from "../../lib/brianco-native/ui";

export default function ChatbotIntelligencePage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/chatbot-intelligence/summary")
      .then((r)=>r.json())
      .then(setData)
      .catch(()=>setData(null));
  }, []);

  const cards = data?.visualCards || [];

  return (
    <main style={theme.page}>
      <section style={theme.shell}>
        <h1 style={{fontSize:46,color:theme.gold,marginBottom:8}}>Brian & Co Chatbot Intelligence</h1>
        <p style={{fontSize:18,lineHeight:1.7,maxWidth:1080}}>
          Visual intelligence for conversations, messages, role usage, unanswered requests, escalations,
          conversion assistance, accessibility needs, language needs, and founder review.
        </p>

        <section style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:16,marginTop:24}}>
          {cards.map((card)=>(
            <NativeCard key={card.title} title={card.title} value={card.value} note="Prepared for consent-aware live chatbot event data." trend={card.trend} />
          ))}
        </section>

        {data && (
          <section style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",gap:16,marginTop:24}}>
            <article style={theme.card}>
              <h2 style={{color:theme.gold}}>Tracked Intents</h2>
              {data.intentPanels.map((item)=><p key={item}>◆ {item}</p>)}
            </article>

            <article style={theme.card}>
              <h2 style={{color:theme.gold}}>Founder Recommendations</h2>
              {data.recommendationPanels.map((item)=><p key={item}>→ {item}</p>)}
            </article>

            <article style={theme.card}>
              <h2 style={{color:theme.gold}}>Protected Use</h2>
              <p>Chatbot intelligence remains consent-aware, role-scoped, privacy-conscious, and protected by default.</p>
            </article>
          </section>
        )}

        <section style={{marginTop:24,...theme.card}}>
          <h2 style={{color:theme.gold}}>Text Concierge</h2>
          <p>Users can continue interacting through the Brian & Co text concierge.</p>
          <a href="/text-concierge" style={{color:theme.gold}}>Open Text Concierge</a>
        </section>
      </section>
    </main>
  );
}
