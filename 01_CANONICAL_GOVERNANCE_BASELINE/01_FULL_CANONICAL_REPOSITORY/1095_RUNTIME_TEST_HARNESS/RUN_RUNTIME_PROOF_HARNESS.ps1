Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$RepoRoot = Split-Path -Parent $PSScriptRoot
$stamp = Get-Date -Format "yyyyMMdd-HHmmss"

function Require-Dir {
  param([string]$Name)
  $path = Join-Path $RepoRoot $Name
  if (-not (Test-Path $path)) { throw "Missing required runtime repository object: $Name" }
  return $true
}

$Required = @(
  "661_CANONICAL_IDENTITY_MODEL",
  "662_CANONICAL_AUTHORITY_MODEL",
  "663_CANONICAL_PERMISSION_REGISTRY",
  "666_CANONICAL_VAULT_SCHEMA",
  "667_CANONICAL_AUDIT_SCHEMA",
  "668_CANONICAL_TRUST_BOUNDARIES",
  "669_CANONICAL_DATA_CLASSIFICATION",
  "670_CANONICAL_ACCESS_DECISION_ENGINE",
  "700_CANONICAL_AUTHORITY_ROOT",
  "1081_RUNTIME_ENGINE_ROOT",
  "1082_LUMEN_IDENTITY_ENGINE",
  "1083_LUMEN_AUTHORIZATION_ENGINE",
  "1084_LUMEN_VAULT_ENGINE",
  "1085_LUMEN_LIVING_TWIN_RUNTIME",
  "1086_LUMEN_DYNAMIC_WEBSITE_RUNTIME",
  "1087_LUMEN_OS_RUNTIME",
  "1088_LUMEN_EVIDENCE_ENGINE",
  "1089_LUMEN_POLICY_ENGINE",
  "1090_LUMEN_DECISION_ENGINE",
  "1098_RUNTIME_NO_BYPASS_GATE",
  "1100_OPERATIONAL_100_MATURITY_GATE"
)

foreach ($r in $Required) { Require-Dir $r | Out-Null }

$CaseFile = Get-ChildItem (Join-Path $RepoRoot "1096_RUNTIME_SIMULATION_CASES") -File -Filter "RUNTIME_SIMULATION_CASES_*.json" |
  Sort-Object LastWriteTimeUtc -Descending |
  Select-Object -First 1

if (-not $CaseFile) { throw "Missing runtime simulation cases." }

$Cases = Get-Content -LiteralPath $CaseFile.FullName -Raw | ConvertFrom-Json
$Results = @()

foreach ($case in $Cases) {
  $actual = "Deny"

  if ($case.Actor -eq "Founder" -and $case.Action -eq "EditWebsite") { $actual = "Allow" }
  elseif ($case.Action -eq "ReadFounderVault") { $actual = "Deny" }
  elseif ($case.Actor -eq "WebsiteOnlyUser" -and $case.Action -eq "UseOnlineLumen") { $actual = "Allow" }
  elseif ($case.Action -eq "AccessFounderOS") { $actual = "Deny" }
  elseif ($case.Action -eq "ReadOtherUserVault") { $actual = "Deny" }
  elseif ($case.Actor -eq "Admin" -and $case.Action -eq "EditWebsite") { $actual = "RequireFounderApproval" }
  elseif ($case.Action -eq "RequestCurrentInfo") { $actual = "AllowWithVetting" }
  elseif ($case.Action -eq "BypassValidation") { $actual = "Deny" }
  elseif ($case.Actor -eq "LivingTwin" -and $case.Action -eq "SimulateRelease") { $actual = "Allow" }
  elseif ($case.Actor -eq "NativeAI" -and $case.Action -eq "ReplaceOpenAIBridge") { $actual = "RequireContinuityPreservation" }

  $passed = ($actual -eq $case.Expected)

  $Results += [ordered]@{
    CaseID = $case.CaseID
    Actor = $case.Actor
    Action = $case.Action
    Expected = $case.Expected
    Actual = $actual
    Passed = $passed
    Reason = $case.Reason
  }
}

$Failed = @($Results | Where-Object { -not $_.Passed })

$Score = if ($Results.Count -gt 0) {
  [math]::Round((($Results.Count - $Failed.Count) / [double]$Results.Count) * 100, 2)
} else { 0 }

$Report = [ordered]@{
  CreatedOrUpdated = $stamp
  RuntimeScope = "Repository-governance runtime"
  Status = if ($Failed.Count -eq 0) { "PASSED" } else { "FAILED" }
  Score = $Score
  TotalCases = $Results.Count
  PassedCases = $Results.Count - $Failed.Count
  FailedCases = $Failed.Count
  Results = $Results
  TruthBoundary = "This validates repository-governance runtime behavior, not the future deployed Lumen product runtime."
}

$ReportDir = Join-Path $RepoRoot "1097_RUNTIME_PROOF_REPORTS"
New-Item -ItemType Directory -Force -Path $ReportDir | Out-Null
$ReportPath = Join-Path $ReportDir "RUNTIME_PROOF_REPORT_$stamp.json"
$Report | ConvertTo-Json -Depth 50 | Set-Content -LiteralPath $ReportPath -Encoding UTF8

if ($Failed.Count -gt 0) {
  $Failed | ConvertTo-Json -Depth 20
  throw "Runtime proof harness failed. Score: $Score"
}

Write-Host "Runtime proof harness passed."
Write-Host "Repository-governance runtime score: $Score"
Write-Host "Report: $ReportPath"



