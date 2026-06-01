import {useEffect,useState} from "react";
import {theme} from "../../lib/brianco-native/ui";

export default function FounderStrategicCommandExpansion(){
 const [data,setData] = useState(null);
 useEffect(()=>{fetch("/api/founder-strategic-command-expansion/dashboard").then(r=>r.json()).then(setData)},[]);
 const seed = data?.data || {};
 return(
  <main style={theme.page}>
   <section style={theme.shell}>
    <h1 style={{fontSize:48,color:theme.gold}}>Brian & Co Founder Strategic Command Expansion</h1>
    {seed.areas?.map(x=><p key={x}>◆ {x}</p>)}
   </section>
  </main>
 );
}
