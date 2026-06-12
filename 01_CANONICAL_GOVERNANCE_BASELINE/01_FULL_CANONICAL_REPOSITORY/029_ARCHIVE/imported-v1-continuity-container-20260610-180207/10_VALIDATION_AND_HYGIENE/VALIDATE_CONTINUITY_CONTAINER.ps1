#requires -Version 7.6
Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$manifest = Join-Path $root "00_MASTER\LUMEN_PROJECT_CONTINUITY_MASTER_MANIFEST.json"

Write-Host "`nValidating Lumen Project Continuity Container..."

$required = @(
  "00_MASTER",
  "01_CURRENT_PROJECT_TRANSFER",
  "02_NEXT_PROJECT_START_HERE",
  "03_DECISION_DELTAS",
  "04_RULE_DELTAS",
  "05_STANDARD_DELTAS",
  "06_OPEN_QUESTIONS",
  "07_GAPS_AND_RISKS",
  "08_COMPLETED_WORK",
  "09_NEXT_WORK_QUEUE",
  "10_VALIDATION_AND_HYGIENE",
  "99_ARCHIVE_INDEXES"
)

foreach ($dir in $required) {
  $path = Join-Path $root $dir
  if (-not (Test-Path $path)) { throw "Missing container: $dir" }
}

if (-not (Test-Path $manifest)) { throw "Missing manifest: $manifest" }

$files = Get-ChildItem $root -Recurse -File
$bad = $files | Where-Object {
  $_.Extension -eq ".md" -and
  (Select-String -Path $_.FullName -Pattern "^PS |^>>|^\s*>>" -Quiet -ErrorAction SilentlyContinue)
}

if ($bad) {
  Write-Host "`nPotential hygiene issues:"
  $bad | Select-Object FullName
  throw "Transfer hygiene validation failed."
}

Write-Host "`nValidation passed."
Get-ChildItem $root -Recurse -File | Select-Object FullName, Length
