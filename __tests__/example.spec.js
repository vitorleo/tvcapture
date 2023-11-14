import { test, expect } from '@playwright/test';

test('Chart', async ({ browser }) => {
  const page = await browser.newPage({ deviceScaleFactor: 2 });
  page.setViewportSize({
    width: 1900,
    height: 900,
  });
  await page.goto('/chart/VZwoOSuF/?symbol=BMFBOVESPA%3ASLCE3&interval=D');

  await page.waitForSelector('.chart-gui-wrapper')
  await page.screenshot({
    path: 'screenshot.png',
    clip: {
      x: 54, y: 47, width: 1600, height: 830
    }
  });
});