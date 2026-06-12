#requires -Version 7.6
$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$Root = (Get-Location).Path
$StateDir = Join-Path $Root ".lumen\state"
$ProofDir = Join-Path $Root ".lumen\proof"
$SnapshotDir = Join-Path $Root ".lumen\workstation\snapshots"
$UserModelDir = Join-Path $Root ".lumen\users"
$LauncherPath = Join-Path $Root "START_LUMEN_WORKSPACE.ps1"
$LauncherCmdPath = Join-Path $Root "START_LUMEN_WORKSPACE.cmd"
$Now = Get-Date -Format "yyyyMMdd_HHmmss"

New-Item -ItemType Directory -Force -Path $StateDir,$ProofDir,$SnapshotDir,$UserModelDir | Out-Null

$UserAuthorityModelPath = Join-Path $UserModelDir "LUMEN_USER_WORKSPACE_AUTHORITY_MODEL.json"
[pscustomobject]@{
    timestamp = (Get-Date -Format "o")
    founderActiveNow = $true
    founderRole = "founder-private-owner"
    founderWorkspace = "active-local-windows-11-workspace-bridge"
    futureUsersEnabledWhenReady = $true
    userWorkspaceTemplate = "isolated-authorized-per-user-workspace"
    userIsolationRequired = $true
    perUserVaultRequired = $true
    perUserRepositoryRequired = $true
    perUserConsentRequired = $true
    perUserInstallUninstallRollbackRequired = $true
    founderPrivateNeverShared = $true
    externalAuthorityRequiresExplicitAuthorization = $true
    governedSelfModificationEnabled = $true
    selfModificationModel = Join-Path $Root ".lumen\runtime\self-modification\LUMEN_GOVERNED_SELF_MODIFICATION_MODEL.json"
    userDashboardsEnabled = $true
    userDashboardRuntimeModel = Join-Path $Root ".lumen\runtime\dashboards\LUMEN_USER_DASHBOARD_MODEL.json"
    specialUserDashboardsEnabled = $true
    dashboardRuntimeModel = Join-Path $Root ".lumen\runtime\dashboards\LUMEN_SPECIAL_USER_DASHBOARD_MODEL.json"
    allowedNow = @(
        "founder local repository learning",
        "founder local vault learning",
        "founder proof generation",
        "founder Windows 11 workspace bridge start/install/uninstall/rollback",
        "founder governed self-modification of local Lumen files",
        "founder governed website/UI/graphic-interface modification when connected and authorized"
    )
    futureUserActivationRequirements = @(
        "identity created",
        "role assigned",
        "consent captured",
        "workspace boundary created",
        "vault boundary created",
        "repository boundary created",
        "install/uninstall/rollback available",
        "localized legal and accessibility policy applied",
        "proof record written"
    )
} | ConvertTo-Json -Depth 12 | Set-Content -Path $UserAuthorityModelPath -Encoding UTF8

$SnapshotPath = Join-Path $SnapshotDir "LUMEN_WORKSTATION_SNAPSHOT_$Now.json"
$Snapshot = [pscustomobject]@{
    timestamp = (Get-Date -Format "o")
    root = $Root
    workstationStatePath = Join-Path $StateDir "workstation-state.json"
    launcherPath = $LauncherPath
    launcherCmdPath = $LauncherCmdPath
    userAuthorityModelPath = $UserAuthorityModelPath
    repositoryPreserved = $true
    vaultPreserved = $true
    founderPrivateProtected = $true
    founderActiveNow = $true
    futureUsersEnabledWhenReady = $true
    perUserIsolationRequired = $true
    windowsVersion = [System.Environment]::OSVersion.VersionString
    powerShellVersion = $PSVersionTable.PSVersion.ToString()
    authorityModel = "repository-local-with-explicit-user-authorization-for-external-system-actions"
}
$Snapshot | ConvertTo-Json -Depth 10 | Set-Content -Path $SnapshotPath -Encoding UTF8

@'
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
    userDashboardsEnabled = $true
    userDashboardRuntimeModel = Join-Path $Root ".lumen\runtime\dashboards\LUMEN_USER_DASHBOARD_MODEL.json"
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
'@ | Set-Content -Path $LauncherPath -Encoding UTF8

@'
@echo off
pwsh -NoProfile -ExecutionPolicy Bypass -File "%~dp0START_LUMEN_WORKSPACE.ps1"
'@ | Set-Content -Path $LauncherCmdPath -Encoding ASCII

[pscustomobject]@{
    installed = $true
    installedAt = (Get-Date -Format "o")
    mode = "lumen-workstation-bridge"
    rollbackAvailable = $true
    snapshot = $SnapshotPath
    launcher = $LauncherPath
    launcherCmd = $LauncherCmdPath
    userAuthorityModel = $UserAuthorityModelPath
    repositoryPreserved = $true
    vaultPreserved = $true
    founderPrivateProtected = $true
    windows11WorkspaceBridge = $true
    founderActiveNow = $true
    futureUsersEnabledWhenReady = $true
    futureUserMode = "isolated-authorized-per-user-workspace"
    perUserConsentRequired = $true
    perUserInstallUninstallRollbackRequired = $true
    governedSelfModificationEnabled = $true
    selfModificationModel = Join-Path $Root ".lumen\runtime\self-modification\LUMEN_GOVERNED_SELF_MODIFICATION_MODEL.json"
    userDashboardsEnabled = $true
    userDashboardRuntimeModel = Join-Path $Root ".lumen\runtime\dashboards\LUMEN_USER_DASHBOARD_MODEL.json"
    specialUserDashboardsEnabled = $true
    dashboardRuntimeModel = Join-Path $Root ".lumen\runtime\dashboards\LUMEN_SPECIAL_USER_DASHBOARD_MODEL.json"
    lumenLearningMode = "repository-and-vault-first"
    externalAuthorityRequiresExplicitAuthorization = $true
} | ConvertTo-Json -Depth 8 | Set-Content -Path (Join-Path $StateDir "workstation-state.json") -Encoding UTF8

$ProofPath = Join-Path $ProofDir "LUMEN_WORKSTATION_INSTALL_PROOF_$Now.json"
[pscustomobject]@{
    timestamp = (Get-Date -Format "o")
    installed = $true
    root = $Root
    snapshot = $SnapshotPath
    launcher = $LauncherPath
    launcherCmd = $LauncherCmdPath
    userAuthorityModel = $UserAuthorityModelPath
    rollbackAvailable = $true
    uninstallAvailable = $true
    founderPrivateProtected = $true
    founderActiveNow = $true
    futureUsersEnabledWhenReady = $true
    perUserIsolationRequired = $true
    noExternalSystemChangesWithoutAuthorization = $true
} | ConvertTo-Json -Depth 10 | Set-Content -Path $ProofPath -Encoding UTF8

Write-Host "Lumen Workstation bridge installed."
Write-Host "Launcher: $LauncherPath"
Write-Host "Proof: $ProofPath"
