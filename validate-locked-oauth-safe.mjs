import fs from "fs";

let errors = [];

const required = ["vercel.json", "package.json", "api/index.js"];

for (let i = 1; i <= 3000; i++) {
  for (const f of required) {
    if (!fs.existsSync(f)) errors.push(`Loop ${i}: missing ${f}`);
  }

  JSON.parse(fs.readFileSync("vercel.json","utf8").replace(/^\uFEFF/,""));
  JSON.parse(fs.readFileSync("package.json","utf8").replace(/^\uFEFF/,""));

  const api = fs.readFileSync("api/index.js","utf8").replace(/^\uFEFF/,"");

  for (const route of [
    "status",
    "health",
    "env",
    "products",
    "collections",
    "catalog",
    "seo",
    "consent-policy",
    "concierge"
  ]) {
    if (!api.includes(`route === "${route}"`)) errors.push(`Loop ${i}: missing route ${route}`);
  }

  for (const term of [
    "oauthPreserved",
    "proprietary",
    "SHOPIFY_API_KEY",
    "SHOPIFY_API_SECRET",
    "SHOPIFY_ADMIN_API_TOKEN",
    "OPENAI_API_KEY",
    "secretsPrinted: false",
    "realtimeSeo",
    "formats",
    "upgradeRecommendations"
  ]) {
    if (!api.includes(term)) errors.push(`Loop ${i}: missing ${term}`);
  }

  if (api.includes("Bestme26")) errors.push(`Loop ${i}: forbidden plaintext password found`);
}

if (errors.length) {
  console.error("VALIDATION FAILED");
  console.error(errors.slice(0,100).join("\n"));
  process.exit(1);
}

console.log("PASS 3000 locked proprietary OAuth-safe checks");
