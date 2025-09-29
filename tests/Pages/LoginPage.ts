import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  private readonly username: Locator;
  private readonly password: Locator;
  private readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.username = page.locator('[data-test="username"]');
    this.password = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
  }

  async open() {
    await super.open("/");
    await this.assertTitle("Swag Labs");
  }

  async assertLoginButtonVisible() {
    await this.assertVisible(this.loginButton);
  }

  async login(username: string, password: string) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
    await this.assertLoginSuccessful();
  }

  async assertLoginSuccessful() {
    await this.assertVisible(this.page.locator(".inventory_container"));
  }
}
