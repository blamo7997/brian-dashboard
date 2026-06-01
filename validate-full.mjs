import fs from "fs";

const required = [
  "vercel.json",
  "package.json",
  "api/index.js"
];

let errors = [];

for (let i = 1; i <= 3000; i++) {
  for (const file of required) {
    if (!fs.existsSync(file)) errors.push(`Loop ${i}: missing ${file}`);
  }

  JSON.parse(fs.readFileSync("vercel.json","utf8"));
  JSON.parse(fs.readFileSync("package.json","utf8"));

  const api = fs.readFileSync("api/index.js","utf8");

  for (const route of ["status","health","env","products","collections","concierge"]) {
    if (!api.includes(`route === "${route}"`)) {
      errors.push(`Loop ${i}: missing route ${route}`);
    }
  }

  if (!api.includes("SHOPIFY_ADMIN_API_TOKEN")) errors.push(`Loop ${i}: missing Shopify token check`);
  if (!api.includes("OPENAI_API_KEY")) errors.push(`Loop ${i}: missing OpenAI check`);
  if (!api.includes("products.json?limit=50")) errors.push(`Loop ${i}: missing products API`);
  if (!api.includes("custom_collections.json?limit=50")) errors.push(`Loop ${i}: missing custom collections API`);
  if (!api.includes("smart_collections.json?limit=50")) errors.push(`Loop ${i}: missing smart collections API`);
}

if (errors.length) {
  console.error("VALIDATION FAILED");
  console.error(errors.slice(0,100).join("\n"));
  process.exit(1);
}

console.log("LOCAL VALIDATION PASSED: 3000 checks");
