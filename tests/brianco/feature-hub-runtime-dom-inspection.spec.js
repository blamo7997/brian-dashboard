import { test } from '@playwright/test';
import fs from 'fs';

test('inspect actual runtime feature hub DOM', async ({ page }) => {
  await page.goto('/brianco-live-feature-hub', { waitUntil: 'domcontentloaded' });
  const html = await page.content();
  fs.mkdirSync('test-results', { recursive: true });
  fs.writeFileSync('test-results/feature-hub-runtime-dom.html', html, 'utf8');

  const links = await page.locator('a').evaluateAll(nodes =>
    nodes.map(a => ({
      href: a.getAttribute('href'),
      text: a.textContent
    }))
  );

  fs.writeFileSync('test-results/feature-hub-runtime-links.json', JSON.stringify(links, null, 2), 'utf8');
});
