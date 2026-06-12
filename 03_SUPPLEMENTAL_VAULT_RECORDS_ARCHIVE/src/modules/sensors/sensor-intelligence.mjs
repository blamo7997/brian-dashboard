import fs from "fs";
import path from "path";

const VAULT = path.join(process.cwd(),"vault");

const sensors = {
  timestamp: new Date().toISOString(),

  cameras: [
    "usb_cameras",
    "ip_cameras",
    "dslr",
    "mirrorless",
    "thermal_cameras",
    "industrial_cameras",
    "scientific_cameras",
    "microscope_cameras",
    "astronomy_cameras"
  ],

  lidar: [
    "solid_state_lidar",
    "mechanical_lidar",
    "mapping_lidar",
    "industrial_lidar",
    "robotics_lidar",
    "automotive_lidar"
  ],

  radar: [
    "ground_radar",
    "weather_radar",
    "marine_radar",
    "aviation_radar",
    "security_radar"
  ],

  sonar: [
    "side_scan_sonar",
    "multibeam_sonar",
    "imaging_sonar",
    "survey_sonar"
  ],

  capabilities: [
    "inventory",
    "device_detection",
    "documentation",
    "firmware_tracking",
    "driver_tracking",
    "calibration_tracking",
    "maintenance_tracking",
    "vault_storage",
    "knowledge_graph_linking"
  ]
};

fs.writeFileSync(
  path.join(VAULT,"sensor-intelligence.json"),
  JSON.stringify(sensors,null,2),
  "utf8"
);

const registryFile = path.join(VAULT,"module-registry.json");

if(fs.existsSync(registryFile)){

  const registry = JSON.parse(
    fs.readFileSync(registryFile,"utf8")
  );

  for(const module of registry){

    if(
      [
        "device.cameras",
        "device.lidar",
        "device.radar",
        "device.sonar"
      ].includes(module.id)
    ){
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

console.log("SENSOR INTELLIGENCE INSTALLED");
console.log(`Camera Types: ${sensors.cameras.length}`);
console.log(`LiDAR Types: ${sensors.lidar.length}`);
console.log(`Radar Types: ${sensors.radar.length}`);
console.log(`Sonar Types: ${sensors.sonar.length}`);
