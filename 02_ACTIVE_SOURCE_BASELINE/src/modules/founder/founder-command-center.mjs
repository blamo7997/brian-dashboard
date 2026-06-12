import fs from "fs";
import path from "path";

const VAULT = path.join(process.cwd(),"vault");

function readJson(file,fallback){
  return fs.existsSync(file)
    ? JSON.parse(fs.readFileSync(file,"utf8"))
    : fallback;
}

const registry = readJson(
  path.join(VAULT,"module-registry.json"),
  []
);

const knowledge = readJson(
  path.join(VAULT,"knowledge.json"),
  []
);

const graph = readJson(
  path.join(VAULT,"knowledge-graph.json"),
  []
);

console.log("");
console.log("=== LUMEN FOUNDER COMMAND CENTER ===");
console.log("");

console.log(`Modules: ${registry.length}`);
console.log(`Installed: ${registry.filter(x=>x.installed).length}`);
console.log(`Knowledge Assets: ${knowledge.length}`);
console.log(`Relationships: ${graph.length}`);

console.log("");
console.log("Installed Modules");
console.log("-----------------");

for(const m of registry.filter(x=>x.installed)){
  console.log(m.id);
}
console.log("");
