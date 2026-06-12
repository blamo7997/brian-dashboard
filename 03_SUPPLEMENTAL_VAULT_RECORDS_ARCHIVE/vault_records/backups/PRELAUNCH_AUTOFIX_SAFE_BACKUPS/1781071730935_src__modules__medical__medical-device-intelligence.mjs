import fs from "fs";
import path from "path";

const VAULT = path.join(process.cwd(),"vault");

const medical = {
  timestamp: new Date().toISOString(),

  categories: [
    "ecg",
    "eeg",
    "emg",
    "ultrasound",
    "xray",
    "ct",
    "mri",
    "patient_monitors",
    "infusion_pumps",
    "ventilators",
    "defibrillators",
    "laboratory_analyzers",
    "diagnostic_devices",
    "wearables",
    "telemedicine_devices",
    "clinical_research_devices"
  ],

  capabilities: [
    "inventory",
    "maintenance_tracking",
    "calibration_tracking",
    "firmware_tracking",
    "documentation",
    "compliance_tracking",
    "research_linking",
    "vault_storage",
    "knowledge_graph_linking"
  ]
};

fs.writeFileSync(
  path.join(VAULT,"medical-device-intelligence.json"),
  JSON.stringify(medical,null,2),
  "utf8"
);

const registryFile = path.join(VAULT,"module-registry.json");
const registry = JSON.parse(fs.readFileSync(registryFile,"utf8"));

for(const module of registry){

  if(module.id === "device.medical_devices"){
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

console.log("MEDICAL DEVICE INTELLIGENCE INSTALLED");
console.log(`Categories: ${medical.categories.length}`);
console.log(`Capabilities: ${medical.capabilities.length}`);
