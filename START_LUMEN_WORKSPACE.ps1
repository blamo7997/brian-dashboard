#requires -Version 7.6
$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location -LiteralPath $Root

$StateDir = Join-Path $Root ".lumen\state"
$ProofDir = Join-Path $Root ".lumen\proof"
New-Item -ItemType Directory -Force -Path $StateDir,$ProofDir | Out-Null

$Now = Get-Date -Format "yyyyMMdd_HHmmss"
$SessionPath = Join-Path $StateDir "active-workspace-session.json"
$UserAuthorityModelPath = Join-Path $Root ".lumen\users\LUMEN_USER_WORKSPACE_AUTHORITY_MODEL.json"

$WorkspaceState = [pscustomobject]@{
    startedAt = (Get-Date -Format "o")
    root = $Root
    mode = "lumen-windows-11-workspace-bridge"
    powerShellRequired = "7.6.2"
    powerShellRunning = $PSVersionTable.PSVersion.ToString()
    repositoryFirst = $true
    vaultFirst = $true
    founderActiveNow = $true
    founderPrivateProtected = $true
    futureUsersEnabledWhenReady = $true
    futureUserMode = "isolated-authorized-per-user-workspace"
    userAuthorityModel = $UserAuthorityModelPath
    perUserConsentRequired = $true
    perUserVaultRequired = $true
    perUserRepositoryRequired = $true
    perUserInstallUninstallRollbackRequired = $true
    governedSelfModificationEnabled = $true
    selfModificationModel = Join-Path $Root ".lumen\runtime\self-modification\LUMEN_GOVERNED_SELF_MODIFICATION_MODEL.json"
    specialUserDashboardsEnabled = $true
    dashboardRuntimeModel = Join-Path $Root ".lumen\runtime\dashboards\LUMEN_SPECIAL_USER_DASHBOARD_MODEL.json"
    externalAuthority = "requires explicit user, OS, provider, or admin authorization"
    connectedServices = @("local repository", "local vault", "git remote when authenticated", "Cloudflare/OpenAI/Supabase only when configured")
}

$WorkspaceState | ConvertTo-Json -Depth 10 | Set-Content -Path $SessionPath -Encoding UTF8

$ProofPath = Join-Path $ProofDir "LUMEN_WORKSPACE_START_PROOF_$Now.json"
$WorkspaceState | ConvertTo-Json -Depth 10 | Set-Content -Path $ProofPath -Encoding UTF8

$ScanScript = Join-Path $Root ".lumen\continuous-scans\lumen-incremental-scan.ps1"
$SyncScript = Join-Path $Root ".lumen\repository-vault-sync\lumen-repository-vault-sync.ps1"

if (Test-Path -LiteralPath $ScanScript) {
    & $ScanScript
}

if (Test-Path -LiteralPath $SyncScript) {
    & $SyncScript
}

Write-Host ""
Write-Host "Lumen Workspace is active over Windows 11."
Write-Host "Root: $Root"
Write-Host "Session: $SessionPath"
Write-Host "Proof: $ProofPath"
Write-Host ""
Write-Host "Available workspace commands:"
Write-Host "  pwsh -NoProfile -ExecutionPolicy Bypass -File .\.lumen\workstation\install-lumen-workstation.ps1"
Write-Host "  pwsh -NoProfile -ExecutionPolicy Bypass -File .\.lumen\workstation\uninstall-lumen-workstation.ps1"
Write-Host "  pwsh -NoProfile -ExecutionPolicy Bypass -File .\.lumen\workstation\rollback-lumen-workstation.ps1"
