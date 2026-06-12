# LUMEN AUTHORIZATION MODEL™

Date: 20260610-222040
Status: Canonical Direction

## Purpose
Define who can do what across Lumen OS, website, Vault, and bridge access channels.

## Authorization Questions
- Who is requesting access?
- What channel are they using?
- What object are they accessing?
- What action are they requesting?
- What entitlement applies?
- What consent applies?
- What security context applies?
- What Vault boundary applies?
- What recovery or audit rule applies?

## Authorization Objects
- Subject
- Action
- Resource
- Context
- Policy
- Entitlement
- Consent
- TrustLevel
- ValidationState
- DecisionRecord

## Action Types
- Read
- Write
- Create
- Update
- Archive
- Restore
- Export
- Import
- Approve
- Reject
- Execute
- Delegate
- Revoke

## Hard Rule
No access path may bypass Vault, entitlement, authorization, consent, or security governance where those controls apply.
