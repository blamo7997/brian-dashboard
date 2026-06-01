$ErrorActionPreference = "Continue"
$Stamp = Get-Date -Format "yyyyMMdd_HHmmss"
$Root = "C:\Users\user\brianco-backend-clean"
$CommandRoot = "$Root\brianco-monument-command-framework"
$ReportDir = "$CommandRoot\reports\maintenance-$Stamp"
New-Item -ItemType Directory -Force -Path $ReportDir | Out-Null
$Report = "$ReportDir\MAINTENANCE_REPORT.md"

"# Brian & Co Monument Maintenance — $Stamp" | Set-Content $Report

function Run-Capture($Name,$Command,$Dir){
  $Out="$ReportDir\$($Name -replace '[^a-zA-Z0-9_-]','_').txt"
  Add-Content $Report "`n## $Name`nOutput: $Out"
  if($Dir -and (Test-Path $Dir)){Push-Location $Dir}
  powershell -NoProfile -ExecutionPolicy Bypass -Command $Command 2>&1 | Tee-Object -FilePath $Out
  if($Dir -and (Test-Path $Dir)){Pop-Location}
}

$Kernel="C:\Users\user\brianco-os-kernel"

Run-Capture "Tool readiness" "git --version; node -v; npm -v; wsl --version; Get-Command winget,git,node,npm,python,pwsh,code,clang,nasm,cmake,qemu-system-x86_64,docker -ErrorAction SilentlyContinue" $Root
Run-Capture "Device readiness" "Get-PnpDevice | Select Status,Class,FriendlyName,Manufacturer,Problem | Format-Table -AutoSize" $Root
Run-Capture "Backend build" "npm run build" $Root
Run-Capture "Playwright console discovery" "npx playwright test tests/brianco/exact-console-error-discovery.spec.js --reporter=line" $Root
Run-Capture "Playwright feature hub target" "npx playwright test tests/brianco/predeploy-live.spec.js -g 'Brian & Co live feature hub has links' --reporter=line" $Root

if(Test-Path $Kernel){
  Run-Capture "Kernel scaffold audit" "Get-ChildItem -Recurse | Select FullName,Length,LastWriteTime | Format-Table -AutoSize" $Kernel
  Run-Capture "WSL kernel toolchain audit" "wsl bash -lc 'uname -a; for t in gcc clang make nasm qemu-system-x86_64 rustc cargo; do command -v `$t >/dev/null 2>&1 && echo `$t=FOUND || echo `$t=MISSING; done'" $Kernel
}

Add-Content $Report "`n## Summary`nMaintenance complete. Review failures/blockers. No protected/live/high-impact changes performed."
