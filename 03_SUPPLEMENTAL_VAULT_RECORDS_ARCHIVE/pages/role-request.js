import { useState } from "react";

export default function RoleRequest() {
  const [form, setForm] = useState({
    requesterName: "",
    requesterEmail: "",
    requestedRole: "customer",
    organization: "",
    notes: ""
  });
  const [result, setResult] = useState(null);

  function update(k, v) { setForm({ ...form, [k]: v }); }

  async function submit(e) {
    e.preventDefault();
    const r = await fetch("/api/role-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    setResult(await r.json());
  }

  return (
    <main style={{minHeight:"100vh",padding:"42px",fontFamily:"Georgia,serif",background:"linear-gradient(135deg,#f7f1e8,#ffffff)",color:"#1f1a17"}}>
      <section style={{maxWidth:"860px",margin:"0 auto"}}>
        <p style={{letterSpacing:".18em",textTransform:"uppercase",fontSize:"12px"}}>Brian & Co Native Role Access</p>
        <h1 style={{fontSize:"44px",lineHeight:"1.08"}}>Request role access</h1>
        <p style={{fontSize:"18px",lineHeight:"1.7"}}>
          Lawyers, investors, bankers, artisans, creators, influencers, family, girlfriend, and customers can request access here.
          Brian must green-check approval before access is granted.
        </p>

        <form onSubmit={submit} style={{marginTop:"28px",display:"grid",gap:"16px",padding:"26px",border:"1px solid rgba(31,26,23,.16)",borderRadius:"24px",background:"rgba(255,255,255,.76)"}}>
          <input required placeholder="Full name" value={form.requesterName} onChange={e=>update("requesterName",e.target.value)} style={field}/>
          <input required placeholder="Email address" value={form.requesterEmail} onChange={e=>update("requesterEmail",e.target.value)} style={field}/>
          <input required placeholder="Requested role: lawyer, investor, banker, artisan, creator, influencer, family, girlfriend, customer" value={form.requestedRole} onChange={e=>update("requestedRole",e.target.value)} style={field}/>
          <input placeholder="Organization / company / channel / firm" value={form.organization} onChange={e=>update("organization",e.target.value)} style={field}/>
          <textarea placeholder="Notes" value={form.notes} onChange={e=>update("notes",e.target.value)} style={{...field,minHeight:"120px"}}/>
          <button style={button}>Send role request to Brian</button>
        </form>

        {result && (
          <pre style={{marginTop:"22px",whiteSpace:"pre-wrap",padding:"18px",borderRadius:"18px",background:"#fff",border:"1px solid rgba(31,26,23,.14)"}}>
            {JSON.stringify(result, null, 2)}
          </pre>
        )}
      </section>
    </main>
  );
}

const field = {width:"100%",padding:"14px 16px",borderRadius:"14px",border:"1px solid rgba(31,26,23,.2)",fontSize:"16px"};
const button = {padding:"14px 18px",borderRadius:"999px",border:"0",cursor:"pointer",fontSize:"16px"};
