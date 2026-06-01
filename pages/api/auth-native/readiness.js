export default function handler(req, res) {
  res.status(200).json({
    ok: true,
    mode: "read-only",
    nativeExperience: true,
    providers: [
      { id: "email", label: "Email", status: "prepared" },
      { id: "google", label: "Google", status: "requires approved OAuth credential" },
      { id: "apple", label: "Apple", status: "requires approved Apple Sign In credential" },
      { id: "qr", label: "QR Code", status: "requires signed short-lived token layer" },
      { id: "passkey", label: "Passkey / Device Unlock", status: "requires WebAuthn implementation" }
    ],
    biometricPolicy: {
      rawFaceScansStored: false,
      preferredApproach: "platform passkeys/WebAuthn",
      legalReviewRequired: true
    }
  });
}
