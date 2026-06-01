$ErrorActionPreference='Stop'
$Root='C:\Users\user\brianco-backend-clean'
$ThemeOverlayDir='C:\Users\user\brianco-backend-clean\_brianco_safe_overlay\theme_overlay'
$BackupsDir='C:\Users\user\brianco-backend-clean\_brianco_safe_overlay\theme_backups'
$ReportsDir='C:\Users\user\brianco-backend-clean\_brianco_safe_overlay\reports'
$Stamp=Get-Date -Format 'yyyyMMdd_HHmmss'

$ThemeRoot = Get-ChildItem $Root -Recurse -Directory -Force -ErrorAction SilentlyContinue |
  Where-Object { (Test-Path (Join-Path $_.FullName 'layout\theme.liquid')) -and (Test-Path (Join-Path $_.FullName 'templates')) } |
  Select-Object -First 1 -ExpandProperty FullName

if(-not $ThemeRoot){ throw 'No local Shopify theme folder found under project.' }

$Backup=Join-Path $BackupsDir "theme_backup_$Stamp"
New-Item -ItemType Directory -Force -Path $Backup | Out-Null

$Layout=Join-Path $ThemeRoot 'layout\theme.liquid'
$Snippets=Join-Path $ThemeRoot 'snippets'
$Assets=Join-Path $ThemeRoot 'assets'
New-Item -ItemType Directory -Force -Path $Snippets,$Assets | Out-Null

Copy-Item $Layout (Join-Path $Backup 'theme.liquid.backup') -Force

Copy-Item (Join-Path $ThemeOverlayDir 'brianco-realtime-overlay.liquid') (Join-Path $Snippets 'brianco-realtime-overlay.liquid') -Force
Copy-Item (Join-Path $ThemeOverlayDir 'brianco-realtime-overlay.js') (Join-Path $Assets 'brianco-realtime-overlay.js') -Force
Copy-Item (Join-Path $ThemeOverlayDir 'brianco-realtime-overlay.css') (Join-Path $Assets 'brianco-realtime-overlay.css') -Force

$Text=Get-Content $Layout -Raw
if($Text -notmatch 'brianco-realtime-overlay'){
  $Insert="
{% render 'brianco-realtime-overlay' %}
"
  if($Text -match '</body>'){ $Text=$Text -replace '</body>',"$Insert</body>" } else { $Text+=$Insert }
  Set-Content $Layout $Text -Encoding UTF8
}

@{
  ok=$true
  time=(Get-Date -Format o)
  themeRoot=$ThemeRoot
  backup=$Backup
  protectedConnectionsChanged=$false
  productsCollectionsChanged=$false
} | ConvertTo-Json -Depth 8 | Set-Content (Join-Path $ReportsDir "THEME_OVERLAY_INSTALL_$Stamp.json") -Encoding UTF8

Write-Host 'Brian & Co theme overlay installed safely with backup.' -ForegroundColor Green
Write-Host $Backup -ForegroundColor Cyan
