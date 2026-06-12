import fs from "node:fs";
import path from "node:path";

const OUT = path.resolve("./lumen-os/data/lumen-service-abstraction");

const SERVICES = [
  { service:"openai_chatgpt", display:"OpenAI / ChatGPT", nativeName:"Lumen Intelligence Bridge", secretEnv:["OPENAI_API_KEY"] },
  { service:"github", display:"GitHub", nativeName:"Lumen Source Bridge", secretEnv:["GITHUB_TOKEN"] },
  { service:"cloudflare", display:"Cloudflare", nativeName:"Lumen Edge Bridge", secretEnv:["CLOUDFLARE_API_TOKEN","CF_API_TOKEN"] },
  { service:"supabase", display:"Supabase", nativeName:"Lumen Data Bridge", secretEnv:["SUPABASE_URL","SUPABASE_SERVICE_ROLE_KEY","SUPABASE_ANON_KEY"] },
  { service:"playwright", display:"Playwright", nativeName:"Lumen Browser Test Bridge", secretEnv:[] },
  { service:"vault", display:"Vault", nativeName:"Lumen Protected Vault", secretEnv:[] }
];

function hasEnv(k){ return Boolean(process.env[k] && String(process.env[k]).trim()); }
function configured(service){
  if(service.service === "playwright") return fs.existsSync("node_modules/@playwright") || fs.existsSync("playwright.config.js") || fs.existsSync("playwright.config.ts");
  if(service.service === "vault") return fs.existsSync("./lumen-os/data/vault") || fs.existsSync("./lumen-os/data/knowledge-centric-vault");
  if(service.service === "supabase") return hasEnv("SUPABASE_URL") && (hasEnv("SUPABASE_SERVICE_ROLE_KEY") || hasEnv("SUPABASE_ANON_KEY"));
  return service.secretEnv.some(hasEnv);
}

export function serviceAbstractionStatus({ reason="manual" } = {}){
  fs.mkdirSync(OUT,{recursive:true});

  const services = SERVICES.map(s => ({
    service:s.service,
    display:s.display,
    nativeName:s.nativeName,
    configured:configured(s),
    secretsShown:false,
    rule:"External service remains external truthfully, wrapped behind Lumen Language and native abstraction."
  }));

  const report = {
    generated:new Date().toISOString(),
    reason,
    services,
    connectionRule:"Always check readiness for current and future services; never invent or expose credentials.",
    nativeRule:"Services are bridges until Lumen-native capability replaces them safely."
  };

  fs.writeFileSync(path.join(OUT,"latest-service-abstraction-status.json"),JSON.stringify(report,null,2));
  return report;
}
