(function(){
  window.BrianCoMaster = {
    protected:true,
    mode:"safe-additive-overlay",
    aiDisclosure:"AI, human-feeling, not literally sentient",
    tone:"Brian & Co refined, warm, eloquent, never gimmicky",
    protectedAreas:["OAuth","tokens",".env","backend/API","payments","social","live products","live collections"],
    adaptTone:function(input){
      input = input || {};
      var tier = input.incomeTier || "guest_unknown";
      var role = input.role || "guest";
      var style = "warm, refined, helpful";
      if(tier === "homeless_or_no_stable_housing" || tier === "very_low_income"){
        style = "dignified, calm, respectful, resource-focused";
      }
      if(role === "founder_admin"){
        style = "direct, operational, protective";
      }
      return { role:role, incomeTier:tier, style:style, timestamp:new Date().toISOString() };
    }
  };
})();
