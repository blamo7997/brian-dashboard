(function(){
  function now(){ return new Date().toISOString(); }

  window.BrianCoMaster = {
    mode: "safe-additive-continuous-overlay",
    protected: true,
    aiDisclosure: "Brian & Co Concierge is AI: warm, contextual, localized, timestamp-aware, and human-feeling, but not literally sentient.",
    protectedAreas: ["OAuth","tokens",".env","backend/API","payments","social","Vercel","Supabase","OpenAI","Shopify Admin API","live products","live collections"],
    incomeTiers: ["homeless_or_no_stable_housing","very_low_income","low_income","budget_sensitive","standard","premium","luxury","ultra_luxury","founder_admin"],
    roles: ["founder_admin","customer","guest","supplier","artisan","creator","influencer","investor","banker","lawyer","accountant","accessibility_user","homeless_support_user","very_low_income_user"],
    adaptTone: function(input){
      var role = input && input.role ? input.role : "guest";
      var tier = input && input.incomeTier ? input.incomeTier : "guest_unknown";
      var locale = input && input.locale ? input.locale : (navigator.language || "en-US");

      var tone = "Brian & Co refined, warm, eloquent, practical luxury";
      var style = "warm, helpful, polished, accessible";

      if(role === "founder_admin") style = "direct, operational, protective, action-focused";
      if(tier === "homeless_or_no_stable_housing" || tier === "very_low_income") style = "dignified, calm, resource-focused, respectful, never patronizing, never gimmicky";
      if(tier === "low_income" || tier === "budget_sensitive") style = "respectful, reassuring, value-conscious, never cheap-sounding";
      if(tier === "premium" || tier === "luxury") style = "elevated, curated, confident, refined";
      if(tier === "ultra_luxury") style = "white-glove, discreet, highly refined, concierge-led";

      return {
        timestamp: now(),
        role: role,
        incomeTier: tier,
        locale: locale,
        tone: tone,
        responseStyle: style,
        disclosure: "AI, not literally sentient",
        consentRequiredForMemory: true
      };
    },
    portalFor: function(input){
      var tier = input && input.incomeTier ? input.incomeTier : "guest_unknown";
      var role = input && input.role ? input.role : "guest";

      if(tier === "homeless_or_no_stable_housing") return "localized-free-support-portal";
      if(tier === "very_low_income") return "very-low-income-support-portal";
      if(role === "founder_admin") return "founder-command-center";
      if(role === "lawyer") return "legal-review-portal";
      if(role === "supplier" || role === "artisan") return "supplier-artisan-portal";
      if(role === "creator" || role === "influencer") return "creator-influencer-portal";

      return "personalized-customer-portal";
    },
    financingFor: function(input){
      var tier = input && input.incomeTier ? input.incomeTier : "guest_unknown";
      var price = input && input.price ? Number(input.price) : 0;

      if(tier === "homeless_or_no_stable_housing" || tier === "very_low_income") {
        return {
          showFinancing: false,
          showFreeSupport: true,
          message: "Free or low-cost localized support may be available where verified and lawful."
        };
      }

      if(price >= 50) {
        return {
          showFinancing: true,
          showFreeSupport: false,
          message: "Flexible payment options may be available, subject to location, eligibility, provider terms, and approval."
        };
      }

      return {
        showFinancing: false,
        showFreeSupport: false,
        message: "Financing is not shown for this context."
      };
    },
    logInteractionScaffold: function(event){
      return {
        timestamp: now(),
        eventType: event && event.type ? event.type : "interaction",
        role: event && event.role ? event.role : "guest",
        incomeTier: event && event.incomeTier ? event.incomeTier : "guest_unknown",
        portal: window.BrianCoMaster.portalFor(event || {}),
        page: location.pathname,
        consentAware: true,
        protectedDataBlocked: true
      };
    }
  };
})();
