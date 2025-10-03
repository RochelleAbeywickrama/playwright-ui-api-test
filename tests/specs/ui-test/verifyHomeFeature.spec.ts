import { expect, test } from "@playwright/test";
import { HomePage } from "../../pageObjects/home.page";
import { LoginPage } from "../../pageObjects/login.page";
import { testdata } from "../../fixtures/ui_data/testdata";
import { users } from "../../fixtures/ui_data/users";

test.describe("Home Page Functionality Tests", () => {
  let loginPage: LoginPage;
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto(); // Navigate to the login page before each test
    await loginPage.login(users.standard_user.username, users.standard_user.password); // Perform login before each test
    await loginPage.assertLoginSuccess();
  });

  test("Verify Home Page Elements", async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigateToHomePage();
    expect(await homePage.verifyMenuButton()).toBeTruthy();
    expect(await homePage.verifyShoppingCartLink()).toBeTruthy();
    expect(await homePage.getProductCount()).toBeGreaterThan(0);
    expect(await homePage.verifySortingListVisible()).toBeTruthy();
    await homePage.verifyFooterElements();
  });

  test("Verify A to Z Product Sorting Functionality", async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.selectSortOption(
      testdata.productSortValues.aToZ,
      testdata.productSortOptions.aToZ,
    );
    await homePage.verifyNameAToZSorting();
  });

  test("Verify Z to A Product Sorting Functionality", async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.selectSortOption(
      testdata.productSortValues.zToA,
      testdata.productSortOptions.zToA,
    );
    await homePage.verifyNameZToASorting();
  });

  test("Verify Price Low to High Product Sorting Functionality", async ({
    page,
  }) => {
    homePage = new HomePage(page);
    await homePage.selectSortOption(
      testdata.productSortValues.priceLowToHigh,
      testdata.productSortOptions.priceLowToHigh,
    );
    await homePage.verifyPriceLowToHighSorting();
  });

  test("Verify Price High to Low Product Sorting Functionality", async ({
    page,
  }) => {
    homePage = new HomePage(page);
    await homePage.selectSortOption(
      testdata.productSortValues.priceHighToLow,
      testdata.productSortOptions.priceHighToLow,
    );
    await homePage.verifyPriceHighToLowSorting();
  });
});
