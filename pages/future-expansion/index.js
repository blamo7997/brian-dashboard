import { theme } from "../../lib/brianco-native/ui";

const phases = [
  ["Phase 15", "Real Shopify Analytics", "Read-only sales, orders, customers, products, and collection intelligence."],
  ["Phase 16", "Real Chatbot Intelligence", "Conversation trends, unanswered questions, role usage, conversion help, accessibility and language signals."],
  ["Phase 17", "Native Authentication", "Email, Google, Apple, QR, passkeys, and device unlock inside the Brian & Co experience where feasible."],
  ["Phase 18", "Unified Founder Command Center", "One visual dashboard for website, chatbot, products, orders, customers, roles, approvals, events, notifications, and analytics."],
  ["Phase 19", "Advanced Personalization", "Role-aware UI, recommendations, collections, concierge guidance, notifications, accessibility, language, and income-tier experiences."],
  ["Phase 20", "Brian & Co Ecosystem Intelligence", "Website, chatbot, command center, role portals, analytics, recommendations, events, approvals, localization, and accessibility in one protected ecosystem."]
];

export default function FutureExpansion() {
  return (
    <main style={theme.page}>
      <section style={theme.shell}>
        <h1 style={{fontSize:46,color:theme.gold,marginBottom:8}}>Brian & Co Future Expansion</h1>
        <p style={{fontSize:18,lineHeight:1.7,maxWidth:1040}}>
          Protected roadmap for the next live layers. Every successful approved layer remains additive,
          preserved, website-native, visual-first, and founder-controlled.
        </p>

        <section style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:16,marginTop:24}}>
          {phases.map(([phase,title,note])=>(
            <article key={phase} style={theme.card}>
              <div style={{color:theme.gold,letterSpacing:".12em",textTransform:"uppercase"}}>{phase}</div>
              <h2 style={{color:theme.gold}}>{title}</h2>
              <p style={{lineHeight:1.55}}>{note}</p>
            </article>
          ))}
        </section>

        <section style={{marginTop:24,...theme.card}}>
          <h2 style={{color:theme.gold}}>Protected Rules</h2>
          <p>No product edits, collection edits, OAuth changes, payment changes, secret printing, or raw biometric storage without explicit approval and safeguards.</p>
        </section>
      </section>
    </main>
  );
}
