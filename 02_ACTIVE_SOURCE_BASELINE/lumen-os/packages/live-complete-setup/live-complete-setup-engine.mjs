import fs from "node:fs";
import path from "node:path";
import child_process from "node:child_process";

const OUT = path.resolve("./lumen-os/data/live-complete-setup");

function exists(p){ return fs.existsSync(p); }

function envValue(name){
  return process.env[name] && String(process.env[name]).trim();
}

function run(cmd){
  try { return child_process.execSync(cmd,{encoding:"utf8",stdio:["ignore","pipe","pipe"]}).trim(); }
  catch { return ""; }
}

export function liveCompleteSetupStatus({ reason="manual" } = {}){
  fs.mkdirSync(OUT,{recursive:true});

  const services = [
    {
      id:"openai",
      name:"OpenAI / ChatGPT API",
      configured:Boolean(envValue("OPENAI_API_KEY")),
      link:"https://platform.openai.com/api-keys",
      needs:"Create or paste OPENAI_API_KEY into .env.local only if you want OpenAI API enabled."
    },
    {
      id:"github",
      name:"GitHub",
      configured:Boolean(envValue("GITHUB_TOKEN")) || exists(".git"),
      link:"https://github.com/settings/tokens",
      needs:"Create a GitHub token only if you want repository automation."
    },
    {
      id:"cloudflare",
      name:"Cloudflare",
      configured:Boolean(envValue("CLOUDFLARE_API_TOKEN") || envValue("CF_API_TOKEN")),
      link:"https://dash.cloudflare.com/profile/api-tokens",
      needs:"Create a Cloudflare API token only if you want DNS/deployment automation."
    },
    {
      id:"supabase",
      name:"Supabase",
      configured:Boolean(envValue("SUPABASE_URL") && (envValue("SUPABASE_ANON_KEY") || envValue("SUPABASE_SERVICE_ROLE_KEY"))),
      link:"https://supabase.com/dashboard/projects",
      needs:"Create a Supabase project only if you want Supabase database/auth/storage."
    },
    {
      id:"playwright",
      name:"Playwright",
      configured:exists("node_modules/@playwright") || exists("playwright.config.js") || exists("playwright.config.ts"),
      link:"https://playwright.dev/docs/intro",
      needs:"Install Playwright browsers for automated browser QA."
    },
    {
      id:"vault",
      name:"Lumen Vault",
      configured:exists("./lumen-os/data/vault") || exists("./lumen-os/data/knowledge-centric-vault"),
      link:"",
      needs:"Local Lumen Vault initializes from workspace files."
    }
  ];

  const tools = {
    node:run("node --version"),
    npm:run("npm --version"),
    git:run("git --version"),
    dotnet:run("dotnet --list-sdks"),
    winget:run("winget --version")
  };

  const report = {
    generated:new Date().toISOString(),
    reason,
    secretsShown:false,
    tokensAssumed:false,
    services,
    missing:services.filter(s=>!s.configured).map(s=>({id:s.id,name:s.name,link:s.link,needs:s.needs})),
    tools,
    lumenVoice:"I’ll guide you through setup clearly. I’ll only ask for what is necessary, keep your secrets private, and preserve your workspace."
  };

  fs.writeFileSync(path.join(OUT,"latest-live-complete-setup-status.json"),JSON.stringify(report,null,2));
  return report;
}
