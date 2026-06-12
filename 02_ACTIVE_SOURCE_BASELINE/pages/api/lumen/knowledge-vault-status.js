import { knowledgeVaultStatus, compactKnowledgeVault } from "../../../lumen-os/packages/knowledge-centric-vault/knowledge-centric-vault-engine.mjs";

export default function handler(req,res){
  if(req.method === "POST"){
    return res.status(200).json({ ok:true, result:compactKnowledgeVault() });
  }
  return res.status(200).json({ ok:true, result:knowledgeVaultStatus() });
}
