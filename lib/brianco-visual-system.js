export const brianCoVisual = {
  page: {
    minHeight: "100vh",
    background: "radial-gradient(circle at top left, rgba(247,220,138,.18), transparent 28%), linear-gradient(135deg,#050505,#12100b,#2d2212,#553d18)",
    color: "#f8edd7",
    fontFamily: "Georgia, serif",
    padding: "34px"
  },
  shell: {
    maxWidth: 1320,
    margin: "0 auto"
  },
  h1: {
    fontSize: 42,
    color: "#f7dc8a",
    letterSpacing: ".03em",
    marginBottom: 8
  },
  card: {
    background: "rgba(255,255,255,.065)",
    border: "1px solid rgba(242,201,92,.30)",
    borderRadius: 24,
    padding: 20,
    boxShadow: "0 18px 60px rgba(0,0,0,.32)"
  },
  goldPanel: {
    border: "1px solid rgba(242,201,92,.45)",
    borderRadius: 24,
    background: "linear-gradient(180deg,rgba(247,220,138,.13),rgba(0,0,0,.24))",
    padding: 20
  }
};

export function MiniGraph() {
  const bars = [35,52,41,66,58,77,63,86];
  return (
    <div style={{
      height: 86,
      marginTop: 16,
      borderRadius: 18,
      border: "1px solid rgba(242,201,92,.20)",
      background: "linear-gradient(180deg,rgba(247,220,138,.18),rgba(0,0,0,.15))",
      display: "flex",
      alignItems: "end",
      gap: 7,
      padding: 10
    }}>
      {bars.map((h,i)=>(
        <span key={i} style={{
          height: h + "%",
          width: "10%",
          borderRadius: 8,
          background: "rgba(247,220,138,.62)",
          boxShadow: "0 0 14px rgba(247,220,138,.25)"
        }} />
      ))}
    </div>
  );
}

export function BrianCoMetricCard({title, value, note}) {
  return (
    <article style={brianCoVisual.card}>
      <h2 style={{fontSize:18,color:"#f7dc8a",margin:"0 0 8px"}}>{title}</h2>
      <div style={{fontSize:30,color:"#fff",letterSpacing:".03em"}}>{value}</div>
      <p style={{lineHeight:1.55,opacity:.9}}>{note}</p>
      <MiniGraph />
    </article>
  );
}
