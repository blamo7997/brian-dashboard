import fs from "node:fs";
import path from "node:path";
const DIR = path.resolve("./lumen-os/data/user-memory");
function safe(id="anonymous"){ return String(id||"anonymous").toLowerCase().replace(/[^a-z0-9_-]+/g,"_"); }
function ensure(){ fs.mkdirSync(DIR,{recursive:true}); }
function file(id){ ensure(); return path.join(DIR, `${safe(id)}.json`); }
function journal(id){ ensure(); return path.join(DIR, `${safe(id)}.ndjson`); }
export function readUserMemory(userId="anonymous"){ const f=file(userId); if(!fs.existsSync(f)) fs.writeFileSync(f, JSON.stringify({userId:safe(userId),createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),preferences:{},continuity:[]},null,2)); return JSON.parse(fs.readFileSync(f,"utf8")); }
export function appendUserChat({userId="anonymous",role="user",text="",source="lumen",metadata={},consent=true}={}){ const record={interactionId:`interaction_${Date.now()}`,timestamp:new Date().toISOString(),userId:safe(userId),role,text:String(text||""),source,metadata,retained:consent===true}; if(consent){ fs.appendFileSync(journal(userId), JSON.stringify(record)+"`n", "utf8"); const mem=readUserMemory(userId); mem.updatedAt=record.timestamp; mem.lastInteractionPreview=record.text.slice(0,240); fs.writeFileSync(file(userId), JSON.stringify(mem,null,2)); } return record; }
export function readUserJournal({userId="anonymous",limit=200}={}){ const f=journal(userId); if(!fs.existsSync(f)) return []; const lines=fs.readFileSync(f,"utf8").split(/\r?\n/).filter(Boolean); return lines.slice(Math.max(0,lines.length-Number(limit||200))).map(x=>{try{return JSON.parse(x)}catch{return{raw:x}}}); }
export function findKnownUserContext({userId="anonymous",query=""}={}){ const q=String(query||"").toLowerCase(); const mem=readUserMemory(userId); const hits=readUserJournal({userId,limit:1000}).filter(x=>String(x.text||"").toLowerCase().includes(q)); return {userId:safe(userId),preferences:mem.preferences,continuity:mem.continuity,matches:hits,hasKnownContext:hits.length>0||Object.keys(mem.preferences||{}).length>0||(mem.continuity||[]).length>0}; }
export function rememberUserPreference({userId="anonymous",key,value,source="lumen"}={}){ const mem=readUserMemory(userId); mem.preferences[key]={value,updatedAt:new Date().toISOString(),source}; fs.writeFileSync(file(userId), JSON.stringify(mem,null,2)); return mem.preferences[key]; }
