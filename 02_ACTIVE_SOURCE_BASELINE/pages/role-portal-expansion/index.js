import fs from "fs";
import path from "path";

export async function getStaticProps() {
  const file = path.join(process.cwd(), "data", "role-portal-expansion.json");
  let data = {};
  try {
    data = JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (e) {
    data = { status: "missing", roles: [], shared_requirements: [] };
  }
  return { props: { data } };
}

export default function RolePortalExpansion({ data }) {
  const roles = data.roles || [];
  const requirements = data.shared_requirements || [];

  return (
    <main style={{
      minHeight:"100vh",
      padding:"48px",
      background:"linear-gradient(135deg,#050505,#141414,#2d230d)",
      color:"#f7e7b4",
      fontFamily:"Georgia, serif"
    }}>
      <section style={{
        maxWidth:1180,
        margin:"0 auto",
        border:"1px solid rgba(242,201,92,.35)",
        borderRadius:28,
        padding:32,
        background:"rgba(0,0,0,.42)",
        boxShadow:"0 30px 80px rgba(0,0,0,.45)"
      }}>
        <p style={{letterSpacing:3,textTransform:"uppercase",color:"#d7b75f"}}>
          Brian & Co Role Intelligence
        </p>

        <h1 style={{fontSize:46,lineHeight:1.05,margin:"12px 0"}}>
          Role Portal Expansion Framework
        </h1>

        <p style={{fontSize:18,color:"#f3dfaa",maxWidth:900}}>
          A protected role-aware portal framework for customers, family, suppliers,
          artisans, creators, influencers, investors, lawyers, accountants, bankers,
          students, veterans, professionals, civic users, and event/festival users.
        </p>

        <div style={{marginTop:24,padding:18,border:"1px solid rgba(242,201,92,.35)",borderRadius:18}}>
          <strong>Security note:</strong>
          <p style={{color:"#d9c891",lineHeight:1.55}}>
            This page is a protected implementation layer and preview framework. True role-only
            access requires authenticated server-side checks before anything private, legal,
            customer-specific, payment-related, or supplier-sensitive is exposed.
          </p>
        </div>

        <h2 style={{marginTop:34}}>Role Portals</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:14}}>
          {roles.map((role,i)=>(
            <div key={i} style={panelStyle}>
              <strong>{role}</strong>
              <p style={smallText}>Native-first Brian & Co experience. Founder controlled.</p>
            </div>
          ))}
        </div>

        <h2 style={{marginTop:34}}>Shared Requirements</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:14}}>
          {requirements.map((req,i)=>(
            <div key={i} style={ruleStyle}>✓ {req}</div>
          ))}
        </div>

        <div style={{marginTop:36,padding:22,border:"1px solid rgba(242,201,92,.35)",borderRadius:20}}>
          <h3 style={{marginTop:0}}>Next Build Layer</h3>
          <p style={smallText}>
            Connect each role card to protected dashboards, entitlement-aware digital products,
            membership visibility, accessibility controls, language preference, and approval-gated actions.
          </p>
        </div>
      </section>
    </main>
  );
}

const panelStyle = {
  border:"1px solid rgba(242,201,92,.25)",
  borderRadius:20,
  padding:18,
  background:"rgba(255,255,255,.045)"
};

const ruleStyle = {
  border:"1px solid rgba(242,201,92,.22)",
  borderRadius:16,
  padding:14,
  background:"rgba(255,255,255,.035)",
  color:"#f4e3ad"
};

const smallText = {color:"#d9c891",lineHeight:1.55};
