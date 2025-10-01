import { test, expect } from "./fixtures/PageFixtures";
import { SettingsPage } from "../pages/SettingsPage";
import { ProductPage } from "../pages/ProductPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { LoginPage } from "../pages/LoginPage";
import { CheckoutFlow } from "../pages/CheckoutFlow";

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

test("add product to cart", async ({ loginPage, productPage }) => {
  await loginPage.open();
  await loginPage.login("standard_user", "secret_sauce");

  await productPage.open();
  await productPage.addProductToCart("Sauce Labs Backpack");
});

test("apply filter", async ({ page }) => {
  const productList = new ProductList(page);
  await productList.open();

  await productList.applyFilter("Price (low to high)");
});

test("proceed with checkout", async ({ page }) => {
  const checkout = new CheckoutPage(page);
  await checkout.completeCheckout("Mina", "Lockheed", "2000");
  await expect(page).toHaveURL(/\/checkout-step-two/i);
});

test("open product list", async ({ page }) => {
  const productList = new ProductList(page);
  await productList.open();
});

test("checkout flow", async ({ page }) => {
  const checkout = new CheckoutFlow(page);
  await checkout.flow({
    username: "standard_user",
    password: "secret_sauce",
  });
});

test("add all products to cart", async ({ page }) => {
  const productList = new ProductList(page);
  await productList.open();
  await productList.addAllProductsToCart();
});
