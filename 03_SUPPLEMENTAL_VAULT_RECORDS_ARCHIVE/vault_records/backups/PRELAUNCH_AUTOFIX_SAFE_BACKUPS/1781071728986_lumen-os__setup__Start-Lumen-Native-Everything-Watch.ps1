$ErrorActionPreference = "Continue"
Set-Location "C:\Users\user\brianco-backend-clean"

$logRoot = ".\reports\LUMEN_NATIVE_EVERYTHING_WATCH"
New-Item -ItemType Directory -Force -Path $logRoot | Out-Null

Write-Host "Lumen Native Everything Watch started."

while($true){
  $stamp = Get-Date -Format "yyyyMMdd_HHmmss"

  node -e "import('./lumen-os/packages/native-everything-fabric/native-everything-fabric-engine.mjs').then(m=>console.log(JSON.stringify(m.nativeEverythingStatus({reason:'watcher'}),null,2))).catch(e=>{console.error(e);process.exit(1)})" *> "$logRoot\native_everything_$stamp.json"
  node -e "import('./lumen-os/packages/universal-product-monitor/universal-product-monitor-engine.mjs').then(m=>console.log(JSON.stringify(m.universalProductMonitorStatus({reason:'watcher'}),null,2))).catch(e=>{console.error(e);process.exit(1)})" *> "$logRoot\product_monitor_$stamp.json"
  node -e "import('./lumen-os/packages/lumen-service-abstraction/lumen-service-abstraction-engine.mjs').then(m=>console.log(JSON.stringify(m.serviceAbstractionStatus({reason:'watcher'}),null,2))).catch(e=>{console.error(e);process.exit(1)})" *> "$logRoot\service_abstraction_$stamp.json"
  node -e "import('./lumen-os/packages/cia-plus-security/cia-plus-security-engine.mjs').then(m=>console.log(JSON.stringify(m.ciaPlusSecurityStatus({reason:'watcher'}),null,2))).catch(e=>{console.error(e);process.exit(1)})" *> "$logRoot\cia_security_$stamp.json"

  Start-Sleep -Seconds 21600
}
