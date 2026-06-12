#requires -Version 7.0
$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$Root = (Get-Location).Path
$RollbackDir = Join-Path $Root ".lumen\rollback"

if (-not (Test-Path $RollbackDir)) {
    Write-Host "No rollback directory found."
    exit 0
}

$Backups = Get-ChildItem -Path $RollbackDir -File | Sort-Object LastWriteTime -Descending

if (-not $Backups) {
    Write-Host "No rollback backups found."
    exit 0
}

Write-Host "Rollback backups available:"
$Backups | Select-Object Name, LastWriteTime, Length | Format-Table -AutoSize
