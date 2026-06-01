import { useState } from "react";

export default function AccountAccess() {
  const [email, setEmail] = useState("");
  const [data, setData] = useState(null);

  async function check(e) {
    e.preventDefault();
    const r = await fetch(`/api/account-entitlements?email=${encodeURIComponent(email)}`);
    setData(await r.json());
  }

  return (
    <main style={{minHeight:"100vh",padding:"42px",fontFamily:"Georgia,serif",background:"linear-gradient(135deg,#f7f1e8,#ffffff)",color:"#1f1a17"}}>
      <section style={{maxWidth:"820px",margin:"0 auto"}}>
        <p style={{letterSpacing:".18em",textTransform:"uppercase",fontSize:"12px"}}>Brian & Co Account</p>
        <h1 style={{fontSize:"44px",lineHeight:"1.08"}}>Account access and entitlements</h1>
        <p style={{fontSize:"18px",lineHeight:"1.7"}}>
          Check Brian & Co account role, complimentary access, founder-approved status, and digital product access.
        </p>

        <form onSubmit={check} style={{marginTop:"26px",display:"grid",gap:"14px"}}>
          <input required placeholder="Email address" value={email} onChange={e=>setEmail(e.target.value)} style={field}/>
          <button style={button}>Check access</button>
        </form>

        {data && (
          <pre style={{marginTop:"22px",whiteSpace:"pre-wrap",padding:"18px",borderRadius:"18px",background:"#fff",border:"1px solid rgba(31,26,23,.14)"}}>
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
      </section>
    </main>
  );
}

const field = {width:"100%",padding:"14px 16px",borderRadius:"14px",border:"1px solid rgba(31,26,23,.2)",fontSize:"16px"};
const button = {padding:"14px 18px",borderRadius:"999px",border:"0",cursor:"pointer",fontSize:"16px"};
