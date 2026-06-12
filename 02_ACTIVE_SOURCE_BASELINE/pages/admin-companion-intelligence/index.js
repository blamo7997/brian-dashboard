import {useEffect,useState} from "react";
import {theme} from "../../lib/brianco-native/ui";

export default function AdminCompanionIntelligence(){
 const [data,setData] = useState(null);
 useEffect(()=>{fetch("/api/admin-companion-intelligence/dashboard").then(r=>r.json()).then(setData)},[]);
 const seed = data?.data || {};
 return(
  <main style={theme.page}>
   <section style={theme.shell}>
    <h1 style={{fontSize:48,color:theme.gold}}>Brian & Co Admin Companion Intelligence</h1>
    {seed.adminCompanionAreas?.map(x=><p key={x}>◆ {x}</p>)}
   </section>
  </main>
 );
}
