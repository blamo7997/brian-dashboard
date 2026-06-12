import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import zlib from "node:zlib";

const ROOT = path.resolve("./lumen-os/data/knowledge-centric-vault");
const OBJECTS = path.join(ROOT, "objects");
const INDEXES = path.join(ROOT, "indexes");
const INDEX = path.join(INDEXES, "knowledge-index.json");
const LIMIT_BYTES = 1024 * 1024 * 1024;

function ensure(){
  fs.mkdirSync(OBJECTS,{recursive:true});
  fs.mkdirSync(INDEXES,{recursive:true});
  if(!fs.existsSync(INDEX)){
    fs.writeFileSync(INDEX, JSON.stringify({
      generated:new Date().toISOString(),
      rule:"Store knowledge, not copies.",
      limitBytes:LIMIT_BYTES,
      objects:{},
      records:[]
    },null,2));
  }
}

function sha(value){
  return crypto.createHash("sha256").update(value).digest("hex");
}

function readIndex(){
  ensure();
  return JSON.parse(fs.readFileSync(INDEX,"utf8"));
}

function writeIndex(index){
  index.updatedAt = new Date().toISOString();
  fs.writeFileSync(INDEX, JSON.stringify(index,null,2));
  return index;
}

function dirSize(dir){
  if(!fs.existsSync(dir)) return 0;
  let total = 0;
  for(const item of fs.readdirSync(dir)){
    const full = path.join(dir,item);
    const stat = fs.statSync(full);
    if(stat.isDirectory()) total += dirSize(full);
    else total += stat.size;
  }
  return total;
}

export function addKnowledgeRecord({
  type="general",
  title="Untitled",
  text="",
  data={},
  source="lumen",
  userId="system",
  visibility="lumen-mediated",
  founderDirectOnly=false,
  tags=[]
} = {}){
  ensure();
  const payload = JSON.stringify({ type,title,text,data,source,userId,visibility,founderDirectOnly,tags }, null, 0);
  const hash = sha(payload);
  const objectFile = path.join(OBJECTS, `${hash}.json.gz`);
  const compressed = zlib.gzipSync(Buffer.from(payload,"utf8"), { level: 9 });

  const index = readIndex();

  if(!fs.existsSync(objectFile)){
    fs.writeFileSync(objectFile, compressed);
    index.objects[hash] = {
      hash,
      objectFile,
      originalBytes:Buffer.byteLength(payload,"utf8"),
      compressedBytes:compressed.length,
      createdAt:new Date().toISOString(),
      referenceCount:0
    };
  }

  index.objects[hash].referenceCount = Number(index.objects[hash].referenceCount || 0) + 1;

  const record = {
    recordId:`knowledge_${Date.now()}_${index.records.length}`,
    hash,
    type,
    title,
    source,
    userId,
    visibility,
    founderDirectOnly,
    tags,
    createdAt:new Date().toISOString()
  };

  index.records.push(record);
  index.currentBytes = dirSize(ROOT);
  index.remainingBytes = LIMIT_BYTES - index.currentBytes;
  index.limitStatus = index.currentBytes > LIMIT_BYTES ? "over-limit-review-required" : "within-limit";

  writeIndex(index);
  return { ok:true, deduped:index.objects[hash].referenceCount > 1, record, object:index.objects[hash], vault:index.limitStatus };
}

export function knowledgeVaultStatus(){
  ensure();
  const index = readIndex();
  const currentBytes = dirSize(ROOT);
  return {
    ok:true,
    generated:new Date().toISOString(),
    limitBytes:LIMIT_BYTES,
    currentBytes,
    remainingBytes:LIMIT_BYTES-currentBytes,
    objectCount:Object.keys(index.objects || {}).length,
    recordCount:(index.records || []).length,
    rule:"Deduplicate, compress, content-address, index, and reference. Store knowledge, not copies."
  };
}

export function compactKnowledgeVault(){
  ensure();
  const index = readIndex();
  const seen = new Set();
  index.records = (index.records || []).filter(record => {
    const key = `${record.type}|${record.title}|${record.hash}|${record.userId}`;
    if(seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  index.currentBytes = dirSize(ROOT);
  index.remainingBytes = LIMIT_BYTES-index.currentBytes;
  writeIndex(index);
  return knowledgeVaultStatus();
}
