const { test } = require('@playwright/test');
const fs = require('fs');

const routes = [
  "/",
  "/brianco-live-feature-hub",
  "/provider-lifecycle-intelligence",
  "/production-fulfillment-intelligence",
  "/white-glove-customer-journey",
  "/customer-intelligence-layer",
  "/shared-website-chatbot-os-intelligence",
  "/product-visibility-layer",
  "/provider-marketplace-expansion",
  "/origin-policy-marketplace-layer",
  "/local-events-festival-intelligence",
  "/event-vendor-artisan-creator-participation"
];

test('Brian & Co exact console error discovery', async ({ page }) => {
  const rows = [];

  page.on('console', msg => {
    if (msg.type() === 'error') {
      rows.push({
        source: 'console',
        text: msg.text(),
        page: page.url()
      });
    }
  });

  page.on('pageerror', err => {
    rows.push({
      source: 'pageerror',
      text: String(err.message || err),
      page: page.url()
    });
  });

  page.on('response', res => {
    const status = res.status();
    if (status >= 400) {
      rows.push({
        source: 'response',
        status,
        url: res.url(),
        page: page.url()
      });
    }
  });

  for (const route of routes) {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(route, { waitUntil: 'load', timeout: 30000 });
    await page.waitForTimeout(1200);
  }

  const outFile =
    process.env.BRIANCO_CONSOLE_OUT ||
    'test-results/console-errors.json';

  fs.mkdirSync('test-results', { recursive: true });

  fs.writeFileSync(outFile, JSON.stringify(rows, null, 2), 'utf8');
});

