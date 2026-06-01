BRIAN & CO AUTO-RESUME CONTINUITY SAFE REAL-TIME OVERLAY

This package includes:
- Shopify section
- Shopify snippet
- CSS asset
- JS asset
- structured continuity JSON file
- auto-resume PowerShell state
- referenced prior state folder
- checkpoint files
- validation log

Auto-resume behavior:
- On reopen, run this from the same folder.
- It automatically checks:
  .brianco-project-state/current-project-state.json
  .brianco-project-state/project-history.json

- It references the prior run and copies prior state into:
  C:\Users\user\brianco-backend-clean\brianco-auto-resume-continuity-overlay-20260527-092732\referenced-prior-state

Protected areas not modified:
- backend
- OAuth
- API keys
- environment variables
- tokens
- secrets
- Shopify products
- Shopify collections
- payment connections
- Vercel
- Supabase
- OpenAI
- social accounts
- existing integrations

Legal:
DRAFT — PENDING LEGAL REVIEW.
