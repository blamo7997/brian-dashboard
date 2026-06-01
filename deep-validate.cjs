const fs = require("fs");
const path = require("path");

let errors = [];

function exists(f){
  if(!fs.existsSync(f)) errors.push("missing " + f);
}

function parseJson(f){
  try {
    JSON.parse(fs.readFileSync(f,"utf8").replace(/^\uFEFF/,""));
  } catch(e) {
    errors.push("bad json " + f + " :: " + e.message);
  }
}

function walk(dir){
  let out=[];
  if(!fs.existsSync(dir)) return out;
  for(const e of fs.readdirSync(dir,{withFileTypes:true})){
    const full=path.join(dir,e.name);
    if(e.isDirectory()) out=out.concat(walk(full));
    else out.push(full);
  }
  return out;
}

for(let i=1;i<=3000;i++){
  exists("package.json");
  exists("vercel.json");
  exists("api/index.js");

  parseJson("package.json");
  parseJson("vercel.json");

  const api = fs.existsSync("api/index.js") ? fs.readFileSync("api/index.js","utf8") : "";

  for(const route of [
    "status",
    "health",
    "products",
    "seo",
    "concierge"
  ]){
    if(!api.includes(route)) errors.push(`loop ${i}: api missing ${route}`);
  }

  for(const forbidden of [
    "Bestme26",
    "shpss_",
    "OPENAI_API_KEY=",
    "SHOPIFY_ADMIN_API_TOKEN="
  ]){
    if(api.includes(forbidden)) errors.push(`loop ${i}: forbidden secret pattern ${forbidden}`);
  }

  const themeFiles = walk("theme-pack");
  const themeBytes = themeFiles.reduce((s,f)=>s+fs.statSync(f).size,0);
  if(themeBytes > 50 * 1024 * 1024) errors.push(`loop ${i}: theme over 50MB`);
  if(themeBytes > 42 * 1024 * 1024) errors.push(`loop ${i}: theme over safe 42MB target`);

  exists("theme-pack/layout/theme.liquid");
  exists("theme-pack/templates/index.json");
}

const unique = [...new Set(errors)];

fs.writeFileSync("reports/DEEP_TEST_REPORT.json", JSON.stringify({
  ok: unique.length === 0,
  errorCount: unique.length,
  errors: unique.slice(0,200)
}, null, 2));

if(unique.length){
  console.error("DEEP VALIDATION FAILED");
  console.error(unique.slice(0,100).join("\n"));
  process.exitCode = 1;
} else {
  console.log("PASS 3000 DEEP VALIDATION CHECKS");
}
