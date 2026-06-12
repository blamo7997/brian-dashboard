import fs from "node:fs";
import path from "node:path";

const PROFILE_DIR = path.resolve("./lumen-os/data/user-profile");

function safeUserId(userId = "anonymous") {
  return String(userId || "anonymous").toLowerCase().replace(/[^a-z0-9_-]+/g, "_");
}

function profileFile(userId) {
  fs.mkdirSync(PROFILE_DIR, { recursive: true });
  return path.join(PROFILE_DIR, `${safeUserId(userId)}.json`);
}

export function readUserProfile(userId = "anonymous") {
  const file = profileFile(userId);

  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, JSON.stringify({
      userId: safeUserId(userId),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      communication: {
        tone: "adaptive",
        detail: "adaptive",
        questionLevel: "adaptive",
        stepByStepDefault: false
      },
      language: {},
      accessibility: {},
      lifeContext: {},
      preferences: {},
      privacy: {
        userScoped: true,
        sensitiveUse: "only-when-relevant-and-respectful",
        noStereotyping: true
      }
    }, null, 2));
  }

  return JSON.parse(fs.readFileSync(file, "utf8"));
}

export function updateUserProfile(userId = "anonymous", patch = {}) {
  const profile = readUserProfile(userId);

  const updated = {
    ...profile,
    ...patch,
    communication: { ...(profile.communication || {}), ...(patch.communication || {}) },
    language: { ...(profile.language || {}), ...(patch.language || {}) },
    accessibility: { ...(profile.accessibility || {}), ...(patch.accessibility || {}) },
    lifeContext: { ...(profile.lifeContext || {}), ...(patch.lifeContext || {}) },
    preferences: { ...(profile.preferences || {}), ...(patch.preferences || {}) },
    updatedAt: new Date().toISOString()
  };

  fs.writeFileSync(profileFile(userId), JSON.stringify(updated, null, 2));
  return updated;
}

export function inferCommunicationPreference({ text = "", currentProfile = {} }) {
  const clean = String(text || "").toLowerCase();

  const communication = { ...(currentProfile.communication || {}) };

  if (clean.includes("step by step")) communication.stepByStepDefault = true;
  if (clean.includes("brief") || clean.includes("short")) communication.detail = "brief";
  if (clean.includes("more detail") || clean.includes("deep")) communication.detail = "deep";
  if (clean.includes("don't ask") || clean.includes("no questions") || clean.includes("just do it")) {
    communication.questionLevel = "minimal";
    communication.actionBias = "do-it";
  }

  return communication;
}
