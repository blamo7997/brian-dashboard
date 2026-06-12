import { useState } from "react";

export default function DigitalWorkspace() {
  const [form, setForm] = useState({
    email: "",
    productName: "",
    workSummary: "",
    saveData: ""
  });
  const [result, setResult] = useState(null);

  function update(k, v) { setForm({ ...form, [k]: v }); }

  async function save(e) {
    e.preventDefault();
    const r = await fetch("/api/digital-work", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    setResult(await r.json());
  }

  return (
    <main style={{minHeight:"100vh",padding:"42px",fontFamily:"Georgia,serif",background:"linear-gradient(135deg,#f7f1e8,#ffffff)",color:"#1f1a17"}}>
      <section style={{maxWidth:"860px",margin:"0 auto"}}>
        <p style={{letterSpacing:".18em",textTransform:"uppercase",fontSize:"12px"}}>Brian & Co Digital Workspace</p>
        <h1 style={{fontSize:"44px",lineHeight:"1.08"}}>Save digital product work</h1>
        <p style={{fontSize:"18px",lineHeight:"1.7"}}>
          Save customer digital-product progress to their Brian & Co account record where feasible.
          This is the native foundation for resumable Brian & Co digital products.
        </p>

        <form onSubmit={save} style={{marginTop:"28px",display:"grid",gap:"16px",padding:"26px",border:"1px solid rgba(31,26,23,.16)",borderRadius:"24px",background:"rgba(255,255,255,.76)"}}>
          <input required placeholder="Customer email" value={form.email} onChange={e=>update("email",e.target.value)} style={field}/>
          <input required placeholder="Digital product name" value={form.productName} onChange={e=>update("productName",e.target.value)} style={field}/>
          <textarea placeholder="Work summary" value={form.workSummary} onChange={e=>update("workSummary",e.target.value)} style={{...field,minHeight:"110px"}}/>
          <textarea placeholder="Saved work / draft / notes" value={form.saveData} onChange={e=>update("saveData",e.target.value)} style={{...field,minHeight:"160px"}}/>
          <button style={button}>Save work to account</button>
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
