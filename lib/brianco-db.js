import fs from "fs";

const dbPath = "./data/brianco-memory.json";

function ensureDb() {
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify({
      interactions: [],
      events: [],
      users: {}
    }, null, 2));
  }
}

function readDb() {
  ensureDb();
  return JSON.parse(fs.readFileSync(dbPath, "utf8"));
}

function writeDb(db) {
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
}

export function saveInteraction(input = {}) {
  const db = readDb();

  const interaction = {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    userId: input.userId || "guest",
    sessionId: input.sessionId || "anonymous-session",
    channel: input.channel || "chatbot",
    locale: input.locale || "en-US",
    consent: input.consent === true,
    message: input.message || "",
    productContext: input.productContext || null,
    priceContext: input.priceContext || null,
    imageContext: input.imageContext || null,
    orderContext: input.orderContext || null,
    accessibilityContext: input.accessibilityContext || null
  };

  db.interactions.push(interaction);
  db.interactions = db.interactions.slice(-5000);

  writeDb(db);

  return interaction;
}

export function saveEvent(input = {}) {
  const db = readDb();

  const event = {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    userId: input.userId || "guest",
    sessionId: input.sessionId || "anonymous-session",
    channel: input.channel || "website",
    type: input.type || "unknown_event",
    consent: input.consent === true,
    data: input.data || {}
  };

  db.events.push(event);
  db.events = db.events.slice(-10000);

  writeDb(db);

  return event;
}

export function getUserState(userId = "guest") {
  const db = readDb();

  return {
    userId,
    interactions: db.interactions.filter(x => x.userId === userId).slice(-50),
    events: db.events.filter(x => x.userId === userId).slice(-100)
  };
}
