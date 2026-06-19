import { Page, Locator } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly signupLoginBtn: Locator;
  readonly testCasesBtn: Locator;
  readonly productsBtn: Locator;
  readonly cartBtn: Locator;
  readonly contactUsBtn: Locator;
  readonly subscriptionEmail: Locator;
  readonly subscriptionBtn: Locator;
  readonly scrollUpBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signupLoginBtn = page.locator("a:has-text('Signup / Login')").first();
    this.testCasesBtn = page.locator("a[href='/test_cases'].test_cases_list").first();
    this.productsBtn = page.locator("a:has-text('Products')");
    this.cartBtn = page.locator("a[href='/view_cart']");
    this.contactUsBtn = page.locator("a:has-text('Contact us')");
    this.subscriptionEmail = page.locator("input[placeholder='Your email address']").last();
    this.subscriptionBtn = page.locator("button[type='button']:has-text('Subscribe')").last();
    this.scrollUpBtn = page.locator("a#scrollUp");
  }

  async navigate() {
    await this.page.goto("/");
  }

  async clickSignupLogin() {
    await this.signupLoginBtn.click();
  }

  async clickTestCases() {
    await this.testCasesBtn.click();
  }

  async clickProducts() {
    await this.productsBtn.click();
  }

  async clickCart() {
    await this.cartBtn.click();
  }

  async clickContactUs() {
    await this.contactUsBtn.click();
  }

  async subscribeNewsletter(email: string) {
    await this.subscriptionEmail.fill(email);
    await this.subscriptionBtn.click();
  }

  async scrollDown() {
    await this.page.evaluate(() => window.scrollBy(0, document.body.scrollHeight));
  }

  async scrollUp() {
    await this.page.evaluate(() => window.scrollBy(0, -document.body.scrollHeight));
  }

  async clickScrollUpButton() {
    await this.scrollUpBtn.click();
  }
}
