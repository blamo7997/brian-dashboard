# LIVE SYSTEM DURABILITY RULES™

Date: 20260610-220357
Status: Canonical

## Live System Rule
When a system is live or production-bound, do not treat it as disposable.

## Required Before Major Live Change
- Current state preserved
- Backup or archive created
- Reason documented
- Risk assessed
- Continuity impact noted
- Recovery path known
- Validation planned

## Avoid
- Blind rewrites
- Placeholder final systems
- Fake authority layers
- Throwaway scaffolds
- Untracked changes
- Destructive cleanup without archive

## Prefer
- Additive extension
- Safe migration
- Versioned rollout
- Validation
- Archive
- Recovery path
