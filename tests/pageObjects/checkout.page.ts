import { Page, Locator, expect } from '@playwright/test';

export class CheckoutPage {
    private page: Page;
    readonly txt_productTitle: Locator;
    readonly ele_paymentInfo: Locator;
    readonly ele_shippingInfo: Locator
    readonly ele_totalAmount: Locator;
    readonly btn_finish: Locator;
    readonly lbl_thankYouMessage: Locator;
    readonly btn_backToHome: Locator;

    constructor(page: Page) {
        this.page = page;
        this.txt_productTitle = page.locator('.inventory_item_name');
        this.ele_paymentInfo = page.locator('[data-test="payment-info-value"]');
        this.ele_shippingInfo = page.locator('[data-test="shipping-info-value"]');
        this.ele_totalAmount = page.locator('[data-test="total-label"]');
        this.btn_finish = page.locator('#finish');
        this.lbl_thankYouMessage = page.locator('[data-test="complete-header"]');
        this.btn_backToHome = page.locator('#back-to-products');
    }

    async verifyProductInOverview(expectedProductName: string) {
        const productName = await this.txt_productTitle.textContent();
        expect(productName).toBe(expectedProductName);
    }

    async verifyPaymentInformation(){
        await expect(this.ele_paymentInfo).toBeVisible();  
        await expect(this.ele_shippingInfo).toBeVisible();
        await expect(this.ele_totalAmount).toBeVisible();  
    }

    async clickFinishToProceed(){
        await this.btn_finish.click();
    }

    async verifyCheckoutComplete() {
        await expect(this.lbl_thankYouMessage).toHaveText('Thank you for your order!');
        await this.btn_backToHome.click();
    }

    async verifySuccessfulCheck(expectedProductName: string){
        await this.verifyProductInOverview(expectedProductName);
        await this.verifyPaymentInformation();
        await this.clickFinishToProceed();
        await this.verifyCheckoutComplete();
    }
}