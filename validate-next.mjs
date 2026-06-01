import fs from "fs";

const required = [
  "vercel.json",
  "package.json",
  "api/index.js"
];

let errors = [];

for (let i = 1; i <= 3000; i++) {

  for (const file of required) {
    if (!fs.existsSync(file)) {
      errors.push(`Loop ${i}: missing ${file}`);
    }
  }

  JSON.parse(fs.readFileSync("vercel.json","utf8"));
  JSON.parse(fs.readFileSync("package.json","utf8"));

  const api = fs.readFileSync("api/index.js","utf8");

  const routes = [
    "status",
    "health",
    "env",
    "products",
    "collections",
    "concierge"
  ];

  for (const route of routes) {
    if (!api.includes(`route === "${route}"`)) {
      errors.push(`Loop ${i}: missing route ${route}`);
    }
  }

  if (!api.includes("products.json?limit=50")) {
    errors.push(`Loop ${i}: products endpoint missing`);
  }

  if (!api.includes("custom_collections.json?limit=50")) {
    errors.push(`Loop ${i}: collections endpoint missing`);
  }

  if (!api.includes("OPENAI_API_KEY")) {
    errors.push(`Loop ${i}: OpenAI env check missing`);
  }

  if (!api.includes("placeholderImageNeeded")) {
    errors.push(`Loop ${i}: image placeholder checks missing`);
  }

}

if (errors.length) {
  console.error(errors.slice(0,100).join("\n"));
  process.exit(1);
}

console.log("PASS 3000");

