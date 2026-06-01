import { theme, NativeAccessNotice } from "../../lib/brianco-native/ui";

export default function AccountAccess() {
  const providers = [
    ["Email Access", "Website-native email sign-in path."],
    ["Google Access", "Brian & Co branded entry with secure Google provider step when approved."],
    ["Apple Access", "Brian & Co branded entry with secure Apple provider step when approved."],
    ["QR Access", "Short-lived QR access prepared for future signed token layer."],
    ["Passkey / Device Unlock", "Platform WebAuthn/passkey path. No raw face scans stored."],
    ["Future Methods", "Founder-approved secure methods can be added later."]
  ];

  return (
    <main style={theme.page}>
      <section style={theme.shell}>
        <h1 style={{fontSize:44,color:theme.gold,marginBottom:8}}>Brian & Co Account Access</h1>
        <p style={{fontSize:18,lineHeight:1.7,maxWidth:980}}>
          Every sign-in, sign-up, role route, and account interaction is presented as Brian & Co first:
          refined, website-native, role-aware, and protected.
        </p>

        <section style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:16,marginTop:24}}>
          {providers.map(([title,note])=>(
            <article key={title} style={theme.card}>
              <h2 style={{color:theme.gold}}>{title}</h2>
              <p style={{lineHeight:1.55}}>{note}</p>
              <button style={{
                marginTop:12,
                border:"1px solid rgba(242,201,92,.45)",
                borderRadius:999,
                padding:"11px 15px",
                background:"linear-gradient(90deg,#f7dc8a,#b97919)",
                color:"#050505",
                fontWeight:700,
                cursor:"pointer"
              }}>
                Continue through Brian & Co
              </button>
            </article>
          ))}
        </section>

        <NativeAccessNotice />
      </section>
    </main>
  );
}
