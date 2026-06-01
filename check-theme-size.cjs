const fs = require("fs");
const path = require("path");

const root = "theme-pack";
const maxBytes = 50 * 1024 * 1024;
const safeBytes = 42 * 1024 * 1024;

function walk(dir){
  let files = [];
  for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
    const full = path.join(dir, entry.name);
    if(entry.isDirectory()) files = files.concat(walk(full));
    else files.push(full);
  }
  return files;
}

const files = fs.existsSync(root) ? walk(root) : [];
const total = files.reduce((sum,f)=>sum + fs.statSync(f).size,0);

const report = {
  ok: total < maxBytes,
  safe: total < safeBytes,
  bytes: total,
  mb: +(total / 1024 / 1024).toFixed(3),
  maxMB: 50,
  safeTargetMB: 42,
  fileCount: files.length,
  largestFiles: files
    .map(f=>({file:f,size:fs.statSync(f).size,mb:+(fs.statSync(f).size/1024/1024).toFixed(3)}))
    .sort((a,b)=>b.size-a.size)
    .slice(0,20)
};

fs.writeFileSync("reports/THEME_SIZE_REPORT.json", JSON.stringify(report,null,2));

if(!report.ok){
  console.error("THEME TOO LARGE");
  console.error(JSON.stringify(report,null,2));
  process.exit(1);
}

console.log("THEME SIZE OK");
console.log(JSON.stringify(report,null,2));
