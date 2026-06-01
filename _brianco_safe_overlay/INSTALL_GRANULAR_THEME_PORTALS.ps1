$ErrorActionPreference='Stop'

$Root='C:\Users\user\brianco-backend-clean'
$ThemeOverlay='C:\Users\user\brianco-backend-clean\_brianco_safe_overlay\theme_overlay'
$Backups='C:\Users\user\brianco-backend-clean\_brianco_safe_overlay\theme_backups'
$Reports='C:\Users\user\brianco-backend-clean\_brianco_safe_overlay\reports'
$Stamp=Get-Date -Format 'yyyyMMdd_HHmmss'

$ThemeRoot = Get-ChildItem $Root -Recurse -Directory -Force -ErrorAction SilentlyContinue |
Where-Object {
    (Test-Path (Join-Path $_.FullName 'layout\theme.liquid')) -and
    (Test-Path (Join-Path $_.FullName 'templates'))
} |
Select-Object -First 1 -ExpandProperty FullName

if(-not $ThemeRoot){
    throw 'No local Shopify theme folder found.'
}

$Backup = Join-Path $Backups "theme_backup_$Stamp"

New-Item -ItemType Directory -Force -Path $Backup | Out-Null

$Layout = Join-Path $ThemeRoot 'layout\theme.liquid'
$Snippets = Join-Path $ThemeRoot 'snippets'
$Assets = Join-Path $ThemeRoot 'assets'

New-Item -ItemType Directory -Force -Path $Snippets,$Assets | Out-Null

Copy-Item $Layout (Join-Path $Backup 'theme.liquid.backup') -Force

Copy-Item (Join-Path $ThemeOverlay 'brianco-command-center.liquid') (Join-Path $Snippets 'brianco-command-center.liquid') -Force
Copy-Item (Join-Path $ThemeOverlay 'brianco-command-center.css') (Join-Path $Assets 'brianco-command-center.css') -Force
Copy-Item (Join-Path $ThemeOverlay 'brianco-command-center.js') (Join-Path $Assets 'brianco-command-center.js') -Force

$Text = Get-Content $Layout -Raw

if($Text -notmatch 'brianco-command-center'){
    $Text = $Text -replace '</body>',"
{% render 'brianco-command-center' %}
</body>"
    Set-Content $Layout $Text -Encoding UTF8
}

@{
    ok=$true
    createdAt=(Get-Date -Format o)
    themeRoot=$ThemeRoot
    backup=$Backup
    protectedTouched=$false
} |
ConvertTo-Json -Depth 8 |
Set-Content (Join-Path $Reports "THEME_INSTALL_$Stamp.json") -Encoding UTF8

Write-Host 'Brian & Co theme overlay installed safely.' -ForegroundColor Green
