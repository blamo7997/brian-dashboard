const { chromium, devices } = require("playwright");
const fs = require("fs");

const SITE = "https://briannco.myshopify.com";
const REPORT_DIR = "./brianco-simulation-reports";

if (!fs.existsSync(REPORT_DIR)) {
  fs.mkdirSync(REPORT_DIR, { recursive: true });
}

const interactionLog = [];

const seedQuestions = [
  "Hello",
  "How are you?",
  "Can you help me shop?",
  "Do you support accessibility?",
  "Can I change language?",
  "Can you recommend products?",
  "How do memberships work?",
  "Can I save products?",
  "Can I use mobile ordering?",
  "Can I contact support?",
  "Do you support creators?",
  "Do you support artisans?",
  "How does shipping work?",
  "Can you personalize recommendations?",
  "What digital products exist?",
  "Can you help me browse collections?",
  "Can I use the chatbot in another language?",
  "Do you support accessibility tools?",
  "How do subscriptions work?",
  "What can Brian & Co help me with?"
];

function generateQuestion(index) {
  const prefixes = ["Can you explain", "Help me with", "What about", "How does", "Can Brian & Co support", "Please recommend"];
  const topics = ["luxury products", "gift shopping", "mobile ordering", "accessibility support", "language preferences", "subscriptions", "shipping", "wishlist", "returns", "customer support"];
  return prefixes[index % prefixes.length] + " " + topics[index % topics.length] + "?";
}

async function askChatbot(page, question) {
  try {
    const selectors = ["#brianco-chatbot-input", ".chatbot-input", "[data-chat-input]", "textarea", "input[type='text']"];
    let input = null;

    for (const selector of selectors) {
      const el = await page.$(selector);
      if (el) {
        input = el;
        break;
      }
    }

    if (!input) {
      interactionLog.push({ type: "chatbot", question: question, answer: "[NO CHAT INPUT FOUND]", timestamp: new Date().toISOString() });
      return;
    }

    await input.fill(question);
    await page.keyboard.press("Enter");
    await page.waitForTimeout(2500);

    const bodyText = await page.locator("body").innerText();

    interactionLog.push({
      type: "chatbot",
      question: question,
      answer: bodyText.slice(0, 3000),
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    interactionLog.push({ type: "chatbot-error", question: question, error: err.message, timestamp: new Date().toISOString() });
  }
}

async function simulateInteraction(page, step) {
  const actions = ["homepage", "collections", "cart", "footer", "search", "scroll", "chatbot", "accessibility"];
  const action = actions[step % actions.length];

  try {
    if (action === "homepage") {
      await page.goto(SITE, { waitUntil: "networkidle" });
    }

    if (action === "collections") {
      await page.goto(SITE + "/collections/all", { waitUntil: "networkidle" }).catch(function(){});
    }

    if (action === "cart") {
      await page.goto(SITE + "/cart", { waitUntil: "networkidle" }).catch(function(){});
    }

    if (action === "footer") {
      await page.locator("footer").scrollIntoViewIfNeeded().catch(function(){});
    }

    if (action === "search") {
      const search = await page.$("input[type='search']");
      if (search) await search.fill("luxury recommendations");
    }

    if (action === "scroll") {
      await page.mouse.wheel(0, 1200);
    }

    if (action === "accessibility") {
      await page.keyboard.press("Tab");
    }

    if (action === "chatbot") {
      const q = step < seedQuestions.length ? seedQuestions[step] : generateQuestion(step);
      await askChatbot(page, q);
    }

    interactionLog.push({ type: "interaction", action: action, timestamp: new Date().toISOString() });
  } catch (err) {
    interactionLog.push({ type: "interaction-error", action: action, error: err.message, timestamp: new Date().toISOString() });
  }
}

function saveReports() {
  const timestamp = Date.now();
  const jsonPath = REPORT_DIR + "/simulation-" + timestamp + ".json";
  const txtPath = REPORT_DIR + "/chatbot-" + timestamp + ".txt";

  fs.writeFileSync(jsonPath, JSON.stringify(interactionLog, null, 2));

  const readable = interactionLog.map(function(x) {
    return [
      "TYPE:",
      x.type || "",
      "",
      "QUESTION/ACTION:",
      x.question || x.action || "",
      "",
      "ANSWER/ERROR:",
      x.answer || x.error || "",
      "",
      "TIMESTAMP:",
      x.timestamp || "",
      "",
      "----------------------------------------",
      ""
    ].join("\n");
  }).join("\n");

  fs.writeFileSync(txtPath, readable);
}

async function runContext(config) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext(config);
  const page = await context.newPage();

  await page.goto(SITE, { waitUntil: "networkidle" });

  for (let i = 0; i < 3000; i++) {
    await simulateInteraction(page, i);

    if (i % 100 === 0) {
      console.log("SIMULATION STEP: " + i);
      saveReports();
    }

    await page.waitForTimeout(250);
  }

  await browser.close();
}

async function mainLoop() {
  const contexts = [
    { name: "desktop", viewport: { width: 1600, height: 1000 } },
    { name: "tablet", viewport: { width: 1000, height: 1200 } },
    Object.assign({ name: "mobile" }, devices["iPhone 14"])
  ];

  while (true) {
    console.log("STARTING CONTINUOUS LIVE PASS");

    for (const cfg of contexts) {
      console.log("RUNNING CONTEXT: " + cfg.name);
      await runContext(cfg).catch(function(err) {
        interactionLog.push({ type: "runtime-error", error: err.message, timestamp: new Date().toISOString() });
      });
    }

    saveReports();
    console.log("PASS COMPLETE. RESTARTING IN 15 SECONDS...");
    await new Promise(function(resolve) { setTimeout(resolve, 15000); });
  }
}

mainLoop();
