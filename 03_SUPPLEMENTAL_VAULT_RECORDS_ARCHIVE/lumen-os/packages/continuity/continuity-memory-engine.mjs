import fs from "node:fs";
import path from "node:path";
const DIR = path.resolve("./lumen-os/data/continuity");
const FILE = path.join(DIR, "continuity-memory.json");
function ensure(){ fs.mkdirSync(DIR,{recursive:true}); if(!fs.existsSync(FILE)) fs.writeFileSync(FILE, JSON.stringify({generated:new Date().toISOString(),memories:[]},null,2)); }
export function readContinuityMemory(){ ensure(); return JSON.parse(fs.readFileSync(FILE,"utf8")); }
export function rememberContinuity({type="general",title="Untitled",summary="",decision="",reason="",data={},actor="lumen"}={}){ const mem=readContinuityMemory(); const record={memoryId:`continuity_${Date.now()}`,createdAt:new Date().toISOString(),type,title,summary,decision,reason,data,actor}; mem.memories.push(record); mem.updatedAt=new Date().toISOString(); fs.writeFileSync(FILE, JSON.stringify(mem,null,2)); return record; }
