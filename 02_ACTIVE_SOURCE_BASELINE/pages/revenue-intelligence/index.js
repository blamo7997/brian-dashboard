import {useEffect,useState} from "react";
import {theme} from "../../lib/brianco-native/ui";

export default function RevenueIntelligence(){

 const [data,setData] = useState(null);

 useEffect(()=>{
  fetch("/api/revenue-intelligence/dashboard")
   .then(r=>r.json())
   .then(setData);
 },[]);

 const seed = data?.data || {};

 return(
  <main style={theme.page}>
   <section style={theme.shell}>
    <h1 style={{fontSize:48,color:theme.gold}}>
      Brian & Co Revenue Intelligence
    </h1>

    {seed.revenueAreas?.map(x=>
      <p key={x}>◆ {x}</p>
    )}
   </section>
  </main>
 );
}
