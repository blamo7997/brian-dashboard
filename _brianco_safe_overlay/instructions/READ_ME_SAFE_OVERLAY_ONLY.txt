Brian & Co Safe Overlay Only

This package intentionally does not modify:
- Existing backend connections
- Vercel environment variables
- OAuth settings
- Shopify tokens
- Shopify products
- Shopify collections
- Supabase
- OpenAI keys
- Payment providers
- Social media connections
- Existing deployment links

It creates additive overlay files only.

To make any overlay live later:
1. Review files.
2. Approve with Brian green-check.
3. Manually copy only the approved overlay file into the live app.
4. Do not replace connection files.
5. Do not change env vars unless Brian specifically approves that exact change.
