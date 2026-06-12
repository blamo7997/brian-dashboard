#requires -Version 7.6
Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$RepoRoot = Split-Path -Parent $PSScriptRoot

$RequiredContainers = @(
  "000_START_HERE",
  "001_MASTER_INDEX",
  "003_MANIFESTS",
  "004_ACTIVE_PROJECT",
  "021_NEXT_WORK",
  "022_LINEAGE",
  "026_RECOVERY",
  "028_EXPORT_PACKETS",
  "031_CANONICAL_RECORDS",
  "041_REPOSITORY_CONSTITUTION",
  "048_PRESERVATION_LAWS",
  "071_LUMEN_UNIVERSAL_CONNECTION",
  "090_LUMEN_UNIFIED_CONSTITUTION",
  "591_ACTIVE_LOAD_PACKET",
  "592_CANONICAL_POINTER_INDEX",
  "593_COMPACT_TRANSFER_PACKET",
  "594_CHECKSUM_INDEX",
  "595_SEARCH_INDEX_COMPACT",
  "596_ARCHIVE_POINTER_MAP",
  "600_TRANSFER_BUNDLES",
  "620_NEXT_PROJECT_OPTIMIZED",
  "621_COMPLETENESS_AUDIT",
  "622_RULE_COVERAGE_AUDIT",
  "624_DUPLICATE_AUTHORITY_AUDIT",
  "625_PLACEHOLDER_DEPTH_AUDIT",
  "632_OS_WEBSITE_VAULT_BRIDGE_AUDIT",
  "640_UNKNOWN_TO_MEASURED_SCORECARD",
  "641_GAP_CLOSURE_QUEUE",
  "650_NEXT_AUDIT_PACKET",
  "651_OS_WEBSITE_PERMISSION_RULE",
  "652_FOUNDER_PRIVATE_BOUNDARY",
  "653_WEBSITE_VERSION_ACCESS_MODEL",
  "654_LUMEN_WEBSITE_EDITING_AUTHORITY",
  "655_VAULT_FIRST_INFORMATION_FLOW",
  "656_VETTED_WEB_RESULT_POLICY",
  "657_USER_INTERACTION_TIMESTAMPING",
  "658_PERMISSIONED_RESULT_FILTERING",
  "659_OS_WEBSITE_VAULT_SECURITY_AUDIT",
  "660_FOUNDER_USER_SEPARATION_VALIDATION",
  "661_CANONICAL_IDENTITY_MODEL",
  "662_CANONICAL_AUTHORITY_MODEL",
  "663_CANONICAL_PERMISSION_REGISTRY",
  "664_CANONICAL_OBJECT_REGISTRY",
  "665_CANONICAL_ENTITLEMENT_MODEL",
  "666_CANONICAL_VAULT_SCHEMA",
  "667_CANONICAL_AUDIT_SCHEMA",
  "668_CANONICAL_TRUST_BOUNDARIES",
  "669_CANONICAL_DATA_CLASSIFICATION",
  "670_CANONICAL_ACCESS_DECISION_ENGINE",
  "700_CANONICAL_AUTHORITY_ROOT",
  "751_IMPLEMENTATION_CONTRACT_ROOT",
  "800_CANONICAL_IMPLEMENTATION_GATE",
  "801_AUTHORITY_CONSISTENCY_AUDIT",
  "802_AUTHORITY_CONFLICT_ENGINE",
  "803_RELATIONSHIP_INTEGRITY_ENGINE",
  "804_DEPENDENCY_SOVEREIGNTY_ENGINE",
  "805_CANONICAL_COVERAGE_ENGINE",
  "806_PERMISSION_BOUNDARY_AUDIT",
  "807_FOUNDER_BOUNDARY_AUDIT",
  "808_USER_ISOLATION_AUDIT",
  "809_TRUST_BOUNDARY_AUDIT",
  "810_TRUST_GRAPH_ENGINE",
  "850_SEMANTIC_GOVERNANCE_ROOT",
  "851_MISSION_ASSURANCE_ROOT",
  "852_REQUIREMENTS_TRACEABILITY_ENGINE",
  "853_FAILURE_MODE_REGISTRY",
  "854_FAILURE_MODE_EFFECTS_AUDIT",
  "855_SAFETY_CASE_MODEL",
  "856_OPERATIONAL_RISK_MODEL",
  "857_MISSION_CONTINUITY_MODEL",
  "858_MISSION_RECOVERY_MODEL",
  "859_MISSION_ROLLBACK_MODEL",
  "860_MISSION_EVIDENCE_MODEL",
  "900_MISSION_ASSURANCE_GATE",
  "901_ENFORCEMENT_ROOT",
  "902_POLICY_ENFORCEMENT_POINT",
  "903_POLICY_DECISION_POINT",
  "904_POLICY_INFORMATION_POINT",
  "905_POLICY_ADMINISTRATION_POINT",
  "906_IDENTITY_ENFORCEMENT",
  "907_AUTHORITY_ENFORCEMENT",
  "908_PERMISSION_ENFORCEMENT",
  "950_ENFORCEMENT_GATE",
  "951_CONTINUOUS_VALIDATION_ROOT",
  "952_CONTINUOUS_AUTHORITY_SCAN",
  "953_CONTINUOUS_PERMISSION_SCAN",
  "954_CONTINUOUS_TRUST_BOUNDARY_SCAN",
  "955_CONTINUOUS_FOUNDER_BOUNDARY_SCAN",
  "956_CONTINUOUS_USER_SANDBOX_SCAN",
  "1000_INSTITUTION_CLASS_GOVERNANCE_GATE"
)

foreach ($dir in $RequiredContainers) {
  $path = Join-Path $RepoRoot $dir
  if (-not (Test-Path $path)) {
    throw "Missing required container: $dir"
  }
}

$GeneratedContainers = @(
  Get-ChildItem $RepoRoot -Directory |
  Where-Object { $_.Name -match '^\d{3}_' -and [int]($_.Name.Substring(0,3)) -ge 91 -and [int]($_.Name.Substring(0,3)) -le 590 }
)

if ($GeneratedContainers.Count -lt 500) {
  throw "Expected at least 500 generated containers from 091-590, found $($GeneratedContainers.Count)."
}

$InstitutionContainers = @(
  Get-ChildItem $RepoRoot -Directory |
  Where-Object { $_.Name -match '^\d{3}_' -and [int]($_.Name.Substring(0,3)) -ge 801 -and [int]($_.Name.Substring(0,3)) -le 1000 }
)

$InstitutionClass1000 = Test-Path (Join-Path $RepoRoot "1000_INSTITUTION_CLASS_GOVERNANCE_GATE")

if ($InstitutionContainers.Count -ne 200 -or -not $InstitutionClass1000) {
  throw "Expected 200 counted institution-class containers from 801-999 plus 1000_INSTITUTION_CLASS_GOVERNANCE_GATE; found 801-999 count $($InstitutionContainers.Count), 1000 present: $InstitutionClass1000."
}

$OptimizedArtifacts = @(
  @{ Dir="591_ACTIVE_LOAD_PACKET"; Filter="ACTIVE_LOAD_PACKET_*.md" },
  @{ Dir="592_CANONICAL_POINTER_INDEX"; Filter="CANONICAL_POINTER_INDEX_*.json" },
  @{ Dir="593_COMPACT_TRANSFER_PACKET"; Filter="COMPACT_TRANSFER_PACKET_*.md" },
  @{ Dir="594_CHECKSUM_INDEX"; Filter="CHECKSUM_INDEX_*.json" },
  @{ Dir="595_SEARCH_INDEX_COMPACT"; Filter="SEARCH_INDEX_COMPACT_*.json" },
  @{ Dir="596_ARCHIVE_POINTER_MAP"; Filter="ARCHIVE_POINTER_MAP_*.json" },
  @{ Dir="600_TRANSFER_BUNDLES"; Filter="COMPACT_TRANSFER_BUNDLE_*.zip" },
  @{ Dir="620_NEXT_PROJECT_OPTIMIZED"; Filter="NEXT_PROJECT_OPTIMIZED_START.md" }
)

foreach ($artifact in $OptimizedArtifacts) {
  $latest = Get-ChildItem (Join-Path $RepoRoot $artifact.Dir) -File -Filter $artifact.Filter |
    Sort-Object LastWriteTimeUtc -Descending |
    Select-Object -First 1

  if (-not $latest) {
    throw "Missing optimized artifact: $($artifact.Dir)\$($artifact.Filter)"
  }
}

$AuthorityShardContainers = @(
  Get-ChildItem $RepoRoot -Directory |
  Where-Object { $_.Name -match '^\d{3}_AUTHORITY_RECORD_SHARD_' -and [int]($_.Name.Substring(0,3)) -ge 701 -and [int]($_.Name.Substring(0,3)) -le 750 }
)

if ($AuthorityShardContainers.Count -ne 50) {
  throw "Expected 50 authority shard containers 701-750, found $($AuthorityShardContainers.Count)."
}

$AuthorityRecordCount = 0

foreach ($shard in $AuthorityShardContainers) {
  $latest = Get-ChildItem $shard.FullName -File -Filter "AUTHORITY_RECORD_SHARD_*.json" |
    Sort-Object LastWriteTimeUtc -Descending |
    Select-Object -First 1

  if (-not $latest) {
    throw "Missing authority shard JSON in $($shard.Name)."
  }

  $json = Get-Content -LiteralPath $latest.FullName -Raw | ConvertFrom-Json
  $AuthorityRecordCount += @($json.Records).Count
}

if ($AuthorityRecordCount -ne 5000) {
  throw "Expected exactly 5000 authority records, found $AuthorityRecordCount."
}

$CriticalTextChecks = @(
  @{ Path="850_SEMANTIC_GOVERNANCE_ROOT\SEMANTIC_GOVERNANCE_ROOT.md"; Pattern="Existence is not enough" },
  @{ Path="900_MISSION_ASSURANCE_GATE\MISSION_ASSURANCE_GATE.md"; Pattern="requirements traceability" },
  @{ Path="950_ENFORCEMENT_GATE\ENFORCEMENT_GATE.md"; Pattern="contract-only" },
  @{ Path="1000_INSTITUTION_CLASS_GOVERNANCE_GATE\INSTITUTION_CLASS_GOVERNANCE_GATE.md"; Pattern="Institution-class" }
)

foreach ($check in $CriticalTextChecks) {
  $path = Join-Path $RepoRoot $check.Path
  if (-not (Test-Path $path)) {
    throw "Missing critical institution file: $($check.Path)"
  }

  $text = Get-Content -LiteralPath $path -Raw
  if ($text -notmatch [regex]::Escape($check.Pattern)) {
    throw "Critical institution file missing pattern '$($check.Pattern)': $($check.Path)"
  }
}

$Contamination = Get-ChildItem $RepoRoot -Recurse -File -Include *.md |
  Where-Object {
    Select-String -LiteralPath $_.FullName -Pattern "^PS\s+|^>>|^\s*>>" -Quiet -ErrorAction SilentlyContinue
  }

if ($Contamination) {
  Write-Host "Potential copied-console contamination found:"
  $Contamination | Select-Object FullName
  throw "Validation failed due to copied console prompts."
}

Write-Host "Validation passed."
Write-Host "Generated 091-590 containers found: $($GeneratedContainers.Count)"
Write-Host "Optimized artifacts present."
Write-Host "Canonical authority foundation present."
Write-Host "Authority shard containers found: $($AuthorityShardContainers.Count)"
Write-Host "Authority records found: $AuthorityRecordCount"
Write-Host "Implementation contract layer 751-800 present."
Write-Host "Institution-class governance containers 801-999 found: $($InstitutionContainers.Count); 1000 gate present: $InstitutionClass1000"
Write-Host "Semantic governance, mission assurance, enforcement, and continuous validation roots present."

# Digital twin / institutional benchmarking layer check added 20260610-235724
$DigitalTwinRequired = @(
  "1001_DIGITAL_TWIN_ROOT",
  "1002_PROJECT_DIGITAL_TWINS",
  "1003_ARCHITECTURE_DIGITAL_TWINS",
  "1004_LUMEN_OS_DIGITAL_TWINS",
  "1005_WEBSITE_DIGITAL_TWINS",
  "1006_WEBSITE_VERSION_DIGITAL_TWINS",
  "1007_VAULT_DIGITAL_TWINS",
  "1008_SECURITY_DIGITAL_TWINS",
  "1009_PERMISSION_DIGITAL_TWINS",
  "1010_USER_EXPERIENCE_DIGITAL_TWINS",
  "1015_INSTITUTIONAL_BENCHMARKING",
  "1016_GLOBAL_PUBLIC_RESEARCH_SCAN_MODEL",
  "1020_DIGITAL_TWIN_SUPREMACY_GATE"
)

foreach ($dir in $DigitalTwinRequired) {
  $path = Join-Path $RepoRoot $dir
  if (-not (Test-Path $path)) {
    throw "Missing digital twin / institutional benchmarking container: $dir"
  }
}

Write-Host "Digital twin and institutional benchmarking layer 1001-1020 present."




# Full-context uploaded transcript evidence check added 20260611-002144
$FullContextRequired = @(
  "1021_RAW_TRANSFER_INGEST",
  "1022_EVERY_CHARACTER_EVIDENCE",
  "1023_NO_BYPASS_HARD_RULE",
  "1024_FULL_CONTEXT_APPLICATION",
  "1025_TRANSFER_EVIDENCE_VALIDATION"
)

foreach ($dir in $FullContextRequired) {
  $path = Join-Path $RepoRoot $dir
  if (-not (Test-Path $path)) {
    throw "Missing full-context transfer evidence container: $dir"
  }
}

Write-Host "Full-context uploaded transcript evidence layer 1021-1025 present."

# Dynamic ever-evolving per-user layer check added 20260611-002916
$DynamicEvolutionRequired = @(
  "1041_DYNAMIC_EVOLUTION_ROOT",
  "1042_PER_USER_DYNAMIC_MODEL",
  "1043_DYNAMIC_WEBSITE_MODEL",
  "1044_DYNAMIC_LUMEN_OS_MODEL",
  "1045_DYNAMIC_ONLINE_LUMEN_ACCESS",
  "1046_DYNAMIC_VAULT_REFERENCE_MODEL",
  "1047_DYNAMIC_ARCHITECTURE_MODEL",
  "1048_DYNAMIC_PERMISSION_ADAPTATION",
  "1049_DYNAMIC_LIVING_TWIN_FEEDBACK",
  "1050_DYNAMIC_EVER_EVOLVING_GATE"
)

foreach ($dir in $DynamicEvolutionRequired) {
  $path = Join-Path $RepoRoot $dir
  if (-not (Test-Path $path)) {
    throw "Missing dynamic ever-evolving container: $dir"
  }
}

Write-Host "Dynamic ever-evolving per-user layer 1041-1050 present."

# Dynamic semantic simulation and scorecard layer check added 20260611-003628
$DynamicSemanticSimulationRequired = @(
  "1051_DYNAMIC_SEMANTIC_SIMULATION_ROOT",
  "1052_AUTHORITY_SIMULATION_ENGINE",
  "1053_PERMISSION_SIMULATION_ENGINE",
  "1054_FOUNDER_BOUNDARY_SIMULATION",
  "1055_USER_ISOLATION_SIMULATION",
  "1056_VAULT_FIRST_SIMULATION",
  "1057_WEBSITE_ACCESS_SIMULATION",
  "1058_OS_ACCESS_SIMULATION",
  "1059_ONLINE_LUMEN_ACCESS_SIMULATION",
  "1060_LIVING_TWIN_SCENARIO_REGISTRY",
  "1067_PER_USER_POLICY_PACKS",
  "1070_DYNAMIC_EVIDENCE_SCORECARD",
  "1071_SEMANTIC_CONFLICT_SCORECARD",
  "1072_PERMISSION_SAFETY_SCORECARD",
  "1073_FOUNDER_PROTECTION_SCORECARD",
  "1074_USER_SANDBOX_SCORECARD",
  "1075_VAULT_INTEGRITY_SCORECARD",
  "1076_LIVING_TWIN_READINESS_SCORECARD",
  "1077_DYNAMIC_RELEASE_READINESS_SCORECARD",
  "1078_CONTINUOUS_IMPROVEMENT_LEDGER",
  "1079_GLOBAL_BENCHMARK_DELTA_LEDGER",
  "1080_DYNAMIC_SUPERIORITY_GATE"
)

foreach ($dir in $DynamicSemanticSimulationRequired) {
  $path = Join-Path $RepoRoot $dir
  if (-not (Test-Path $path)) {
    throw "Missing dynamic semantic simulation container: $dir"
  }
}

Write-Host "Dynamic semantic simulation and scorecard layer 1051-1080 present."

# Runtime implemented 100 layer check added 20260611-004659
$RuntimeImplementedRequired = @(
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
  "1091_RUNTIME_ENFORCEMENT_STATE_REGISTRY",
  "1092_RUNTIME_SCORECARD_100",
  "1095_RUNTIME_TEST_HARNESS",
  "1096_RUNTIME_SIMULATION_CASES",
  "1097_RUNTIME_PROOF_REPORTS",
  "1098_RUNTIME_NO_BYPASS_GATE",
  "1099_RUNTIME_TO_PRODUCTION_GATE",
  "1100_OPERATIONAL_100_MATURITY_GATE"
)

foreach ($dir in $RuntimeImplementedRequired) {
  $path = Join-Path $RepoRoot $dir
  if (-not (Test-Path $path)) {
    throw "Missing runtime implemented 100 container: $dir"
  }
}

$HarnessPath = Join-Path $RepoRoot "1095_RUNTIME_TEST_HARNESS\RUN_RUNTIME_PROOF_HARNESS.ps1"
if (-not (Test-Path $HarnessPath)) {
  throw "Missing runtime proof harness."
}

Write-Host "Runtime implemented 100 layer 1081-1100 present."

# URL-aligned repository layer check added 20260611-010507
$UrlAlignedRequired = @(
  "1101_URL_ALIGNED_REPOSITORY_ROOT",
  "1102_LUMENTECHNOLOGIES_SOLUTIONS_CANONICAL_HOME",
  "1103_URL_TO_REPOSITORY_LINEAGE",
  "1104_NEW_PROJECT_TRANSFER_GATE",
  "1105_CANONICAL_START_NEW_PROJECT_PACKET",
  "1106_TRANSFER_UPLOAD_BUNDLE_INDEX",
  "1107_URL_ALIGNED_VALIDATION_RECORD",
  "1108_REPOSITORY_MOVE_EVIDENCE",
  "1109_NEW_CHATGPT_PROJECT_READY_STATE",
  "1110_URL_ALIGNED_CONTINUITY_GATE"
)

foreach ($dir in $UrlAlignedRequired) {
  $path = Join-Path $RepoRoot $dir
  if (-not (Test-Path $path)) {
    throw "Missing URL-aligned repository container: $dir"
  }
}

Write-Host "URL-aligned repository layer 1101-1110 present."

# Final handoff foundation layer check added 20260611-103636
$FinalHandoffRequired = @(
  "1111_MASTER_PROJECT_TRANSFER_ROOT",
  "1112_FOUNDER_DIRECTIVES_MASTER_INDEX",
  "1113_LUMEN_OS_MASTER_INDEX",
  "1114_LUMEN_WEBSITE_MASTER_INDEX",
  "1115_LUMEN_VAULT_MASTER_INDEX",
  "1116_LIVING_TWIN_MASTER_INDEX",
  "1117_RUNTIME_MASTER_INDEX",
  "1118_CANONICAL_STARTING_STATE",
  "1119_NEW_PROJECT_IMPORT_PACKET",
  "1120_TRANSFER_COMPLETION_GATE"
)

foreach ($dir in $FinalHandoffRequired) {
  $path = Join-Path $RepoRoot $dir
  if (-not (Test-Path $path)) {
    throw "Missing final handoff foundation container: $dir"
  }
}

Write-Host "Final handoff foundation layer 1111-1120 present."

# Vault repository unification layer check added 20260611-130300
$VaultUnificationRequired = @(
  "1121_VAULT_AUTHORITY_ROOT",
  "1122_VAULT_OBJECT_REGISTRY",
  "1123_VAULT_EVIDENCE_REGISTRY",
  "1124_VAULT_LINEAGE_REGISTRY",
  "1125_VAULT_ARCHITECTURE_REGISTRY",
  "1126_VAULT_RUNTIME_REGISTRY",
  "1127_VAULT_DIGITAL_TWIN_REGISTRY",
  "1128_VAULT_LIVING_TWIN_REGISTRY",
  "1129_VAULT_PROOF_REGISTRY",
  "1130_VAULT_GOVERNANCE_GATE",
  "1131_VAULT_FIRST_QUERY_RULE",
  "1132_VAULT_PERMISSION_BOUNDARY",
  "1133_VAULT_FOUNDER_PRIVATE_BOUNDARY",
  "1134_VAULT_USER_ISOLATION_BOUNDARY",
  "1135_VAULT_APPROVAL_LEDGER",
  "1136_VAULT_TIMESTAMP_LEDGER",
  "1137_VAULT_TRANSFER_LEDGER",
  "1138_VAULT_RUNTIME_PROOF_LEDGER",
  "1139_VAULT_ARCHITECTURE_PROOF_LEDGER",
  "1140_REPOSITORY_VAULT_UNIFICATION_GATE"
)

foreach ($dir in $VaultUnificationRequired) {
  $path = Join-Path $RepoRoot $dir
  if (-not (Test-Path $path)) {
    throw "Missing Vault repository unification container: $dir"
  }
}

Write-Host "Vault repository unification layer 1121-1140 present."

# Continuous stream per-user repository layer check added 20260611-132437
$ContinuousStreamRequired = @(
  "1141_CONTINUOUS_STREAM_ROOT",
  "1142_NO_PROJECT_SILO_RULE",
  "1143_AUTOMATIC_CONTINUITY_STREAM",
  "1144_PER_USER_REPOSITORY_MODEL",
  "1145_PER_USER_VAULT_MODEL",
  "1146_USER_ISOLATED_CONTINUITY_SPACE",
  "1147_SEAMLESS_OS_WEBSITE_VAULT_STREAM",
  "1148_AUTOMATIC_TIMESTAMP_LINEAGE_STREAM",
  "1149_CONTINUOUS_VALIDATION_STREAM",
  "1150_CONTINUOUS_STREAM_GOVERNANCE_GATE"
)

foreach ($dir in $ContinuousStreamRequired) {
  $path = Join-Path $RepoRoot $dir
  if (-not (Test-Path $path)) {
    throw "Missing continuous stream per-user repository container: $dir"
  }
}

Write-Host "Continuous stream per-user repository layer 1141-1150 present."

# Seamless auto-repair continuity layer check added 20260611-134258
$SeamlessAutoRepairRequired = @(
  "1151_SEAMLESS_EXPERIENCE_ROOT",
  "1152_ZERO_LAG_LATENCY_RULE",
  "1153_NO_RELOAD_NO_INTERRUPTION_RULE",
  "1154_CONTINUOUS_ERROR_DETECTION",
  "1155_RED_OUTPUT_REPAIR_RULE",
  "1156_MICRO_DEFECT_CAPTURE",
  "1157_AUTO_REPAIR_AND_RETEST_ENGINE",
  "1158_USER_CHANGE_REVIEW_STREAM",
  "1159_COMPATIBILITY_CONTINUITY_VALIDATOR",
  "1160_SEAMLESS_CONTINUITY_GATE"
)

foreach ($dir in $SeamlessAutoRepairRequired) {
  $path = Join-Path $RepoRoot $dir
  if (-not (Test-Path $path)) {
    throw "Missing seamless auto-repair continuity container: $dir"
  }
}

Write-Host "Seamless auto-repair continuity layer 1151-1160 present."

# Protected Repository/Vault data governance layer check added 20260611-144150
$ProtectedRepoVaultRequired = @(
  "1181_PROTECTED_REPOSITORY_VAULT_DATA_GOVERNANCE",
  "1182_REPOSITORY_TO_VAULT_ROUTING_RULE",
  "1183_PROTECTED_DATA_AUTHORITY_MODEL",
  "1184_PERMISSION_SAFE_CHANGE_CONTROL",
  "1185_ARCHIVE_BEFORE_DELETE_ENFORCEMENT",
  "1186_IMMUTABLE_LINEAGE_AUDIT_TRAIL",
  "1187_VAULT_PROTECTED_REFERENCE_INDEX",
  "1188_USER_ISOLATED_DATA_GOVERNANCE",
  "1189_FOUNDER_PRIVATE_DATA_GOVERNANCE",
  "1190_REPOSITORY_VAULT_DATA_GOVERNANCE_GATE"
)

foreach ($dir in $ProtectedRepoVaultRequired) {
  $path = Join-Path $RepoRoot $dir
  if (-not (Test-Path $path)) {
    throw "Missing protected Repository/Vault data governance container: $dir"
  }
}

Write-Host "Protected Repository/Vault data governance layer 1181-1190 present."
