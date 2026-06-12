import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const OUT = path.resolve("./lumen-os/data/skipped-item-guardian");

function ensure(){ fs.mkdirSync(OUT,{recursive:true}); }
function sha(text=""){ return crypto.createHash("sha256").update(String(text)).digest("hex"); }

export function recordSkippedItemsIntoBaseline({ reason="manual" } = {}){
  ensure();

  const skippedItems = [
    {
      id:"prior-code-letter-for-letter",
      status:"added-as-preservation-policy",
      rule:"Do not repaste all prior code into every future block. Preserve by hash, index, snapshot, compression, dedupe, and reference.",
      protectsAgainst:["bloat","duplicates","build slowdown","Vault overflow","accidental overwrite"]
    },
    {
      id:"never-hang-never-fail",
      status:"added-as-reliability-policy",
      rule:"Do not claim impossible zero-failure guarantees. Enforce detect, recover, retry, checkpoint, resume, preserve, explain, continue.",
      protectsAgainst:["silent hangs","connection interruption loss","stopped thinking","abandoned requests"]
    },
    {
      id:"destructive-os-overwrite-kernel-install",
      status:"added-as-gated-future-program",
      rule:"Workspace scripts must not overwrite an OS. Future OS/kernel install requires separate bootable installer, explicit confirmation, backups, rollback media, hardware checks, and simulation first.",
      protectsAgainst:["data loss","unsafe disk writes","unrecoverable install","accidental OS damage"]
    }
  ];

  const report = {
    generated:new Date().toISOString(),
    reason,
    skippedItems,
    directiveHash:sha(JSON.stringify(skippedItems)),
    hardRule:{
      preserveExisting:true,
      additiveOnly:true,
      noDuplicates:true,
      modifyOnlyWhenNecessary:true,
      noFakeGuarantees:true,
      noSilentHang:true,
      noDestructiveWorkspaceInstall:true
    }
  };

  fs.writeFileSync(path.join(OUT,"latest-skipped-items-added.json"), JSON.stringify(report,null,2));
  return report;
}
