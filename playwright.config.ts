import * as path from 'path';
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
  ['html'],
  ['junit', { outputFile: 'playwright-report/results.xml' }]
],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  // use: {
  //   /* Base URL to use in actions like `await page.goto('')`. */
  //   // baseURL: 'http://localhost:3000',

  //   /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
  //   trace: 'on-first-retry',
  // },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'Chrome',
      use: {
        channel: 'chrome',
        viewport: {
          width: process.env.VIEWPORT_WIDTH ? parseInt(process.env.VIEWPORT_WIDTH) : 1440,
          height: process.env.VIEWPORT_HEIGHT ? parseInt(process.env.VIEWPORT_HEIGHT) : 849,
        },
      },
    },
  ],

  use: {
    // Enable headless when execute on Jenkins pipeline only
    headless: process.env.CI ? true : false,

    // Download
    acceptDownloads: true,

    // Allow execute javascripts using string
    bypassCSP: true,

    // Artifacts
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',

    // Timezone
    timezoneId: 'Asia/Bangkok',

    launchOptions: {
      args: [
        '--allow-file-access-from-files', // allows getUserMedia() to be called from file:// URLs
        '--use-fake-ui-for-media-stream', // flag avoids grant the camera
        '--use-fake-device-for-media-stream', // flag allow fake media stream
        `--use-file-for-fake-video-capture=${path.join(__dirname, '../', 'shared', 'ekyc', 'valid-face.y4m')}`,
      ],
    },
  },

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
