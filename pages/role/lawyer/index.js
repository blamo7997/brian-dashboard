import { useEffect, useState } from "react";
import { theme, NativeCard } from "../../../lib/brianco-native/ui";
import { getRoleProfile } from "../../../lib/brianco-role-intelligence/roles";

export default function RoleDashboard() {
  const role = "lawyer";
  const fallback = getRoleProfile(role);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/role-intelligence/profile?role=" + role)
      .then((r) => r.json())
      .then(setData)
      .catch(() => setData(null));
  }, []);

  const profile = data?.profile || fallback;
  const cards = data?.cards || profile.dashboard.map((item, index) => ({
    title: item,
    value: "Prepared",
    note: item + " intelligence is prepared for " + profile.title + ".",
    trend: [18, 28, 38, 49, 61, 73, 86]
  }));

  return (
    <main style={theme.page}>
      <section style={theme.shell}>
        <h1 style={{fontSize:46,color:theme.gold,marginBottom:8}}>{profile.title}</h1>
        <p style={{fontSize:18,lineHeight:1.7,maxWidth:1040}}>
          {profile.summary}
        </p>

        <section style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fit,minmax(270px,1fr))",
          gap:16,
          marginTop:24
        }}>
          {cards.map((card)=>(
            <NativeCard
              key={card.title}
              title={card.title}
              value={card.value}
              note={card.note}
              trend={card.trend}
            />
          ))}
        </section>

        <section style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",
          gap:16,
          marginTop:24
        }}>
          <article style={theme.card}>
            <h2 style={{color:theme.gold}}>Role Offers</h2>
            <p>{profile.offers.join(" • ")}</p>
          </article>

          <article style={theme.card}>
            <h2 style={{color:theme.gold}}>Permissions</h2>
            <p>{profile.permissions.join(" • ")}</p>
          </article>

          <article style={theme.card}>
            <h2 style={{color:theme.gold}}>Brian & Co Native Experience</h2>
            <p>This role space remains website-native, visual-first, role-aware, and protected by default.</p>
          </article>
        </section>
      </section>
    </main>
  );
}
