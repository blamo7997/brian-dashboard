(function(){
  window.BrianCoMonumentCommand = {
    version: "0.1.0-monument",
    protected: true,
    standards: {
      freeFirst: true,
      cliFirst: true,
      nativeFirst: true,
      trustedSourceFirst: true,
      accessibilityEverywhere: true,
      localizationEverywhere: true,
      voiceNavigationEverywhere: true,
      auditDebugValidateRetest: true,
      proprietaryProtection: true,
      approvalGatedProtectedChanges: true
    },
    report: function(message, detail){
      console.log("[Brian & Co Monument Command]", message, detail || {});
      window.dispatchEvent(new CustomEvent("brianco:monument:report", {
        detail: { message, detail, timestamp: new Date().toISOString() }
      }));
    }
  };

  document.addEventListener("DOMContentLoaded", function(){
    window.BrianCoMonumentCommand.report("Monument command layer loaded.");
  });
})();
