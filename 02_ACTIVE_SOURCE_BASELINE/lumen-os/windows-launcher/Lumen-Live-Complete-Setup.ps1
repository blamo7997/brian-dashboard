$ErrorActionPreference = "Continue"
Set-Location "C:\Users\user\brianco-backend-clean"

$stamp = Get-Date -Format "yyyyMMdd_HHmmss"
$logDir = ".\reports\LUMEN_LIVE_COMPLETE_SETUP_$stamp"
New-Item -ItemType Directory -Force -Path $logDir | Out-Null

node -e "import('./lumen-os/packages/live-complete-setup/live-complete-setup-engine.mjs').then(m=>console.log(JSON.stringify(m.liveCompleteSetupStatus({reason:'launcher'}),null,2))).catch(e=>{console.error(e);process.exit(1)})" *> "$logDir\setup_status.json"

Start-Process powershell -ArgumentList "-NoExit -ExecutionPolicy Bypass -Command `"Set-Location 'C:\Users\user\brianco-backend-clean'; npm run dev`""
Start-Sleep -Seconds 7
Start-Process "http://localhost:3000/lumen/setup"
