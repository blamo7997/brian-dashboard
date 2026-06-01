const memory = globalThis.__BRIANCO_MEMORY__ || { interactions: [], events: [] };
globalThis.__BRIANCO_MEMORY__ = memory;

export function saveInteraction(input = {}) {
  const item = {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    source: input.source || "website-chatbot",
    channel: input.channel || "chatbot",
    userId: input.userId || "guest",
    sessionId: input.sessionId || "anonymous-session",
    locale: input.locale || "en-US",
    consent: input.consent === true,
    message: input.message || "",
    productContext: input.productContext || null,
    imageContext: input.imageContext || null,
    priceContext: input.priceContext || null,
    orderContext: input.orderContext || null,
    accessibilityContext: input.accessibilityContext || null
  };
  memory.interactions.push(item);
  memory.interactions = memory.interactions.slice(-1000);
  return item;
}

export function saveEvent(input = {}) {
  const event = {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    source: input.source || "website",
    channel: input.channel || "unknown",
    userId: input.userId || "guest",
    sessionId: input.sessionId || "anonymous-session",
    type: input.type || "unknown_event",
    data: input.data || {},
    consent: input.consent === true
  };
  memory.events.push(event);
  memory.events = memory.events.slice(-2000);
  return event;
}

export function getUserState(userId = "guest") {
  return {
    userId,
    interactions: memory.interactions.filter(x => x.userId === userId).slice(-25),
    events: memory.events.filter(x => x.userId === userId).slice(-50)
  };
}
