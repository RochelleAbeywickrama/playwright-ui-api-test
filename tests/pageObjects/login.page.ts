import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly txt_username: Locator;
  readonly txt_password: Locator;
  readonly btn_login: Locator;
  readonly list_inventory: Locator;

  constructor(page: Page) {
    this.page = page;
    this.txt_username = page.locator("#user-name"); // by id
    this.txt_password = page.locator("#password"); // by id
    this.btn_login = page.locator("#login-button"); // by id
    this.list_inventory = page.locator(".inventory_list"); // by class name
  }

  async goto() {
    await this.page.goto("/"); // Navigate to the login page
  }

  async login(username: string, password: string) {
    await this.txt_username.fill(username);
    await this.txt_password.fill(password);
    await this.btn_login.click();
  }

  async assertLoginSuccess() {
    await expect(this.page).toHaveURL(/inventory.html/);
    await expect(this.list_inventory).toBeVisible();
  }

  async assertLoginFailure() {
    const errorMessage = this.page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText(
      "Epic sadface: Sorry, this user has been locked out.",
    );
  }
}
