import { spawnSync } from "child_process";
import path from "path";
import fs from "fs";

const ROOT = process.cwd();
const SRC = path.join(ROOT,"src");

function run(file,args=[]){

  const full = path.join(SRC,file);

  if(!fs.existsSync(full)){
    console.log(`Missing: ${file}`);
    process.exit(1);
  }

  spawnSync(
    process.execPath,
    [full,...args],
    {
      cwd: ROOT,
      stdio: "inherit"
    }
  );
}

const [cmd,...args] = process.argv.slice(2);

switch(cmd){

  case "learn":
    run("modules/learning/learning-engine.mjs",["learn"]);
    break;

  case "ask":
    run("modules/learning/learning-engine.mjs",["ask",...args]);
    break;

  case "search":
    run("modules/search/search-engine.mjs",args);
    break;

  case "graph":
    run("modules/graph/knowledge-graph.mjs");
    break;

  case "founder":
    run("modules/founder/founder-command-center.mjs");
    break;

  case "modules":
    run("modules/registry/module-registry.mjs",args);
    break;

  case "dashboard":
  case "website":
  case "tutorial":
  case "voice":
    run("lumen-guided-experience-studio.mjs",[cmd,...args]);
    break;

  default:
    console.log("LUMEN COMMANDS");
    console.log("----------------");
    console.log("node .\\src\\lumen.mjs founder");
    console.log("node .\\src\\lumen.mjs learn");
    console.log("node .\\src\\lumen.mjs ask lumen");
    console.log("node .\\src\\lumen.mjs search supabase");
    console.log("node .\\src\\lumen.mjs modules");
}
