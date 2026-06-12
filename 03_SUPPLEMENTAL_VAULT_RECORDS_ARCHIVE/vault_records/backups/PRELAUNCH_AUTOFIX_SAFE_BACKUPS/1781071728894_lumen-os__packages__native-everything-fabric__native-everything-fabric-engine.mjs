import fs from "node:fs";
import path from "node:path";

const OUT = path.resolve("./lumen-os/data/native-everything-fabric");

export function nativeEverythingStatus({ reason="manual" } = {}){
  fs.mkdirSync(OUT,{recursive:true});

  const report = {
    generated:new Date().toISOString(),
    reason,
    doctrine:"Lumen-native first. External products are studied, abstracted, bridged, and replaced when feasible.",
    lumenNativeTargets:[
      "native app shell",
      "native browser shell",
      "native website engine",
      "native dashboard engine",
      "native portal engine",
      "native SDK abstraction",
      "native service abstraction",
      "native security fabric",
      "native Vault interface",
      "native dependency fabric",
      "native update fabric",
      "native self-change fabric"
    ],
    externalDependencyPolicy:{
      allowedAsBridge:true,
      allowedAsStudyTarget:true,
      allowedAsTemporaryRuntime:true,
      permanentIdentity:false,
      mustBeWrappedByLumenLanguage:true,
      mustTrackReplacementPath:true
    },
    hardRules:[
      "Do not rebrand external services as Lumen-native.",
      "Record external dependency truthfully.",
      "Build Lumen-owned abstraction first.",
      "Replace external bridge only after validated native replacement exists.",
      "No duplicates.",
      "Additive only.",
      "Preserve build-passing baseline."
    ]
  };

  fs.writeFileSync(path.join(OUT,"latest-native-everything-status.json"),JSON.stringify(report,null,2));
  return report;
}
