export default async function handler(req,res){
  res.status(200).json({
    ok:true,
    route:"seo-status",
    title:"Brian & Co",
    structuredDataReady:true,
    sitemapReady:true,
    altTextRequired:true,
    status:"scaffolded"
  });
}
