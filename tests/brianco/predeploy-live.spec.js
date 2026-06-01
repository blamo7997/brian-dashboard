const { test, expect } = require('@playwright/test');
const path = require('path');

const routes = [
  '/',
  '/brianco-live-feature-hub',
  '/founder-command-center',
  '/role-portal-expansion',
  '/legal-approval-center',
  '/event-festival-intelligence-v2',
  '/supplier-recruitment-center',
  '/luxury-brand-outreach-center',
  '/income-tier-command',
  '/entitlement-my-products-command',
  '/accessibility-localization-command',
  '/meeting-transcript-video-command',
  '/product-image-tone-command',
  '/digital-product-growth-command',
  '/shopify-theme-health-command',
  '/revenue-recommendation-command',
  '/founder-reports-audit-command',
  '/ecosystem-orchestration-command'
];

const viewports = [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'tablet', width: 900, height: 1100 },
  { name: 'mobile', width: 390, height: 844 }
];

for (const vp of viewports) {
  for (const route of routes) {
    test(`Brian & Co predeploy ${vp.name} ${route}`, async ({ page }) => {
      const errors = [];
      page.on('pageerror', e => errors.push(String(e.message || e)));
      page.on('console', msg => {
        if (msg.type() === 'error') errors.push(msg.text());
      });

      await page.setViewportSize({ width: vp.width, height: vp.height });
      const res = await page.goto(route, { waitUntil: 'domcontentloaded', timeout: 30000 });

      expect(res && res.status()).toBeLessThan(500);
      await expect(page.locator('body')).toBeVisible();

      await page.screenshot({
        path: path.join('test-results', `BRIANCO_PREDEPLOY_SCREENSHOT_${vp.name}_${route.replace(/[^a-z0-9]/gi, '_')}.png`),
        fullPage: true
      });

            const meaningfulErrors = errors.filter(e => {
        const s = String(e).toLowerCase();
        if (s.includes('favicon')) return false;
        if (s.includes('failed to load resource') && (s.includes('404') || s.includes('400'))) return false;
        return true;
      });
      expect(meaningfulErrors).toEqual([]);
    });
  }
}

test('Brian & Co live feature hub has links', async ({ page }) => {
  await page.goto('/brianco-live-feature-hub', { waitUntil: 'domcontentloaded' });
  await expect(page.getByText('Founder-Controlled Feature Hub')).toBeVisible();
  await expect(page.locator('a[href="/founder-command-center"]')).toBeVisible();
  await expect(page.locator('a[href="/role-portal-expansion"]')).toBeVisible();
});


