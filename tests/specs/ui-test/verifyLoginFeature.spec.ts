import { test } from '@playwright/test';
import { LoginPage } from '../../pageObjects/login.page.ts';
import { users } from '../../fixtures/ui_data/users.ts';

test.describe('Login Functionality Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto(); // Navigate to the login page before each test
  });

  test('Verify login with valid standard user', async () => {
    await loginPage.login(users.standard_user.username, users.standard_user.password);
    await loginPage.assertLoginSuccess();
  });

  test('Verify login with valid locked out user', async () => {
    await loginPage.login(users.locked_user.username, users.locked_user.password);
    await loginPage.assertLoginFailure();
  });

  test('Verify login with problematic user', async () => {
    await loginPage.login(users.problem_user.username, users.problem_user.password);
    await loginPage.assertLoginSuccess();
  });
});
