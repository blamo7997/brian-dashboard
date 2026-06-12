import { useState } from "react";

export default function BrianCoTextConcierge() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState(null);

  async function sendMessage() {
    const res = await fetch("/api/text/route", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await res.json();
    setReply(data);
  }

  return (
    <section style={{
      marginTop:24,
      padding:22,
      borderRadius:24,
      border:"1px solid rgba(242,201,92,.42)",
      background:"rgba(0,0,0,.25)",
      boxShadow:"0 18px 60px rgba(0,0,0,.28)"
    }}>
      <h2 style={{color:"#f7dc8a",marginTop:0}}>Brian & Co Text Concierge</h2>
      <p style={{lineHeight:1.6}}>
        Type naturally. Misspellings, shorthand, role requests, product questions, accessibility needs,
        language preferences, and support requests are routed into the Brian & Co website experience.
      </p>

      <textarea
        value={message}
        onChange={(e)=>setMessage(e.target.value)}
        placeholder="Tell Brian & Co what you need — orders, membership, accessibility, language, artisan support, investor access, legal review, products, bundles, or anything else."
        style={{
          width:"100%",
          minHeight:120,
          borderRadius:18,
          border:"1px solid rgba(242,201,92,.35)",
          background:"rgba(255,255,255,.07)",
          color:"#f8edd7",
          padding:16,
          fontFamily:"Georgia,serif",
          fontSize:16
        }}
      />

      <button
        onClick={sendMessage}
        style={{
          marginTop:14,
          border:"1px solid rgba(242,201,92,.45)",
          borderRadius:999,
          padding:"12px 18px",
          background:"linear-gradient(90deg,#f7dc8a,#b97919)",
          color:"#050505",
          fontWeight:700,
          cursor:"pointer"
        }}
      >
        Continue through Brian & Co
      </button>

      {reply && (
        <div style={{
          marginTop:18,
          padding:18,
          borderRadius:18,
          background:"rgba(255,255,255,.06)",
          border:"1px solid rgba(242,201,92,.24)"
        }}>
          <div style={{color:"#f7dc8a",fontWeight:700}}>Recommended Role: {reply.detectedRole}</div>
          <div>Category: {reply.detectedCategory}</div>
          <div>Route: <a href={reply.recommendedRoute} style={{color:"#f7dc8a"}}>{reply.recommendedRoute}</a></div>
          <p style={{lineHeight:1.55}}>{reply.response}</p>
        </div>
      )}
    </section>
  );
}
