import { Page, Locator } from "@playwright/test";

export class CheckoutPage {
  readonly page: Page;
  readonly deliveryAddressHeading: Locator;
  readonly invoiceDownloadBtn: Locator;
  readonly continueBtn: Locator;
  readonly orderIdRegex: RegExp;

  constructor(page: Page) {
    this.page = page;
    this.deliveryAddressHeading = page.locator("h2:has-text('Delivery Address')");
    this.invoiceDownloadBtn = page.locator("a:has-text('Download Invoice')");
    this.continueBtn = page.locator("a.btn:has-text('Continue')");
    this.orderIdRegex = /ORDER ID/;
  }

  async verifyDeliveryAddress() {
    return await this.deliveryAddressHeading.isVisible();
  }

  async downloadInvoice() {
    await this.invoiceDownloadBtn.click();
  }

  async clickContinue() {
    await this.continueBtn.click();
  }

  async fillPaymentDetails(formData: {
    nameOnCard: string;
    cardNumber: string;
    cvc: string;
    expiryMonth: string;
    expiryYear: string;
  }) {
    await this.page.locator("input[data-qa='name-on-card']").fill(formData.nameOnCard);
    await this.page.locator("input[data-qa='card-number']").fill(formData.cardNumber);
    await this.page.locator("input[data-qa='cvc']").fill(formData.cvc);
    await this.page.locator("input[data-qa='expiry-month']").fill(formData.expiryMonth);
    await this.page.locator("input[data-qa='expiry-year']").fill(formData.expiryYear);
  }

  async submitPayment() {
    await this.page.locator("button[id='submit']").click();
  }

  async isOrderSuccessfulMessageVisible() {
    return await this.page.locator("h2:has-text('Order Placed Successfully')").isVisible();
  }
}
