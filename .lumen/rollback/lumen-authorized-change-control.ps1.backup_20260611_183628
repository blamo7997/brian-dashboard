#requires -Version 7.0
$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

param(
    [Parameter(Mandatory)][string]$TargetPath,
    [Parameter(Mandatory)][string]$ChangeReason
)

$Root = (Get-Location).Path
$LumenDir = Join-Path $Root ".lumen"
$RollbackDir = Join-Path $LumenDir "rollback"
$ProofDir = Join-Path $LumenDir "proof"

New-Item -ItemType Directory -Force -Path $RollbackDir,$ProofDir | Out-Null

if (-not (Test-Path $TargetPath)) {
    throw "Target path does not exist: $TargetPath"
}

$Now = Get-Date -Format "yyyyMMdd_HHmmss"
$BackupPath = Join-Path $RollbackDir "$((Split-Path $TargetPath -Leaf)).authorized_backup_$Now"
Copy-Item -Path $TargetPath -Destination $BackupPath -Force

$Proof = [pscustomobject]@{
    timestamp = (Get-Date -Format "o")
    targetPath = $TargetPath
    backupPath = $BackupPath
    changeReason = $ChangeReason
    authorizedChangeRequired = $true
    rollbackCreated = $true
    repositoryVaultGovernanceRequired = $true
}

$ProofPath = Join-Path $ProofDir "AUTHORIZED_CHANGE_PROOF_$Now.json"
$Proof | ConvertTo-Json -Depth 8 | Set-Content -Path $ProofPath -Encoding UTF8

Write-Host "Authorized change checkpoint created."
Write-Host "Backup: $BackupPath"
Write-Host "Proof:  $ProofPath"
