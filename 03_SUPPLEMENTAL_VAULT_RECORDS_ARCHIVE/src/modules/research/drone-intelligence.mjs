import fs from "fs";
import path from "path";

const VAULT = path.join(process.cwd(),"vault");

const drones = {
  timestamp: new Date().toISOString(),

  categories: [
    "consumer_drones",
    "commercial_drones",
    "inspection_drones",
    "surveying_drones",
    "mapping_drones",
    "agriculture_drones",
    "security_drones",
    "search_and_rescue_drones",
    "delivery_drones",
    "cinematography_drones",
    "research_drones",
    "military_uas",
    "fixed_wing_uas",
    "multirotor_uas",
    "hybrid_vtol_uas",
    "underwater_drones",
    "ground_drones"
  ],

  capabilities: [
    "fleet_inventory",
    "airframe_tracking",
    "battery_tracking",
    "firmware_tracking",
    "maintenance_tracking",
    "pilot_records",
    "mission_logging",
    "camera_tracking",
    "sensor_tracking",
    "lidar_tracking",
    "telemetry_storage",
    "documentation",
    "vault_storage",
    "knowledge_graph_linking"
  ]
};

fs.writeFileSync(
  path.join(VAULT,"drone-intelligence.json"),
  JSON.stringify(drones,null,2),
  "utf8"
);

const registryFile = path.join(VAULT,"module-registry.json");
const registry = JSON.parse(fs.readFileSync(registryFile,"utf8"));

for(const module of registry){

  if(module.id === "device.drones"){
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

console.log("DRONE INTELLIGENCE INSTALLED");
console.log(`Categories: ${drones.categories.length}`);
console.log(`Capabilities: ${drones.capabilities.length}`);
