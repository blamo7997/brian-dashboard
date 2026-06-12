const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 60000,
  expect: { timeout: 10000 },
  fullyParallel: false,
  retries: 0,
  workers: 1,
  use: {
    baseURL: process.env.BRIANCO_BASE_URL || 'http://127.0.0.1:3107',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ],
  testIgnore: [
    '**/node_modules/**',
    '**/.next/**',
    '**/backups/**',
    '**/backup*/**',
    '**/before-powershell-update*/**',
    '**/brianco-validation-reports/**',
    '**/playwright-user-data/**',
    '**/browser-runtime/**',
    '**/QUARANTINE/**',
    '**/RECOVERY/**',
    '**/RESTORE/**'
  ],
  reporter: [['list'], ['html', { open: 'never' }]]
});
