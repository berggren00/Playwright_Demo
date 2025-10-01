import { test as base } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { ProductPage } from "../../pages/ProductPage";

export const test = base.extend<{
  loginPage: LoginPage;
  productPage: ProductPage;
}>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
});
export { expect } from "@playwright/test";
