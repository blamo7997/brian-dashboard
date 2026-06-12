import fs from "node:fs";
import path from "node:path";

const STARTUP_DIR = path.resolve("./lumen-os/data/startup");
const SESSION_DIR = path.resolve("./lumen-os/data/sessions");
const SESSION_FILE = path.join(SESSION_DIR, "last-session.json");

function ensureDirs() {
  fs.mkdirSync(STARTUP_DIR, { recursive: true });
  fs.mkdirSync(SESSION_DIR, { recursive: true });
}

export function saveStartupSession({
  userId = "founder",
  route = "/lumen/control",
  mode = "founder-startup",
  workspace = "",
  notes = ""
} = {}) {
  ensureDirs();

  const session = {
    savedAt: new Date().toISOString(),
    userId,
    route,
    mode,
    workspace,
    notes,
    restoreAutomatically: true
  };

  fs.writeFileSync(SESSION_FILE, JSON.stringify(session, null, 2));
  return session;
}

export function loadStartupSession() {
  ensureDirs();

  if (!fs.existsSync(SESSION_FILE)) {
    return saveStartupSession({});
  }

  return JSON.parse(fs.readFileSync(SESSION_FILE, "utf8"));
}

export function startupChecklist() {
  const session = loadStartupSession();

  return {
    ok: true,
    generated: new Date().toISOString(),
    session,
    checks: {
      workspace: fs.existsSync(process.env.USERPROFILE ? `${process.env.USERPROFILE}\\LumenWorkspace` : "./"),
      registry: fs.existsSync("./lumen-os/data/registry/universal-registry.json"),
      vault: fs.existsSync("./lumen-os/data/vault/vault-records.json"),
      knowledgeGraph: fs.existsSync("./lumen-os/data/knowledge-graph/knowledge-graph.json"),
      digitalTwin: fs.existsSync("./lumen-os/data/digital-twin/digital-twin-state.json"),
      controlPage: fs.existsSync("./pages/lumen/control.js"),
      founderCenter: fs.existsSync("./pages/lumen/founder-center.js")
    }
  };
}
