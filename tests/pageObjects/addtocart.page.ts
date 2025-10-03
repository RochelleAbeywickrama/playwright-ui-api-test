import { Page, Locator, expect } from '@playwright/test';

export class AddToCartPage {
    private page: Page;
    readonly btn_shoppingCart: Locator;
    

    constructor(page: Page) {
        this.page = page;
        this.btn_shoppingCart = page.locator('[data-test="shopping-cart-link"]');
    }

    async clickShoppingCart() {
        await this.btn_shoppingCart.click();
    }
    

    
}