import { Page, Locator, expect } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly page_title: Locator;
  readonly div_productCard: Locator;
  readonly btn_menu: Locator;
  readonly dd_productSort: Locator;
  readonly lbl_productName: Locator;
  readonly lnk_cart: Locator;
  readonly btn_twitter: Locator;
  readonly btn_facebook: Locator;
  readonly btn_linkedin: Locator;
  readonly lbl_footer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.page_title = page.locator('.primary_header');
    this.div_productCard = page.locator('[data-test="inventory-item-description"]');
    this.btn_menu = page.locator('#react-burger-menu-btn');
    this.dd_productSort = page.locator('.product_sort_container');
    this.lbl_productName = page.locator('.inventory_item_name');
    this.lnk_cart = page.locator('.shopping_cart_link');
    this.btn_twitter = page.locator('[data-test="social-twitter"]');
    this.btn_facebook = page.locator('[data-test="social-facebook"]');
    this.btn_linkedin = page.locator('[data-test="social-linkedin"]');
    this.lbl_footer = page.locator('.footer_copy');
  }

  async navigateToHomePage() {
    await expect(this.page_title).toBeVisible();
  }

  async getProductCount() {
    return await this.div_productCard.count();
  }

  async verifyMenuButton() {
    return await this.btn_menu.isVisible();
  }

  async clickMenuButton() {
    await this.btn_menu.click();
  }

  async verifyShoppingCartLink() {
    return await this.lnk_cart.isVisible();
  } 

  async verifySortingListVisible() {
    return await this.dd_productSort.isVisible();
  }

  async verifyTwitterMediaButtons() {
    return await this.btn_twitter.isVisible();
  }

    async verifyFacebookMediaButtons() {    
    return await this.btn_facebook.isVisible();
    }

    async verifyLinkedinMediaButtons() {
    return await this.btn_linkedin.isVisible();
    }

    async verifyFooterContent() {
    return await this.lbl_footer.isVisible();
  }
    

  async selectSortOption(option: string, expectedText: string) {
    await this.dd_productSort.click();
    await this.dd_productSort.selectOption(option);
    await expect(this.dd_productSort).toContainText(expectedText);
  }

  async verifyNameAToZSorting() {
    const productNames = await this.lbl_productName.allTextContents();
    const sortedNames = [...productNames].sort((a, b) => a.localeCompare(b));
    expect(productNames).toEqual(sortedNames);
  }

  async verifyNameZToASorting() {
    const productNames = await this.lbl_productName.allTextContents();
    const sortedNames = [...productNames].sort((a, b) => b.localeCompare(a));
    expect(productNames).toEqual(sortedNames);
  }

  async verifyPriceLowToHighSorting() {
    const prices = await this.page.locator('.inventory_item_price').allTextContents();
    const numericPrices = prices.map(price => parseFloat(price.replace('$', '')));
    const sortedPrices = [...numericPrices].sort((a, b) => a - b);
    expect(numericPrices).toEqual(sortedPrices);
  }

  async verifyPriceHighToLowSorting() {
    const prices = await this.page.locator('.inventory_item_price').allTextContents();
    const numericPrices = prices.map(price => parseFloat(price.replace('$', '')));
    const sortedPrices = [...numericPrices].sort((a, b) => b - a);
    expect(numericPrices).toEqual(sortedPrices);
  }
}
