import { Page, Locator, expect } from "@playwright/test";
import { CheckoutPage } from "./checkout.page";

export class AddToCartPage {
  private page: Page;
  readonly btn_shoppingCart: Locator;
  readonly txt_productTitle: Locator;
  readonly btn_checkout: Locator;
  readonly txt_firstName: Locator;
  readonly txt_lastName: Locator;
  readonly txt_postalCode: Locator;
  readonly btn_continue: Locator;

  constructor(page: Page) {
    this.page = page;
    this.btn_shoppingCart = page.locator('[data-test="shopping-cart-link"]');
    this.txt_productTitle = page.locator(".inventory_item_name");
    this.btn_checkout = page.locator("#checkout");
    this.txt_firstName = page.locator("#first-name");
    this.txt_lastName = page.locator("#last-name");
    this.txt_postalCode = page.locator("#postal-code");
    this.btn_continue = page.locator("#continue");
  }

  async clickShoppingCart() {
    await this.btn_shoppingCart.click();
  }

  async verifyProductInCart(expectedProductName: string) {
    const productName = await this.txt_productTitle.textContent();
    expect(productName).toBe(expectedProductName);
  }

  async proceedToCheckout() {
    await this.btn_checkout.click();
  }

  async enterCheckoutInformation(
    firstName: string,
    lastName: string,
    postalCode: string,
  ): Promise<CheckoutPage> {
    await this.txt_firstName.fill(firstName);
    await this.txt_lastName.fill(lastName);
    await this.txt_postalCode.fill(postalCode);
    await this.btn_continue.click();
    return new CheckoutPage(this.page);
  }
}
