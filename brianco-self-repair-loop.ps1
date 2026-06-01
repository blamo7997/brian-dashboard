$ErrorActionPreference = "Continue"
$baseUrl = "https://brianco-backend-clean.vercel.app"
$projectDir = "C:\Users\user\brianco-backend-clean"
$logDir = "$projectDir\logs"
New-Item -ItemType Directory -Force -Path $logDir | Out-Null

$checks = @(
  "/api/health",
  "/api/products",
  "/api/collections",
  "/api/storefront-feed",
  "/api/founder-status",
  "/api/auth-options",
  "/api/risk-score",
  "/api/accessibility-localization",
  "/api/seo-status",
  "/api/digital-delivery",
  "/api/status"
)

function Run-Fix {
  Set-Location $projectDir

  "Running safe repair layer..." | Tee-Object -FilePath $global:log -Append

  try { vercel env pull ".env.repair-check" --environment=production --yes | Out-Null } catch {}

  if (Test-Path ".env.repair-check") {
    $envText = Get-Content ".env.repair-check" -Raw
    if ($envText -notmatch "SHOPIFY_STORE_DOMAIN=" -or $envText -notmatch "SHOPIFY_ADMIN_API_TOKEN=") {
      "Shopify env vars missing from Vercel production." | Tee-Object -FilePath $global:log -Append
    }
    Remove-Item ".env.repair-check" -Force -ErrorAction SilentlyContinue
  }

  try { vercel --prod | Tee-Object -FilePath $global:log -Append } catch {
    "Redeploy failed: $($_.Exception.Message)" | Tee-Object -FilePath $global:log -Append
  }
}

while ($true) {
  $stamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
  $global:log = Join-Path $logDir "brianco-self-repair-$stamp.txt"
  $failed = $false

  "=== Brian & Co Self-Repair Check: $stamp ===" | Tee-Object -FilePath $global:log

  foreach ($path in $checks) {
    $url = "$baseUrl$path"
    "`n--- $url ---" | Tee-Object -FilePath $global:log -Append

    try {
      $result = vercel curl $url 2>&1 | Out-String
      $result | Tee-Object -FilePath $global:log -Append

      if (
        $result -match '"ok"\s*:\s*false' -or
        $result -match 'FUNCTION_INVOCATION_FAILED' -or
        $result -match 'INTERNAL_SERVER_ERROR' -or
        $result -match 'Missing Shopify env' -or
        $result -match 'Missing SHOPIFY' -or
        $result -match '404'
      ) {
        $failed = $true
        "FAILED: $url" | Tee-Object -FilePath $global:log -Append
      }
    }
    catch {
      $failed = $true
      "ERROR: $($_.Exception.Message)" | Tee-Object -FilePath $global:log -Append
    }
  }

  if ($failed) {
    Run-Fix

    "`nRechecking after repair..." | Tee-Object -FilePath $global:log -Append
    foreach ($path in $checks) {
      $url = "$baseUrl$path"
      vercel curl $url 2>&1 | Out-String | Tee-Object -FilePath $global:log -Append
    }
  }

  "`nSleeping 5 minutes before next self-repair check..." | Tee-Object -FilePath $global:log -Append
  Start-Sleep -Seconds 300
}
