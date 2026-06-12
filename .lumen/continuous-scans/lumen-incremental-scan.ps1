#requires -Version 7.6
$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$Root = (Get-Location).Path
$LumenDir = Join-Path $Root ".lumen"
$ManifestDir = Join-Path $LumenDir "manifests"
$ProofDir = Join-Path $LumenDir "proof"

New-Item -ItemType Directory -Force -Path $ManifestDir,$ProofDir | Out-Null

$Now = Get-Date -Format "yyyyMMdd_HHmmss"

$LatestManifest =
    Get-ChildItem $ManifestDir -Filter "LUMEN_INCREMENTAL_SCAN_*.json" -ErrorAction SilentlyContinue |
    Sort-Object LastWriteTime -Descending |
    Select-Object -First 1

$Previous = @{}
if ($LatestManifest) {
    try {
        $PreviousItems = Get-Content -Raw -Path $LatestManifest.FullName | ConvertFrom-Json
        foreach ($Item in @($PreviousItems)) {
            if ($Item.Path) {
                $Previous[$Item.Path] = "$($Item.LastWriteUtc)|$($Item.Bytes)"
            }
        }
    } catch {}
}

$Current =
    Get-ChildItem -Path $Root -Recurse -File -ErrorAction SilentlyContinue |
    Where-Object {
        $_.FullName -notmatch "\\\.git\\" -and
        $_.FullName -notmatch "\\\.lumen\\proof\\"
    } |
    ForEach-Object {
        $Signature = "$($_.LastWriteTimeUtc)|$($_.Length)"
        $Status = "UNCHANGED"

        if (-not $Previous.ContainsKey($_.FullName)) {
            $Status = "NEW"
        } elseif ($Previous[$_.FullName] -ne $Signature) {
            $Status = "CHANGED"
        }

        [pscustomobject]@{
            Path = $_.FullName
            Name = $_.Name
            Bytes = $_.Length
            LastWriteUtc = $_.LastWriteTimeUtc
            Status = $Status
        }
    }

$OutPath = Join-Path $ManifestDir "LUMEN_INCREMENTAL_SCAN_$Now.json"
$Current | ConvertTo-Json -Depth 10 | Set-Content -Path $OutPath -Encoding UTF8

$Changed = @($Current | Where-Object { $_.Status -ne "UNCHANGED" })

$ProofPath = Join-Path $ProofDir "LUMEN_INCREMENTAL_SCAN_PROOF_$Now.json"
[pscustomobject]@{
    timestamp = (Get-Date -Format "o")
    root = $Root
    totalFiles = @($Current).Count
    changedOrNewFiles = $Changed.Count
    output = $OutPath
    mode = "incremental-no-full-rehash"
} | ConvertTo-Json -Depth 8 | Set-Content -Path $ProofPath -Encoding UTF8

Write-Host "Incremental scan complete."
Write-Host "Changed/new files: $($Changed.Count)"
Write-Host "Manifest: $OutPath"
Write-Host "Proof: $ProofPath"
