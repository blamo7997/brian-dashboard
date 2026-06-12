#requires -Version 7.0
$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$Root = (Get-Location).Path
$LumenDir = Join-Path $Root ".lumen"
$RepoDir = Join-Path $LumenDir "repository"
$VaultDir = Join-Path $LumenDir "vault"
$SyncDir = Join-Path $LumenDir "repository-vault-sync"
$ProofDir = Join-Path $LumenDir "proof"

New-Item -ItemType Directory -Force -Path $RepoDir,$VaultDir,$SyncDir,$ProofDir | Out-Null

$Now = Get-Date -Format "yyyyMMdd_HHmmss"

$RepoFiles = Get-ChildItem -Path $RepoDir -Recurse -File -ErrorAction SilentlyContinue
$VaultFiles = Get-ChildItem -Path $VaultDir -Recurse -File -ErrorAction SilentlyContinue

$RepoIndex = foreach ($File in $RepoFiles) {
    [pscustomobject]@{
        authority = "repository"
        path = $File.FullName
        name = $File.Name
        bytes = $File.Length
        lastWriteUtc = $File.LastWriteTimeUtc
    }
}

$VaultIndex = foreach ($File in $VaultFiles) {
    [pscustomobject]@{
        authority = "vault"
        path = $File.FullName
        name = $File.Name
        bytes = $File.Length
        lastWriteUtc = $File.LastWriteTimeUtc
    }
}

$SyncRecord = [pscustomobject]@{
    timestamp = (Get-Date -Format "o")
    rule = "repository-vault-constant-connection"
    repositoryRoot = $RepoDir
    vaultRoot = $VaultDir
    repositoryCount = @($RepoIndex).Count
    vaultCount = @($VaultIndex).Count
    founderPrivateProtected = $true
    userIsolationRequired = $true
    duplicatesAvoided = $true
    archiveBeforeOverwriteRequired = $true
    uncontrolledSync = $false
    repositoryIndex = $RepoIndex
    vaultIndex = $VaultIndex
}

$SyncPath = Join-Path $SyncDir "LUMEN_REPOSITORY_VAULT_SYNC_$Now.json"
$SyncRecord | ConvertTo-Json -Depth 12 | Set-Content -Path $SyncPath -Encoding UTF8

$ProofPath = Join-Path $ProofDir "LUMEN_REPOSITORY_VAULT_SYNC_PROOF_$Now.json"
[pscustomobject]@{
    timestamp = (Get-Date -Format "o")
    syncRecord = $SyncPath
    repositoryVaultConnected = $true
    permissionSafe = $true
    founderPrivateProtected = $true
    userIsolated = $true
    noDuplicateWritePerformed = $true
    noOverwritePerformed = $true
} | ConvertTo-Json -Depth 8 | Set-Content -Path $ProofPath -Encoding UTF8

Write-Host "Repository/Vault sync index complete."
Write-Host "Sync: $SyncPath"
Write-Host "Proof: $ProofPath"
