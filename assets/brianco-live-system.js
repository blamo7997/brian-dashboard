(function () {

  try {

    if (window.__BRIANCO_COMPLETE_SYSTEM__) return;
    window.__BRIANCO_COMPLETE_SYSTEM__ = true;

    var STORE_KEY = "brianco_user_preferences_v1";

    var offers = {

      artisan: [
        ["Artisan Product Spotlight", "À la carte", "$39", "Feature one handmade product with refined Brian & Co copy."],
        ["Artisan Launch Bundle", "Bundle", "$149", "Product story, SEO copy, image prompts, and concierge promotion."],
        ["Artisan Growth Membership", "Subscription", "$49/mo", "Ongoing artisan promotion and sales guidance."]
      ],

      influencer: [
        ["Influencer Campaign Kit", "À la carte", "$49", "Post ideas, captions, tracking guidance, and affiliate messaging."],
        ["Influencer Sales Boost Bundle", "Bundle", "$179", "Content plan, product promotion, and campaign guidance."],
        ["Influencer Growth Membership", "Subscription", "$59/mo", "Monthly campaign ideas and sales-support assets."]
      ],

      creator: [
        ["Creator Content Kit", "À la carte", "$45", "Content prompts and brand-safe caption ideas."],
        ["Creator Monetization Bundle", "Bundle", "$169", "Offer ideas, digital-product planning, and promo copy."],
        ["Creator Growth Membership", "Subscription", "$55/mo", "Monthly creator growth support."]
      ]
    };

    function prefs() {
      try {
        return JSON.parse(localStorage.getItem(STORE_KEY) || "{}");
      } catch (e) {
        return {};
      }
    }

    function savePrefs(data) {
      localStorage.setItem(STORE_KEY, JSON.stringify(data));
    }

    function addStyle() {

      if (document.getElementById("bc-system-style")) return;

      var style = document.createElement("style");

      style.id = "bc-system-style";

      style.textContent = `
        #bc-panel{
          position:fixed;
          right:18px;
          bottom:90px;
          width:390px;
          max-width:calc(100vw - 36px);
          max-height:72vh;
          overflow:auto;
          z-index:2147483647;
          background:#fff;
          color:#161616;
          border-radius:24px;
          border:1px solid rgba(0,0,0,.12);
          box-shadow:0 20px 70px rgba(0,0,0,.28);
          font-family:Inter,system-ui,sans-serif;
          display:none
        }

        #bc-panel header{
          padding:16px 18px;
          background:linear-gradient(135deg,#111,#6d5637);
          color:#fff;
          border-radius:24px 24px 0 0
        }

        #bc-panel main{
          padding:16px
        }

        .bc-input{
          width:100%;
          border:1px solid rgba(0,0,0,.18);
          border-radius:999px;
          padding:12px 14px;
          margin:7px 0 13px;
          box-sizing:border-box
        }

        .bc-btn{
          border:0;
          border-radius:999px;
          padding:13px 18px;
          background:#111;
          color:#fff;
          font-weight:700;
          cursor:pointer;
          box-shadow:0 12px 35px rgba(0,0,0,.28)
        }

        .bc-mini{
          border:1px solid rgba(0,0,0,.14);
          background:#fafafa;
          border-radius:999px;
          padding:8px 10px;
          cursor:pointer;
          margin:4px
        }

        .bc-card{
          border:1px solid rgba(0,0,0,.1);
          border-radius:18px;
          padding:13px;
          margin:10px 0;
          background:#fffaf3
        }

        #bc-toggle{
          position:fixed;
          right:18px;
          bottom:18px;
          z-index:2147483647
        }

        body.bc-large-text{
          font-size:112%!important
        }

        body.bc-readable-spacing{
          letter-spacing:.04em!important;
          line-height:1.7!important
        }

        body.bc-high-contrast{
          filter:contrast(1.18)
        }
      `;

      document.head.appendChild(style);
    }

    function updateFavicon(p) {

      var icon =
        document.querySelector("link[rel='icon']") ||
        document.createElement("link");

      icon.rel = "icon";

      icon.href =
        "data:image/svg+xml," +
        encodeURIComponent(
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">' +
          '<rect width="64" height="64" rx="14" fill="' +
          (p.incomeTier === "ultra-luxury" ? "#111" : "#6d5637") +
          '"/>' +
          '<text x="32" y="39" text-anchor="middle" font-size="18" fill="' +
          (p.incomeTier === "ultra-luxury" ? "#d8b46a" : "white") +
          '">B&Co</text>' +
          '</svg>'
        );

      document.head.appendChild(icon);
    }

    function makeCard(item) {

      var div = document.createElement("div");

      div.className = "bc-card";

      div.innerHTML =
        "<strong>" + item[0] + "</strong><br>" +
        item[1] + " · " + item[2] +
        "<p>" + item[3] + "</p>" +
        "<button class='bc-mini'>Request / Add</button>";

      return div;
    }

    function renderOffers() {

      var p = prefs();

      var role =
        String(p.role || "")
          .toLowerCase()
          .trim();

      var target =
        document.getElementById("bc-private-offers");

      if (!target) return;

      target.innerHTML = "";

      if (!offers[role]) return;

      var section = document.createElement("section");

      section.innerHTML =
        "<div class='bc-card'>" +
        "<h2>" +
        role.charAt(0).toUpperCase() +
        role.slice(1) +
        " Private Offers</h2>" +
        "<p>Visible only for selected " +
        role +
        " accounts.</p>" +
        "</div>";

      offers[role].forEach(function (item) {
        section.appendChild(makeCard(item));
      });

      target.appendChild(section);
    }

    function buildUI() {

      addStyle();

      var p = prefs();

      if (!document.getElementById("bc-panel")) {

        var panel = document.createElement("div");

        panel.id = "bc-panel";

        panel.innerHTML = `
          <header>
            <strong>Accessibility, Language & Personalization</strong>
            <div style="font-size:12px;opacity:.9">
              Type your preferred language, role, communication method, and preferences.
            </div>
          </header>

          <main>

            <label>Preferred language / dialect / region</label>

            <input
              id="bc-lang"
              class="bc-input"
              list="bc-langs"
              placeholder="English, Español, Français..."
              value="${p.language || ""}"
            >

            <datalist id="bc-langs">
              <option value="English">
              <option value="Español">
              <option value="Français">
              <option value="Deutsch">
              <option value="Português">
              <option value="中文">
              <option value="日本語">
              <option value="한국어">
            </datalist>

            <label>Role</label>

            <input
              id="bc-role"
              class="bc-input"
              list="bc-roles"
              placeholder="artisan, creator, influencer..."
              value="${p.role || ""}"
            >

            <datalist id="bc-roles">
              <option value="artisan">
              <option value="creator">
              <option value="influencer">
              <option value="customer">
              <option value="nonprofit">
            </datalist>

            <label>Income / service tier</label>

            <input
              id="bc-income"
              class="bc-input"
              placeholder="standard, luxury..."
              value="${p.incomeTier || ""}"
            >

            <label>Preferred communication method</label>

            <input
              id="bc-comm"
              class="bc-input"
              placeholder="chatbot, email, text..."
              value="${p.communication || ""}"
            >

            <button id="bc-save" class="bc-btn">
              Save Preferences
            </button>

            <div style="margin-top:14px">
              <button class="bc-mini" data-toggle="bc-large-text">Larger Text</button>
              <button class="bc-mini" data-toggle="bc-readable-spacing">Readable Spacing</button>
              <button class="bc-mini" data-toggle="bc-high-contrast">High Contrast</button>
            </div>

            <div id="bc-private-offers"></div>

          </main>
        `;

        document.body.appendChild(panel);
      }

      if (!document.getElementById("bc-toggle")) {

        var toggle = document.createElement("button");

        toggle.id = "bc-toggle";
        toggle.className = "bc-btn";
        toggle.textContent = "Accessibility";

        document.body.appendChild(toggle);
      }

      document.getElementById("bc-toggle").onclick =
        function () {

          var panel =
            document.getElementById("bc-panel");

          panel.style.display =
            panel.style.display === "block"
              ? "none"
              : "block";
        };

      document.getElementById("bc-save").onclick =
        function () {

          var p = prefs();

          p.language =
            document.getElementById("bc-lang").value.trim();

          p.role =
            document.getElementById("bc-role").value.trim();

          p.incomeTier =
            document.getElementById("bc-income").value.trim();

          p.communication =
            document.getElementById("bc-comm").value.trim();

          savePrefs(p);

          updateFavicon(p);

          renderOffers();

          alert("Brian & Co preferences saved.");
        };

      document
        .querySelectorAll("[data-toggle]")
        .forEach(function (btn) {

          btn.onclick = function () {

            var cls =
              btn.getAttribute("data-toggle");

            document.body.classList.toggle(cls);
          };
        });

      renderOffers();
    }

    function selfHeal() {

      try {

        buildUI();

        updateFavicon(prefs());

        renderOffers();

      } catch (err) {

        console.error(
          "Brian & Co self-healing system repaired safely:",
          err
        );
      }
    }

    selfHeal();

    setInterval(selfHeal, 3000);

    new MutationObserver(function () {
      selfHeal();
    }).observe(document.documentElement, {
      childList: true,
      subtree: true
    });

  } catch (err) {

    console.error(
      "Brian & Co complete system failed safely:",
      err
    );
  }

})();
