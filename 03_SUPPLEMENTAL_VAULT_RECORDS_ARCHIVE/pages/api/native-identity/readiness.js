export default function handler(req, res) {
  res.status(200).json({
    ok: true,
    brand: "Brian & Co",
    mode: "native-identity-readiness",
    identityMethods: [
      { id: "email", label: "Email Access", status: "prepared" },
      { id: "google", label: "Google Access", status: "provider credential required, Brian & Co native UI prepared" },
      { id: "apple", label: "Apple Access", status: "provider credential required, Brian & Co native UI prepared" },
      { id: "passkey", label: "Passkey / Device Unlock", status: "WebAuthn readiness prepared, no raw biometric storage" },
      { id: "qr", label: "QR Access", status: "signed short-lived token layer prepared" },
      { id: "trusted_device", label: "Trusted Device", status: "prepared" }
    ],
    nativeExperienceRules: {
      brianCoFirst: true,
      noVisibleProviderBrandingWhereFeasible: true,
      seamlessReturnToSite: true,
      roleAwareRouting: true,
      noRawBiometricStorage: true,
      legalReviewRequiredBeforeRealAuthReliance: true
    },
    protectedSystems: {
      oauthUntouched: true,
      paymentsUntouched: true,
      secretsNotPrinted: true,
      productsUntouched: true,
      collectionsUntouched: true
    }
  });
}
