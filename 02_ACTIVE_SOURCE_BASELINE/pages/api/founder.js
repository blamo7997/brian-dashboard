export default async function handler(req, res) {
  try {
    const founderEmail = "support@briannco.com";

    return res.status(200).json({
      ok: true,
      founder: {
        email: founderEmail,
        name: "Brian Lammert",
        role: "Founder / Owner",
        company: "Brian & Co"
      },
      protections: {
        existingProductsProtected: true,
        createMissingOnly: true,
        founderApprovalRequired: true,
        noLivePublishingWithoutApproval: true
      }
    });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
}
