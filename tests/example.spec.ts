import { test, expect } from "./fixtures/PageFixtures";
import { SettingsPage } from "../pages/SettingsPage";
import { ProductPage } from "../pages/ProductPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { LoginPage } from "../pages/LoginPage";
import { CheckoutFlow } from "../pages/CheckoutFlow";
import { log } from "console";

// test.beforeEach(async ({ page }) => {
//   const loginPage = new LoginPage(page);
//   await loginPage.open();
//   await loginPage.assertLoginButtonVisible();
//   await loginPage.login("standard_user", "secret_sauce");
//   await loginPage.assertLoginSuccessful();
// });

test("update user settings", async ({ page }) => {
  const settings = new SettingsPage(page);
  await settings.open();
  await settings.updateInfo("Mina", "Lockheed", "mlockheed@gmail.com", "2000");
});

test("proceed with checkout", async ({ page }) => {
  const checkout = new CheckoutPage(page);
  await checkout.completeCheckout("Mina", "Lockheed", "2000");
  await expect(page).toHaveURL(/\/checkout-step-two/i);
});

test("checkout flow", async ({ page }) => {
  const checkout = new CheckoutFlow(page);
  await checkout.flow({
    username: "standard_user",
    password: "secret_sauce",
  });
});
