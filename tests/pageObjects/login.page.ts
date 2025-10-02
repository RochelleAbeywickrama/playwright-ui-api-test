import { Page, Locator, expect } from "@playwright/test";
import { HomePage } from "./home.page";

export class LoginPage {
  readonly page: Page;
  readonly page_title: Locator;
  readonly txt_username: Locator;
  readonly txt_password: Locator;
  readonly btn_login: Locator;
  readonly list_inventory: Locator;
  readonly error_message: Locator;

  constructor(page: Page) {
    this.page = page;
    this.page_title = page.locator(".login_logo"); // by class name
    this.txt_username = page.locator("#user-name"); // by id
    this.txt_password = page.locator("#password"); // by id
    this.btn_login = page.locator("#login-button"); // by id
    this.list_inventory = page.locator(".inventory_list"); // by class name
    this.error_message = page.locator(".error-message-container.error"); // by attribute
  }

  async goto() {
    await this.page.goto("/"); 
    await expect(this.page_title).toBeVisible();
  }

  async login(username: string, password: string) {
    await this.txt_username.fill(username);
    await this.txt_password.fill(password);
    await this.btn_login.click();
  }

  async assertLoginSuccess() : Promise<HomePage> {
    await expect(this.page).toHaveURL(/inventory.html/);
    await expect(this.list_inventory).toBeVisible();
    return new HomePage(this.page);
  }

  async assertLockedUserLoginFailure() {
    await expect(this.error_message).toBeVisible();
    await expect(this.error_message).toContainText(
      "Epic sadface: Sorry, this user has been locked out.",
    );
  }

  async assertLoginFailure() {
    await expect(this.error_message).toBeVisible();
    await expect(this.error_message).toContainText(
      "Epic sadface: Username and password do not match any user in this service",
    );
  }
}
