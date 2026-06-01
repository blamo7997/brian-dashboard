const { test, expect } = require('@playwright/test');

const routes = [
  '/',
  '/brianco-live-feature-hub',
  '/fort-knox-vault-continuity',
  '/absolute-master-handoff-continuity',
  '/founder-command-center-master',
  '/role-portal-network-master',
  '/legal-signature-approval-master',
  '/lawyer-review-routing-master',
  '/provider-onboarding-portfolio-master',
  '/provider-policy-tone-master',
  '/custom-work-production-master',
  '/custom-work-nonrefundable-master',
  '/tracking-shipment-master',
  '/white-glove-thank-you-master',
  '/brand-image-tone-master',
  '/video-media-brand-master',
  '/website-chatbot-master',
  '/os-chatbot-continuity-master',
  '/free-os-foundation-master',
  '/os-shared-intelligence-master',
  '/entitlement-product-registry-master',
  '/absolute-master-continuity-product-master',
  '/accessibility-intelligence-master',
  '/localization-intelligence-master',
  '/meeting-transcript-master',
  '/creator-video-editor-master',
  '/supplier-artisan-commerce-master',
  '/commerce-recommendation-master',
  '/political-civic-campaign-master',
  '/career-resume-job-master',
  '/community-support-master',
  '/health-caregiver-master',
  '/legal-contract-policy-lifecycle-master',
  '/accountant-receipt-expense-master',
  '/shopify-theme-health-master',
  '/deployment-playwright-master',
  '/future-os-device-ecosystem-master',
  '/memory-continuity-learning-master'
];

const viewports = [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'tablet', width: 900, height: 1100 },
  { name: 'mobile', width: 390, height: 844 }
];

for (const vp of viewports) {
  for (const route of routes) {
    test(`Brian & Co project-wide ${vp.name} ${route}`, async ({ page }) => {
      const errors = [];
      page.on('pageerror', e => errors.push(String(e.message || e)));
      page.on('console', msg => {
        if (msg.type() === 'error') errors.push(msg.text());
      });

      await page.setViewportSize({ width: vp.width, height: vp.height });
      const res = await page.goto(route, { waitUntil: 'domcontentloaded', timeout: 30000 });

      expect(res && res.status()).toBeLessThan(500);
      await expect(page.locator('body')).toBeVisible();

      const text = await page.locator('body').innerText();
      expect(text.length).toBeGreaterThan(20);

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


