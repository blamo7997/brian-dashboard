import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const OUT = path.resolve("./lumen-os/data/combined-recovery");

const PRESERVE_ALWAYS = [
  "./.env.local",
  "./lumen-os/data",
  "./lumen-os/data/vault",
  "./lumen-os/data/user-memory",
  "./lumen-os/data/knowledge-centric-vault"
];

const RESTORE_ALLOWED = ["lumen-os","pages","app","src","components","lib"];

function ensure(){ fs.mkdirSync(OUT,{recursive:true}); }
function exists(p){ return fs.existsSync(p); }

function walk(dir, results=[]){
  if(!exists(dir)) return results;
  for(const item of fs.readdirSync(dir)){
    const full = path.join(dir,item);
    if(/node_modules|\.git|\.next|dist|build/.test(full)) continue;
    const stat = fs.statSync(full);
    if(stat.isDirectory()) walk(full, results);
    else results.push(full);
  }
  return results;
}

function hash(file){
  try { return crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex"); }
  catch { return null; }
}

function latestBackup(){
  const root = "./backups";
  if(!exists(root)) return null;
  const dirs = fs.readdirSync(root)
    .map(name => path.join(root,name))
    .filter(p => fs.statSync(p).isDirectory())
    .sort((a,b)=>fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs);
  return dirs[0] || null;
}

export function combinedRecoveryStatus({ reason="manual" } = {}){
  ensure();

  const status = {
    generated:new Date().toISOString(),
    reason,
    latestBackup:latestBackup(),
    preserveAlways:PRESERVE_ALWAYS.map(p=>({ path:p, exists:exists(p) })),
    restoreAllowed:RESTORE_ALLOWED,
    recoveryActions:["snapshot","last-good-plan","baseline-report","soft-restart","conservative-restore"],
    skippedItemsAddedAsRecoveryPolicy:[
      "Prior code preserved by hash/index/snapshot/reference instead of repasting into every recovery block.",
      "Never-hang is enforced as detect/recover/retry/checkpoint/resume/preserve/explain/continue.",
      "OS/kernel overwrite is gated as future bootable-installer planning only, not workspace code."
    ],
    destructiveActions:false,
    windowsOverwrite:false,
    bootModification:false,
    vaultDeleteDefault:false,
    userMemoryDeleteDefault:false
  };

  fs.writeFileSync(path.join(OUT,"latest-combined-recovery-status.json"), JSON.stringify(status,null,2));
  return status;
}

export function createCombinedRecoverySnapshot({ reason="manual" } = {}){
  ensure();

  const roots = ["./lumen-os","./pages","./app","./src","./components","./lib"].filter(exists);
  const files = roots.flatMap(root => walk(root));

  const snapshot = {
    snapshotId:`combined_recovery_snapshot_${Date.now()}`,
    generated:new Date().toISOString(),
    reason,
    preserveAlways:PRESERVE_ALWAYS,
    roots,
    fileCount:files.length,
    hashes:files.map(file=>({ file, sha256:hash(file) })).filter(x=>x.sha256),
    note:"Recovery snapshot only. No deletion. No OS changes."
  };

  fs.writeFileSync(path.join(OUT,`${snapshot.snapshotId}.json`), JSON.stringify(snapshot,null,2));
  fs.writeFileSync(path.join(OUT,"latest-combined-recovery-snapshot.json"), JSON.stringify(snapshot,null,2));
  return snapshot;
}

export function lastGoodRecoveryPlan({ reason="manual" } = {}){
  ensure();

  const backup = latestBackup();

  const plan = {
    generated:new Date().toISOString(),
    reason,
    latestBackup:backup,
    canRestore:Boolean(backup),
    restoreScope:RESTORE_ALLOWED,
    preserveAlways:PRESERVE_ALWAYS,
    steps:[
      "Create fresh recovery snapshot.",
      "Create safety backup.",
      "Restore only allowed workspace folders from latest backup if present.",
      "Preserve Vault/data/user-memory/.env.local.",
      "Run build validation.",
      "Write recovery report."
    ],
    noOsOverwrite:true,
    noBootModification:true,
    note:"Use Restore-Lumen-Full-Merged-LastGood.ps1 for conservative execution."
  };

  fs.writeFileSync(path.join(OUT,"latest-last-good-recovery-plan.json"), JSON.stringify(plan,null,2));
  return plan;
}
