import fs from "node:fs";
import path from "node:path";
import { upsertEntity } from "../registry/registry-engine.mjs";
import { addVaultRecord } from "../vault/vault-engine.mjs";

const OUT = path.resolve("./lumen-os/data/connections");

function exists(p){ return fs.existsSync(p); }
function hasEnv(k){ return Boolean(process.env[k] && String(process.env[k]).trim()); }
function status(ok){ return ok ? "connected-or-configured" : "missing-or-needs-setup"; }

export function checkAndFixConnections({ reason="manual" } = {}) {
  fs.mkdirSync(OUT,{recursive:true});

  const connections = {
    cloudflare: {
      status: status(hasEnv("CLOUDFLARE_API_TOKEN") || hasEnv("CF_API_TOKEN")),
      canAutoFix: false,
      missingAction: "Add CLOUDFLARE_API_TOKEN to .env.local."
    },
    github: {
      status: status(hasEnv("GITHUB_TOKEN") || exists(".git")),
      canAutoFix: exists(".git"),
      missingAction: "Add GITHUB_TOKEN for GitHub API automation."
    },
    openai: {
      status: status(hasEnv("OPENAI_API_KEY")),
      canAutoFix: false,
      missingAction: "Add OPENAI_API_KEY to .env.local."
    },
    chatgpt: {
      status: "manual-account-connection-required",
      canAutoFix: false,
      missingAction: "ChatGPT account connection is manual; OpenAI API uses OPENAI_API_KEY."
    },
    playwright: {
      status: status(exists("node_modules/@playwright") || exists("playwright.config.js") || exists("playwright.config.ts")),
      canAutoFix: true,
      missingAction: "Install @playwright/test and run npx playwright install when ready."
    },
    supabase: {
      status: status(hasEnv("SUPABASE_URL") && (hasEnv("SUPABASE_SERVICE_ROLE_KEY") || hasEnv("SUPABASE_ANON_KEY"))),
      canAutoFix: false,
      missingAction: "Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY or SUPABASE_ANON_KEY."
    },
    vault: {
      status: status(exists("./lumen-os/packages/vault/vault-engine.mjs") && exists("./lumen-os/data/vault")),
      canAutoFix: true,
      missingAction: "Create local Vault directories and engine if missing."
    }
  };

  for (const [name,data] of Object.entries(connections)) {
    upsertEntity({
      entityId: `connection.${name}`,
      entityType: "connection",
      name,
      status: data.status,
      description: data.missingAction,
      data
    });
  }

  const report = {
    generated: new Date().toISOString(),
    reason,
    secretsShown: false,
    connections,
    missing: Object.entries(connections).filter(([,v]) => v.status !== "connected-or-configured").map(([name,v]) => ({ name, ...v })),
    connectedCount: Object.values(connections).filter(v => v.status === "connected-or-configured").length
  };

  addVaultRecord({
    type: "connection-fix-readiness",
    title: "Connection Fix Readiness",
    summary: `${report.connectedCount} connection groups configured.`,
    data: report,
    actor: "connection-fix-engine"
  });

  fs.writeFileSync(path.join(OUT,"latest-connection-fix.json"), JSON.stringify(report,null,2));
  return report;
}
