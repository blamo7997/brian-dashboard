import { test, expect } from '@playwright/test';
import fs from 'fs';

test('local runtime contains required Feature Hub anchors', async ({ page }) => {
  await page.goto('/brianco-live-feature-hub', { waitUntil: 'domcontentloaded' });
  await expect(page.getByText('Founder-Controlled Feature Hub')).toBeVisible();
  const html = await page.content();
  fs.mkdirSync('test-results', { recursive: true });
  fs.writeFileSync('test-results/local-feature-hub-runtime.html', html, 'utf8');
  await expect(page.locator('a[href="/founder-command-center"]').first()).toBeVisible();
  await expect(page.locator('a[href="/role-portal-expansion"]').first()).toBeVisible();
});
