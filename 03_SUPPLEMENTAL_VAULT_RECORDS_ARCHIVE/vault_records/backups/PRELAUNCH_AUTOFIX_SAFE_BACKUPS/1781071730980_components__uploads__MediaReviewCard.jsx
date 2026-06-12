export function MediaReviewCard({item}){
  return (
    <article style={{
      background:"rgba(0,0,0,.7)",
      border:"1px solid rgba(255,230,180,.35)",
      borderRadius:"24px",
      padding:"18px"
    }}>
      <h3>{item?.role || "Applicant"}</h3>
      <p>{item?.status || "Pending review"}</p>
      <div>
        <button>Approve</button>
        <button>Request More Info</button>
        <button>Flag Risk</button>
        <button>Reject</button>
      </div>
    </article>
  );
}
