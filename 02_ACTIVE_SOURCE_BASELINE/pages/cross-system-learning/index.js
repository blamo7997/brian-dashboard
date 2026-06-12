import {useEffect,useState} from "react";
import {theme} from "../../lib/brianco-native/ui";

export default function CrossSystemLearning(){
  const [data,setData] = useState(null);

  useEffect(()=>{
    fetch("/api/cross-system-learning/dashboard")
      .then(r=>r.json())
      .then(setData)
      .catch(()=>setData(null));
  },[]);

  const seed = data?.data || {};
  const map = data?.learningMap || [];

  return(
    <main style={theme.page}>
      <section style={theme.shell}>
        <h1 style={{fontSize:48,color:theme.gold}}>
          Brian & Co Cross-System Learning Intelligence
        </h1>

        {data && (
          <>
            <section style={theme.card}>
              <h2 style={{color:theme.gold}}>Learning Status</h2>
              <p>{seed.status}</p>
              <p>{seed.protectedPhases}</p>
            </section>

            <section style={{marginTop:24,...theme.card}}>
              <h2 style={{color:theme.gold}}>Learning Areas</h2>
              {seed.learningAreas.map(item=><p key={item}>◆ {item}</p>)}
            </section>

            <section style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:16,marginTop:24}}>
              {map.map(item=>(
                <article key={item.area} style={theme.card}>
                  <h2 style={{color:theme.gold}}>{item.area}</h2>
                  <a href={item.route} style={{color:theme.gold}}>Open</a>
                </article>
              ))}
            </section>

            <section style={{marginTop:24,...theme.card}}>
              <h2 style={{color:theme.gold}}>Protected Learning Standard</h2>
              <p>
                This phase prepares cross-system learning only. It does not edit products,
                collections, OAuth, payments, secrets, pricing, public claims, purchases, or commitments.
              </p>
            </section>
          </>
        )}
      </section>
    </main>
  );
}
