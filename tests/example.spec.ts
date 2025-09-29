import { test, expect } from "@playwright/test";
import { SettingsPage } from "./Pages/SettingsPage";
import { ProductList } from "./Pages/ProductList";
import { CheckoutPage } from "./Pages/CheckoutPage";
import { LoginPage } from "./Pages/LoginPage";
import { CheckoutFlow } from "./Pages/CheckoutFlow";

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.assertLoginButtonVisible();
  await loginPage.login("standard_user", "secret_sauce");
  await loginPage.assertLoginSuccessful();
});

test("update user settings", async ({ page }) => {
  const settings = new SettingsPage(page);
  await settings.open();
  await settings.updateInfo("Mina", "Lockheed", "mlockheed@gmail.com", "2000");
});

test("add product to cart", async ({ page }) => {
  const productList = new ProductList(page);
  await productList.open();
  await productList.assertLoaded();

  await productList.addProductToCart("Sauce Labs Backpack");
});

test("apply filter", async ({ page }) => {
  const productList = new ProductList(page);
  await productList.open();
  await productList.assertLoaded();

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
