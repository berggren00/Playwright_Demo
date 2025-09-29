import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CheckoutPage extends BasePage {
  private readonly firstName: Locator;
  private readonly lastName: Locator;
  private readonly postalCode: Locator;
  private readonly continueButton: Locator;
  private readonly cancelButton: Locator;

  constructor(page: Page) {
    super(page);
    this.firstName = this.page.getByTestId("firstName");
    this.lastName = this.page.getByTestId("lastName");
    this.postalCode = this.page.getByTestId("postalCode");
    this.continueButton = this.page.getByRole("button", { name: "Continue" });
    this.cancelButton = this.page.getByRole("button", { name: "Cancel" });
  }

  async open() {
    await super.open("/checkout-step-one.html");
    await this.assertLoaded(/\/checkout-step-one.html/i);
    await this.assertVisible(this.firstName);
  }

  async completeCheckout(
    firstName: string,
    lastName: string,
    postalCode: string,
  ) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postalCode.fill(postalCode);
    await this.continueButton.click();
  }

  async cancelCheckout() {
    await this.cancelButton.click();
    await expect(this.page).toHaveURL(/\/cart/i);
  }
}
