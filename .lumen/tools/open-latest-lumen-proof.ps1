#requires -Version 7.6
$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

param(
    [string]$Root = (Get-Location).Path
)

if (-not (Test-Path -LiteralPath (Join-Path $Root ".lumen"))) {
    $DesktopRoot = Join-Path ([Environment]::GetFolderPath("Desktop")) "Lumen Genesis"
    if (Test-Path -LiteralPath (Join-Path $DesktopRoot ".lumen")) {
        $Root = $DesktopRoot
    }
}

$ProofDir = Join-Path $Root ".lumen\proof"

if (-not (Test-Path -LiteralPath $ProofDir)) {
    throw "Proof folder not found: $ProofDir"
}

$LatestProof = Get-ChildItem -LiteralPath $ProofDir -Filter "*.json" -File |
    Sort-Object LastWriteTime -Descending |
    Select-Object -First 1

if (-not $LatestProof) {
    throw "No proof files found in: $ProofDir"
}

notepad $LatestProof.FullName
Write-Host "Opened latest proof:"
Write-Host $LatestProof.FullName
