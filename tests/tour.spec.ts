import { test, expect } from '@playwright/test';

test('landing renders tour CTA', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page.getByText('Demo Showcase')).toBeVisible();
  await expect(page.getByText('Tour the Core UI + Operator')).toBeVisible();
});
