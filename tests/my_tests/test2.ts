import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://10.66.12.41:8081/');
  await page.getByRole('link', { name: 'Products' }).click();
  await page.getByRole('button', { name: 'Add Product' }).click();
  await page.getByPlaceholder('Product Name').click();
  await page.getByPlaceholder('Product Name').fill('new');
  await page.getByPlaceholder('Product Name').press('Enter');
  await page.getByPlaceholder('Product Price').click();
  await page.getByPlaceholder('Product Price').press('CapsLock');
  await page.getByPlaceholder('Product Price').fill('01');
  await page.getByPlaceholder('Product Price').press('CapsLock');
  await page.getByPlaceholder('Product Keywords').click();
  await page.getByPlaceholder('Product Keywords').fill('new product');
  await page.getByPlaceholder('Product Description').click();
  await page.getByPlaceholder('Product Description').fill('new');
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Save Product' }).click();
  await page.getByText('new - 1Product ID: 12new').click();
  await page.getByRole('img', { name: 'Product Image' }).click();
});