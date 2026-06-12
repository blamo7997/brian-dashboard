export default function UploadReviewDashboard(){
  return (
    <main style={{
      minHeight:"100vh",
      background:"linear-gradient(135deg,#050505,#6E5A38,#FFF7E6)",
      color:"#fff",
      padding:"32px",
      fontFamily:"Arial"
    }}>
      <h1>Brian & Co Upload Review Queue</h1>
      <p>Review supplier, creator, influencer, artisan, and jewelry-maker uploads.</p>

      <section style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:"16px"}}>
        {["Pending Review","AI Reviewed","Needs More Info","Approved","Rejected","Held for Founder"].map(status=>(
          <article key={status} style={{
            background:"rgba(0,0,0,.68)",
            border:"1px solid rgba(255,230,180,.35)",
            borderRadius:"24px",
            padding:"20px"
          }}>
            <h2>{status}</h2>
            <p>Review submitted photos/videos, notes, fraud flags, and brand-fit scoring.</p>
            <button>Open Queue</button>
          </article>
        ))}
      </section>
    </main>
  );
}
