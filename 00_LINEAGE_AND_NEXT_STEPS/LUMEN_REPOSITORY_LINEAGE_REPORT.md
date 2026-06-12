# Lumen Repository Package Lineage Report
Generated: 2026-06-11T21:10:48.128972Z
## Executive Finding
The packages split into three different kinds of assets: (1) canonical governance/specification repository, (2) executable/source-code repository, and (3) small transfer/proof/continuity supplements. The newest and broadest governance source is `LUMEN_GENESIS_FINAL_UPLOAD_20260611-144613.zip`. The strongest actual application/source-code package is `LUMEN_ACTUAL_SOURCE_FOR_NEW_PROJECT.zip`, with `LUMEN_UPLOAD_THIS_TO_NEW_PROJECT_20260610_031736.zip` retaining a larger vault_records archive that should be preserved as supplemental evidence rather than overwritten into active source.
## Package Inventory
### Conversation_Continuity_Pack (1).zip
- Size: 666 bytes
- Entries: 2
- Files: 2
- Newest file: `README.txt` at 2026-06-05 12:01:20
- Top roots: `README.txt` (1), `Lumen_Continuity.txt` (1)
- Top extensions: `.txt` (2)

### LUMEN_ACTUAL_SOURCE_FOR_NEW_PROJECT.zip
- Size: 2,151,873 bytes
- Entries: 925
- Files: 860
- Newest file: `lumen-os/docs/security/INSTITUTIONAL_PRELAUNCH_BASELINE.md` at 2026-06-10 00:47:44
- Top roots: `pages` (623), `lumen-os` (100), `api` (28), `lib` (23), `vault` (22), `src` (20), `public` (15), `app` (8)
- Top extensions: `.js` (530), `.tsx` (82), `.ts` (72), `.mjs` (66), `.json` (48), `.md` (18), `.jsx` (10), `.ps1` (7)

### LUMEN_GENESIS_FINAL_UPLOAD_20260611-144613.zip
- Size: 1,866,081 bytes
- Entries: 1,355
- Files: 1,295
- Newest file: `UPLOAD_ME_FIRST_LUMEN_GENESIS_20260611-144613.md` at 2026-06-11 14:47:10
- Top roots: `01_FULL_CANONICAL_REPOSITORY` (1289), `00_START_HERE` (5), `UPLOAD_ME_FIRST_LUMEN_GENESIS_20260611-144613.md` (1)
- Top extensions: `.md` (1118), `.json` (137), `.archive-20260611-011644` (13), `.archive-20260611-103729` (10), `.ps1` (7), `.archive-20260610-180207` (6), `.zip` (2), `.archive-20260611-011943` (1)

### LUMEN_GENESIS_PROTECTED_TRANSFER_20260611-144150.zip
- Size: 35,144 bytes
- Entries: 6
- Files: 6
- Newest file: `UPLOAD_ME_FIRST_LUMEN_GENESIS_20260611-144150.md` at 2026-06-11 14:43:02
- Top roots: `PASTED_CONSOLE_CONTAMINATION_SCAN_20260611-144150.json` (1), `PROTECTED_REPOSITORY_VAULT_DATA_GOVERNANCE_1181_1190_20260611-144150.json` (1), `RUN_RUNTIME_PROOF_HARNESS.ps1` (1), `RUNTIME_PROOF_REPORT_20260611-144157.json` (1), `UPLOAD_ME_FIRST_LUMEN_GENESIS_20260611-144150.md` (1), `VALIDATE_CONTINUITY_REPOSITORY.ps1` (1)
- Top extensions: `.json` (3), `.ps1` (2), `.md` (1)

### LUMEN_SOURCE_TRANSFER_UPLOAD_TO_NEW_PROJECT_20260610_043352.zip
- Size: 1,994,985 bytes
- Entries: 866
- Files: 801
- Newest file: `START_HERE_FOR_NEW_PROJECT.txt` at 2026-06-10 04:34:02
- Top roots: `pages` (623), `lumen-os` (100), `lib` (23), `src` (20), `public` (15), `app` (8), `components` (5), `.env.example` (1)
- Top extensions: `.js` (500), `.tsx` (82), `.ts` (72), `.mjs` (65), `.json` (25), `.md` (17), `.jsx` (10), `.ps1` (6)

### LUMEN_UPLOAD_THIS_TO_NEW_PROJECT_20260610_031736.zip
- Size: 16,805,869 bytes
- Entries: 1,613
- Files: 1,537
- Newest file: `lumen-os/docs/security/INSTITUTIONAL_PRELAUNCH_BASELINE.md` at 2026-06-10 00:47:44
- Top roots: `vault_records` (737), `pages` (623), `lumen-os` (100), `lib` (23), `src` (20), `public` (15), `app` (8), `components` (5)
- Top extensions: `.js` (786), `.tsx` (164), `.ts` (138), `.mjs` (137), `.json` (114), `.txt` (98), `.md` (35), `.jsx` (20)

### Lumen-Prime-Ecosystem-UniversalLedger-Windows11 (1) (1).zip
- Size: 13,915 bytes
- Entries: 14
- Files: 9
- Newest file: `Lumen-Prime-Ecosystem-UniversalLedger-Windows11/src/LumenPrimeApp/MainWindow.xaml.cs` at 2026-06-05 08:46:00
- Top roots: `Lumen-Prime-Ecosystem-UniversalLedger-Windows11` (9)
- Top extensions: `.json` (2), `.xaml` (2), `.cs` (2), `.ps1` (1), `.md` (1), `.csproj` (1)

## Canonical Decision
Use `LUMEN_GENESIS_FINAL_UPLOAD_20260611-144613.zip` as the canonical governance/continuity baseline. It contains the full canonical repository structure, validation scripts, proof reports, and the most recent upload-first instruction set.

Use `LUMEN_ACTUAL_SOURCE_FOR_NEW_PROJECT.zip` as the active executable/source-code baseline. It contains the broad app/source tree, API routes, lib/src/components/pages/app structure, and a newer source transfer entry set than the earlier 20260610 package.

Preserve `LUMEN_UPLOAD_THIS_TO_NEW_PROJECT_20260610_031736.zip` as supplemental archive because it contains a large `vault_records` root not present in the later source-transfer package. Do not blindly merge vault records into runtime code; preserve under protected archive/evidence until reviewed.

Use `LUMEN_GENESIS_PROTECTED_TRANSFER_20260611-144150.zip` as supplemental proof/validation evidence. Most key files are represented by the final upload, but the contamination scan and protected governance JSON should be retained as lineage evidence.

Use `Conversation_Continuity_Pack (1).zip` and `Lumen-Prime-Ecosystem-UniversalLedger-Windows11 (1) (1).zip` as small legacy/context supplements only.

## Pairwise Comparison
| Package A | Package B | Common paths | Same hash | Different hash | Only A | Only B |
|---|---:|---:|---:|---:|---:|---:|
| LUMEN_GENESIS_FINAL_UPLOAD_20260611-144613.zip | Conversation_Continuity_Pack (1).zip | 0 | 0 | 0 | 1295 | 2 |
| LUMEN_GENESIS_FINAL_UPLOAD_20260611-144613.zip | LUMEN_ACTUAL_SOURCE_FOR_NEW_PROJECT.zip | 0 | 0 | 0 | 1295 | 860 |
| LUMEN_GENESIS_FINAL_UPLOAD_20260611-144613.zip | Lumen-Prime-Ecosystem-UniversalLedger-Windows11 (1) (1).zip | 0 | 0 | 0 | 1295 | 9 |
| LUMEN_GENESIS_FINAL_UPLOAD_20260611-144613.zip | LUMEN_GENESIS_PROTECTED_TRANSFER_20260611-144150.zip | 0 | 0 | 0 | 1295 | 6 |
| LUMEN_GENESIS_FINAL_UPLOAD_20260611-144613.zip | LUMEN_SOURCE_TRANSFER_UPLOAD_TO_NEW_PROJECT_20260610_043352.zip | 0 | 0 | 0 | 1295 | 801 |
| LUMEN_GENESIS_FINAL_UPLOAD_20260611-144613.zip | LUMEN_UPLOAD_THIS_TO_NEW_PROJECT_20260610_031736.zip | 0 | 0 | 0 | 1295 | 1537 |
| Conversation_Continuity_Pack (1).zip | LUMEN_ACTUAL_SOURCE_FOR_NEW_PROJECT.zip | 0 | 0 | 0 | 2 | 860 |
| Conversation_Continuity_Pack (1).zip | Lumen-Prime-Ecosystem-UniversalLedger-Windows11 (1) (1).zip | 0 | 0 | 0 | 2 | 9 |
| Conversation_Continuity_Pack (1).zip | LUMEN_GENESIS_PROTECTED_TRANSFER_20260611-144150.zip | 0 | 0 | 0 | 2 | 6 |
| Conversation_Continuity_Pack (1).zip | LUMEN_SOURCE_TRANSFER_UPLOAD_TO_NEW_PROJECT_20260610_043352.zip | 0 | 0 | 0 | 2 | 801 |
| Conversation_Continuity_Pack (1).zip | LUMEN_UPLOAD_THIS_TO_NEW_PROJECT_20260610_031736.zip | 0 | 0 | 0 | 2 | 1537 |
| LUMEN_ACTUAL_SOURCE_FOR_NEW_PROJECT.zip | Lumen-Prime-Ecosystem-UniversalLedger-Windows11 (1) (1).zip | 0 | 0 | 0 | 860 | 9 |
| LUMEN_ACTUAL_SOURCE_FOR_NEW_PROJECT.zip | LUMEN_GENESIS_PROTECTED_TRANSFER_20260611-144150.zip | 0 | 0 | 0 | 860 | 6 |
| LUMEN_ACTUAL_SOURCE_FOR_NEW_PROJECT.zip | LUMEN_SOURCE_TRANSFER_UPLOAD_TO_NEW_PROJECT_20260610_043352.zip | 799 | 799 | 0 | 61 | 2 |
| LUMEN_ACTUAL_SOURCE_FOR_NEW_PROJECT.zip | LUMEN_UPLOAD_THIS_TO_NEW_PROJECT_20260610_031736.zip | 799 | 799 | 0 | 61 | 738 |
| Lumen-Prime-Ecosystem-UniversalLedger-Windows11 (1) (1).zip | LUMEN_GENESIS_PROTECTED_TRANSFER_20260611-144150.zip | 0 | 0 | 0 | 9 | 6 |
| Lumen-Prime-Ecosystem-UniversalLedger-Windows11 (1) (1).zip | LUMEN_SOURCE_TRANSFER_UPLOAD_TO_NEW_PROJECT_20260610_043352.zip | 0 | 0 | 0 | 9 | 801 |
| Lumen-Prime-Ecosystem-UniversalLedger-Windows11 (1) (1).zip | LUMEN_UPLOAD_THIS_TO_NEW_PROJECT_20260610_031736.zip | 0 | 0 | 0 | 9 | 1537 |
| LUMEN_GENESIS_PROTECTED_TRANSFER_20260611-144150.zip | LUMEN_SOURCE_TRANSFER_UPLOAD_TO_NEW_PROJECT_20260610_043352.zip | 0 | 0 | 0 | 6 | 801 |
| LUMEN_GENESIS_PROTECTED_TRANSFER_20260611-144150.zip | LUMEN_UPLOAD_THIS_TO_NEW_PROJECT_20260610_031736.zip | 0 | 0 | 0 | 6 | 1537 |
| LUMEN_SOURCE_TRANSFER_UPLOAD_TO_NEW_PROJECT_20260610_043352.zip | LUMEN_UPLOAD_THIS_TO_NEW_PROJECT_20260610_031736.zip | 800 | 800 | 0 | 1 | 737 |

## Repository vNext Required Work
- Create canonical language specification
- Create canonical runtime specification
- Create canonical security core specification
- Create canonical Vault specification
- Create canonical AI/agent runtime specification
- Create canonical website runtime specification
- Create canonical entitlement engine specification
- Run governance consistency audit across founder control, Vault-first, native Lumen, security, accessibility, localization, and continuity rules

## Merge Rule
Do not flatten these packages into one folder by default. Preserve lineage. Active work should happen in a clean repository with governance imported from the final genesis upload and executable code imported from the actual source package, while all older transfer ZIPs are retained under `/lineage/original-packages/` for auditability.
