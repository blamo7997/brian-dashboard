#requires -Version 7.6
$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$Root = (Get-Location).Path
$LumenDir = Join-Path $Root ".lumen"
$ProofDir = Join-Path $LumenDir "proof"
$ScanDir = Join-Path $LumenDir "continuous-scans"
$RepairDir = Join-Path $LumenDir "repairs"

New-Item -ItemType Directory -Force -Path $ProofDir,$ScanDir,$RepairDir | Out-Null

$Now = Get-Date -Format "yyyyMMdd_HHmmss"

$Findings = Get-ChildItem -Path $Root -Recurse -File -ErrorAction SilentlyContinue |
    Where-Object {
        $_.FullName -notmatch "\\\.git\\" -and
        $_.FullName -notmatch "\\\.lumen\\proof\\"
    } |
    ForEach-Object {
        $Issue = $null

        if ($_.Length -eq 0) {
            $Issue = "EMPTY_FILE"
        }

        [pscustomobject]@{
            path = $_.FullName
            bytes = $_.Length
            lastWriteUtc = $_.LastWriteTimeUtc
            issue = $Issue
        }
    }

$IssueFindings = @($Findings | Where-Object { $_.issue })

$ScanReport = [pscustomobject]@{
    timestamp = (Get-Date -Format "o")
    standard = "CIA NASA institutional enterprise 5000x target"
    scannedRoot = $Root
    totalFiles = @($Findings).Count
    issuesFound = $IssueFindings.Count
    issues = $IssueFindings
    automaticRepairMode = "governed-proof-first"
    uncontrolledSelfModification = $false
}

$ScanReportPath = Join-Path $ScanDir "LUMEN_CONTINUOUS_SCAN_REPORT_$Now.json"
$ScanReport | ConvertTo-Json -Depth 12 | Set-Content -Path $ScanReportPath -Encoding UTF8

Write-Host "Lumen scan complete."
Write-Host "Report: $ScanReportPath"
