export default function ConciergeCard({title,description}){
  return (
    <section style={{
      background:"rgba(0,0,0,.65)",
      borderRadius:"24px",
      padding:"20px",
      border:"1px solid rgba(255,230,180,.35)"
    }}>
      <h2>{title}</h2>
      <p>{description}</p>
    </section>
  );
}
