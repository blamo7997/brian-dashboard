const fs = require("fs");
const path = require("path");

const root = "BRIANCO_CONNECTED_THEME";
const required = [
  "layout/theme.liquid",
  "templates/index.json",
  "sections/brianco-hero.liquid",
  "sections/brianco-live-products.liquid",
  "sections/brianco-product.liquid",
  "snippets/brianco-concierge.liquid",
  "assets/brianco-connected.css",
  "assets/brianco-connected.js",
  "config/settings_schema.json"
];

let errors = [];

function walk(dir){
  let out=[];
  for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
    const full=path.join(dir,entry.name);
    if(entry.isDirectory()) out=out.concat(walk(full));
    else out.push(full);
  }
  return out;
}

for(let i=1;i<=3000;i++){
  for(const f of required){
    if(!fs.existsSync(path.join(root,f))) errors.push(`loop ${i}: missing ${f}`);
  }

  const layout = fs.readFileSync(path.join(root,"layout/theme.liquid"),"utf8");
  if(!layout.includes("{{ content_for_header }}")) errors.push(`loop ${i}: layout missing content_for_header`);
  if(!layout.includes("{{ content_for_layout }}")) errors.push(`loop ${i}: layout missing content_for_layout`);

  JSON.parse(fs.readFileSync(path.join(root,"templates/index.json"),"utf8"));
  JSON.parse(fs.readFileSync(path.join(root,"templates/product.json"),"utf8"));
  JSON.parse(fs.readFileSync(path.join(root,"config/settings_schema.json"),"utf8"));

  const js = fs.readFileSync(path.join(root,"assets/brianco-connected.js"),"utf8");
  if(!js.includes("live-concierge")) errors.push(`loop ${i}: JS missing live concierge route`);
  if(!js.includes("route=concierge")) errors.push(`loop ${i}: JS missing concierge product route`);

  const all = walk(root);
  const bytes = all.reduce((sum,file)=>sum+fs.statSync(file).size,0);
  if(bytes > 50 * 1024 * 1024) errors.push(`loop ${i}: theme exceeds 50MB`);
  if(bytes > 42 * 1024 * 1024) errors.push(`loop ${i}: theme exceeds safe 42MB target`);
}

const unique = [...new Set(errors)];

const files = walk(root);
const bytes = files.reduce((sum,file)=>sum+fs.statSync(file).size,0);

fs.writeFileSync("reports/CONNECTED_THEME_VALIDATION.json", JSON.stringify({
  ok: unique.length === 0,
  errors: unique.slice(0,200),
  fileCount: files.length,
  bytes,
  mb: +(bytes/1024/1024).toFixed(3),
  under50MB: bytes < 50 * 1024 * 1024,
  safeUnder42MB: bytes < 42 * 1024 * 1024
}, null, 2));

if(unique.length){
  console.error("CONNECTED THEME VALIDATION FAILED");
  console.error(unique.slice(0,100).join("\n"));
  process.exit(1);
}

console.log("PASS 3000 CONNECTED THEME CHECKS");
