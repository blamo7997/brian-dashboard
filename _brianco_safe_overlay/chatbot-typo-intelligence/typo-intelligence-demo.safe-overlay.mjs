import { normalizeUserMessage, shouldClarify, chatbotTypoPolicy } from "./typo-intelligence.safe-overlay.js";

const tests = [
  "uok no give me my code",
  "i ant my chabot to fix typos in realtme",
  "dont touch my backend or connecitons",
  "sopfy products are broke fix poweshell",
  "alays and forver make website financing native"
];

console.log(JSON.stringify({
  policy: chatbotTypoPolicy(),
  tests: tests.map(t => {
    const result = normalizeUserMessage(t, { role: "customer" });
    return {
      input: t,
      result,
      shouldClarify: shouldClarify(result)
    };
  })
}, null, 2));
