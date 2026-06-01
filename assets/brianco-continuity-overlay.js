window.BrianCoContinuity = window.BrianCoContinuity || (() => {
  const continuity = {
    mode: "safe_additive_realtime",
    legalStatus: "DRAFT — PENDING LEGAL REVIEW",
    protectedAreas: [
      "backend","oauth","api","token","secret","env","payment",
      "shopify products","shopify collections","vercel","supabase",
      "openai","social account","existing integration"
    ],
    approvalRequired: [
      "legal","signature","contract","policy","pricing","payment",
      "investment","supplier","creator","influencer","public",
      "deploy","backend","oauth","api"
    ]
  };

  function toggle() {
    const p = document.getElementById("bc-panel");
    if (p) p.hidden = !p.hidden;
  }

  function normalize(input) {
    return String(input || "")
      .trim()
      .replace(/\balays\b/gi, "always")
      .replace(/\bforver\b/gi, "forever")
      .replace(/\brealtme\b/gi, "real time")
      .replace(/\blegel\b/gi, "legal")
      .replace(/\bopproval\b/gi, "approval")
      .replace(/\bchabot\b/gi, "chatbot")
      .replace(/\bsofpy|sopfy|shopyfy\b/gi, "Shopify")
      .replace(/\binturrupted\b/gi, "interrupted")
      .replace(/\bhat\b/gi, "what");
  }

  function touchesProtectedArea(payload) {
    const text = normalize(JSON.stringify(payload || {})).toLowerCase();
    return continuity.protectedAreas.some(x => text.includes(x));
  }

  function needsApproval(payload) {
    const text = normalize(JSON.stringify(payload || {})).toLowerCase();
    return continuity.approvalRequired.some(x => text.includes(x));
  }

  function queueUpdate(payload) {
    const item = {
      id: "bc_" + Date.now(),
      createdAt: new Date().toISOString(),
      payload,
      mode: "safe_additive_overlay",
      protectedAreaBlocked: touchesProtectedArea(payload),
      approvalRequired: needsApproval(payload),
      status: "queued_for_founder_green_check",
      legalStatus: needsApproval(payload) ? continuity.legalStatus : "not_legal_change_detected",
      autoResumeAware: true
    };

    const key = "brianco_continuity_update_queue";
    const existing = JSON.parse(localStorage.getItem(key) || "[]");
    existing.push(item);
    localStorage.setItem(key, JSON.stringify(existing));
    console.log("Brian & Co safe continuity update queued:", item);
    return item;
  }

  function textSize(direction) {
    const current = Number(localStorage.getItem("bc_text_scale") || "1");
    const next = Math.max(.85, Math.min(1.4, current + direction * .08));
    localStorage.setItem("bc_text_scale", String(next));
    document.querySelectorAll("#brianco-realtime-continuity-overlay, #brianco-realtime-continuity-overlay *")
      .forEach(el => el.style.fontSize = `calc(1em * ${next})`);
  }

  function read() {
    const panel = document.getElementById("bc-panel");
    if (!panel || !window.speechSynthesis) return;
    const u = new SpeechSynthesisUtterance(panel.innerText);
    u.rate = .92;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  }

  document.addEventListener("click", e => {
    const role = e.target.closest("[data-bc-role]");
    if (!role) return;
    queueUpdate({
      type: "role_portal_opened",
      role: role.getAttribute("data-bc-role"),
      preservePriorWork: true,
      founderGreenCheck: true,
      legalReviewWhenAppropriate: true,
      realtimeThemeUpdateWhenAuthorized: true,
      resumableProjectState: true,
      autoResumeAware: true
    });
  });

  return { toggle, normalize, touchesProtectedArea, needsApproval, queueUpdate, textSize, read };
})();
