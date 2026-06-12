import fs from "node:fs";
import path from "node:path";

const OUT = path.resolve("./lumen-os/data/retired-platform-cleaner");
const RETIRED = [/retired-commerce-platform/gi, /myretired-commerce-platform/gi, /retired-commerce-platform\.com/gi];
const TEXT_EXT = /\.(js|jsx|ts|tsx|mjs|cjs|json|md|txt|html|css|scss|yml|yaml|env|example|ps1|cmd|cs)$/i;

function walk(dir, results=[]){
  if(!fs.existsSync(dir)) return results;
  for(const item of fs.readdirSync(dir)){
    const full = path.join(dir,item);
    if(/node_modules|\.git|\.next/.test(full)) continue;
    const stat = fs.statSync(full);
    if(stat.isDirectory()) walk(full,results);
    else results.push(full);
  }
  return results;
}

function containsRetired(text=""){
  return RETIRED.some(r => r.test(text));
}

function replaceRetired(text=""){
  let out = String(text || "");
  for(const r of RETIRED) out = out.replace(r,"retired-commerce-platform");
  return out;
}

export function cleanRetiredPlatformReferences({
  roots=["./lumen-os","./pages","./app","./src","./lib","./components","./reports","./backups"],
  reason="manual",
  modify=true
} = {}) {
  fs.mkdirSync(OUT,{recursive:true});
  const files = roots.filter(fs.existsSync).flatMap(r => walk(r));
  const findings = [];
  const changed = [];

  for(const file of files){
    if(!TEXT_EXT.test(file)) continue;
    let text = "";
    try { text = fs.readFileSync(file,"utf8"); } catch { continue; }
    if(containsRetired(text)){
      findings.push({ file, action: modify ? "redacted" : "reported" });
      if(modify){
        fs.writeFileSync(file, replaceRetired(text), "utf8");
        changed.push(file);
      }
    }
  }

  const report = {
    generated: new Date().toISOString(),
    reason,
    modify,
    scannedFiles: files.length,
    retiredReferenceCount: findings.length,
    findings,
    changed,
    status: findings.length ? "retired-references-handled-or-reported" : "clear"
  };

  fs.writeFileSync(path.join(OUT,"latest-retired-platform-cleaner.json"), JSON.stringify(report,null,2));
  return report;
}
