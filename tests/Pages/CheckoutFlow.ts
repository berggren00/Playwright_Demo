import { Page } from "@playwright/test";
import { LoginPage } from "./LoginPage";
import { ProductList } from "./ProductList";
import { CheckoutPage } from "./CheckoutPage";
import { OrderSummaryPage } from "./OrderSummaryPage";
import { BasePage } from "./BasePage";

export class CheckoutFlow extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async flow(user: { username: string; password: string }) {
    const loginPage = new LoginPage(this.page);
    const products = new ProductList(this.page);
    const orderSummary = new OrderSummaryPage(this.page);
    const checkout = new CheckoutPage(this.page);

    await loginPage.open();
    await loginPage.login(user.username, user.password);

    await products.open();
    await products.addProductToCart("Sauce Labs Backpack");

    await this.cartBtn.click();
    await orderSummary.verifyOrderSummary("Your Cart", 29.99);
    await orderSummary.finishOrder();

    await checkout.open();
    await checkout.completeCheckout("Mina", "Lockheed", "2000");
  }
}
