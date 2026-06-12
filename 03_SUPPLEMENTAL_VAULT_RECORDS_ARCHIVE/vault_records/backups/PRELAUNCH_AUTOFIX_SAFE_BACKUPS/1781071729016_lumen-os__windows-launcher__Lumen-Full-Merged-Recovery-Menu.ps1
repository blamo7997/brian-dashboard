$ErrorActionPreference = "Continue"
Set-Location "C:\Users\user\brianco-backend-clean"

Write-Host ""
Write-Host "====================================" -ForegroundColor Cyan
Write-Host " LUMEN FULL MERGED RECOVERY MENU" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Create recovery snapshot"
Write-Host "2. Show last-good recovery plan"
Write-Host "3. Run baseline guardian report"
Write-Host "4. Soft restart Lumen"
Write-Host "5. Compact knowledge Vault"
Write-Host "6. Exit"
Write-Host ""

$choice = Read-Host "Choose 1-6"
$stamp = Get-Date -Format "yyyyMMdd_HHmmss"
$logDir = ".\reports\LUMEN_FULL_MERGED_RECOVERY_MENU_$stamp"
New-Item -ItemType Directory -Force -Path $logDir | Out-Null

if($choice -eq "1"){
  node -e "import('./lumen-os/packages/combined-recovery/combined-recovery-engine.mjs').then(m=>console.log(JSON.stringify(m.createCombinedRecoverySnapshot({reason:'desktop-menu'}),null,2))).catch(e=>{console.error(e);process.exit(1)})" *> "$logDir\snapshot.json"
  Write-Host "Snapshot created: $logDir\snapshot.json" -ForegroundColor Green
}
elseif($choice -eq "2"){
  node -e "import('./lumen-os/packages/combined-recovery/combined-recovery-engine.mjs').then(m=>console.log(JSON.stringify(m.lastGoodRecoveryPlan({reason:'desktop-menu'}),null,2))).catch(e=>{console.error(e);process.exit(1)})" *> "$logDir\recovery_plan.json"
  Write-Host "Recovery plan created: $logDir\recovery_plan.json" -ForegroundColor Green
}
elseif($choice -eq "3"){
  if(Test-Path ".\lumen-os\packages\baseline-guardian\baseline-guardian-engine.mjs"){
    node -e "import('./lumen-os/packages/baseline-guardian/baseline-guardian-engine.mjs').then(m=>console.log(JSON.stringify(m.runBaselineGuardian({reason:'full-merged-recovery-menu'}),null,2))).catch(e=>{console.error(e);process.exit(1)})" *> "$logDir\baseline_guardian.json"
    Write-Host "Baseline report created: $logDir\baseline_guardian.json" -ForegroundColor Green
  } else {
    Write-Host "Baseline guardian not found." -ForegroundColor Yellow
  }
}
elseif($choice -eq "4"){
  Start-Process powershell -ArgumentList "-NoExit -ExecutionPolicy Bypass -Command `"Set-Location 'C:\Users\user\brianco-backend-clean'; npm run dev`""
  Start-Sleep -Seconds 5
  Start-Process "http://localhost:3000/lumen/control"
}
elseif($choice -eq "5"){
  node -e "import('./lumen-os/packages/knowledge-centric-vault/knowledge-centric-vault-engine.mjs').then(m=>console.log(JSON.stringify(m.compactKnowledgeVault(),null,2))).catch(e=>{console.error(e);process.exit(1)})" *> "$logDir\vault_compact.json"
  Write-Host "Vault compacted: $logDir\vault_compact.json" -ForegroundColor Green
}
else{
  Write-Host "No action taken."
}
