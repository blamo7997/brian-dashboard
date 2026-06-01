import fs from "fs";
let errors=[];
for(let i=1;i<=3000;i++){
  JSON.parse(fs.readFileSync("vercel.json","utf8").replace(/^\uFEFF/,""));
  JSON.parse(fs.readFileSync("package.json","utf8").replace(/^\uFEFF/,""));
  const api=fs.readFileSync("api/index.js","utf8");
  for(const t of ["status","health","env","products","collections","catalog","seo","concierge"]){
    if(!api.includes(t)) errors.push(`Loop ${i}: missing ${t}`);
  }
  if(api.includes("Bestme26")) errors.push(`Loop ${i}: plaintext password found`);
}
if(errors.length){
  console.error(errors.slice(0,100).join("\n"));
  process.exitCode=1;
}else{
  console.log("PASS 3000");
}
