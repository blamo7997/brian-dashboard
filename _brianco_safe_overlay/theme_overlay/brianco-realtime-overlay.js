(function () {
  window.BrianCo = window.BrianCo || {};
  window.BrianCo.safeMode = true;
  window.BrianCo.protectedRule = "No OAuth, tokens, env vars, backend/API/payment/social connections, Shopify/Vercel/Supabase/OpenAI secrets, products, collections, or working integrations are touched.";

  window.BrianCo.concierge = {
    aiTransparent: true,
    notLiterallySentient: true,
    humanFeelingMode: true,
    timestamped: true,
    localizedNativeLanguage: true,
    consentAwareMemory: true,
    tone: "eloquent, refined, warm, premium, trustworthy"
  };

  window.BrianCo.majorPlayerScout = [
    "Google","Microsoft","Adobe","Apple","Shopify","Amazon","Meta","TikTok","YouTube",
    "Canva","Final Cut Pro","Adobe Premiere Pro","DaVinci Resolve","Figma","Notion",
    "OpenAI","Chrome","Edge","Safari","Firefox","Android","iOS","macOS","Windows","Linux","ChromeOS"
  ];

  document.addEventListener("click", function (e) {
    if (e.target.matches("[data-brianco-chat-open]")) {
      alert("Brian & Co Concierge is prepared: warm, personal, timestamp-aware, localized, and transparent that it is AI.");
    }
    if (e.target.matches("[data-brianco-admin-open]")) {
      alert("Brian & Co Command Center prepared: approvals, digital products, ecosystem intelligence, theme health, and safe next actions.");
    }
  });
})();
