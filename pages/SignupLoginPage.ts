import { Page, Locator } from "@playwright/test";

export class SignupLoginPage {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly signupBtn: Locator;
  readonly loginEmailInput: Locator;
  readonly loginPasswordInput: Locator;
  readonly loginBtn: Locator;
  readonly errorMessage: Locator;
  readonly signupForm: Locator;
  readonly loginForm: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.locator("input[placeholder='Name']");
    this.emailInput = page.locator("input[data-qa='signup-email']");
    this.signupBtn = page.locator("button[data-qa='signup-button']");
    this.loginEmailInput = page.locator("input[data-qa='login-email']");
    this.loginPasswordInput = page.locator("input[data-qa='login-password']");
    this.loginBtn = page.locator("button[data-qa='login-button']");
    this.errorMessage = page.locator("p").filter({ hasText: /Your email|password is incorrect/ });
    this.signupForm = page.locator("div.signup-form");
    this.loginForm = page.locator("div.login-form");
  }

  async fillSignupForm(name: string, email: string) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
  }

  async clickSignup() {
    await this.signupBtn.click();
  }

  async fillLoginForm(email: string, password: string) {
    await this.loginEmailInput.fill(email);
    await this.loginPasswordInput.fill(password);
  }

  async clickLogin() {
    await this.loginBtn.click();
  }

  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }
}
