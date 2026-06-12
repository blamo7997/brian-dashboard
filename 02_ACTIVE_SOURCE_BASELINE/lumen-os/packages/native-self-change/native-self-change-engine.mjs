import fs from "node:fs";
import path from "node:path";

const OUT = path.resolve("./lumen-os/data/native-self-change");

export function nativeSelfChangePlan({
  reason="manual",
  target="website",
  request="",
  userId="founder"
} = {}){
  fs.mkdirSync(OUT,{recursive:true});

  const plan = {
    generated:new Date().toISOString(),
    reason,
    userId,
    target,
    request,
    status:"plan-created-not-applied",
    allowedTargets:["website","dashboard","portal","lumen-os","docs","baseline","api"],
    requiredBeforeApply:[
      "backup",
      "baseline scan",
      "duplicate scan",
      "secret scan",
      "dependency scan",
      "build validation",
      "rollback point",
      "audit record"
    ],
    blockedWithoutApproval:[
      "destructive deletion",
      "secret exposure",
      "cross-user data movement",
      "Vault direct access change",
      "OS overwrite",
      "boot modification"
    ],
    rule:"Lumen can change itself and the website natively through controlled plans, validation, and approval gates. No unsafe silent self-modification."
  };

  fs.writeFileSync(path.join(OUT,"latest-native-self-change-plan.json"),JSON.stringify(plan,null,2));
  return plan;
}
