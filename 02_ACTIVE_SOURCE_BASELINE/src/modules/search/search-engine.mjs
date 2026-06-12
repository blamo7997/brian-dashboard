import fs from "fs";
import path from "path";

const VAULT = path.join(process.cwd(),"vault");

function readJson(file,fallback){
  return fs.existsSync(file)
    ? JSON.parse(fs.readFileSync(file,"utf8"))
    : fallback;
}

const knowledge = readJson(
  path.join(VAULT,"knowledge.json"),
  []
);

const graph = readJson(
  path.join(VAULT,"knowledge-graph.json"),
  []
);

const query = process.argv.slice(2).join(" ").toLowerCase();

if(!query){
  console.log("Usage: node search-engine.mjs query");
  process.exit(0);
}

const matches = knowledge
  .filter(x => JSON.stringify(x).toLowerCase().includes(query))
  .slice(0,20);

console.log(`SEARCH RESULTS: ${matches.length}`);

for(const m of matches){

  console.log("\nFILE:");
  console.log(m.file);

  const related = graph.filter(
    g => g.from === m.file
  );

  if(related.length){

    console.log("RELATIONSHIPS:");

    for(const r of related){
      console.log(
        `${r.rel} -> ${r.to}`
      );
    }
  }
}
