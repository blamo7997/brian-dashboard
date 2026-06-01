import {useEffect,useState} from "react";
import {theme} from "../../lib/brianco-native/ui";

export default function OpportunityIntelligence(){

 const [data,setData] = useState(null);

 useEffect(()=>{
   fetch("/api/opportunity-intelligence/dashboard")
     .then(r=>r.json())
     .then(setData)
 },[]);

 return(
   <main style={theme.page}>
     <section style={theme.shell}>

       <h1 style={{
         fontSize:48,
         color:theme.gold
       }}>
         Brian & Co Opportunity Intelligence
       </h1>

       {data && (
         <>
           <section style={theme.card}>
             <h2 style={{color:theme.gold}}>
               Opportunity Sources
             </h2>

             {data.data.opportunities.map(item=>(
               <p key={item}>◆ {item}</p>
             ))}
           </section>

           <section style={{
             marginTop:24,
             ...theme.card
           }}>
             <h2 style={{color:theme.gold}}>
               Founder Approval
             </h2>

             <p>
               All opportunities remain founder-review
               and approval controlled.
             </p>
           </section>
         </>
       )}

     </section>
   </main>
 );
}
