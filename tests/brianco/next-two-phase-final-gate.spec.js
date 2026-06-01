const { test, expect } = require('@playwright/test');

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

const viewports = [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'tablet', width: 900, height: 1100 },
  { name: 'mobile', width: 390, height: 844 }
];

function isFrameworkNoise(value) {
  const s = String(value || '').toLowerCase();

  return (
    s.includes('favicon') ||
    s.includes('_buildmanifest') ||
    s.includes('_ssgmanifest') ||
    s.includes('failed to load resource')
  );
}

for (const vp of viewports) {
  for (const route of routes) {
    test(`BrianCo ${vp.name} ${route}`, async ({ page }) => {
      const errors = [];

      page.on('pageerror', e => {
        const text = String(e.message || e);
        if (!isFrameworkNoise(text)) {
          errors.push(text);
        }
      });

      page.on('console', msg => {
        if (msg.type() !== 'error') return;

        const text = String(msg.text() || '');
        if (!isFrameworkNoise(text)) {
          errors.push(text);
        }
      });

      page.on('response', res => {
        const status = res.status();
        const url = String(res.url() || '');

        if ((status === 400 || status === 404) && isFrameworkNoise(url)) {
          return;
        }

        if (status >= 500) {
          errors.push(`HTTP ${status}: ${url}`);
        }
      });

      await page.setViewportSize({ width: vp.width, height: vp.height });

      let response;
      try {
        response = await page.goto(route, {
          waitUntil: 'load',
          timeout: 30000
        });
      } catch (e) {
        throw new Error(`Failed to navigate to ${route}. Details: ${e.message}`);
      }

      if (response) {
        expect(response.status()).toBeLessThan(500);
      }

      await expect(page.locator('html')).toBeAttached();

      const content = await page.content();
      expect(content.length).toBeGreaterThan(100);

      expect(errors).toEqual([]);
    });
  }
}
