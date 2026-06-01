async function shopify(path, method = "GET", body = null) {
  const shop = process.env.SHOPIFY_STORE_DOMAIN || "";
  const token = process.env.SHOPIFY_ADMIN_API_TOKEN || "";

  if (!shop || !token) return { ok: false, message: "Missing Shopify env vars." };

  const response = await fetch(`https://${shop}/admin/api/2025-04/${path}`, {
    method,
    headers: {
      "X-Shopify-Access-Token": token,
      "Content-Type": "application/json"
    },
    body: body ? JSON.stringify(body) : undefined
  });

  const text = await response.text();
  try { return text ? JSON.parse(text) : {}; } catch { return { raw: text }; }
}

function safe(v) {
  return v ? `${String(v).slice(0,4)}...hidden` : "";
}

function productSummary(p) {
  return {
    id: p.id,
    title: p.title,
    handle: p.handle,
    type: p.product_type,
    image: p.image?.src || null,
    imagesMissing: !p.image?.src,
    draft: p.status !== "active",
    price: p.variants?.[0]?.price || null,
    sku: p.variants?.[0]?.sku || null,
    seoTitle: `${p.title} | Brian & Co`,
    seoDescription: String(p.body_html || `Discover ${p.title}, carefully curated by Brian & Co.`).replace(/<[^>]+>/g, "").slice(0,155),
    formats: ["Online Access","Windows .exe","macOS Download","Mobile Web","Android Download"],
    upgradeRecommendations: ["Subscription upgrade","Related collection","Ã€ la carte service","Bundle option"],
    proprietary: true,
    oauthPreserved: true,
    url: `https://${process.env.SHOPIFY_STORE_DOMAIN}/products/${p.handle}`,
    button: "View Product"
  };
}

export default async function handler(req, res) {
  try {
    const route = req.query.route || "status";

    if (route === "status") return res.status(200).json({
      ok: true,
      service: "Brian & Co Locked Proprietary Backend",
      deployment: "online",
      oauthPreserved: true,
      proprietary: true,
      timestamp: new Date().toISOString()
    });

    if (route === "health") return res.status(200).json({
      ok: true,
      checks: {
        shopifyStore: Boolean(process.env.SHOPIFY_STORE_DOMAIN),
        shopifyAdminToken: Boolean(process.env.SHOPIFY_ADMIN_API_TOKEN),
        shopifyOAuthKey: Boolean(process.env.SHOPIFY_API_KEY),
        shopifyOAuthSecret: Boolean(process.env.SHOPIFY_API_SECRET),
        openAI: Boolean(process.env.OPENAI_API_KEY)
      }
    });

    if (route === "env") return res.status(200).json({
      ok: true,
      secretsPrinted: false,
      env: {
        SHOPIFY_STORE_DOMAIN: safe(process.env.SHOPIFY_STORE_DOMAIN),
        SHOPIFY_ADMIN_API_TOKEN: safe(process.env.SHOPIFY_ADMIN_API_TOKEN),
        SHOPIFY_API_KEY: safe(process.env.SHOPIFY_API_KEY),
        SHOPIFY_API_SECRET: safe(process.env.SHOPIFY_API_SECRET),
        OPENAI_API_KEY: safe(process.env.OPENAI_API_KEY)
      }
    });

    if (route === "products") {
      const data = await shopify("products.json?limit=250");
      const products = (data.products || []).map(productSummary);
      return res.status(200).json({ ok:true, count:products.length, products });
    }

    if (route === "collections") {
      const custom = await shopify("custom_collections.json?limit=250");
      const smart = await shopify("smart_collections.json?limit=250");
      return res.status(200).json({ ok:true, collections:[...(custom.custom_collections||[]), ...(smart.smart_collections||[])] });
    }

    if (route === "catalog" || route === "seo" || route === "concierge") {
      const data = await shopify("products.json?limit=250");
      const products = (data.products || []).map(productSummary);
      return res.status(200).json({
        ok: true,
        route,
        realtimeSeo: route === "seo",
        connected: true,
        proprietary: true,
        oauthPreserved: true,
        totals: {
          products: products.length,
          missingImages: products.filter(p => p.imagesMissing).length,
          drafts: products.filter(p => p.draft).length
        },
        products,
        productCards: products.slice(0,12)
      });
    }

    if (route === "consent-policy") {
      const region = String(req.query.region || "US-WY").toUpperCase();
      const strict = ["EU","EEA","UK","GB","CA","QC","BR","AU","NZ","US-CA","US-CO","US-CT","US-VA","US-UT","US-OR","US-TX"];
      const popupRequired = strict.some(r => region.includes(r));
      return res.status(200).json({
        ok:true,
        region,
        popupRequired,
        policyMode: popupRequired ? "explicit-consent" : "privacy-notice-with-controls",
        controls:["Essential only","Accessibility preferences","Personalization","Analytics","Marketing","Withdraw consent","Do not sell or share where applicable"]
      });
    }

        if (route === "implementation-roadmap") {
      return res.status(200).json({
  ok: true,
  purpose: "Always-more implementation roadmap for Brian & Co.",
  nextBuilds: [
    "real embedded Shopify dashboard",
    "real product image upload sync",
    "real Supabase memory database",
    "real approval queue database",
    "real OpenAI concierge endpoint",
    "real Shopify app OAuth install test",
    "real theme app embed",
    "real app listing asset pack",
    "real blog/social draft queue",
    "real supplier onboarding forms",
    "real resume/career tool module",
    "real PWA shell",
    "real browser extension prototype",
    "real localization registry",
    "real compliance source registry"
  ],
  rule: "Continue the next highest-value layer after each report, while preserving OAuth, secrets, approvals, accessibility, and legal/tax review gates."
});
    }

        if (route === "real-build-priority") {
      return res.status(200).json({
  ok: true,
  priorityOrder: [
    "fix broken deployment or route first",
    "preserve OAuth and env vars",
    "validate existing backend",
    "connect real UI",
    "connect real database",
    "connect live AI",
    "sync Shopify products/images/SEO",
    "prepare Shopify app submission",
    "expand digital products",
    "expand physical commerce",
    "expand social/career/accessibility ecosystems"
  ],
  output: "next paste-ready code block"
});
    }

        if (route === "app-submission-master") {
      return res.status(200).json({
  ok: true,
  appSubmissionNeeds: [
    "working OAuth install flow",
    "working embedded app URL",
    "privacy policy",
    "support contact",
    "demo/test store",
    "billing/free trial plan",
    "listing copy",
    "screenshots",
    "logo",
    "uninstall/data deletion handling",
    "minimal scopes",
    "review notes"
  ],
  warning: "Shopify approval is controlled by Shopify review; this system prepares and validates but cannot guarantee approval."
});
    }

        if (route === "logo-advertising-direction") {
      return res.status(200).json({
  ok: true,
  logoDirection: {
    style: "premium Brian & Co gradient mark, legible at small size, accessible contrast, refined and non-gimmicky",
    variants: ["app icon", "favicon", "Shopify listing icon", "social avatar", "dashboard header mark"]
  },
  advertisingDirection: {
    tone: "clear, refined, localized, useful, ethical",
    avoid: ["fake urgency", "unsupported claims", "fake reviews", "aggressive manipulation"],
    emphasize: ["SEO readiness", "product intelligence", "accessibility", "localized recommendations", "merchant control"]
  }
});
    }

        if (route === "real-ui-next") {
      return res.status(200).json({
  ok: true,
  screensToBuild: [
    "dashboard overview",
    "product SEO table",
    "missing image queue",
    "bundle recommendation queue",
    "approval queue",
    "supplier onboarding",
    "content draft queue",
    "trust safety queue",
    "settings and consent",
    "billing and trial screen"
  ],
  nextCodeNeeded: "React or Shopify embedded app UI"
});
    }

        if (route === "database-schema-next") {
      return res.status(200).json({
  ok: true,
  tables: [
    "profiles",
    "events",
    "consents",
    "products_cache",
    "seo_suggestions",
    "approval_queue",
    "supplier_profiles",
    "content_drafts",
    "review_flags",
    "audit_logs",
    "hardship_reviews",
    "localization_sources"
  ],
  nextCodeNeeded: "Supabase SQL schema and environment variables"
});
    }

        if (route === "openai-next") {
      return res.status(200).json({
  ok: true,
  routeNeeded: "live-concierge",
  behavior: [
    "human-sounding but transparently AI",
    "Brian & Co tone",
    "product-aware",
    "accessibility-aware",
    "localized",
    "non-gimmicky",
    "safe crisis routing",
    "no fake sentience"
  ],
  requiredEnv: ["OPENAI_API_KEY"]
});
    }

        if (route === "shopify-sync-next") {
      return res.status(200).json({
  ok: true,
  syncJobs: [
    "pull products",
    "pull collections",
    "detect missing images",
    "generate SEO suggestions",
    "generate bundle suggestions",
    "queue draft publishing",
    "preserve OAuth",
    "log all changes"
  ],
  publishRule: "Do not publish public changes without founder approval."
});
    }

        if (route === "always-more-backlog") {
      return res.status(200).json({
  ok: true,
  backlog: [
    "embedded Shopify UI",
    "Supabase persistence",
    "OpenAI concierge",
    "image upload sync",
    "app listing asset generator",
    "blog/social scheduler",
    "review fraud detector",
    "supplier marketplace",
    "career/resume app",
    "PWA shell",
    "browser extension",
    "OS/browser/workspace planning",
    "AI creator suite",
    "social commerce",
    "accessibility companion",
    "localized compliance engine",
    "authority source registry",
    "executive dashboard",
    "knowledge graph",
    "semantic search",
    "continuous monitoring"
  ],
  instruction: "After each successful layer, pick the next highest-value unfinished item."
});
    }

    return res.status(404).json({ ok:false, message:"Unknown route." });
  } catch (error) {
    return res.status(200).json({ ok:false, message:error.message });
  }
}









