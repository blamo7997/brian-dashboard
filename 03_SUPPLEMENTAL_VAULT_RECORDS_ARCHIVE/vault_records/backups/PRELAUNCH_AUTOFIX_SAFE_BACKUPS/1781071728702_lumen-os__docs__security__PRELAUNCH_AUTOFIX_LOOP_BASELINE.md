# LUMEN PRE-LAUNCH AUTOFIX LOOP BASELINE

Purpose:
- Scan every reachable project folder and subfolder.
- Review files line by line where technically feasible.
- Run CIA+ scan.
- Run safe autofixes.
- Run dependency review.
- Run build validation.
- Repeat until clean or review-only issues remain.

Rules:
- Preserve what exists.
- Backup before every modification.
- Modify only when necessary.
- Add only when possible.
- No destructive deletion.
- No secret exposure.
- No Vault deletion.
- No user-memory deletion.
- No Windows overwrite.
- No fake perfection claim.
- Report anything that requires human review.
