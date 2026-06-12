# Lumen Prime Ecosystem Universal Ledger Installer
$ErrorActionPreference = "Stop"
$Root = "$env:LOCALAPPDATA\Lumen"
$Install = "$Root\PrimeEcosystem"
$AppDir = "$Install\App"
$Source = Join-Path $PSScriptRoot "src\LumenPrimeApp"
$Backup = "$Root\Backups\PrimeEcosystem-preinstall-$(Get-Date -Format yyyyMMdd-HHmmss)"
function Step($m){ Write-Host "`n== $m ==" -ForegroundColor Yellow }
Step "Lumen Prime Ecosystem install starting"
Write-Host "Root: $Root" -ForegroundColor Cyan
Write-Host "Install: $Install" -ForegroundColor Cyan
Step "Stopping previous Lumen app processes"
Get-Process | Where-Object { $_.ProcessName -match "Lumen|LumenPrime|LumenFounder|FounderEdition|Command" } | Stop-Process -Force -ErrorAction SilentlyContinue
Step "Creating protected folders"
foreach($p in @("Vault","Config","Secrets","Reports","Backups","Logs","Approvals","Voice")){ New-Item -ItemType Directory -Force -Path (Join-Path $Root $p) | Out-Null }
Step "Backing up protected active folders safely"
New-Item -ItemType Directory -Force -Path $Backup | Out-Null
foreach($p in @("Vault","Config","Secrets","Reports")){ $src = Join-Path $Root $p; if(Test-Path $src){ Copy-Item $src -Destination (Join-Path $Backup $p) -Recurse -Force -ErrorAction SilentlyContinue } }
Write-Host "Protected backup created: $Backup" -ForegroundColor Green
Step "Removing previous app layers and old desktop shortcuts only"
foreach($d in @("$Root\FounderEdition", "$Root\PrimeEcosystem", "$Root\App", "$Root\Desktop")){ if(Test-Path $d){ Remove-Item $d -Recurse -Force -ErrorAction SilentlyContinue } }
foreach($desk in @("$env:USERPROFILE\Desktop", "$env:PUBLIC\Desktop", "$env:USERPROFILE\OneDrive\Desktop")){ if(Test-Path $desk){ Get-ChildItem $desk -Force -Filter "*Lumen*.lnk" -ErrorAction SilentlyContinue | Remove-Item -Force -ErrorAction SilentlyContinue } }
foreach($menu in @("$env:APPDATA\Microsoft\Windows\Start Menu\Programs", "$env:ProgramData\Microsoft\Windows\Start Menu\Programs")){ if(Test-Path $menu){ Get-ChildItem $menu -Force -Recurse -Filter "*Lumen*.lnk" -ErrorAction SilentlyContinue | Remove-Item -Force -ErrorAction SilentlyContinue } }
Remove-ItemProperty -Path "HKCU:\Software\Microsoft\Windows\CurrentVersion\Run" -Name "Lumen Founder Edition" -ErrorAction SilentlyContinue
Remove-ItemProperty -Path "HKCU:\Software\Microsoft\Windows\CurrentVersion\Run" -Name "Lumen Prime Ecosystem" -ErrorAction SilentlyContinue
Step "Checking .NET SDK"
if(-not (Get-Command dotnet -ErrorAction SilentlyContinue)){ $winget = Get-Command winget -ErrorAction SilentlyContinue; if($winget){ winget install Microsoft.DotNet.SDK.10 --accept-package-agreements --accept-source-agreements } else { Start-Process "https://dotnet.microsoft.com/download"; throw "Install .NET SDK, then rerun this installer." } }
$dotnetVersion = (& dotnet --version); Write-Host "dotnet found: $dotnetVersion" -ForegroundColor Green
Step "Copying source"
New-Item -ItemType Directory -Force -Path $Install | Out-Null
Copy-Item $Source -Destination "$Install\src\LumenPrimeApp" -Recurse -Force
Copy-Item "$PSScriptRoot\docs" -Destination "$Install\docs" -Recurse -Force
Copy-Item "$PSScriptRoot\security" -Destination "$Install\security" -Recurse -Force
Copy-Item "$PSScriptRoot\registry" -Destination "$Install\registry" -Recurse -Force
Step "Building native Windows app"
New-Item -ItemType Directory -Force -Path $AppDir | Out-Null
Push-Location "$Install\src\LumenPrimeApp"
try { dotnet publish -c Release -r win-x64 --self-contained false -o $AppDir } finally { Pop-Location }
$Exe = Join-Path $AppDir "LumenPrime.exe"
if(-not (Test-Path $Exe)){ throw "Build failed: $Exe was not created." }
Write-Host "Built: $Exe" -ForegroundColor Green
Step "Creating shortcuts and autolaunch"
$Shell = New-Object -ComObject WScript.Shell
foreach($ShortcutPath in @("$env:USERPROFILE\Desktop\Lumen Prime Ecosystem.lnk", "$env:APPDATA\Microsoft\Windows\Start Menu\Programs\Lumen Prime Ecosystem.lnk")){ $s = $Shell.CreateShortcut($ShortcutPath); $s.TargetPath = $Exe; $s.Arguments = ""; $s.WorkingDirectory = $AppDir; $s.IconLocation = "$Exe,0"; $s.Save() }
$RunKey = "HKCU:\Software\Microsoft\Windows\CurrentVersion\Run"; New-Item -Path $RunKey -Force | Out-Null; Set-ItemProperty -Path $RunKey -Name "Lumen Prime Ecosystem" -Value "`"$Exe`""
Step "Writing install report"
$Report = "$Root\Reports\lumen-prime-ecosystem-install-$(Get-Date -Format yyyyMMdd-HHmmss).json"
@{ timestamp=(Get-Date).ToString("o"); install=$Install; app=$Exe; backup=$Backup; dotnet=$dotnetVersion; preserved=@("Vault","Config","Secrets","Reports","Backups"); features=@("OpenAI Command Bridge","Universal Activity Ledger","Sovereign Security","OpenAI Voice Path","Resource Concierge","Localization Intelligence","Universal Communications","Accessibility Care Engine") } | ConvertTo-Json -Depth 8 | Set-Content -Path $Report -Encoding UTF8
Step "Launching Lumen"
Start-Process $Exe
Write-Host "Lumen Prime Ecosystem installed and launched." -ForegroundColor Green
Write-Host "Report: $Report" -ForegroundColor Cyan
