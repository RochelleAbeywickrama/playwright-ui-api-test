import { expect, test } from "@playwright/test";
import { HomePage } from "../../pageObjects/home.page";
import { LoginPage } from "../../pageObjects/login.page";
import { AddToCartPage } from "../../pageObjects/addtocart.page";
import { CheckoutPage } from "../../pageObjects/checkout.page";
import { testdata } from "../../fixtures/ui_data/testdata";
import { users } from "../../fixtures/ui_data/users";

test.describe("Shopping CartFunctionality Tests", () => {
  let loginPage: LoginPage;
  let homePage: HomePage;
  let addToCartPage: AddToCartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto(); 
    await loginPage.login(
      users.standard_user.username,
      users.standard_user.password,
    ); 
    homePage = await loginPage.assertLoginSuccess();
  });

  test("Verify Add product to Shopping Cart", async () => {
    const productName = await homePage.getProductName();
    expect(productName).toBe(testdata.productInfo.productName);
  });

  test("Verify Product in the Cart", async () => {
    addToCartPage = await homePage.addToCart();
    await addToCartPage.clickShoppingCart();
    await addToCartPage.verifyProductInCart(testdata.productInfo.productName);
    await addToCartPage.proceedToCheckout();
    checkoutPage = await addToCartPage.enterCheckoutInformation(
      testdata.checkoutInfo.firstName,
      testdata.checkoutInfo.lastName,
      testdata.checkoutInfo.postalCode,
    );
    await checkoutPage.verifySuccessfulCheck(testdata.productInfo.productName);
  });
});
