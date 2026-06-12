import { theme } from "../../lib/brianco-native/ui";

const accessCards = [
  ["Email Access", "Continue with a private Brian & Co account experience."],
  ["Google Access", "Prepared behind a Brian & Co native access card once approved credentials exist."],
  ["Apple Access", "Prepared behind a Brian & Co native access card once approved credentials exist."],
  ["Passkey / Device Unlock", "Prepared through secure platform passkeys without storing raw biometric data."],
  ["QR Access", "Prepared for signed, short-lived Brian & Co access links."],
  ["Trusted Device", "Prepared for future device continuity with consent and security review."]
];

const roleRoutes = [
  ["/role/customer", "Customer"],
  ["/role/admin", "Founder/Admin"],
  ["/role/artisan", "Artisan"],
  ["/role/supplier", "Supplier"],
  ["/role/creator", "Creator"],
  ["/role/influencer", "Influencer"],
  ["/role/lawyer", "Lawyer"],
  ["/role/investor", "Investor"],
  ["/role/banker", "Banker"],
  ["/role/accountant", "Accountant"],
  ["/role/family", "Family"]
];

export default function NativeIdentity() {
  return (
    <main style={theme.page}>
      <section style={theme.shell}>
        <h1 style={{fontSize:46,color:theme.gold,marginBottom:8}}>Brian & Co Account Access</h1>
        <p style={{fontSize:18,lineHeight:1.7,maxWidth:1080}}>
          A native Brian & Co access experience for account creation, sign-in, role routing,
          trusted devices, QR access, passkeys, and future approved provider connections.
        </p>

        <section style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:16,marginTop:24}}>
          {accessCards.map(([title,note])=>(
            <article key={title} style={theme.card}>
              <h2 style={{color:theme.gold}}>{title}</h2>
              <p style={{lineHeight:1.55}}>{note}</p>
              <button style={{
                border:"1px solid rgba(242,201,92,.42)",
                borderRadius:999,
                padding:"11px 15px",
                background:"linear-gradient(90deg,#f7dc8a,#b97919)",
                color:"#050505",
                fontWeight:700
              }}>
                Continue with Brian & Co
              </button>
            </article>
          ))}
        </section>

        <section style={{marginTop:24,...theme.card}}>
          <h2 style={{color:theme.gold}}>Role Routing</h2>
          <p>After access, users continue into the correct Brian & Co role experience.</p>
          <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
            {roleRoutes.map(([href,label])=>(
              <a key={href} href={href} style={{
                border:"1px solid rgba(242,201,92,.35)",
                borderRadius:999,
                padding:"10px 14px",
                color:"#f7dc8a",
                textDecoration:"none"
              }}>{label}</a>
            ))}
          </div>
        </section>

        <section style={{marginTop:24,...theme.card}}>
          <h2 style={{color:theme.gold}}>Protected Identity Rules</h2>
          <p>
            This layer prepares native identity flows without changing OAuth credentials,
            payments, secrets, products, or collections. Real Google, Apple, passkey, QR,
            and trusted-device enforcement requires approved credentials and security/legal review.
          </p>
        </section>
      </section>
    </main>
  );
}
