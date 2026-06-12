#requires -Version 7.0
$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$Root = Join-Path ([Environment]::GetFolderPath("Desktop")) "Lumen Genesis"
$ProofDir = Join-Path $Root ".lumen\proof"

if (-not (Test-Path $ProofDir)) {
    throw "Proof folder not found: $ProofDir"
}

$LatestProof = Get-ChildItem -Path $ProofDir -Filter "*.json" -File |
    Sort-Object LastWriteTime -Descending |
    Select-Object -First 1

if (-not $LatestProof) {
    throw "No proof files found in: $ProofDir"
}

notepad $LatestProof.FullName
Write-Host "Opened latest proof:"
Write-Host $LatestProof.FullName
