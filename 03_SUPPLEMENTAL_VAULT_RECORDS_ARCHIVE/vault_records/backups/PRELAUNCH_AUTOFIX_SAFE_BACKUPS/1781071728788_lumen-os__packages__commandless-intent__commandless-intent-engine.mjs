import fs from "node:fs";
import path from "node:path";
import { addKnowledgeRecord } from "../knowledge-centric-vault/knowledge-centric-vault-engine.mjs";

const OUT = path.resolve("./lumen-os/data/commandless-intent");

const INTENTS = [
  { intent:"connections", terms:["cloudflare","github","openai","chatgpt","playwright","supabase","vault","connection"] },
  { intent:"baseline", terms:["baseline","preserve","no duplicates","only additions","protected"] },
  { intent:"accessibility", terms:["accessibility","deaf","hard of hearing","blind","low vision","adhd","autism","dyslexia","blue light","captions","transcripts"] },
  { intent:"vault-compression", terms:["1gb","compress","vault","dedupe","chunk","zip","storage"] },
  { intent:"research-validation", terms:["vetted","verified","fake reviews","reviews","sources","research"] },
  { intent:"dynamic-experience", terms:["dashboard","website","portal","dynamic","per user","realtime","personalized"] },
  { intent:"compliance", terms:["law","wyoming","international","local law","governing bodies","cookies","privacy","legal"] },
  { intent:"reliability", terms:["hang","stopped thinking","connection interrupted","reload","recover","checkpoint","resume"] }
];

export function inferCommandlessIntent({ text="", userId="anonymous", context={} } = {}){
  fs.mkdirSync(OUT,{recursive:true});
  const clean = String(text||"").toLowerCase();

  const scores = INTENTS.map(item => ({
    intent:item.intent,
    score:item.terms.reduce((sum,term)=>sum+(clean.includes(term)?1:0),0),
    matched:item.terms.filter(term=>clean.includes(term))
  })).filter(x=>x.score>0).sort((a,b)=>b.score-a.score);

  const result = {
    generated:new Date().toISOString(),
    userId,
    text,
    context,
    topIntent:scores[0]?.intent || "general",
    scores,
    needsClarification:scores.length === 0 && clean.trim().length > 0,
    clarificationQuestion:scores.length === 0 ? "What would you like Lumen to do with this?" : "",
    manualInputClicksTarget:"0-3",
    exactCommandRequired:false
  };

  addKnowledgeRecord({
    type:"commandless-intent",
    title:`Commandless Intent: ${result.topIntent}`,
    text,
    data:result,
    source:"commandless-intent-engine",
    userId,
    visibility:"lumen-mediated",
    tags:["commandless","intent","baseline"]
  });

  fs.writeFileSync(path.join(OUT,"latest-commandless-intent.json"), JSON.stringify(result,null,2));
  return result;
}
