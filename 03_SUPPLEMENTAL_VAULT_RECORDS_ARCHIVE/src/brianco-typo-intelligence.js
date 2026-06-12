export function normalizeBrianCoInput(rawText = "") {
  const original = String(rawText || "");
  let normalized = original.trim();

  const replacements = [
    ["realtme", "real time"], ["realtime", "real time"],
    ["alays", "always"], ["forevr", "forever"], ["forver", "forever"],
    ["chabot", "chatbot"], ["sopfy", "retired-commerce-platform"], ["shopfy", "retired-commerce-platform"],
    ["poershell", "PowerShell"], ["powershall", "PowerShell"],
    ["ebsite", "website"], ["qloqunt", "eloquent"], ["eloqunt", "eloquent"],
    ["ne", "new"], ["ork", "work"], ["revie", "review"],
    ["admn", "admin"], ["finanicing", "financing"], ["fiinancing", "financing"],
    ["navgaton", "navigation"], ["imags", "images"]
  ];

  for (const [bad, good] of replacements) {
    normalized = normalized.replace(new RegExp(`\\b${bad}\\b`, "gi"), good);
  }

  return {
    original,
    normalized,
    confidence: normalized === original ? 0.84 : 0.95,
    intentFlags: {
      wantsCode: /\b(code|script|powershell|theme|zip|file|build)\b/i.test(normalized),
      wantsRealtime: /\b(real time|always|forever|watchdog|auto|live|continuous)\b/i.test(normalized),
      preserveProgress: /\b(preserve|previous|prior|do not lose|keep)\b/i.test(normalized),
      connectionSensitive: /\b(oauth|token|secret|env|backend|api|connection|vercel|retired-commerce-platform|supabase|payment)\b/i.test(normalized),
      needsApproval: /\b(approve|approval|green check|legal|lawyer|founder)\b/i.test(normalized)
    }
  };
}
