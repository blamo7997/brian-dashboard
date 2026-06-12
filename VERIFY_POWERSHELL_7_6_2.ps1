#requires -Version 7.6
Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$RequiredVersion = [version]"7.6.2"
$ActualVersion = $PSVersionTable.PSVersion

if ($ActualVersion -ne $RequiredVersion) {
  throw "Lumen Genesis requires PowerShell $RequiredVersion. Current runtime is PowerShell $ActualVersion. Launch commands with pwsh 7.6.2."
}

Write-Output "PowerShell $ActualVersion verified for Lumen Genesis."
