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

function walk(dir,files=[]){
  const skip = ["node_modules",".git",".next",".vercel",".wrangler","dist","build"];

  for(const item of fs.readdirSync(dir,{withFileTypes:true})){
    const full = path.join(dir,item.name);

    if(skip.some(x => full.includes(x))) continue;

    if(item.isDirectory()){
      walk(full,files);
    } else {
      files.push(full);
    }
  }

  return files;
}

function learn(){

  const knowledge = readJson(
    path.join(VAULT,"knowledge.json"),
    []
  );

  const entities = readJson(
    path.join(VAULT,"entities.json"),
    []
  );

  const relationships = readJson(
    path.join(VAULT,"relationships.json"),
    []
  );

  const history = readJson(
    path.join(VAULT,"learning-history.json"),
    []
  );

  const files = walk(ROOT).slice(0,3000);

  let learned = 0;

  for(const file of files){

    try{

      const text = fs.readFileSync(file,"utf8");

      const record = {
        id: `k_${Date.now()}_${learned}`,
        file,
        summary: text.replace(/\s+/g," ").slice(0,500)
      };

      knowledge.push(record);

      learned++;

    } catch {}
  }

  history.push({
    at: new Date().toISOString(),
    learned
  });

  writeJson(path.join(VAULT,"knowledge.json"),knowledge);
  writeJson(path.join(VAULT,"entities.json"),entities);
  writeJson(path.join(VAULT,"relationships.json"),relationships);
  writeJson(path.join(VAULT,"learning-history.json"),history);

  const registryFile = path.join(VAULT,"module-registry.json");

  if(fs.existsSync(registryFile)){

    const registry = readJson(registryFile,[]);

    for(const module of registry){

      if(module.id === "intelligence.learning_engine"){
        module.status = "installed";
        module.installed = true;
        module.enabled = true;
      }
    }

    writeJson(registryFile,registry);
  }

  console.log("LEARNING ENGINE INSTALLED");
  console.log(`Learned Records: ${learned}`);
}

function ask(query){

  const knowledge = readJson(
    path.join(VAULT,"knowledge.json"),
    []
  );

  const q = query.join(" ").toLowerCase();

  const matches = knowledge
    .filter(x => JSON.stringify(x).toLowerCase().includes(q))
    .slice(0,10);

  console.log(`Matches: ${matches.length}`);

  for(const match of matches){
    console.log(match.file);
  }
}

const [cmd,...args] = process.argv.slice(2);

if(cmd === "learn"){
  learn();
}
else if(cmd === "ask"){
  ask(args);
}
else{
  console.log("learn | ask");
}
