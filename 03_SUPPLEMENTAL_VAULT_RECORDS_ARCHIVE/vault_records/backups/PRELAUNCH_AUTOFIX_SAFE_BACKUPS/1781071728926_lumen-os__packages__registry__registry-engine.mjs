import fs from "node:fs";
import path from "node:path";
const DIR = path.resolve("./lumen-os/data/registry");
const FILE = path.join(DIR, "universal-registry.json");
function ensure(){ fs.mkdirSync(DIR,{recursive:true}); if(!fs.existsSync(FILE)) fs.writeFileSync(FILE, JSON.stringify({generated:new Date().toISOString(),entities:[],indexes:{}},null,2)); }
export function readRegistry(){ ensure(); return JSON.parse(fs.readFileSync(FILE,"utf8")); }
export function writeRegistry(data){ ensure(); data.updatedAt=new Date().toISOString(); fs.writeFileSync(FILE, JSON.stringify(data,null,2)); return data; }
export function upsertEntity(entity={}){ const reg=readRegistry(); const id=entity.entityId || `entity_${Date.now()}`; const next={entityId:id, entityType:entity.entityType||"General", name:entity.name||"Unnamed", description:entity.description||"", status:entity.status||"proposed", ...entity, updatedAt:new Date().toISOString()}; const i=reg.entities.findIndex(x=>x.entityId===id); if(i>=0) reg.entities[i]=next; else reg.entities.push(next); return writeRegistry(reg); }
export function registryHealth(){ const reg=readRegistry(); return {ok:true, entityCount:reg.entities.length, updatedAt:reg.updatedAt||reg.generated}; }
