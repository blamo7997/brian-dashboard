# Brian & Co Command Center Local Watch Scaffold
# Safe read-only/local scaffold. Does not touch Shopify, OAuth, payments, or secrets.

$ErrorActionPreference = "Stop"
$Root = "C:\Users\user\brianco-backend-clean"
$CCRoot = Join-Path $Root "brianco-command-center"
$MetricsPath = "$CCRoot\data\engine\metrics\current-command-center-metrics.json"
$LogPath = "$CCRoot\data\engine\watch\watch-log.txt"

"[$(Get-Date -Format o)] Command Center watch scaffold started. Protected local mode only." | Add-Content $LogPath

while ($true) {
  try {
    $status = @{
      checked_at = (Get-Date).ToString("o")
      mode = "protected-local-watch"
      metrics_file_exists = (Test-Path $MetricsPath)
      products_untouched = $true
      oauth_untouched = $true
      payments_untouched = $true
      backend_secrets_untouched = $true
      note = "This loop only records local heartbeat status."
    }

    $status | ConvertTo-Json -Depth 10 | Set-Content "$CCRoot\data\engine\watch\latest-heartbeat.json" -Encoding UTF8
    "[$(Get-Date -Format o)] Heartbeat written. Protected systems untouched." | Add-Content $LogPath
  }
  catch {
    "[$(Get-Date -Format o)] ERROR: $($_.Exception.Message)" | Add-Content $LogPath
  }

  Start-Sleep -Seconds 60
}
