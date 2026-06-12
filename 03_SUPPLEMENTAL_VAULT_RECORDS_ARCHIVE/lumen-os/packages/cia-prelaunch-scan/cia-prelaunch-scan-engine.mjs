import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import child_process from "node:child_process";

const OUT = path.resolve("./lumen-os/data/cia-prelaunch-scan");
const SKIP = /node_modules|\.git|\.next|dist|build|reports|backups/i;
const TEXT = /\.(js|jsx|ts|tsx|mjs|cjs|json|md|txt|html|css|scss|yml|yaml|ps1|cmd|cs|env|example)$/i;

const SECRET_PATTERNS = [
  { name:"OpenAI-style key pattern", pattern:/sk-[A-Za-z0-9_\-]{20,}/g },
  { name:"GitHub token pattern", pattern:/gh[pousr]_[A-Za-z0-9_]{20,}/g },
  { name:"Private key block", pattern:/-----BEGIN (RSA |EC |OPENSSH |)PRIVATE KEY-----/g },
  { name:"Credential assignment pattern", pattern:/(password|passwd|pwd|secret|token|api_key|apikey)\s*[:=]\s*["'][^"']{8,}["']/gi }
];

function ensure(){ fs.mkdirSync(OUT,{recursive:true}); }

function exists(p){ return fs.existsSync(p); }

function walk(dir, results=[]){
  if(!exists(dir)) return results;
  for(const item of fs.readdirSync(dir)){
    const full = path.join(dir,item);
    if(SKIP.test(full)) continue;
    const stat = fs.statSync(full);
    if(stat.isDirectory()) walk(full,results);
    else results.push(full);
  }
  return results;
}

function hash(file){
  try { return crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex"); }
  catch { return null; }
}

function read(file){
  try { return fs.readFileSync(file,"utf8"); }
  catch { return ""; }
}

function run(cmd){
  try { return child_process.execSync(cmd,{encoding:"utf8",stdio:["ignore","pipe","pipe"]}); }
  catch(e){ return String(e?.stdout || e?.stderr || e?.message || e); }
}

function hasEnv(name){
  return Boolean(process.env[name] && String(process.env[name]).trim());
}

export function runCiaPrelaunchScan({ reason="manual" } = {}){
  ensure();

  const roots = ["./lumen-os","./pages","./app","./src","./components","./lib"].filter(exists);
  const files = roots.flatMap(r => walk(r));
  const textFiles = files.filter(f => TEXT.test(f));

  const secretFindings = [];
  for(const file of textFiles){
    const body = read(file);
    for(const rule of SECRET_PATTERNS){
      const matches = [...body.matchAll(rule.pattern)];
      if(matches.length){
        secretFindings.push({
          file,
          rule:rule.name,
          count:matches.length,
          severity:"review-needed",
          note:"Potential secret-like pattern found. Inspect locally. Secret values are not printed."
        });
      }
    }
  }

  const serviceReadiness = {
    openai:{
      label:"OpenAI / ChatGPT",
      status:hasEnv("OPENAI_API_KEY") ? "Ready" : "Not Yet Configured",
      action:hasEnv("OPENAI_API_KEY") ? "Protected readiness detected." : "Add OPENAI_API_KEY locally only if enabling OpenAI API."
    },
    github:{
      label:"GitHub",
      status:hasEnv("GITHUB_TOKEN") || exists(".git") ? "Ready" : "Not Yet Configured",
      action:hasEnv("GITHUB_TOKEN") || exists(".git") ? "Repository readiness detected." : "Add GitHub token locally only if enabling repo automation."
    },
    cloudflare:{
      label:"Cloudflare",
      status:hasEnv("CLOUDFLARE_API_TOKEN") || hasEnv("CF_API_TOKEN") ? "Ready" : "Not Yet Configured",
      action:hasEnv("CLOUDFLARE_API_TOKEN") || hasEnv("CF_API_TOKEN") ? "Edge readiness detected." : "Add token locally only if enabling DNS/deploy automation."
    },
    supabase:{
      label:"Supabase",
      status:hasEnv("SUPABASE_URL") && (hasEnv("SUPABASE_ANON_KEY") || hasEnv("SUPABASE_SERVICE_ROLE_KEY")) ? "Ready" : "Not Yet Configured",
      action:hasEnv("SUPABASE_URL") ? "Supabase readiness partially or fully detected." : "Add Supabase project values locally only if enabled."
    },
    playwright:{
      label:"Playwright",
      status:exists("node_modules/@playwright") || exists("playwright.config.js") || exists("playwright.config.ts") ? "Ready" : "Not Yet Configured",
      action:"Install Playwright when browser QA is enabled."
    },
    vault:{
      label:"Vault",
      status:exists("./lumen-os/data/vault") || exists("./lumen-os/data/knowledge-centric-vault") ? "Protected" : "Review Needed",
      action:"Vault should be initialized before public launch."
    }
  };

  const duplicateNames = {};
  for(const file of files){
    const name = path.basename(file).toLowerCase();
    duplicateNames[name] ||= [];
    duplicateNames[name].push(file);
  }

  const duplicates = Object.entries(duplicateNames)
    .filter(([,items]) => items.length > 1)
    .map(([name,items]) => ({ name, count:items.length, items }));

  const report = {
    generated:new Date().toISOString(),
    reason,
    status:secretFindings.length ? "Review Needed" : "Protected",
    ciaPlus:{
      confidentiality:secretFindings.length ? "Review Needed" : "Protected",
      integrity:duplicates.length ? "Review Needed" : "Protected",
      availability:"Review Needed",
      identity:"Review Needed",
      authorization:"Review Needed",
      auditability:"Protected",
      provenance:"Protected",
      recovery:exists("./backups") ? "Protected" : "Review Needed",
      continuity:exists("./lumen-os/baseline/LUMEN_MASTER_BASELINE.json") ? "Protected" : "Review Needed"
    },
    serviceReadiness,
    counts:{
      scannedFiles:files.length,
      scannedTextFiles:textFiles.length,
      secretFindings:secretFindings.length,
      duplicateNameGroups:duplicates.length
    },
    secretFindings,
    duplicates,
    dependencyReview:{
      node:run("node --version"),
      npm:run("npm --version"),
      npmAudit:run("npm audit --audit-level=moderate"),
      npmOutdated:run("npm outdated")
    },
    hashes:files.map(file=>({ file, sha256:hash(file) })).filter(x=>x.sha256),
    languageRule:"Use Ready, Protected, Not Yet Configured, Review Needed, and Action Available."
  };

  fs.writeFileSync(path.join(OUT,"latest-cia-prelaunch-scan.json"),JSON.stringify(report,null,2));
  return report;
}
