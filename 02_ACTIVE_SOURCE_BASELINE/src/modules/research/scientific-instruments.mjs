import fs from "fs";
import path from "path";

const VAULT = path.join(process.cwd(),"vault");

const instruments = {
  timestamp: new Date().toISOString(),

  supported_categories: [
    "microscopes",
    "telescopes",
    "spectrometers",
    "chromatographs",
    "centrifuges",
    "incubators",
    "environmental_sensors",
    "drones",
    "robotics",
    "3d_scanners",
    "thermal_imaging",
    "lidar",
    "radar",
    "sonar",
    "genomics",
    "sequencing",
    "eeg",
    "emg",
    "ecg",
    "motion_capture",
    "vr",
    "ar",
    "metrology",
    "manufacturing_equipment"
  ],

  capabilities: [
    "inventory",
    "documentation",
    "calibration_tracking",
    "maintenance_tracking",
    "compatibility_review",
    "driver_awareness",
    "firmware_awareness",
    "vault_storage",
    "research_linking",
    "knowledge_graph_linking"
  ]
};

fs.writeFileSync(
  path.join(VAULT,"scientific-instruments.json"),
  JSON.stringify(instruments,null,2),
  "utf8"
);

const registryFile = path.join(VAULT,"module-registry.json");
const registry = JSON.parse(fs.readFileSync(registryFile,"utf8"));

for(const module of registry){

  if(module.id === "device.scientific_instruments"){
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

console.log("SCIENTIFIC INSTRUMENT INTELLIGENCE INSTALLED");
console.log(`Categories: ${instruments.supported_categories.length}`);
console.log(`Capabilities: ${instruments.capabilities.length}`);
