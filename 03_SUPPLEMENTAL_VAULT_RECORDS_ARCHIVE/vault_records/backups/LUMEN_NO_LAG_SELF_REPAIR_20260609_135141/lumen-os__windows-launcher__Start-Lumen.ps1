$ErrorActionPreference = "Continue"

Set-Location "C:\Users\user\brianco-backend-clean"

$stamp = Get-Date -Format "yyyyMMdd_HHmmss"
$logDir = ".\reports\LUMEN_AUTO_LAUNCH_$stamp"
New-Item -ItemType Directory -Force -Path $logDir | Out-Null

Write-Host "===== LUMEN AUTO-LAUNCH =====" -ForegroundColor Cyan
Write-Host "Mode: Windows 11 existing OS mode"
Write-Host "Workspace: C:\Users\user\LumenWorkspace"
Write-Host "Project: C:\Users\user\brianco-backend-clean"

Write-Host "===== LOAD / CREATE WORKSPACE =====" -ForegroundColor Cyan
New-Item -ItemType Directory -Force -Path "C:\Users\user\LumenWorkspace" | Out-Null

Write-Host "===== CREATE ROLLBACK BEFORE LAUNCH =====" -ForegroundColor Cyan
if(Test-Path ".\lumen-os\windows-launcher\Create-Rollback.ps1"){
  & ".\lumen-os\windows-launcher\Create-Rollback.ps1" 2>&1 | Tee-Object -FilePath "$logDir\rollback.txt"
} else {
  "Rollback script not found." | Tee-Object -FilePath "$logDir\rollback.txt"
}

Write-Host "===== CREATE SNAPSHOT BEFORE LAUNCH =====" -ForegroundColor Cyan
if(Test-Path ".\lumen-os\windows-launcher\Create-Workspace-Snapshot.ps1"){
  & ".\lumen-os\windows-launcher\Create-Workspace-Snapshot.ps1" 2>&1 | Tee-Object -FilePath "$logDir\snapshot.txt"
} else {
  "Snapshot script not found." | Tee-Object -FilePath "$logDir\snapshot.txt"
}

Write-Host "===== UPDATE CHECK REQUIRED =====" -ForegroundColor Cyan
if(Test-Path ".\.git"){
  git status 2>&1 | Tee-Object -FilePath "$logDir\git_status.txt"
  git pull 2>&1 | Tee-Object -FilePath "$logDir\git_pull.txt"
} else {
  "No git repository found. Git update unavailable." | Tee-Object -FilePath "$logDir\git_pull.txt"
}

Write-Host "===== INSTALL DEPENDENCIES REQUIRED =====" -ForegroundColor Cyan
if(Test-Path ".\package.json"){
  npm install 2>&1 | Tee-Object -FilePath "$logDir\npm_install.txt"
} else {
  "package.json missing." | Tee-Object -FilePath "$logDir\npm_install.txt"
}

Write-Host "===== BUILD VALIDATION REQUIRED =====" -ForegroundColor Cyan
npm run build 2>&1 | Tee-Object -FilePath "$logDir\build.txt"

Write-Host "===== START BACKGROUND WATCHERS =====" -ForegroundColor Cyan

if(Test-Path ".\lumen-os\windows-launcher\Start-Workspace-Journal.ps1"){
  Start-Process powershell -ArgumentList "-ExecutionPolicy Bypass -File ".\lumen-os\windows-launcher\Start-Workspace-Journal.ps1""
}

if(Test-Path ".\lumen-os\windows-launcher\Start-Expansion-Watcher.ps1"){
  Start-Process powershell -ArgumentList "-ExecutionPolicy Bypass -File ".\lumen-os\windows-launcher\Start-Expansion-Watcher.ps1""
}

Write-Host "===== START LUMEN SERVER =====" -ForegroundColor Green

Start-Process powershell -ArgumentList "-NoExit -ExecutionPolicy Bypass -Command "Set-Location 'C:\Users\user\brianco-backend-clean'; npm run dev""

Write-Host "===== OPEN LUMEN CONTROL CENTER =====" -ForegroundColor Green

Start-Sleep -Seconds 7
Start-Process "http://localhost:3000/lumen/control"

Write-Host "Lumen launched automatically."
Write-Host "If the browser opens before the server finishes, refresh the page in a few seconds."
