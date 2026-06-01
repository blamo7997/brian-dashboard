import { useEffect, useState } from "react";
import { theme, NativeCard, NativeAccessNotice } from "../../lib/brianco-native/ui";
import BrianCoTextConcierge from "../../components/BrianCoTextConcierge";

export default function CommandCenterV3() {
  const [sales, setSales] = useState(null);
  const [experience, setExperience] = useState(null);
  const [events, setEvents] = useState(null);
  const [approvals, setApprovals] = useState(null);

  useEffect(() => {
    fetch("/api/intelligence/sales-orders").then(r=>r.json()).then(setSales).catch(()=>setSales(null));
    fetch("/api/intelligence/experience").then(r=>r.json()).then(setExperience).catch(()=>setExperience(null));
    fetch("/api/events/cheyenne").then(r=>r.json()).then(setEvents).catch(()=>setEvents(null));
    fetch("/api/approvals/queues").then(r=>r.json()).then(setApprovals).catch(()=>setApprovals(null));
  }, []);

  const cards = [
    ["Revenue Intelligence", sales?.sales?.grossRevenue?.value || "Prepared", "Sales and revenue views are prepared for live Shopify/order integration.", sales?.sales?.grossRevenue?.trend || [10,18,25,38,47,59,72]],
    ["Order Flow", sales?.sales?.orders?.value || "Prepared", "Order movement, fulfillment visibility, and conversion pathways.", sales?.sales?.orders?.trend || [12,20,28,36,48,61,70]],
    ["Cart Intelligence", sales?.sales?.carts?.value || "Prepared", "Cart, checkout, and abandoned-flow intelligence.", sales?.sales?.carts?.trend || [18,26,32,45,55,67,80]],
    ["Chatbot Intelligence", experience?.chatbot?.conversations?.value || "Prepared", "Questions, typo-intelligence, recommendations, and unresolved needs.", experience?.chatbot?.conversations?.trend || [14,22,31,40,58,73,88]],
    ["Accessibility", "Prepared", "Text size, contrast, captions, reduced motion, read-aloud, and caregiver support.", [16,25,34,48,59,74,90]],
    ["Language & Locality", "Prepared", "Native language, dialect, regional tone, and locality-aware presentation.", [12,20,33,46,61,76,89]],
    ["Tax Awareness", sales?.taxAwareness?.status || "Estimate-Ready", "Tax panels are estimate-ready pending verified tax/accounting systems.", [8,18,33,45,53,59,68]],
    ["Cheyenne Events", events?.locality || "Watch-Ready", "Frontier Days, festivals, vendor fairs, markets, and QR opportunities.", [15,26,35,43,60,73,90]],
    ["Founder Queue", approvals?.founderQueue?.length ? `${approvals.founderQueue.length} Protected Areas` : "Protected", "Approval-gated public, legal, pricing, product, OAuth, payment, and sensitive-data changes.", [20,30,40,55,60,70,85]]
  ];

  return (
    <main style={theme.page}>
      <section style={theme.shell}>
        <h1 style={{fontSize:46,color:theme.gold,marginBottom:8}}>Brian & Co Founder Command Center</h1>
        <p style={{fontSize:18,lineHeight:1.7,maxWidth:1040}}>
          A website-native visual intelligence center for sales, orders, chatbot activity, accessibility,
          language, tax awareness, Cheyenne events, approvals, and protected founder oversight.
        </p>

        <section style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(270px,1fr))",gap:16,marginTop:24}}>
          {cards.map(([title,value,note,trend])=>(
            <NativeCard key={title} title={title} value={value} note={note} trend={trend} />
          ))}
        </section>

        <section style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(330px,1fr))",gap:16,marginTop:24}}>
          <article style={theme.card}>
            <h2 style={{color:theme.gold}}>Approval Protection</h2>
            <p>Products, collections, prices, legal wording, OAuth, payments, sensitive data, and live changes remain founder approval-gated.</p>
          </article>
          <article style={theme.card}>
            <h2 style={{color:theme.gold}}>Live Data Path</h2>
            <p>These panels are wired to Brian & Co read-only intelligence APIs and ready for approved live-provider connections.</p>
          </article>
          <article style={theme.card}>
            <h2 style={{color:theme.gold}}>Native Experience</h2>
            <p>All role UI and account access is designed to stay inside the Brian & Co website experience wherever feasible.</p>
          </article>
        </section>

        <BrianCoTextConcierge />
        <NativeAccessNotice />
      </section>
    </main>
  );
}


