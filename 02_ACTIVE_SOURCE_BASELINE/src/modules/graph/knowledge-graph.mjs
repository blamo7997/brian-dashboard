import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const VAULT = path.join(ROOT,"vault");

function readJson(file,fallback){
  return fs.existsSync(file)
    ? JSON.parse(fs.readFileSync(file,"utf8"))
    : fallback;
}

function writeJson(file,data){
  fs.writeFileSync(file,JSON.stringify(data,null,2),"utf8");
}

const knowledge = readJson(path.join(VAULT,"knowledge.json"),[]);
const graph = [];

for(const item of knowledge){

  const text = JSON.stringify(item).toLowerCase();

  if(text.includes("supabase"))
    graph.push({from:item.file,to:"supabase",rel:"mentions"});

  if(text.includes("cloudflare"))
    graph.push({from:item.file,to:"cloudflare",rel:"mentions"});

  if(text.includes("lumen"))
    graph.push({from:item.file,to:"lumen",rel:"mentions"});
}

writeJson(
  path.join(VAULT,"knowledge-graph.json"),
  graph
);

const registryFile = path.join(VAULT,"module-registry.json");

if(fs.existsSync(registryFile)){

  const registry = readJson(registryFile,[]);

  for(const module of registry){

    if(module.id === "intelligence.knowledge_graph"){
      module.status = "installed";
      module.installed = true;
      module.enabled = true;
    }
  }

  writeJson(registryFile,registry);
}

console.log("KNOWLEDGE GRAPH INSTALLED");
console.log(`Relationships: ${graph.length}`);
