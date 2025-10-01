import { test, expect } from "../fixtures/PageFixtures";
import { CheckoutPage } from "../../pages/CheckoutPage";
import { CheckoutFlow } from "../../pages/CheckoutFlow";

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
