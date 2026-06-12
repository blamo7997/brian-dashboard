import { useEffect, useState } from "react";
import { theme } from "../../lib/brianco-native/ui";

const roles = ["customer","family","artisan","supplier","creator","influencer","investor","lawyer","accountant","banker","admin"];

export default function PersonalizedExperience(){
  const [role,setRole] = useState("customer");
  const [data,setData] = useState(null);

  useEffect(()=>{
    fetch("/api/personalization/role?role=" + role)
      .then(r=>r.json())
      .then(setData)
      .catch(()=>setData(null));
  },[role]);

  return(
    <main style={theme.page}>
      <section style={theme.shell}>
        <h1 style={{fontSize:48,color:theme.gold,marginBottom:8}}>
          Brian & Co Personalized Experience
        </h1>

        <p style={{fontSize:18,lineHeight:1.7,maxWidth:1100}}>
          Role-aware recommendations, actions, accessibility, localization, and concierge routing
          inside a native Brian & Co experience.
        </p>

        <div style={{display:"flex",gap:10,flexWrap:"wrap",marginTop:22}}>
          {roles.map(r=>(
            <button key={r} onClick={()=>setRole(r)} style={{
              border:"1px solid rgba(242,201,92,.42)",
              borderRadius:999,
              padding:"10px 14px",
              background:r===role ? "linear-gradient(90deg,#f7dc8a,#b97919)" : "rgba(255,255,255,.07)",
              color:r===role ? "#050505" : "#f8edd7",
              cursor:"pointer",
              fontWeight:700
            }}>{r}</button>
          ))}
        </div>

        {data && (
          <>
            <section style={{marginTop:24,...theme.card}}>
              <h2 style={{color:theme.gold}}>{data.title}</h2>
              <p>Every action remains Brian & Co native, role-aware, protected, and approval-safe.</p>
              <a href={data.route} style={{color:theme.gold}}>Open Role Destination</a>
            </section>

            <section style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:16,marginTop:24}}>
              <article style={theme.card}>
                <h2 style={{color:theme.gold}}>Recommendations</h2>
                {data.recommendations.map(item=><p key={item}>◆ {item}</p>)}
              </article>

              <article style={theme.card}>
                <h2 style={{color:theme.gold}}>Actions</h2>
                {data.actions.map(item=><p key={item}>→ {item}</p>)}
              </article>

              <article style={theme.card}>
                <h2 style={{color:theme.gold}}>Accessibility</h2>
                {data.accessibility.map(item=><p key={item}>✓ {item}</p>)}
              </article>

              <article style={theme.card}>
                <h2 style={{color:theme.gold}}>Localization</h2>
                {data.localization.map(item=><p key={item}>✓ {item}</p>)}
              </article>
            </section>
          </>
        )}
      </section>
    </main>
  );
}
