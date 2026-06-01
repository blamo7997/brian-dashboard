import fs from "fs";

const required = [
  "api/status.js",
  "api/env-check.js",
  "api/concierge.js"
];

let errors = [];

for (let i = 1; i <= 3000; i++) {

  for (const file of required) {

    if (!fs.existsSync(file)) {
      errors.push(`Loop ${i}: missing ${file}`);
    }

  }

  const status = fs.readFileSync("api/status.js", "utf8");
  const env = fs.readFileSync("api/env-check.js", "utf8");
  const concierge = fs.readFileSync("api/concierge.js", "utf8");

  if (!status.includes("repaired")) {
    errors.push(`Loop ${i}: status route missing repaired marker`);
  }

  if (!env.includes("OPENAI_API_KEY")) {
    errors.push(`Loop ${i}: env route missing OpenAI check`);
  }

  if (!concierge.includes("productCards")) {
    errors.push(`Loop ${i}: concierge missing productCards`);
  }

}

if (errors.length) {
  console.error("VALIDATION FAILED");
  console.error(errors.slice(0,100).join("\n"));
  process.exit(1);
}

console.log("VALIDATION PASSED");
