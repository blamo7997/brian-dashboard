(function () {
  "use strict";

  const root = document.getElementById("brianco-concierge-root");
  if (!root) return;

  const toggle = document.getElementById("brianco-concierge-toggle");
  const panel = document.getElementById("brianco-concierge-panel");
  const input = document.getElementById("brianco-chat-input");
  const button = document.getElementById("brianco-chat-button");
  const response = document.getElementById("brianco-chat-response");
  const language = document.getElementById("brianco-language-select");

  const STORAGE_KEY = "brianco_accessibility_preferences";

  const typoMap = {
    "shippng": "shipping",
    "retrn": "return",
    "retun": "return",
    "accesability": "accessibility",
    "acessibility": "accessibility",
    "prodct": "product",
    "subscrption": "subscription",
    "langue": "language",
    "financng": "financing",
    "concierg": "concierge"
  };

  function loadPrefs() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    } catch {
      return {};
    }
  }

  function savePrefs(prefs) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  }

  function normalizeText(text) {
    let cleaned = String(text || "").toLowerCase().trim();
    Object.keys(typoMap).forEach((bad) => {
      cleaned = cleaned.replaceAll(bad, typoMap[bad]);
    });
    return cleaned;
  }

  function replyTo(text) {
    const q = normalizeText(text);

    if (!q) {
      return "I’m here. Ask about products, services, accessibility, subscriptions, shipping, returns, or Brian & Co account guidance.";
    }

    if (q.includes("accessibility") || q.includes("read") || q.includes("text") || q.includes("vision")) {
      return "Accessibility support is available here: readable spacing, larger text, contrast, reduced motion, language preference, and page reading controls.";
    }

    if (q.includes("subscription") || q.includes("concierge") || q.includes("service")) {
      return "Brian & Co™ can guide guests toward refined concierge memberships, à la carte services, bundles, and digital tools, while keeping upgrades elegant and non-pushy.";
    }

    if (q.includes("shipping") || q.includes("return")) {
      return "Shipping and returns may vary by supplier, artisan, product type, and destination. Custom work may become non-refundable once production begins where lawful and clearly disclosed.";
    }

    if (q.includes("language") || q.includes("translate")) {
      return "Language preference is saved on this device. Future connected systems can use this preference for localized guidance and native-first support.";
    }

    if (q.includes("product") || q.includes("recommend")) {
      return "I can recommend physical or digital options by role, need, accessibility preference, and budget tier once connected to approved product data. Existing products remain protected.";
    }

    return "I understand. Brian & Co™ will keep guidance refined, accessible, localized where possible, and founder-controlled. Protected systems and existing products are not changed from this concierge layer.";
  }

  function applyPrefs() {
    const prefs = loadPrefs();

    document.documentElement.classList.toggle("brianco-high-contrast", !!prefs.contrast);
    document.documentElement.classList.toggle("brianco-readable-mode", !!prefs.readable);
    document.documentElement.classList.toggle("brianco-reduce-motion", !!prefs.motion);

    if (prefs.textScale) {
      document.documentElement.style.setProperty("--brianco-text-scale", prefs.textScale);
    }

    if (prefs.language && language) {
      language.value = prefs.language;
    }
  }

  toggle.addEventListener("click", function () {
    const isOpen = !panel.hasAttribute("hidden");
    if (isOpen) {
      panel.setAttribute("hidden", "");
      toggle.setAttribute("aria-expanded", "false");
    } else {
      panel.removeAttribute("hidden");
      toggle.setAttribute("aria-expanded", "true");
    }
  });

  root.addEventListener("click", function (event) {
    const action = event.target && event.target.getAttribute("data-brianco-action");
    if (!action) return;

    const prefs = loadPrefs();
    const currentScale = Number(String(prefs.textScale || "1").replace("em", "")) || 1;

    if (action === "increase-text") prefs.textScale = Math.min(currentScale + 0.1, 1.6) + "em";
    if (action === "decrease-text") prefs.textScale = Math.max(currentScale - 0.1, 0.9) + "em";
    if (action === "toggle-contrast") prefs.contrast = !prefs.contrast;
    if (action === "toggle-readable") prefs.readable = !prefs.readable;
    if (action === "toggle-motion") prefs.motion = !prefs.motion;

    if (action === "read-page" && "speechSynthesis" in window) {
      const text = document.body.innerText.slice(0, 3000);
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
    }

    savePrefs(prefs);
    applyPrefs();
  });

  if (language) {
    language.addEventListener("change", function () {
      const prefs = loadPrefs();
      prefs.language = language.value;
      savePrefs(prefs);
      response.textContent = "Language preference saved for this device.";
    });
  }

  if (button) {
    button.addEventListener("click", function () {
      response.textContent = replyTo(input.value);
    });
  }

  applyPrefs();
})();

