import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import child_process from "node:child_process";

const OUT = path.resolve("./lumen-os/data/prelaunch-autofix");
const BACKUP = path.resolve("./backups/PRELAUNCH_AUTOFIX_SAFE_BACKUPS");
const SKIP = /node_modules|\.git|\.next|dist|build|reports|backups/i;
const TEXT = /\.(js|jsx|ts|tsx|mjs|cjs|json|md|txt|html|css|scss|yml|yaml|ps1|cmd|cs|env|example)$/i;

function ensure(){
  fs.mkdirSync(OUT,{recursive:true});
  fs.mkdirSync(BACKUP,{recursive:true});
}

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

function read(file){
  try { return fs.readFileSync(file,"utf8"); }
  catch { return ""; }
}

function write(file, text){
  fs.writeFileSync(file,text,"utf8");
}

function sha(text=""){
  return crypto.createHash("sha256").update(String(text)).digest("hex");
}

function backupFile(file){
  if(!exists(file)) return null;
  const safe = file.replace(/^[.][\\/]/,"").replace(/[:\\/]/g,"__");
  const dest = path.join(BACKUP, `${Date.now()}_${safe}`);
  fs.mkdirSync(path.dirname(dest),{recursive:true});
  fs.copyFileSync(file,dest);
  return dest;
}

function run(cmd){
  try {
    return {
      ok:true,
      output:child_process.execSync(cmd,{encoding:"utf8",stdio:["ignore","pipe","pipe"]})
    };
  } catch(error){
    return {
      ok:false,
      output:String(error?.stdout || error?.stderr || error?.message || error)
    };
  }
}

function safeNormalizeText(file){
  const before = read(file);
  let after = before;

  after = after.replace(/\r\n/g,"\n").replace(/\r/g,"\n");
  after = after.replace(/[ \t]+$/gm,"");
  if(after.length && !after.endsWith("\n")) after += "\n";

  if(after !== before){
    const backup = backupFile(file);
    write(file,after);
    return { changed:true, file, backup, fix:"normalized-line-endings-trailing-spaces-final-newline" };
  }

  return { changed:false, file };
}

function safeJsonFormat(file){
  if(!file.endsWith(".json")) return { changed:false, file };
  const before = read(file);
  try {
    const parsed = JSON.parse(before);
    const after = JSON.stringify(parsed,null,2) + "\n";
    if(after !== before){
      const backup = backupFile(file);
      write(file,after);
      return { changed:true, file, backup, fix:"formatted-json" };
    }
  } catch(error){
    return { changed:false, file, reviewNeeded:true, issue:"json-parse-error", error:String(error.message || error) };
  }
  return { changed:false, file };
}

function detectTodoPlaceholders(file){
  const body = read(file);
  const lines = body.split("\n");
  const findings = [];
  lines.forEach((line,index)=>{
    if(/\b(TODO|FIXME|PLACEHOLDER|STUB|MOCK|TEMPORARY|HACK)\b/i.test(line)){
      findings.push({ file, line:index+1, text:line.slice(0,220), severity:"review-needed" });
    }
  });
  return findings;
}

function detectSuspiciousSecrets(file){
  const body = read(file);
  const rules = [
    { name:"OpenAI-style key", pattern:/sk-[A-Za-z0-9_\-]{20,}/g },
    { name:"GitHub token", pattern:/gh[pousr]_[A-Za-z0-9_]{20,}/g },
    { name:"Private key block", pattern:/-----BEGIN (RSA |EC |OPENSSH |)PRIVATE KEY-----/g },
    { name:"Credential assignment", pattern:/(password|passwd|pwd|secret|token|api_key|apikey)\s*[:=]\s*["'][^"']{8,}["']/gi }
  ];
  const findings = [];
  for(const rule of rules){
    const matches = [...body.matchAll(rule.pattern)];
    if(matches.length){
      findings.push({
        file,
        rule:rule.name,
        count:matches.length,
        severity:"review-needed",
        note:"Secret-like value detected. Value is not printed. Inspect locally."
      });
    }
  }
  return findings;
}

export async function runPrelaunchAutofixLoop({
  reason="manual",
  maxPasses=5
} = {}){
  ensure();

  const roots = ["./lumen-os","./pages","./app","./src","./components","./lib"].filter(exists);
  const passes = [];
  let finalStatus = "Review Needed";

  for(let pass=1; pass<=maxPasses; pass++){
    const files = roots.flatMap(r=>walk(r));
    const textFiles = files.filter(f=>TEXT.test(f));

    const changes = [];
    const reviewFindings = [];
    const hashesBefore = textFiles.map(file=>({ file, sha256:sha(read(file)) }));

    for(const file of textFiles){
      const norm = safeNormalizeText(file);
      if(norm.changed) changes.push(norm);

      const json = safeJsonFormat(file);
      if(json.changed) changes.push(json);
      if(json.reviewNeeded) reviewFindings.push(json);

      reviewFindings.push(...detectTodoPlaceholders(file));
      reviewFindings.push(...detectSuspiciousSecrets(file));
    }

    const npmAudit = run("npm audit --audit-level=moderate");
    const npmOutdated = run("npm outdated");
    const build = run("npm run build");

    let ciaScan = null;
    if(exists("./lumen-os/packages/cia-prelaunch-scan/cia-prelaunch-scan-engine.mjs")){
      const cia = run("node -e \"import('./lumen-os/packages/cia-prelaunch-scan/cia-prelaunch-scan-engine.mjs').then(m=>console.log(JSON.stringify(m.runCiaPrelaunchScan({reason:'autofix-loop'}),null,2))).catch(e=>{console.error(e);process.exit(1)})\"");
      ciaScan = { ok:cia.ok, output:cia.output.slice(0,200000) };
    }

    const hashesAfter = textFiles.map(file=>({ file, sha256:sha(read(file)) }));

    const passReport = {
      pass,
      generated:new Date().toISOString(),
      roots,
      fileCount:files.length,
      textFileCount:textFiles.length,
      changes,
      changeCount:changes.length,
      reviewFindingCount:reviewFindings.length,
      reviewFindings,
      npmAudit:{
        ok:npmAudit.ok,
        output:npmAudit.output.slice(0,200000)
      },
      npmOutdated:{
        ok:npmOutdated.ok,
        output:npmOutdated.output.slice(0,100000)
      },
      build:{
        ok:build.ok,
        output:build.output.slice(0,200000)
      },
      ciaScan,
      hashesBefore,
      hashesAfter
    };

    passes.push(passReport);
    fs.writeFileSync(path.join(OUT,`prelaunch-autofix-pass-${pass}.json`),JSON.stringify(passReport,null,2));

    const buildClean = build.ok && /Compiled successfully|Route \(pages\)|Route \(app\)|Generating static pages/i.test(build.output);
    const noSafeChangesLeft = changes.length === 0;
    const noReviewFindings = reviewFindings.length === 0;

    if(buildClean && noSafeChangesLeft && noReviewFindings){
      finalStatus = "Protected";
      break;
    }

    if(noSafeChangesLeft && pass > 1){
      finalStatus = buildClean ? "Review Needed" : "Action Available";
      break;
    }
  }

  const finalReport = {
    generated:new Date().toISOString(),
    reason,
    finalStatus,
    maxPasses,
    passCount:passes.length,
    rule:"Safe autofix only. Human review remains required for secrets, placeholders, dependency advisories, business logic, and unsafe changes.",
    passes
  };

  fs.writeFileSync(path.join(OUT,"latest-prelaunch-autofix-loop.json"),JSON.stringify(finalReport,null,2));
  return finalReport;
}
