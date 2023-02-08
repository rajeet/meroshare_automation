import {
  test,
  expect
} from '@playwright/test';

test.beforeEach(async ({
  page,
  baseURL
}) => {
  await page.goto("/")
  await expect(page.url()).toContain(baseURL)
})

test.describe("meroshare", () => {
  test(`should first`, async ({page}) => {
    await page.locator('[id="username"]').fill("rajeet");
    await expect(page.locator('[id="username"]')).toHaveValue("rajeet");
    page.waitForTimeout(3000)
  })
})

