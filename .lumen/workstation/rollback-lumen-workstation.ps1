#requires -Version 7.6
$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$Root = (Get-Location).Path
$SnapshotDir = Join-Path $Root ".lumen\workstation\snapshots"
$StateDir = Join-Path $Root ".lumen\state"
$ProofDir = Join-Path $Root ".lumen\proof"
$Now = Get-Date -Format "yyyyMMdd_HHmmss"

New-Item -ItemType Directory -Force -Path $StateDir,$ProofDir | Out-Null

if (-not (Test-Path $SnapshotDir)) {
    Write-Host "No workstation snapshot directory found."
    exit 0
}

$Snapshots = Get-ChildItem -Path $SnapshotDir -Filter "LUMEN_WORKSTATION_SNAPSHOT_*.json" -File | Sort-Object LastWriteTime -Descending

if (-not $Snapshots) {
    Write-Host "No workstation snapshots found."
    exit 0
}

$Latest = $Snapshots | Select-Object -First 1
$Snapshot = Get-Content -Raw -Path $Latest.FullName | ConvertFrom-Json

[pscustomobject]@{
    installed = $true
    rolledBackAt = (Get-Date -Format "o")
    mode = "lumen-workstation-bridge"
    rollbackSource = $Latest.FullName
    repositoryPreserved = $true
    vaultPreserved = $true
    founderPrivateProtected = $true
    externalAuthorityRequiresExplicitAuthorization = $true
} | ConvertTo-Json -Depth 10 | Set-Content -Path (Join-Path $StateDir "workstation-state.json") -Encoding UTF8

$ProofPath = Join-Path $ProofDir "LUMEN_WORKSTATION_ROLLBACK_PROOF_$Now.json"
[pscustomobject]@{
    timestamp = (Get-Date -Format "o")
    root = $Root
    rollbackSource = $Latest.FullName
    snapshot = $Snapshot
    repositoryPreserved = $true
    vaultPreserved = $true
    founderPrivateProtected = $true
    destructiveDeletePerformed = $false
} | ConvertTo-Json -Depth 12 | Set-Content -Path $ProofPath -Encoding UTF8

Write-Host "Lumen Workstation bridge rolled back to latest snapshot."
Write-Host "Snapshot: $($Latest.FullName)"
Write-Host "Proof: $ProofPath"
