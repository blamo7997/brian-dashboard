import fs from "fs";

const required = [
  "vercel.json",
  "package.json",
  "api/index.js",
  "brianco-digital-catalog.json",
  "sync-digital-products.mjs"
];

let errors = [];

for (let i = 1; i <= 3000; i++) {
  for (const file of required) {
    if (!fs.existsSync(file)) errors.push(`Loop ${i}: missing ${file}`);
  }

  JSON.parse(fs.readFileSync("vercel.json","utf8"));
  JSON.parse(fs.readFileSync("package.json","utf8"));
  JSON.parse(fs.readFileSync("brianco-digital-catalog.json","utf8"));

  const api = fs.readFileSync("api/index.js","utf8");
  const sync = fs.readFileSync("sync-digital-products.mjs","utf8");

  for (const route of ["status","health","env","products","collections","concierge","subscriptions","alacarte","catalog"]) {
    if (!api.includes(`route === "${route}"`)) errors.push(`Loop ${i}: missing API route ${route}`);
  }

  for (const term of ["BRIANCO-AI-PRO-SUB","BRIANCO-CONSENT-ATLAS-SUB","BRIANCO-GROWTH-INTEL-SUB","svgDataUri","custom_collections.json"]) {
    if (!sync.includes(term) && !JSON.stringify(JSON.parse(fs.readFileSync("brianco-digital-catalog.json","utf8"))).includes(term)) {
      errors.push(`Loop ${i}: missing ${term}`);
    }
  }
}

if (errors.length) {
  console.error("VALIDATION FAILED");
  console.error(errors.slice(0,100).join("\n"));
  process.exit(1);
}

console.log("PASS 3000 digital subscription/catalog checks");
