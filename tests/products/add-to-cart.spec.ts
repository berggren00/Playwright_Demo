import { test, expect } from "../fixtures/PageFixtures";

test("add product to cart", async ({ loginPage, productPage }) => {
  await loginPage.open();
  await loginPage.login("standard_user", "secret_sauce");

  await productPage.open();
  await productPage.addProductToCart("Sauce Labs Backpack");
});

test("apply filter", async ({ productPage }) => {
  await productPage.open();
  await productPage.applyFilter("Price (low to high)");
});

test("open product list", async ({ loginPage, productPage }) => {
  await loginPage.open();
  await loginPage.login("standard_user", "secret_sauce");
  await productPage.open();
});

test("add all products to cart", async ({ loginPage, productPage }) => {
  await loginPage.open();
  await loginPage.login("standard_user", "secret_sauce");

  await productPage.open();
  await productPage.addAllProductsToCart();
});
