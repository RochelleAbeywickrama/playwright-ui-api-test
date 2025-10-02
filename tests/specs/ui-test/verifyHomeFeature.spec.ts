import { expect, test } from "@playwright/test";
import { HomePage } from "../../pageObjects/home.page";
import { LoginPage } from "../../pageObjects/login.page";
import { testdata } from "../../fixtures/ui_data/testdata";

test.describe("Home Page Functionality Tests", () => {
  let loginPage: LoginPage;
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto(); // Navigate to the login page before each test
    await loginPage.login("standard_user", "secret_sauce"); // Perform login before each test
    await loginPage.assertLoginSuccess();
  });

  test("Verify Home Page Elements", async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigateToHomePage();
    expect(await homePage.verifyMenuButton()).toBeTruthy();
    expect(await homePage.verifyShoppingCartLink()).toBeTruthy();
    expect(await homePage.getProductCount()).toBeGreaterThan(0);
    expect(await homePage.verifySortingListVisible()).toBeTruthy();
    expect(await homePage.verifyTwitterMediaButtons()).toBeTruthy();
    expect(await homePage.verifyFacebookMediaButtons()).toBeTruthy();
    expect(await homePage.verifyLinkedinMediaButtons()).toBeTruthy();
    expect(await homePage.verifyFooterContent()).toBeTruthy();
  });


  test("Verify A to Z Product Sorting Functionality", async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.selectSortOption(testdata.productSortValues.aToZ, testdata.productSortOptions.aToZ);
    await homePage.verifyNameAToZSorting();
  });

  test("Verify Z to A Product Sorting Functionality", async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.selectSortOption(testdata.productSortValues.zToA, testdata.productSortOptions.zToA);
    await homePage.verifyNameZToASorting();
  });

  test("Verify Price Low to High Product Sorting Functionality", async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.selectSortOption(testdata.productSortValues.priceLowToHigh, testdata.productSortOptions.priceLowToHigh);
    await homePage.verifyPriceLowToHighSorting();
  });

  test("Verify Price High to Low Product Sorting Functionality", async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.selectSortOption(testdata.productSortValues.priceHighToLow, testdata.productSortOptions.priceHighToLow);
    await homePage.verifyPriceHighToLowSorting();
  });

});
