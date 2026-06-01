import { useState } from "react";

export default function DigitalProductRequest() {
  const [form, setForm] = useState({
    name: "",
    offerType: "À la carte digital product",
    price: "",
    audienceRole: "customer",
    description: "",
    features: "",
    downloadableFiles: "Ask Brian by use case"
  });
  const [result, setResult] = useState(null);

  function update(k, v) { setForm({ ...form, [k]: v }); }

  async function submit(e) {
    e.preventDefault();
    const r = await fetch("/api/digital-product-drafts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    setResult(await r.json());
  }

  return (
    <main style={{minHeight:"100vh",padding:"42px",fontFamily:"Georgia,serif",background:"linear-gradient(135deg,#f7f1e8,#ffffff)",color:"#1f1a17"}}>
      <section style={{maxWidth:"860px",margin:"0 auto"}}>
        <p style={{letterSpacing:".18em",textTransform:"uppercase",fontSize:"12px"}}>Brian & Co Digital Products</p>
        <h1 style={{fontSize:"44px",lineHeight:"1.08"}}>Create a digital product draft</h1>
        <p style={{fontSize:"18px",lineHeight:"1.7"}}>
          Draft digital products for Brian's green-check approval. Drafts are not published live, do not alter existing products,
          and are automatically treated as no-inventory, no-shipping AI/software products.
        </p>

        <form onSubmit={submit} style={{marginTop:"28px",display:"grid",gap:"16px",padding:"26px",border:"1px solid rgba(31,26,23,.16)",borderRadius:"24px",background:"rgba(255,255,255,.76)"}}>
          <input required placeholder="Product name" value={form.name} onChange={e=>update("name",e.target.value)} style={field}/>
          <input placeholder="Offer type" value={form.offerType} onChange={e=>update("offerType",e.target.value)} style={field}/>
          <input placeholder="Price or pricing note" value={form.price} onChange={e=>update("price",e.target.value)} style={field}/>
          <input placeholder="Audience role" value={form.audienceRole} onChange={e=>update("audienceRole",e.target.value)} style={field}/>
          <textarea required placeholder="Description in Brian & Co tone" value={form.description} onChange={e=>update("description",e.target.value)} style={{...field,minHeight:"120px"}}/>
          <textarea placeholder="Features" value={form.features} onChange={e=>update("features",e.target.value)} style={{...field,minHeight:"120px"}}/>
          <input placeholder="Downloadable files? Use-case approval required" value={form.downloadableFiles} onChange={e=>update("downloadableFiles",e.target.value)} style={field}/>
          <button style={button}>Send digital product draft to Brian</button>
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
