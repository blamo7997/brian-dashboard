import { brianCoAuthProviders, BrianCoAuthNotice } from "../../lib/brianco-auth/authConfig";

export default function SignInHub() {
  return (
    <main style={{
      minHeight:"100vh",
      background:"linear-gradient(135deg,#050505,#15100a,#302313,#573f1b)",
      color:"#f8edd7",
      fontFamily:"Georgia,serif",
      padding:"34px"
    }}>
      <section style={{maxWidth:980,margin:"0 auto"}}>
        <h1 style={{fontSize:42,color:"#f7dc8a",marginBottom:10}}>
          Brian & Co Account Access
        </h1>

        <p style={{fontSize:17,lineHeight:1.7}}>
          Sign in through the Brian & Co website experience. Your access is prepared to guide you into the correct role space:
          customer, founder/admin, supplier, artisan, creator, influencer, lawyer, investor, banker, or accountant.
        </p>

        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fit,minmax(230px,1fr))",
          gap:14,
          marginTop:24
        }}>
          {brianCoAuthProviders.map((provider)=>(
            <button key={provider.id} style={{
              cursor:"pointer",
              border:"1px solid rgba(242,201,92,.42)",
              borderRadius:18,
              padding:"18px 16px",
              background:"rgba(255,255,255,.07)",
              color:"#f8edd7",
              fontFamily:"Georgia,serif",
              fontSize:16,
              textAlign:"left"
            }}>
              <strong style={{color:"#f7dc8a"}}>{provider.label}</strong>
              <br />
              <span style={{opacity:.82,fontSize:13}}>{provider.status}</span>
            </button>
          ))}
        </div>

        <BrianCoAuthNotice />

        <div style={{
          marginTop:22,
          padding:16,
          border:"1px solid rgba(242,201,92,.28)",
          borderRadius:18,
          background:"rgba(255,255,255,.055)"
        }}>
          This page is a protected foundation. Live provider connection requires approved credentials, legal/privacy review where needed,
          and founder approval before public reliance.
        </div>
      </section>
    </main>
  );
}
