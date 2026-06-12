export const brianCoApprovalStates = {
  APPROVE: "green-check-approved",
  REVISE: "revise-before-action",
  REJECT: "rejected-no-means-no",
  HOLD: "hold-no-action",
  ASK_LAWYER: "draft-pending-legal-review",
  ASK_DAD: "ask-dad-or-investor-review",
  ESTIMATE_COST_FIRST: "estimate-cost-before-action",
  TEST_SMALL: "test-small-before-scale"
};

export function requireBrianApproval(action, risk = "standard") {
  return {
    action,
    risk,
    allowedToExecuteNow: false,
    requiredState: brianCoApprovalStates.APPROVE,
    message: "Queued for Brian's green-check approval before live, public, legal, financial, destructive, or connection-sensitive action."
  };
}
