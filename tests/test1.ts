import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://10.66.12.41:8080/');
  await page.locator('div').filter({ hasText: /^9\.99Add to Cart$/ }).getByRole('button').click();
  await page.getByRole('link', { name: 'Cart (1)' }).click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Checkout' }).click();
  await page.getByRole('heading', { name: 'Your shopping cart is empty' }).click();
});