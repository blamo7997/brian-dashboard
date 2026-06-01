$ErrorActionPreference = "Continue"

$root = "C:\Users\user\brianco-backend-clean"
$backupRoot = "$root\windows-x64-continuity"
$logDir = "$root\logs"

New-Item -ItemType Directory -Force -Path $backupRoot | Out-Null
New-Item -ItemType Directory -Force -Path $logDir | Out-Null

$stamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$log = "$logDir\windows-x64-update-$stamp.txt"

function Log($m) {
  $line = "[$(Get-Date -Format 'u')] $m"
  $line | Tee-Object -FilePath $log -Append
}

Log "=== Brian & Co Windows x64 Continuity Update Runner ==="

try {
  winget --version | Out-Null
  Log "winget detected."
} catch {
  Log "winget missing."
}

try {
  pwsh --version | Tee-Object -FilePath $log -Append
} catch {
  Log "pwsh not currently installed."
}

$exportDir = "$backupRoot\continuity-$stamp"
New-Item -ItemType Directory -Force -Path $exportDir | Out-Null

Log "Exporting continuity backup..."

Copy-Item "$root\api" "$exportDir\api" -Recurse -Force -ErrorAction SilentlyContinue
Copy-Item "$root\logs" "$exportDir\logs" -Recurse -Force -ErrorAction SilentlyContinue
Copy-Item "$root\.vercel" "$exportDir\.vercel" -Recurse -Force -ErrorAction SilentlyContinue
Copy-Item "$root\*.json" "$exportDir" -Force -ErrorAction SilentlyContinue
Copy-Item "$root\*.ps1" "$exportDir" -Force -ErrorAction SilentlyContinue

@"
Brian & Co Windows x64 Continuity Export
Created: $stamp
Purpose: preserve project continuity before PowerShell/Windows updates.
"@ | Set-Content "$exportDir\README.txt"

try {
  Compress-Archive -Path "$exportDir\*" -DestinationPath "$exportDir.zip" -Force
  Log "Continuity ZIP created: $exportDir.zip"
} catch {
  Log "ZIP export failed: $($_.Exception.Message)"
}

Log "Checking PowerShell updates..."

try {
  winget upgrade --id Microsoft.PowerShell --accept-source-agreements --accept-package-agreements --silent | Tee-Object -FilePath $log -Append
} catch {
  Log "PowerShell upgrade failed: $($_.Exception.Message)"
}

Log "Rechecking versions..."

try {
  pwsh --version | Tee-Object -FilePath $log -Append
} catch {
  Log "pwsh version recheck failed."
}

Log "Testing Brian & Co backend after update..."

$checks = @(
  "https://brianco-backend-clean.vercel.app/api/health",
  "https://brianco-backend-clean.vercel.app/api/products",
  "https://brianco-backend-clean.vercel.app/api/collections"
)

foreach ($u in $checks) {
  try {
    Log "Testing $u"
    vercel curl $u 2>&1 | Tee-Object -FilePath $log -Append
  } catch {
    Log "Health check failed for $u"
  }
}

Log "Windows x64 continuity update completed."
