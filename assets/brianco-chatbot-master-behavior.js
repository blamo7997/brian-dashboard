window.BrianCoChatbotMaster = {

  version: "2026-05-28-live",

  answer: async function(input) {

    const text = String(input || '').toLowerCase();

    const serious =
      /(legal|emergency|medical|crisis|lawsuit|death|suicide)/i.test(text);

    const local =
      /(local|cheyenne|wyoming|support|near me)/i.test(text);

    const premium =
      /(premium|luxury|concierge|vip)/i.test(text);

    if (serious) {
      return "I can help guide you toward appropriate qualified professional or emergency resources while remaining respectful, privacy-aware, and accessibility-conscious.";
    }

    let reply =
      "Brian & Co can provide refined, locality-aware, accessibility-aware recommendations tailored to your preferences";

    if (local) {
      reply += " for Cheyenne and surrounding areas";
    }

    if (premium) {
      reply += " with elevated concierge-style guidance";
    }

    reply += " ✨";

    return reply;
  },

  saveConsent: function(data) {
    localStorage.setItem(
      'brianco-consent',
      JSON.stringify(data || {})
    );
  },

  saveProfile: function(data) {
    localStorage.setItem(
      'brianco-profile',
      JSON.stringify(data || {})
    );
  }
};

(function() {

  if (document.getElementById('brianco-chatbot-master-toggle')) {
    return;
  }

  const wrap = document.createElement('div');

  wrap.innerHTML = `
    <button
      id="brianco-chatbot-master-toggle"
      style="
        position:fixed;
        right:16px;
        bottom:16px;
        z-index:999999;
        padding:14px 18px;
        border-radius:16px;
        border:none;
        background:#111;
        color:#fff;
        font-size:14px;
        cursor:pointer;
        box-shadow:0 10px 30px rgba(0,0,0,.25);
      ">
      Brian & Co Concierge Intelligence ✨
    </button>
  `;

  document.body.appendChild(wrap);

})();

