import fs from "fs";

const t = fs.readFileSync("./api/index.js","utf8");

let errors = [];

for (let i = 1; i <= 3000; i++) {

  if (!t.includes('route === "products"')) {
    errors.push(`Loop ${i}: products missing`);
  }

  if (!t.includes('route === "concierge"')) {
    errors.push(`Loop ${i}: concierge missing`);
  }

  if (!t.includes('route === "collections"')) {
    errors.push(`Loop ${i}: collections missing`);
  }

}

if (errors.length) {
  console.error(errors.slice(0,20).join("\n"));
  process.exit(1);
}

console.log("PASS 3000");

