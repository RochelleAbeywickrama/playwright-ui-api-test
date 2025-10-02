import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly inventoryList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#user-name'); // by id
    this.passwordInput = page.locator('#password'); // by id
    this.loginButton = page.locator('#login-button'); // by id
    this.inventoryList = page.locator('.inventory_list'); // by class name
  }

  async goto() {
    await this.page.goto('/'); // Navigate to the login page
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async assertLoginSuccess() {
    await expect(this.page).toHaveURL(/inventory.html/);
    await expect(this.inventoryList).toBeVisible();
  }
  
  async assertLoginFailure() {
    const errorMessage = this.page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Epic sadface: Sorry, this user has been locked out.');
  }
}
