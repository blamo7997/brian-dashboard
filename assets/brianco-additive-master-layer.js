(function () {
  "use strict";

  const layer = document.getElementById("brianco-additive-master-layer");
  const output = document.getElementById("brianco-master-output");

  if (!layer || !output) return;

  const responses = {
    concierge:
      "Concierge preview: refined service-tier guidance can be shown safely on the frontend without changing actual prices, products, subscriptions, checkout, or payment access.",

    accessibility:
      "Accessibility preview: essential accessibility remains free and always available, including readable mode, text support, contrast, reduced motion, language preference, and cognitive support.",

    digital:
      "Digital product preview: safe discovery cards can introduce future templates, guides, business kits, nonprofit resources, writer tools, and creator bundles. Paid access must remain backend/payment verified before true unlock.",

    roles:
      "Role preview: customers, suppliers, artisans, creators, influencers, investors, bankers, lawyers, admins, job seekers, nonprofits, writers, and poets can be routed through role-appropriate guidance without touching protected systems.",

    approval:
      "Approval preview: public, legal, pricing, policy, product, backend, OAuth, API, and payment-impacting changes should remain founder-approved and lawyer/accountant-reviewed where appropriate.",

    protected:
      "Protected preview: existing Shopify products, product images, prices, inventory, collections, checkout, payments, backend, OAuth, API tokens, and live publishing remain blocked unless Brian explicitly approves the exact change."
  };

  layer.addEventListener("click", function (event) {
    const action = event.target && event.target.getAttribute("data-brianco-master-action");
    if (!action || !responses[action]) return;

    output.textContent = responses[action];

    try {
      localStorage.setItem("brianco_master_last_pathway", action);
    } catch {}
  });

  try {
    const last = localStorage.getItem("brianco_master_last_pathway");
    if (last && responses[last]) output.textContent = responses[last];
  } catch {}
})();

