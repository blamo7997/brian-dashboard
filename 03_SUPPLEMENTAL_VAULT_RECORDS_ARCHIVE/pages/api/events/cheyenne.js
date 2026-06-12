export default function handler(req, res) {
  res.status(200).json({
    ok: true,
    mode: "read-only",
    locality: "Cheyenne, Wyoming",
    updatedAt: new Date().toISOString(),
    watched: [
      "Cheyenne Frontier Days",
      "local festivals",
      "vendor fairs",
      "markets",
      "small-business networking",
      "tourism events",
      "artisan/craft opportunities",
      "QR marketing opportunities"
    ],
    notificationsPrepared: [
      "vendor booth opportunity",
      "festival inventory recommendation",
      "transport planning",
      "local supplier/artisan opportunity",
      "event marketing idea",
      "sponsorship/review queue"
    ],
    note: "Live public event scanning should use official/public sources and remain founder-reviewable."
  });
}
