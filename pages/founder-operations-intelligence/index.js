import {useEffect,useState} from "react";
import {theme} from "../../lib/brianco-native/ui";

export default function FounderOperations(){

 const [data,setData] = useState(null);

 useEffect(()=>{
   fetch("/api/founder-operations-intelligence/dashboard")
   .then(r=>r.json())
   .then(setData)
   .catch(()=>setData(null));
 },[]);

 const systems = data?.executiveSystems || [];
 const metrics = data?.executiveMetrics || [];

 return(
  <main style={theme.page}>
   <section style={theme.shell}>

    <h1 style={{
      fontSize:48,
      color:theme.gold
    }}>
      Brian & Co Founder Operations Intelligence
    </h1>

    {data && (
      <>
       <section style={theme.card}>
        <h2 style={{color:theme.gold}}>
          Executive Systems
        </h2>

        {systems.map(item=>(
          <p key={item.name}>
            ◆ {item.name}
          </p>
        ))}
       </section>

       <section style={{
         marginTop:24,
         ...theme.card
       }}>
        <h2 style={{color:theme.gold}}>
          Executive Metrics
        </h2>

        {metrics.map(item=>(
          <p key={item}>✓ {item}</p>
        ))}
       </section>

       <section style={{
         marginTop:24,
         ...theme.card
       }}>
        <h2 style={{color:theme.gold}}>
          Founder Protection
        </h2>

        <p>
          Protected phases remain preserved.
          Founder approval remains required
          before protected changes.
        </p>
       </section>
      </>
    )}

   </section>
  </main>
 );
}
