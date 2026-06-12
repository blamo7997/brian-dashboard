import { registryHealth } from "../registry/registry-engine.mjs";
import { vaultHealth } from "../vault/vault-engine.mjs";
export function founderOperationsSnapshot(){ return {ok:true,generated:new Date().toISOString(),registry:registryHealth(),vault:vaultHealth(),systems:{insideLumen:true,noLag:true,selfRepair:true}}; }
