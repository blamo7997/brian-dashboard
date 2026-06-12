import { useState } from "react";

export default function FreeAccessRequest() {
  const [form, setForm] = useState({
    requesterName: "",
    requesterEmail: "",
    relationship: "",
    requestedAccess: "Complimentary Brian & Co access",
    notes: ""
  });
  const [result, setResult] = useState(null);

  async function submit(e) {
    e.preventDefault();
    const response = await fetch("/api/approvals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "family_or_girlfriend_free_access_request",
        ...form
      })
    });
    setResult(await response.json());
  }

  function update(key, value) {
    setForm({ ...form, [key]: value });
  }

  return (
    <main style={{minHeight:"100vh",padding:"42px",fontFamily:"Georgia,serif",background:"linear-gradient(135deg,#f7f1e8,#ffffff)",color:"#1f1a17"}}>
      <section style={{maxWidth:"820px",margin:"0 auto"}}>
        <p style={{letterSpacing:".18em",textTransform:"uppercase",fontSize:"12px"}}>Brian & Co Private Access</p>
        <h1 style={{fontSize:"42px",lineHeight:"1.08"}}>Request complimentary access</h1>
        <p style={{fontSize:"18px",lineHeight:"1.7"}}>
          Family and approved personal guests may request complimentary Brian & Co access here.
          Nothing is granted automatically. Brian reviews each request and must green-check approval first.
        </p>

        <form onSubmit={submit} style={{marginTop:"28px",display:"grid",gap:"16px",padding:"26px",border:"1px solid rgba(31,26,23,.16)",borderRadius:"24px",background:"rgba(255,255,255,.76)"}}>
          <input required placeholder="Full name" value={form.requesterName} onChange={e=>update("requesterName",e.target.value)} style={field}/>
          <input required placeholder="Email address" value={form.requesterEmail} onChange={e=>update("requesterEmail",e.target.value)} style={field}/>
          <input required placeholder="Relationship to Brian" value={form.relationship} onChange={e=>update("relationship",e.target.value)} style={field}/>
          <input placeholder="Requested access" value={form.requestedAccess} onChange={e=>update("requestedAccess",e.target.value)} style={field}/>
          <textarea placeholder="Optional note" value={form.notes} onChange={e=>update("notes",e.target.value)} style={{...field,minHeight:"120px"}}/>
          <button style={button}>Send to Brian for green-check approval</button>
        </form>

        {result && (
          <div style={{marginTop:"22px",padding:"20px",borderRadius:"20px",background:"#fff",border:"1px solid rgba(31,26,23,.15)"}}>
            {result.ok ? "Request sent to Brian's approval queue." : "Something went wrong."}
          </div>
        )}
      </section>
    </main>
  );
}

const field = {
  width:"100%",
  padding:"14px 16px",
  borderRadius:"14px",
  border:"1px solid rgba(31,26,23,.2)",
  fontSize:"16px"
};

const button = {
  padding:"14px 18px",
  borderRadius:"999px",
  border:"0",
  cursor:"pointer",
  fontSize:"16px"
};
