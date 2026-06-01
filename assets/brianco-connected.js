(function(){
  function getConfig(){
    try{
      const raw=document.getElementById("brianco-backend-config")?.textContent || "{}";
      return JSON.parse(raw);
    }catch(e){
      return {backend:"https://brianco-backend-clean.vercel.app/api/index",routes:{}};
    }
  }

  const cfg=getConfig();
  const backend=cfg.backend;

  async function api(route, params={}){
    const q=new URLSearchParams({route,...params});
    const res=await fetch(backend+"?"+q.toString());
    return await res.json();
  }

  async function personalize(){
    try{
      const role=localStorage.getItem("brianco_role") || "customer";
      const tier=localStorage.getItem("brianco_tier") || "standard";
      const language=document.documentElement.lang || navigator.language || "en";
      const region=localStorage.getItem("brianco_region") || "US";

      const data=await api("adaptive-live-personalization",{role,tier,language,region});

      if(data?.theme?.gradient){
        document.body.setAttribute("data-brianco-gradient",data.theme.gradient);
      }

      const footer=document.querySelector(".brianco-footer-links");
      if(footer && data?.recommendations?.footerLinks){
        footer.innerHTML=data.recommendations.footerLinks.map(x=>`<a href="/pages/${String(x).toLowerCase().replaceAll(" ","-")}">${x}</a>`).join("");
      }
    }catch(e){}
  }

  async function loadProducts(){
    const box=document.getElementById("brianco-live-products");
    if(!box) return;

    try{
      const data=await api("concierge");
      const cards=(data.productCards||data.products||[]).slice(0,8);

      box.innerHTML=cards.length
        ? cards.map(p=>`
          <article>
            <h3>${p.title || "Brian & Co Product"}</h3>
            <p>${p.price ? "From "+p.price : "Price available in store"}</p>
            <p>${p.imagesMissing ? "Image review needed." : "Image ready."}</p>
            <a href="${p.url || "/collections/all"}">View</a>
          </article>
        `).join("")
        : "<article><h3>Digital products and recommendations are being prepared.</h3><p>Check Shopify products, backend env, and concierge route.</p></article>";
    }catch(e){
      box.innerHTML="<article><h3>Connection Notice</h3><p>Brian & Co product intelligence could not load yet.</p></article>";
    }
  }

  function setupConcierge(){
    const panel=document.querySelector(".brianco-panel");
    document.querySelectorAll("[data-brianco-open]").forEach(btn=>{
      btn.addEventListener("click",()=>{ if(panel) panel.hidden=!panel.hidden; });
    });

    const send=document.getElementById("brianco-send");
    const input=document.getElementById("brianco-message");
    const out=document.getElementById("brianco-response");

    if(send && input && out){
      send.addEventListener("click",async()=>{
        out.textContent="Thinking...";
        try{
          const d=await api("live-concierge",{message:input.value||"Recommend something"});
          out.textContent=d.response || "Brian & Co Concierge is ready.";
        }catch(e){
          out.textContent="Brian & Co Concierge could not connect yet.";
        }
      });
    }
  }

  document.addEventListener("DOMContentLoaded",()=>{
    personalize();
    loadProducts();
    setupConcierge();
  });
})();
