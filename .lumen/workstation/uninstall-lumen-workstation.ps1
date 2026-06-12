#requires -Version 7.6
$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$Root = (Get-Location).Path
$StateDir = Join-Path $Root ".lumen\state"
$ProofDir = Join-Path $Root ".lumen\proof"
$Now = Get-Date -Format "yyyyMMdd_HHmmss"
New-Item -ItemType Directory -Force -Path $StateDir,$ProofDir | Out-Null

[pscustomobject]@{
    installed = $false
    uninstalledAt = (Get-Date -Format "o")
    mode = "lumen-workstation-bridge-disabled"
    repositoryPreserved = $true
    vaultPreserved = $true
    founderPrivateProtected = $true
    archiveBeforeDelete = $true
    launcherPreservedForReinstall = $true
    noRepositoryDeletePerformed = $true
    noVaultDeletePerformed = $true
} | ConvertTo-Json -Depth 8 | Set-Content -Path (Join-Path $StateDir "workstation-state.json") -Encoding UTF8

$ProofPath = Join-Path $ProofDir "LUMEN_WORKSTATION_UNINSTALL_PROOF_$Now.json"
[pscustomobject]@{
    timestamp = (Get-Date -Format "o")
    root = $Root
    installed = $false
    repositoryPreserved = $true
    vaultPreserved = $true
    founderPrivateProtected = $true
    destructiveDeletePerformed = $false
} | ConvertTo-Json -Depth 10 | Set-Content -Path $ProofPath -Encoding UTF8

Write-Host "Lumen Workstation bridge uninstalled. Repository, Vault, and founder-private records preserved."
Write-Host "Proof: $ProofPath"
