import { roleProfiles, getRoleProfile, roleTrend } from "../../../lib/brianco-role-intelligence/roles";

export default function handler(req, res) {
  const role = String(req.query.role || "customer").toLowerCase();
  const profile = getRoleProfile(role);

  const cards = profile.dashboard.map((item, index) => ({
    title: item,
    value: "Prepared",
    note: `${item} intelligence is prepared for ${profile.title}.`,
    trend: roleTrend(index + role.length)
  }));

  res.status(200).json({
    ok: true,
    mode: "read-only",
    brand: "Brian & Co",
    role,
    profile,
    cards,
    allRoles: Object.keys(roleProfiles),
    protectedSystems: {
      productsUntouched: true,
      collectionsUntouched: true,
      oauthUntouched: true,
      paymentsUntouched: true,
      secretsUntouched: true,
      rawBiometricsStored: false
    }
  });
}
