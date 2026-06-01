$ErrorActionPreference='Stop'
$Root='C:\Users\user\brianco-backend-clean';$Theme='C:\Users\user\brianco-backend-clean\_brianco_safe_overlay\theme_overlay';$Backups='C:\Users\user\brianco-backend-clean\_brianco_safe_overlay\theme_backups';$Reports='C:\Users\user\brianco-backend-clean\_brianco_safe_overlay\reports';$Stamp=Get-Date -Format 'yyyyMMdd_HHmmss'
$ThemeRoot=Get-ChildItem $Root -Recurse -Directory -Force -ErrorAction SilentlyContinue|Where-Object{(Test-Path (Join-Path $_.FullName 'layout\theme.liquid')) -and (Test-Path (Join-Path $_.FullName 'templates'))}|Select-Object -First 1 -ExpandProperty FullName
if(-not $ThemeRoot){throw 'No local Shopify theme folder found.'}
$Backup=Join-Path $Backups "last20_theme_backup_$Stamp";New-Item -ItemType Directory -Force -Path $Backup|Out-Null
$Layout=Join-Path $ThemeRoot 'layout\theme.liquid';$Snips=Join-Path $ThemeRoot 'snippets';$Assets=Join-Path $ThemeRoot 'assets'
New-Item -ItemType Directory -Force -Path $Snips,$Assets|Out-Null
Copy-Item $Layout (Join-Path $Backup 'theme.liquid.backup') -Force
Copy-Item (Join-Path $Theme 'brianco-last20-command-center.liquid') (Join-Path $Snips 'brianco-last20-command-center.liquid') -Force
Copy-Item (Join-Path $Theme 'brianco-last20-command-center.css') (Join-Path $Assets 'brianco-last20-command-center.css') -Force
Copy-Item (Join-Path $Theme 'brianco-last20-command-center.js') (Join-Path $Assets 'brianco-last20-command-center.js') -Force
$Text=Get-Content $Layout -Raw
if($Text -notmatch 'brianco-last20-command-center'){
  if($Text -match '</body>'){$Text=$Text -replace '</body>',"
{% render 'brianco-last20-command-center' %}
</body>"}else{$Text += "
{% render 'brianco-last20-command-center' %}
"}
  Set-Content $Layout $Text -Encoding UTF8
}
@{ok=$true;time=(Get-Date -Format o);backup=$Backup;protectedTouched=$false}|ConvertTo-Json -Depth 8|Set-Content (Join-Path $Reports "LAST20_THEME_APPLY_$Stamp.json") -Encoding UTF8
