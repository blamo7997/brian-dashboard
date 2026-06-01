export const theme = {
  page: {
    minHeight: "100vh",
    background: "radial-gradient(circle at top left, rgba(247,220,138,.20), transparent 26%), linear-gradient(135deg,#050505,#12100b,#2d2212,#553d18)",
    color: "#f8edd7",
    fontFamily: "Georgia, serif",
    padding: "34px"
  },
  shell: { maxWidth: 1380, margin: "0 auto" },
  gold: "#f7dc8a",
  card: {
    background: "rgba(255,255,255,.065)",
    border: "1px solid rgba(242,201,92,.30)",
    borderRadius: 24,
    padding: 20,
    boxShadow: "0 20px 70px rgba(0,0,0,.34)"
  }
};

export function Bars({data=[22,38,44,57,61,74,82]}) {
  return (
    <div style={{
      height: 92, display: "flex", alignItems: "end", gap: 8, padding: 10,
      borderRadius: 18, border: "1px solid rgba(242,201,92,.20)",
      background: "linear-gradient(180deg,rgba(247,220,138,.18),rgba(0,0,0,.18))"
    }}>
      {data.map((h,i)=>(
        <span key={i} style={{
          height: h + "%", width: "11%", borderRadius: 999,
          background: "linear-gradient(180deg,#f7dc8a,#9c6a18)",
          boxShadow: "0 0 16px rgba(247,220,138,.25)"
        }} />
      ))}
    </div>
  );
}

export function NativeCard({title,value,note,trend}) {
  return (
    <article style={theme.card}>
      <div style={{fontSize:12,letterSpacing:".14em",textTransform:"uppercase",color:theme.gold}}>
        Brian & Co Intelligence
      </div>
      <h2 style={{margin:"8px 0",fontSize:21,color:theme.gold}}>{title}</h2>
      <div style={{fontSize:31,color:"#fff",marginBottom:8}}>{value}</div>
      <p style={{lineHeight:1.55,opacity:.92}}>{note}</p>
      <Bars data={trend} />
    </article>
  );
}

export function NativeAccessNotice() {
  return (
    <div style={{
      marginTop: 20, padding: 18, borderRadius: 22,
      border: "1px solid rgba(242,201,92,.45)",
      background: "rgba(0,0,0,.26)",
      lineHeight: 1.65
    }}>
      Brian & Co account access is designed to feel native to the Brian & Co website.
      Email, Google, Apple, QR, passkeys, and device unlock are prepared as branded access paths.
      Provider credentials and biometric/passkey production activation require founder approval and legal/security review.
    </div>
  );
}
