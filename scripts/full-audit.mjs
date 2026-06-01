import fs from "fs";
import path from "path";

const root = process.cwd();
const stamp = new Date().toISOString().replace(/[:.]/g,"-");

function walk(dir, out=[]){
  if(!fs.existsSync(dir)) return out;
  for(const item of fs.readdirSync(dir)){
    const full=path.join(dir,item);
    if(full.includes("node_modules") || full.includes(".next")) continue;
    const stat=fs.statSync(full);
    if(stat.isDirectory()) walk(full,out);
    else out.push(full.replace(root + path.sep,"").replaceAll("\\","/"));
  }
  return out;
}

function hasBom(file){
  const b = fs.readFileSync(file);
  return b.length >= 3 && b[0] === 0xEF && b[1] === 0xBB && b[2] === 0xBF;
}

const files = [
  ...walk("pages"),
  ...walk("app"),
  ...walk("data"),
  ...walk("protected-registry"),
  ...walk("legal-notices"),
  ...walk("reports"),
  ...walk("scripts")
].sort();

const sourceFiles = files.filter(f => /\.(json|ts|tsx|js|jsx|css|mjs|cjs|md|txt)$/.test(f));
const bomFiles = sourceFiles.filter(f => fs.existsSync(f) && hasBom(f));

const pageFiles = files.filter(f => /^(pages|app)\//.test(f) && /\.(tsx|ts|jsx|js)$/.test(f));
const apiFiles = pageFiles.filter(f => f.startsWith("pages/api/") || f.includes("/api/"));
const registryFiles = files.filter(f => f.startsWith("protected-registry/"));
const reportFiles = files.filter(f => f.startsWith("reports/"));
const legalFiles = files.filter(f => f.startsWith("legal-notices/"));

const requiredThemes = [
  "protection","approval","founder","legal","chatbot","continuity",
  "accessibility","localization","supplier","luxury","income",
  "product","membership","brand","tone","role","customer","commerce"
];

const allPathText = files.join("\n").toLowerCase();
const missingThemes = requiredThemes.filter(t => !allPathText.includes(t));

const requiredRoutes = [
  "command-center",
  "founder-approvals",
  "protected-governance",
  "chatbot-intelligence",
  "accessibility-intelligence",
  "localization-intelligence",
  "memory-continuity-intelligence",
  "supplier-recruitment-intelligence",
  "luxury-resale-intelligence",
  "universal-customer-intelligence",
  "product-image-tone-intelligence"
];

const missingRoutes = requiredRoutes.filter(r => !allPathText.includes(r));

const issues = [];
if(bomFiles.length) issues.push(`BOM still present in: ${bomFiles.join(", ")}`);
if(!fs.existsSync("tsconfig.json")) issues.push("Missing tsconfig.json");
if(!fs.existsSync("package.json")) issues.push("Missing package.json");
if(!registryFiles.length) issues.push("No protected registry files found");
if(!reportFiles.length) issues.push("No reports found");
if(missingThemes.length) issues.push(`Missing theme/path signals: ${missingThemes.join(", ")}`);
if(missingRoutes.length) issues.push(`Missing required route signals: ${missingRoutes.join(", ")}`);

const audit = {
  created: new Date().toISOString(),
  protected: true,
  totalFiles: files.length,
  sourceFiles: sourceFiles.length,
  pageFiles: pageFiles.length,
  apiFiles: apiFiles.length,
  registryFiles: registryFiles.length,
  reportFiles: reportFiles.length,
  legalFiles: legalFiles.length,
  bomFiles,
  missingThemes,
  missingRoutes,
  issues,
  note: "Static audit. Live Shopify/admin/email/payment/customer-data validation requires connected systems."
};

fs.mkdirSync("data/full-audit",{recursive:true});
fs.mkdirSync("reports",{recursive:true});

fs.writeFileSync(`data/full-audit/full-audit-${Date.now()}.json`, JSON.stringify(audit,null,2));

const report = [
  "BRIAN & CO FULL AUDIT REDO",
  audit.created,
  "",
  `Total files: ${audit.totalFiles}`,
  `Source files: ${audit.sourceFiles}`,
  `Page files: ${audit.pageFiles}`,
  `API files: ${audit.apiFiles}`,
  `Protected registries: ${audit.registryFiles}`,
  `Reports: ${audit.reportFiles}`,
  `Legal notices: ${audit.legalFiles}`,
  "",
  "Issues:",
  ...(issues.length ? issues.map(x=>`- ${x}`) : ["- None detected by static audit."]),
  "",
  "BOM files:",
  ...(bomFiles.length ? bomFiles.map(x=>`- ${x}`) : ["- None."])
].join("\n");

fs.writeFileSync(`reports/FULL-AUDIT-REDO-${Date.now()}.txt`, report);
console.log(report);

if(bomFiles.length) process.exitCode = 1;
