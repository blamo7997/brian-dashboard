import { useEffect, useState } from "react";
import { theme } from "../../lib/brianco-native/ui";

const roles = ["admin","customer","supplier","artisan","creator","influencer","lawyer","investor","banker","accountant","family"];

export default function RoleCenter() {
  const [role, setRole] = useState("customer");
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/role-intelligence/notifications?role=" + role)
      .then((r)=>r.json())
      .then(setData)
      .catch(()=>setData(null));
  }, [role]);

  return (
    <main style={theme.page}>
      <section style={theme.shell}>
        <h1 style={{fontSize:46,color:theme.gold,marginBottom:8}}>Brian & Co Role Center</h1>
        <p style={{fontSize:18,lineHeight:1.7,maxWidth:1040}}>
          Every role receives website-native notifications, concierge prompts, collection paths, and working links.
        </p>

        <div style={{display:"flex",gap:10,flexWrap:"wrap",marginTop:20}}>
          {roles.map((r)=>(
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
          <section style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:16,marginTop:24}}>
            <article style={theme.card}>
              <h2 style={{color:theme.gold}}>Notifications</h2>
              {data.notifications.map((item)=>(
                <div key={item} style={{padding:"10px 0",borderBottom:"1px solid rgba(242,201,92,.16)"}}>{item}</div>
              ))}
            </article>

            <article style={theme.card}>
              <h2 style={{color:theme.gold}}>Concierge Prompts</h2>
              {data.concierge.map((item)=>(
                <div key={item} style={{padding:"10px 0",borderBottom:"1px solid rgba(242,201,92,.16)"}}>{item}</div>
              ))}
            </article>

            <article style={theme.card}>
              <h2 style={{color:theme.gold}}>Role Collections</h2>
              {data.collections.map((item)=>(
                <div key={item} style={{padding:"10px 0",borderBottom:"1px solid rgba(242,201,92,.16)"}}>{item}</div>
              ))}
            </article>

            <article style={theme.card}>
              <h2 style={{color:theme.gold}}>Working Actions</h2>
              {data.links.map((link)=>(
                <a key={link} href={link} style={{
                  display:"block",
                  margin:"10px 0",
                  color:"#050505",
                  background:"linear-gradient(90deg,#f7dc8a,#b97919)",
                  padding:"10px 14px",
                  borderRadius:999,
                  textDecoration:"none",
                  fontWeight:700
                }}>Open {link}</a>
              ))}
            </article>
          </section>
        )}
      </section>
    </main>
  );
}
