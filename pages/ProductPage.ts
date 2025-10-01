import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductPage extends BasePage {
  private readonly searchField: Locator;
  private readonly filterDropdown: Locator;
  private readonly productCards: Locator;
  private readonly addToCartButtons: Locator;

  constructor(page: Page) {
    super(page);
    this.searchField = this.page.getByTestId("search-input");
    this.filterDropdown = this.page.getByTestId("product-sort-container");
    this.productCards = this.page.locator(".inventory_item");
    this.addToCartButtons = this.page.getByRole("button", {
      name: /add to cart/i,
    });
  }

  async open() {
    await super.open("/inventory.html");
    await this.assertVisible(this.cartBtn);
    await this.assertLoaded(/\/inventory.html/i);
  }

  async searchProduct(productName: string) {
    await this.searchField.fill(productName);
    await this.searchField.press("Enter");
  }

  async addAllProductsToCart() {
    const addButtons = this.page.getByRole("button", {
      name: /^add to cart$/i,
    });
    while (await addButtons.count()) {
      await addButtons.first().click(); // live-locator; uppdateras efter varje klick
    }
  }

  // Add single product to cart by name
  async addProductToCart(productName: string) {
    const addToCartButton = this.getAddToCartButton(productName);
    await addToCartButton.click();
  }

  getAddToCartButton(productName: string): Locator {
    return this.productCards
      .filter({ hasText: productName })
      .getByRole("button", { name: /add to cart/i });
  }

  async applyFilter(option: number | string) {
    await this.filterDropdown.selectOption({ value: String(option) });
  }
}
