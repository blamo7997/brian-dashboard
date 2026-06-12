export type AuditEvent = {
  kind: string;
  userId?: string;
  anonymousId?: string;
  projectId?: string;
  protectedMutation: boolean;
  founderReviewRequired: boolean;
  metadata?: Record<string, unknown>;
};

function createAuditSuffix() {
  const bytes = new Uint8Array(6);
  crypto.getRandomValues(bytes);

  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function writeAuditEvent(event: AuditEvent) {
  return {
    auditId: `lumen-audit-${Date.now()}-${createAuditSuffix()}`,
    createdAt: new Date().toISOString(),
    ...event,
  };
}
