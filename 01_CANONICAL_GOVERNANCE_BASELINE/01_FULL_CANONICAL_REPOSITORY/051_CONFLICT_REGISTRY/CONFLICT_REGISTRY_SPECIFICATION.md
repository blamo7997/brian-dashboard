# CONFLICT REGISTRY SPECIFICATION™

Date: 20260610-221225
Status: Canonical Direction

## Purpose
Track disagreements between records without deleting either side.

## Conflict Record Fields
- ConflictID
- ConflictType
- RecordA
- RecordB
- SourceA
- SourceB
- Severity
- Status
- ProposedResolution
- FinalResolution
- Evidence
- ContinuationImpact

## Rule
Conflicts are preserved, evaluated, and resolved.
They are not hidden by overwriting.
