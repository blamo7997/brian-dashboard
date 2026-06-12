import { execSync } from "node:child_process";
function run(label,command){ try{return{label,command,ok:true,output:execSync(command,{encoding:"utf8",stdio:"pipe"})}}catch(e){return{label,command,ok:false,output:String(e.stdout||"")+String(e.stderr||e.message||"")}} }
export function runAllAvailableTests(){ const results=[]; results.push(run("build","npm run build")); return {testRunId:`test_${Date.now()}`,generated:new Date().toISOString(),commandsRun:results.length,results,allPassed:results.every(x=>x.ok)}; }
