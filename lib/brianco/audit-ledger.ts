import crypto from "crypto";

export type AuditEvent = {
  kind: string;
  userId?: string;
  anonymousId?: string;
  projectId?: string;
  protectedMutation: boolean;
  founderReviewRequired: boolean;
  metadata?: Record<string, unknown>;
};

export async function writeAuditEvent(event: AuditEvent) {
  return {
    auditId: `bc-audit-${Date.now()}-${crypto.randomBytes(6).toString("hex")}`,
    createdAt: new Date().toISOString(),
    ...event,
  };
}
