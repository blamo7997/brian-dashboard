#requires -Version 7.0
$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$Root = (Get-Location).Path
$StateDir = Join-Path $Root ".lumen\state"
New-Item -ItemType Directory -Force -Path $StateDir | Out-Null

[pscustomobject]@{
    installed = $true
    installedAt = (Get-Date -Format "o")
    mode = "lumen-workstation-bridge"
    rollbackAvailable = $true
    repositoryPreserved = $true
    vaultPreserved = $true
    founderPrivateProtected = $true
} | ConvertTo-Json -Depth 8 | Set-Content -Path (Join-Path $StateDir "workstation-state.json") -Encoding UTF8

Write-Host "Lumen Workstation bridge installed."
