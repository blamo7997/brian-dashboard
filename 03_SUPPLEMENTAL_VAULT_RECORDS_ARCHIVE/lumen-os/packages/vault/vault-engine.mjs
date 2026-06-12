import fs from "node:fs";
import path from "node:path";
const DIR = path.resolve("./lumen-os/data/vault");
const FILE = path.join(DIR, "vault-records.json");
function ensure(){ fs.mkdirSync(DIR,{recursive:true}); if(!fs.existsSync(FILE)) fs.writeFileSync(FILE, JSON.stringify({generated:new Date().toISOString(),records:[]},null,2)); }
export function readVault(){ ensure(); return JSON.parse(fs.readFileSync(FILE,"utf8")); }
export function writeVault(data){ ensure(); data.updatedAt=new Date().toISOString(); fs.writeFileSync(FILE, JSON.stringify(data,null,2)); return data; }
export function addVaultRecord({type="general",title="Untitled",summary="",data={},actor="lumen",classification="standard"}={}){ const vault=readVault(); const record={recordId:`vault_${Date.now()}`,createdAt:new Date().toISOString(),type,title,summary,data,actor,classification}; vault.records.push(record); writeVault(vault); return record; }
export function vaultHealth(){ const vault=readVault(); return {ok:true, recordCount:vault.records.length, updatedAt:vault.updatedAt||vault.generated}; }
