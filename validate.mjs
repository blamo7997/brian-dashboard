import fs from "fs";

const required = [
  "vercel.json",
  "package.json",
  "lib/security.js",
  "lib/shopify.js",
  "api/status.js",
  "api/health.js",
  "api/env-check.js",
  "api/shopify-install.js",
  "api/products.js",
  "api/collections.js",
  "api/concierge.js"
];

let errors = [];

for (let i = 1; i <= 3000; i++) {

  for (const file of required) {
    if (!fs.existsSync(file)) {
      errors.push(`Loop ${i}: missing ${file}`);
    }
  }

  try {
    JSON.parse(fs.readFileSync("vercel.json", "utf8"));
  } catch (e) {
    errors.push(`Loop ${i}: bad vercel.json`);
  }

  try {
    JSON.parse(fs.readFileSync("package.json", "utf8"));
  } catch (e) {
    errors.push(`Loop ${i}: bad package.json`);
  }

  const allText = required
    .map(f => fs.readFileSync(f, "utf8"))
    .join("\n");

  if (!allText.includes("products.json?limit=50")) {
    errors.push(`Loop ${i}: products endpoint missing`);
  }

  if (!allText.includes("custom_collections.json?limit=50")) {
    errors.push(`Loop ${i}: collections endpoint missing`);
  }

  if (!allText.includes("timingSafeEqual")) {
    errors.push(`Loop ${i}: timingSafeEqual missing`);
  }
}

if (errors.length) {
  console.error("VALIDATION FAILED");
  console.error(errors.slice(0,100).join("\n"));
  process.exit(1);
}

console.log("VALIDATION PASSED");
