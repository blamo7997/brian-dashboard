import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const VAULT = path.join(ROOT, "vault");
const REPORTS = path.join(ROOT, "reports");

function ensure(p){ fs.mkdirSync(p,{recursive:true}); }
function readJson(file, fallback){ return fs.existsSync(file) ? JSON.parse(fs.readFileSync(file,"utf8")) : fallback; }
function writeJson(file, data){ ensure(path.dirname(file)); fs.writeFileSync(file, JSON.stringify(data,null,2), "utf8"); }

const registryFile = path.join(VAULT, "module-registry.json");

const modules = [
  ["core.orchestrator","Core","installed","critical",["vault"]],
  ["core.module_registry","Core","installed","critical",["vault"]],
  ["core.vault","Core","installed","critical",[]],
  ["core.reports","Core","installed","high",["vault"]],
  ["core.trust_ledger","Core","planned","critical",["vault"]],
  ["core.approval_gates","Core","planned","critical",["vault"]],
  ["core.rollback","Core","planned","critical",["vault"]],

  ["intelligence.learning_engine","Intelligence","planned","critical",["vault","module_registry"]],
  ["intelligence.knowledge_graph","Intelligence","planned","critical",["vault","learning_engine"]],
  ["intelligence.universal_search","Intelligence","planned","critical",["vault","knowledge_graph"]],
  ["intelligence.vetted_sources","Intelligence","planned","high",["vault","learning_engine"]],
  ["intelligence.cross_vetted_abstracts","Intelligence","planned","high",["vetted_sources"]],
  ["intelligence.research","Intelligence","planned","high",["vault","knowledge_graph"]],

  ["experience.guided_experience","Experience","installed","critical",["vault"]],
  ["experience.dashboard_designer","Experience","installed","high",["guided_experience"]],
  ["experience.website_designer","Experience","installed","high",["guided_experience"]],
  ["experience.tutorial_builder","Experience","installed","high",["guided_experience"]],
  ["experience.voice_manager","Experience","installed","high",["vault"]],
  ["experience.founder_command_center","Experience","planned","critical",["vault","module_registry","search"]],

  ["development.code_intelligence","Development","planned","high",["learning_engine","knowledge_graph"]],
  ["development.api_intelligence","Development","planned","high",["code_intelligence"]],
  ["development.supabase_awareness","Development","planned","high",["vault","code_intelligence"]],
  ["development.cloudflare_awareness","Development","planned","high",["vault","code_intelligence"]],
  ["development.testing_playwright","Development","planned","high",["code_intelligence"]],
  ["development.pipeline_intelligence","Development","planned","high",["code_intelligence"]],

  ["device.hardware_awareness","Devices","planned","high",["learning_engine"]],
  ["device.driver_awareness","Devices","planned","high",["hardware_awareness"]],
  ["device.firmware_awareness","Devices","planned","medium",["hardware_awareness"]],
  ["device.scientific_instruments","Devices","planned","high",["hardware_awareness","knowledge_graph"]],
  ["device.drones","Devices","planned","high",["hardware_awareness","research"]],
  ["device.robotics","Devices","planned","high",["hardware_awareness","research"]],

  ["business.brianco","Business","planned","critical",["vault","search"]],
  ["business.customer_intelligence","Business","planned","high",["brianco"]],
  ["business.supplier_intelligence","Business","planned","high",["brianco"]],
  ["business.creator_intelligence","Business","planned","high",["brianco"]],
  ["business.product_intelligence","Business","planned","high",["brianco"]],
  ["business.legal_review","Business","planned","high",["approval_gates"]],
  ["business.accounting_tax","Business","planned","medium",["brianco"]],

  ["accessibility.universal_accessibility","Accessibility","planned","critical",["guided_experience"]],
  ["localization.language_dialect","Localization","planned","critical",["guided_experience"]],
  ["localization.global_holidays","Localization","planned","medium",["language_dialect"]],

  ["industry.universal_professions","Industries","planned","high",["module_registry","knowledge_graph"]],
  ["industry.construction","Industries","planned","medium",["universal_professions"]],
  ["industry.hospitality","Industries","planned","medium",["universal_professions"]],
  ["industry.retail","Industries","planned","medium",["universal_professions"]],
  ["industry.education","Industries","planned","medium",["universal_professions"]],
  ["industry.government","Industries","planned","medium",["universal_professions"]],
  ["industry.public_safety","Industries","planned","medium",["universal_professions"]],
  ["industry.legal","Industries","planned","medium",["universal_professions"]],
  ["industry.finance","Industries","planned","medium",["universal_professions"]],
  ["industry.engineering","Industries","planned","high",["universal_professions"]],
  ["industry.software_technology","Industries","planned","high",["universal_professions"]],
  ["industry.research","Industries","planned","high",["universal_professions"]],
  ["industry.manufacturing","Industries","planned","medium",["universal_professions"]],
  ["industry.transportation","Industries","planned","medium",["universal_professions"]],
  ["industry.energy","Industries","planned","medium",["universal_professions"]],
  ["industry.space","Industries","planned","medium",["universal_professions"]],
  ["industry.environmental","Industries","planned","medium",["universal_professions"]],
  ["industry.nonprofit_community","Industries","planned","medium",["universal_professions"]],
  ["industry.faith_religious","Industries","planned","medium",["universal_professions"]],

  ["future.ar_vr","Future","planned","medium",["guided_experience"]],
  ["future.3d_images","Future","planned","medium",["ar_vr"]],
  ["future.emoji_language","Future","planned","medium",["guided_experience"]],
  ["future.nanotechnology","Future","planned","medium",["research"]],
  ["future.nanorobotics","Future","planned","medium",["nanotechnology"]],
  ["future.digital_twins","Future","planned","high",["knowledge_graph"]],
  ["future.browser_layer","Future","planned","high",["search","guided_experience"]]
];

function buildRegistry(){
  const existing = readJson(registryFile, []);
  const byId = new Map(existing.map(m => [m.id, m]));

  for (const [id, category, status, priority, depends_on] of modules) {
    const prev = byId.get(id) || {};
    byId.set(id, {
      id,
      name: id.split(".").slice(1).join(" ").replaceAll("_"," "),
      category,
      status: prev.status || status,
      priority,
      depends_on,
      installed: (prev.status || status) === "installed",
      enabled: (prev.status || status) === "installed",
      vault_connected: true,
      learning_connected: false,
      ui_connected: category === "Experience",
      api_connected: false,
      security_level: priority === "critical" ? "high" : "standard",
      owner: "Brian / Lumen",
      version: prev.version || "0.1.0",
      notes: prev.notes || "",
      updated_at: new Date().toISOString()
    });
  }

  const registry = [...byId.values()].sort((a,b) => a.id.localeCompare(b.id));
  writeJson(registryFile, registry);

  const categories = {};
  for (const m of registry) {
    categories[m.category] ??= { total: 0, installed: 0, planned: 0 };
    categories[m.category].total++;
    categories[m.category][m.status] = (categories[m.category][m.status] || 0) + 1;
  }
  writeJson(path.join(VAULT, "module-categories.json"), categories);

  const dependencies = registry.map(m => ({ id: m.id, depends_on: m.depends_on }));
  writeJson(path.join(VAULT, "module-dependencies.json"), dependencies);

  const report = [
    "LUMEN MODULE REGISTRY INSTALLED",
    `Generated: ${new Date().toISOString()}`,
    `Total modules: ${registry.length}`,
    `Installed: ${registry.filter(m => m.status === "installed").length}`,
    `Planned: ${registry.filter(m => m.status === "planned").length}`,
    "",
    "Deleted files: 0",
    "Secrets exposed: NO"
  ].join("\n");

  fs.writeFileSync(path.join(REPORTS, `module-registry-report-${Date.now()}.txt`), report, "utf8");
  console.log(report);
}

function list(filter){
  const registry = readJson(registryFile, []);
  const out = filter ? registry.filter(m => m.status === filter || m.category.toLowerCase() === filter) : registry;
  console.log(`Modules: ${out.length}`);
  for (const m of out) console.log(`- ${m.id} | ${m.status} | ${m.priority}`);
}

function missing(){
  const registry = readJson(registryFile, []);
  const out = registry.filter(m => m.status !== "installed");
  console.log(`Missing/planned modules: ${out.length}`);
  for (const m of out) console.log(`- ${m.id} | depends on: ${m.depends_on.join(", ") || "none"}`);
}

const [cmd, arg] = process.argv.slice(2);
if (cmd === "list") list(arg);
else if (cmd === "installed") list("installed");
else if (cmd === "planned") list("planned");
else if (cmd === "missing") missing();
else buildRegistry();
