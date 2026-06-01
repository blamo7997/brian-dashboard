import { brianCoVisual, MiniGraph } from "../../lib/brianco-visual-system";
import { brianCoCollections } from "../../lib/brianco-catalog/collections";

export default function CollectionsHub() {
  return (
    <main style={brianCoVisual.page}>
      <section style={brianCoVisual.shell}>
        <h1 style={brianCoVisual.h1}>Brian & Co Collections</h1>
        <p style={{fontSize:17,lineHeight:1.7,maxWidth:980}}>
          Every offer is organized by access model: memberships, à la carte, bundles, concierge upgrades,
          digital products, physical products, role-specific offers, and founder/professional review pathways.
        </p>

        <section style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",
          gap:16,
          marginTop:24
        }}>
          {brianCoCollections.map((collection)=>(
            <article key={collection.id} style={brianCoVisual.card}>
              <div style={{fontSize:13,color:"#f7dc8a",letterSpacing:".12em",textTransform:"uppercase"}}>
                {collection.visual}
              </div>
              <h2 style={{color:"#f7dc8a",fontSize:24,margin:"8px 0"}}>{collection.title}</h2>
              <p style={{lineHeight:1.58,opacity:.94}}>{collection.description}</p>
              <MiniGraph />
              <a href={`/collections/${collection.id}`} style={{
                display:"inline-block",
                marginTop:16,
                color:"#050505",
                background:"linear-gradient(90deg,#f7dc8a,#b97919)",
                padding:"10px 14px",
                borderRadius:999,
                textDecoration:"none",
                fontWeight:700
              }}>
                View Collection
              </a>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}
