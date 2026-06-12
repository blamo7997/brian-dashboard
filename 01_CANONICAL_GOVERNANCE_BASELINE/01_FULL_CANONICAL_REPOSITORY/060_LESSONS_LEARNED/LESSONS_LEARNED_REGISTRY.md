# LESSONS LEARNED REGISTRY™

Date: 20260610-221225
Status: Canonical Direction

## Preserve
- Mistakes
- Failed attempts
- Bugs fixed
- Near misses
- User corrections
- Better patterns discovered
- Things not to repeat

## Current Lessons
- Avoid self-copy export loops.
- Avoid fragile Resolve-Path .Path comparisons.
- Avoid duplicate active authority generations.
- Canonicalize before expanding.
- Preserve older generations instead of deleting them.

## Rule
The repository should learn from its own build history.
