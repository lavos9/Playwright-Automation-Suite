import { Page, Locator } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly quantityInputs: Locator;
  readonly removeFromCartBtns: Locator;
  readonly proceedToCheckoutBtn: Locator;
  readonly continueShoppingBtn: Locator;
  readonly emptyCartMessage: Locator;
  readonly subscriptionEmail: Locator;
  readonly subscriptionBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator("table tbody tr");
    this.quantityInputs = page.locator("input.cart_quantity_input");
    this.removeFromCartBtns = page.locator("a[class*='remove-cart']");
    this.proceedToCheckoutBtn = page.locator("a.btn:has-text('Proceed To Checkout')");
    this.continueShoppingBtn = page.locator("a.btn:has-text('Continue Shopping')");
    this.emptyCartMessage = page.locator("b:has-text('Cart is empty')");
    this.subscriptionEmail = page.locator("input[placeholder='Your email address']").last();
    this.subscriptionBtn = page.locator("button[type='button']:has-text('Subscribe')").last();
  }

  async getItemCount() {
    return await this.cartItems.count();
  }

  async removeItem(index: number = 0) {
    await this.removeFromCartBtns.nth(index).click();
  }

  async updateQuantity(index: number, quantity: string) {
    await this.quantityInputs.nth(index).fill(quantity);
  }

  async proceedToCheckout() {
    await this.proceedToCheckoutBtn.click();
  }

  async continueShopping() {
    await this.continueShoppingBtn.click();
  }

  async isEmptyCartMessageVisible() {
    return await this.emptyCartMessage.isVisible();
  }

  async getQuantity(index: number) {
    return await this.quantityInputs.nth(index).inputValue();
  }

  async subscribeNewsletter(email: string) {
    await this.subscriptionEmail.fill(email);
    await this.subscriptionBtn.click();
  }
}
