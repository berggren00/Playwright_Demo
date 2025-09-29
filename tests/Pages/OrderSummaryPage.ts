import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class OrderSummaryPage extends BasePage {
  private readonly summaryTitle: Locator;
  private readonly totalPrice: Locator;
  private readonly finishButton: Locator;
  private readonly backButton: Locator;

  constructor(page: Page) {
    super(page);
    this.summaryTitle = this.page.getByTestId("title");
    this.totalPrice = this.page.getByTestId("inventory-item-price");
    this.finishButton = this.page.getByRole("button", { name: "Checkout" });
    this.backButton = this.page.locator("#cancel");
  }

  async verifyOrderSummary(summaryTitle: string, totalPrice: number) {
    await expect(this.summaryTitle).toHaveText(summaryTitle);
    await expect(this.totalPrice).toHaveText(`$${totalPrice}`);
  }

  async finishOrder() {
    this.finishButton.click();
    await expect(this.page).toHaveURL(/.*checkout-step-one.html/);
  }

  async fillDetailsAndBack() {
    this.backButton.click();
    await expect(this.page).toHaveURL(/.*cart.html/);
  }
}
