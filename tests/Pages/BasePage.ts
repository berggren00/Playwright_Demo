import { Page, expect, Locator } from "@playwright/test";

export class BasePage {
  protected page: Page;
  protected cartBtn: Locator;
  protected hamburgerMenuBtn: Locator;
  protected allItemsBtn: Locator;
  protected aboutBtn: Locator;
  protected logoutBtn: Locator;
  protected resetAppStateBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartBtn = this.page.getByTestId("shopping-cart-link");
    this.hamburgerMenuBtn = this.page.getByRole("button", {
      name: "Open Menu",
    });
    this.allItemsBtn = this.page.getByRole("link", { name: "All Items" });
    this.aboutBtn = this.page.getByRole("link", { name: "About" });
    this.logoutBtn = this.page.getByRole("link", { name: "Logout" });
    this.resetAppStateBtn = this.page.getByRole("link", {
      name: "Reset App State",
    });
  }

  async assertVisible(locator: Locator) {
    await expect(locator).toBeVisible();
  }

  async open(path: string = "") {
    await this.page.goto(path);
  }

  async assertTitle(expectedTitle: string) {
    await expect(this.page).toHaveTitle(expectedTitle);
  }

  async assertLoaded(expectedURL: RegExp) {
    await this.page.waitForURL(expectedURL);
  }

  async logOut() {
    await this.assertVisible(this.hamburgerMenuBtn);
    await this.hamburgerMenuBtn.click();
    await Promise.all([this.logoutBtn.click(), this.page.waitForURL(/\/$/)]);
  }
}
