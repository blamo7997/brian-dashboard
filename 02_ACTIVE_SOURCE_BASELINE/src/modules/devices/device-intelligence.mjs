import os from "os";
import fs from "fs";
import path from "path";

const VAULT = path.join(process.cwd(),"vault");

const report = {
  timestamp: new Date().toISOString(),
  hostname: os.hostname(),
  platform: os.platform(),
  release: os.release(),
  arch: os.arch(),
  cpus: os.cpus().length,
  totalMemoryGB: Math.round(os.totalmem()/1024/1024/1024),
  freeMemoryGB: Math.round(os.freemem()/1024/1024/1024),
  uptimeHours: Math.round(os.uptime()/3600),
  deviceIntelligenceVersion: "0.1.0"
};

fs.writeFileSync(
  path.join(VAULT,"device-intelligence.json"),
  JSON.stringify(report,null,2),
  "utf8"
);

const registryFile = path.join(VAULT,"module-registry.json");

if(fs.existsSync(registryFile)){

  const registry = JSON.parse(
    fs.readFileSync(registryFile,"utf8")
  );

  for(const module of registry){

    if(module.id === "device.hardware_awareness"){
      module.status = "installed";
      module.installed = true;
      module.enabled = true;
    }
  }

  fs.writeFileSync(
    registryFile,
    JSON.stringify(registry,null,2),
    "utf8"
  );
}

console.log("DEVICE INTELLIGENCE INSTALLED");
console.log(report);
