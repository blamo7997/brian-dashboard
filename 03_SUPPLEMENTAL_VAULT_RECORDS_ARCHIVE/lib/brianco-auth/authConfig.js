export const brianCoRoles = [
  "admin",
  "customer",
  "supplier",
  "artisan",
  "creator",
  "influencer",
  "lawyer",
  "investor",
  "banker",
  "accountant"
];

export const brianCoAuthProviders = [
  { id: "email", label: "Continue with Email", status: "ready-for-provider" },
  { id: "google", label: "Continue with Google", status: "requires-approved-oauth" },
  { id: "apple", label: "Continue with Apple", status: "requires-approved-oauth" },
  { id: "qr", label: "Use QR Code", status: "requires-signed-token-layer" },
  { id: "passkey", label: "Use Passkey / Device Unlock", status: "requires-webauthn-layer" }
];

export function BrianCoAuthNotice() {
  return (
    <div style={{
      marginTop: 18,
      padding: 16,
      border: "1px solid rgba(242,201,92,.38)",
      borderRadius: 18,
      background: "rgba(0,0,0,.22)",
      lineHeight: 1.55
    }}>
      Brian & Co keeps account access inside the website experience wherever technically feasible.
      Google, Apple, email, QR, passkeys, and device biometric unlock are prepared as secure provider paths.
      Raw face scans are not stored by this scaffold; biometric access should use lawful platform passkeys/WebAuthn after legal and security review.
    </div>
  );
}
