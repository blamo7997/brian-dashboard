import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const VAULT = path.join(ROOT, "vault");
const REPORTS = path.join(ROOT, "reports");

function ensure(p){ fs.mkdirSync(p,{recursive:true}); }
function readJson(file, fallback){ return fs.existsSync(file) ? JSON.parse(fs.readFileSync(file,"utf8")) : fallback; }
function writeJson(file, data){ ensure(path.dirname(file)); fs.writeFileSync(file, JSON.stringify(data,null,2), "utf8"); }

function stamp(){ return new Date().toISOString(); }

function save(collection, record){
  ensure(VAULT); ensure(REPORTS);
  const file = path.join(VAULT, collection);
  const list = readJson(file, []);
  const stored = {
    id: `lge_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,
    created_at: stamp(),
    source: "Lumen Guided Experience Studio",
    secret_safe: true,
    ...record
  };
  list.push(stored);
  writeJson(file, list);

  const report = [
    "LUMEN GUIDED EXPERIENCE STUDIO",
    `Created: ${stored.created_at}`,
    `Type: ${stored.type}`,
    `Title: ${stored.title}`,
    `Vault File: ${collection}`,
    "Deleted files: 0",
    "Secrets exposed: NO"
  ].join("\n");

  fs.writeFileSync(path.join(REPORTS, `guided-experience-${stored.id}.txt`), report, "utf8");
  console.log(report);
}

function dashboard(title){
  save("design-blueprints.json", {
    type: "dashboard_blueprint",
    title,
    voice: "warm premium Lumen voice",
    layout: [
      "Hero oval command bar: Ask Lumen anything",
      "Founder approval queue",
      "Vault knowledge panel",
      "Learning engine status",
      "Scan and validation panel",
      "Website/design studio panel",
      "Guided tutorial panel",
      "Security and rollback panel"
    ],
    clickable_ovals: [
      { label: "Ask Me How", action: "open guided walkthrough" },
      { label: "Design This Dashboard", action: "generate layout options" },
      { label: "Explain This Panel", action: "show image + text tutorial" }
    ],
    image_prompts: [
      `Premium titanium-frost Lumen dashboard for ${title}, sunrise gradient, elegant oval callouts, accessible large text, cinematic UI`
    ]
  });
}

function website(title){
  save("website-blueprints.json", {
    type: "website_blueprint",
    title,
    voice: "warm, eloquent, premium, trusted-friend Lumen voice",
    sections: [
      "Hero with luxury gradient",
      "What Lumen can do",
      "Memberships and a la carte services",
      "Creator, artisan, supplier, customer pathways",
      "Accessibility and language controls",
      "Guided image walkthrough",
      "Founder-approved legal/policy footer"
    ],
    clickable_ovals: [
      { label: "Start Here", action: "guided onboarding" },
      { label: "Show Me Plans", action: "open comparison" },
      { label: "Ask Lumen", action: "open concierge" }
    ],
    image_prompts: [
      `Elegant Brian & Co / Lumen homepage, soft titanium-frost UI, luxury sunrise gradient, oval guided help buttons, accessible layout`
    ]
  });
}

function tutorial(title){
  save("tutorial-blueprints.json", {
    type: "tutorial_blueprint",
    title,
    mode_options: ["image_text_walkthrough", "video_script", "clickable_oval_walkthrough", "voice_guided"],
    steps: [
      { step: 1, title: "Open Lumen", text: "Welcome. I’ll walk with you one step at a time." },
      { step: 2, title: "Find the Vault", text: "The Vault is where Lumen safely stores learned records, summaries, and relationships." },
      { step: 3, title: "Use Ask Me How", text: "Select the oval help button whenever you want a guided explanation." },
      { step: 4, title: "Review before action", text: "Lumen recommends changes, but important actions wait for your approval." }
    ],
    image_prompts: [
      `Step-by-step Lumen Vault tutorial, soft premium dashboard, oval callouts, warm accessible instructional design`
    ],
    video_script: `Welcome to Lumen. In this walkthrough, I’ll show you how to use ${title} safely and confidently.`
  });
}

function voice(style){
  const allowed = ["feminine","masculine","neutral","warm-premium","calm-teacher","executive-assistant","friendly-guide"];
  const selected = allowed.includes(style) ? style : "warm-premium";
  writeJson(path.join(VAULT, "voice-preferences.json"), {
    updated_at: stamp(),
    selected_voice_style: selected,
    allowed_voice_styles: allowed,
    note: "Voice style preference only. No biometric voice cloning is performed."
  });
  console.log(`Voice style saved: ${selected}`);
}

const [cmd, ...rest] = process.argv.slice(2);
const text = rest.join(" ").trim() || "Untitled";

if (cmd === "dashboard") dashboard(text);
else if (cmd === "website") website(text);
else if (cmd === "tutorial") tutorial(text);
else if (cmd === "voice") voice(text);
else {
  console.log("Usage:");
  console.log('node ./src/lumen-guided-experience-studio.mjs dashboard "Founder Command Center"');
  console.log('node ./src/lumen-guided-experience-studio.mjs website "Brian & Co homepage"');
  console.log('node ./src/lumen-guided-experience-studio.mjs tutorial "How to use Vault"');
  console.log('node ./src/lumen-guided-experience-studio.mjs voice feminine');
}
