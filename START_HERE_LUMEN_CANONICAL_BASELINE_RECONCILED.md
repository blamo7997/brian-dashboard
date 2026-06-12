# START HERE — Lumen Canonical Baseline Reconciled

This package preserves the uploaded repository lineage without flattening or overwriting competing branches.

## Active decisions

1. Canonical governance baseline: `01_CANONICAL_GOVERNANCE_BASELINE/LUMEN_GENESIS_FINAL_UPLOAD_20260611-144613.zip` extracted content.
2. Active executable/source baseline: `02_ACTIVE_SOURCE_BASELINE`.
3. Supplemental vault/evidence archive: `03_SUPPLEMENTAL_VAULT_RECORDS_ARCHIVE`.
4. Protected proof transfer: `04_SUPPLEMENTAL_PROTECTED_PROOF_TRANSFER`.
5. Original ZIPs are retained unchanged in `00_ORIGINAL_UPLOADED_PACKAGES_DO_NOT_EDIT`.
6. Active Windows automation uses PowerShell 7.6.2 through `pwsh`; do not run active Lumen scripts with Windows PowerShell 5.1.

## Runtime gate

Run `pwsh -NoProfile -ExecutionPolicy Bypass -File .\VERIFY_POWERSHELL_7_6_2.ps1` before active repository automation. Historical vault records may mention older PowerShell versions as preserved evidence; those records are not active runtime guidance.

## Next repository phase

Create first-class canonical specs for Lumen Language, Runtime, Security Core, Vault, Agent Runtime, Website Runtime, and Entitlements, then run a governance consistency audit before runtime implementation.
