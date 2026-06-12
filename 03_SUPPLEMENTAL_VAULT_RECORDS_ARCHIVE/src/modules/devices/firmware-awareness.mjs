import fs from "fs";
import path from "path";

const VAULT = path.join(process.cwd(),"vault");

const scan = JSON.parse(
  fs.readFileSync(
    path.join(VAULT,"device-deep-scan.json"),
    "utf8"
  )
);

const firmware = {
  timestamp: new Date().toISOString(),
  bios: scan.bios,
  motherboard: scan.motherboard,
  device_model: "HP 8549",
  update_status: "unknown",
  review_required: true
};

fs.writeFileSync(
  path.join(VAULT,"firmware-awareness.json"),
  JSON.stringify(firmware,null,2),
  "utf8"
);

const registryFile = path.join(VAULT,"module-registry.json");

const registry = JSON.parse(
  fs.readFileSync(registryFile,"utf8")
);

for(const module of registry){

  if(module.id === "device.firmware_awareness"){
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

console.log("FIRMWARE AWARENESS INSTALLED");
console.log(firmware);
