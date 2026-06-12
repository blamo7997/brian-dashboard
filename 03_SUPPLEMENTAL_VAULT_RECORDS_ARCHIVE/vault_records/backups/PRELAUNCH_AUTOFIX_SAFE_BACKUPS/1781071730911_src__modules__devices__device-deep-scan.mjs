import fs from "fs";
import path from "path";
import os from "os";
import { execSync } from "child_process";

const VAULT = path.join(process.cwd(),"vault");

function ps(command){
  try{
    return execSync(
      `powershell -NoProfile -Command "${command}"`,
      {encoding:"utf8"}
    ).trim();
  }catch{
    return "";
  }
}

const report = {
  timestamp: new Date().toISOString(),

  hostname: os.hostname(),
  platform: os.platform(),
  release: os.release(),
  arch: os.arch(),

  cpu: ps("Get-CimInstance Win32_Processor | Select-Object Name | ConvertTo-Json -Compress"),
  gpu: ps("Get-CimInstance Win32_VideoController | Select-Object Name | ConvertTo-Json -Compress"),
  ram: ps("Get-CimInstance Win32_PhysicalMemory | Select-Object Capacity,Speed | ConvertTo-Json -Compress"),
  motherboard: ps("Get-CimInstance Win32_BaseBoard | Select-Object Manufacturer,Product | ConvertTo-Json -Compress"),
  bios: ps("Get-CimInstance Win32_BIOS | Select-Object SMBIOSBIOSVersion | ConvertTo-Json -Compress"),
  drives: ps("Get-PhysicalDisk | Select FriendlyName,Size | ConvertTo-Json -Compress"),
  network: ps("Get-NetAdapter | Select Name,Status | ConvertTo-Json -Compress")
};

fs.writeFileSync(
  path.join(VAULT,"device-deep-scan.json"),
  JSON.stringify(report,null,2),
  "utf8"
);

console.log("DEVICE DEEP SCAN V2 COMPLETE");
console.log("Saved: vault/device-deep-scan.json");
