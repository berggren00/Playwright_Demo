import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class SettingsPage extends BasePage {
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly email: Locator;
  readonly birthYear: Locator;
  readonly saveBtn: Locator;
  readonly cancelBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.firstName = this.page.getByRole("textbox", { name: "First Name" });
    this.lastName = this.page.getByRole("textbox", { name: "Last Name" });
    this.email = this.page.getByRole("textbox", { name: "Email" });
    this.birthYear = this.page.getByRole("textbox", { name: "Birth Year" });
    this.saveBtn = this.page.getByRole("button", { name: "Save" });
    this.cancelBtn = this.page.getByRole("button", { name: "Cancel" });
  }

  async open() {
    await this.page.goto("/settings");
    await this.assertLoaded(/\/settings/i);
    await this.assertVisible(this.saveBtn);
  }

  async waitForVisible() {
    await Promise.all([
      this.firstName.waitFor({ state: "visible" }),
      this.lastName.waitFor({ state: "visible" }),
      this.email.waitFor({ state: "visible" }),
      this.saveBtn.waitFor({ state: "visible" }),
      this.cancelBtn.waitFor({ state: "visible" }),
    ]);
  }

  async updateInfo(
    firstName: string,
    lastName: string,
    email: string,
    birthYear: string,
  ) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.email.fill(email);
    await this.birthYear.fill(birthYear);
    await this.saveBtn.click();
  }
}
