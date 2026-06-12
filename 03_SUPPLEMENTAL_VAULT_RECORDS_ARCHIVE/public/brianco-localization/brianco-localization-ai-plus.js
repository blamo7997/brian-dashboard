(function(){
  const STORAGE_KEY="brianco.localization.preference";
  const profiles={
    "default":{localeName:"Auto / Default",logoText:"Brian & Co.",fontFamily:"Georgia, serif",currency:"USD",direction:"ltr",chatGreeting:"Welcome to Brian & Co. I can adapt language, tone, accessibility, voice, transcripts, and regional guidance for you."},
    "en-US":{localeName:"English — United States",currency:"USD"},
    "es-US":{localeName:"Español — Estados Unidos",currency:"USD",chatGreeting:"Bienvenido a Brian & Co. Puedo adaptar idioma, accesibilidad, voz, transcripciones y orientación regional."},
    "fr-CA":{localeName:"Français — Canada",currency:"CAD",chatGreeting:"Bienvenue chez Brian & Co. Je peux adapter la langue, l’accessibilité, la voix, les transcriptions et l’expérience régionale."}
  };
  function getLocale(){try{const s=localStorage.getItem(STORAGE_KEY);if(s&&profiles[s])return s;}catch(e){} return navigator.language&&profiles[navigator.language]?navigator.language:"default";}
  function apply(locale){
    const p=Object.assign({},profiles.default,profiles[locale]||{});
    document.documentElement.setAttribute("data-brianco-locale",locale);
    document.documentElement.setAttribute("dir",p.direction||"ltr");
    document.documentElement.style.setProperty("--brianco-font-family",p.fontFamily||"Georgia, serif");
    document.querySelectorAll("[data-brianco-logo-text]").forEach(el=>el.textContent=p.logoText||"Brian & Co.");
    document.querySelectorAll("[data-brianco-chat-greeting]").forEach(el=>el.textContent=p.chatGreeting||"");
    window.BrianCoLocalizationProfile=p;
    window.BrianCoLocalizationLocale=locale;
  }
  document.addEventListener("DOMContentLoaded",()=>apply(getLocale()));
})();
