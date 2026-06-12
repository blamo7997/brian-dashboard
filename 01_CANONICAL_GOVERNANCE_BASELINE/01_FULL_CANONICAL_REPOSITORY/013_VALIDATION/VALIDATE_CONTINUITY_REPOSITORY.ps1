#requires -Version 7.6
Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$RepoRoot = Split-Path -Parent $PSScriptRoot
$Required = @(
  "000_START_HERE",
  "001_MASTER_INDEX",
  "002_REGISTRIES",
  "003_MANIFESTS",
  "004_ACTIVE_PROJECT",
  "005_TRANSFERS",
  "006_DELTAS",
  "007_OPEN_LOOPS",
  "008_GAPS_RISKS_BLOCKERS",
  "009_COMPLETED_WORK",
  "010_NEXT_WORK",
  "011_LINEAGE",
  "012_CONTEXT_AND_RATIONALE",
  "013_VALIDATION",
  "014_INTEGRITY",
  "015_RECOVERY",
  "016_IMPORTS_RAW",
  "017_EXPORT_PACKETS",
  "018_ARCHIVE",
  "019_ANALYTICS",
  "099_SYSTEM"
)

foreach ($r in $Required) {
  $p = Join-Path $RepoRoot $r
  if (-not (Test-Path $p)) { throw "Missing container: $r" }
}

$Bad = Get-ChildItem $RepoRoot -Recurse -File -Include *.md |
  Where-Object {
    Select-String -Path $_.FullName -Pattern "^PS\s+|^>>|^\s*Write-Host\b|^\s*Get-ChildItem\b|^\s*Select-String\b" -Quiet -ErrorAction SilentlyContinue
  }

if ($Bad) {
  Write-Host "Potential transfer contamination found:"
  $Bad | Select-Object FullName
  throw "Validation failed."
}

Write-Host "Continuity repository validation passed."
Get-ChildItem $RepoRoot -Recurse -File | Sort-Object FullName | Select-Object FullName, Length
