$ErrorActionPreference = "Continue"
Set-Location "C:\Users\user\brianco-backend-clean"

$stamp = Get-Date -Format "yyyyMMdd_HHmmss"
$logDir = ".\reports\LUMEN_FAST_LAUNCH_$stamp"
New-Item -ItemType Directory -Force -Path $logDir | Out-Null
New-Item -ItemType Directory -Force -Path "C:\Users\user\LumenWorkspace" | Out-Null

Write-Host "===== LUMEN FAST LAUNCH =====" -ForegroundColor Cyan
Write-Host "Opening Lumen first. Updates and quality checks continue in background."

Start-Process powershell -ArgumentList "-NoExit -ExecutionPolicy Bypass -Command "Set-Location 'C:\Users\user\brianco-backend-clean'; npm run dev""

Start-Sleep -Seconds 5
Start-Process "http://localhost:3000/lumen/control"

Start-Process powershell -ArgumentList "-ExecutionPolicy Bypass -Command "Set-Location 'C:\Users\user\brianco-backend-clean'; if(Test-Path '.\.git'){ git status *> '$logDir\git_status.txt'; git pull *> '$logDir\git_pull.txt' }; npm install *> '$logDir\npm_install.txt'; npm run build *> '$logDir\background_build.txt'""

if(Test-Path ".\lumen-os\windows-launcher\Start-Workspace-Journal.ps1"){
  Start-Process powershell -ArgumentList "-ExecutionPolicy Bypass -File ".\lumen-os\windows-launcher\Start-Workspace-Journal.ps1""
}

if(Test-Path ".\lumen-os\windows-launcher\Start-Expansion-Watcher.ps1"){
  Start-Process powershell -ArgumentList "-ExecutionPolicy Bypass -File ".\lumen-os\windows-launcher\Start-Expansion-Watcher.ps1""
}
