import { useEffect, useState } from "react";

export default function FounderApprovals() {
  const [data, setData] = useState(null);

  async function load() {
    const r = await fetch("/api/approvals");
    setData(await r.json());
  }

  useEffect(() => { load(); }, []);

  return (
    <main style={{minHeight:"100vh",padding:"42px",fontFamily:"Georgia,serif",background:"linear-gradient(135deg,#f7f1e8,#ffffff)",color:"#1f1a17"}}>
      <section style={{maxWidth:"980px",margin:"0 auto"}}>
        <p style={{letterSpacing:".18em",textTransform:"uppercase",fontSize:"12px"}}>Brian & Co Founder Native</p>
        <h1 style={{fontSize:"42px",lineHeight:"1.08"}}>Green-check approval queue</h1>
        <p style={{fontSize:"18px",lineHeight:"1.7",maxWidth:"760px"}}>
          This native website surface collects family, girlfriend, customer, chatbot, product, service, and operational requests.
          Live changes and complimentary access remain inactive until Brian green-checks them.
        </p>

        <div style={{marginTop:"24px",padding:"20px",border:"1px solid rgba(31,26,23,.16)",borderRadius:"22px",background:"rgba(255,255,255,.76)"}}>
          <strong>Status:</strong> {data?.ok ? "Online" : "Loading"}<br/>
          <strong>Founder:</strong> support@briannco.com<br/>
          <strong>Protection:</strong> Existing products protected. No live changes without Brian.
        </div>

        <h2 style={{marginTop:"32px"}}>Pending requests</h2>

        {(data?.queue || []).length === 0 ? (
          <p>No pending requests yet.</p>
        ) : (
          data.queue.map(item => (
            <article key={item.id} style={{marginTop:"18px",padding:"22px",border:"1px solid rgba(31,26,23,.15)",borderRadius:"20px",background:"#fff"}}>
              <h3>{item.requesterName || item.title || "Approval request"}</h3>
              <p><strong>Email:</strong> {item.requesterEmail || "Not provided"}</p>
              <p><strong>Relationship:</strong> {item.relationship || "Not provided"}</p>
              <p><strong>Requested access:</strong> {item.requestedAccess}</p>
              <p><strong>Notes:</strong> {item.notes || "None"}</p>
              <p><strong>Status:</strong> {item.status}</p>
              <button style={approve}>✓ Green-check approve</button>
              <button style={deny}>Deny</button>
              <p style={{fontSize:"13px",opacity:.75,marginTop:"12px"}}>
                Button wiring preview only. Actual account entitlement update is the next protected backend layer.
              </p>
            </article>
          ))
        )}
      </section>
    </main>
  );
}

const approve = {padding:"12px 18px",borderRadius:"999px",border:"0",cursor:"pointer"};
const deny = {padding:"12px 18px",borderRadius:"999px",marginLeft:"10px",cursor:"pointer"};
