import { Page, Locator } from "@playwright/test";

export class RegistrationDetailsPage {
  readonly page: Page;
  readonly titleMrRadio: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly passwordInput: Locator;
  readonly daySelect: Locator;
  readonly monthSelect: Locator;
  readonly yearSelect: Locator;
  readonly newsletterCheckbox: Locator;
  readonly specialOffersCheckbox: Locator;
  readonly companyInput: Locator;
  readonly firstAddressInput: Locator;
  readonly secondAddressInput: Locator;
  readonly countrySelect: Locator;
  readonly stateInput: Locator;
  readonly cityInput: Locator;
  readonly zipcodeInput: Locator;
  readonly mobileNumberInput: Locator;
  readonly createAccountBtn: Locator;
  readonly successMessage: Locator;
  readonly continueBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.titleMrRadio = page.locator("input[value='Mr']");
    this.firstNameInput = page.locator("input[data-qa='first_name']");
    this.lastNameInput = page.locator("input[data-qa='last_name']");
    this.passwordInput = page.locator("input[data-qa='password']");
    this.daySelect = page.locator("select[data-qa='days']");
    this.monthSelect = page.locator("select[data-qa='months']");
    this.yearSelect = page.locator("select[data-qa='years']");
    this.newsletterCheckbox = page.locator("input#newsletter");
    this.specialOffersCheckbox = page.locator("input#optin");
    this.companyInput = page.locator("input[data-qa='company']");
    this.firstAddressInput = page.locator("input[data-qa='address']");
    this.secondAddressInput = page.locator("input[data-qa='address2']");
    this.countrySelect = page.locator("select[data-qa='country']");
    this.stateInput = page.locator("input[data-qa='state']");
    this.cityInput = page.locator("input[data-qa='city']");
    this.zipcodeInput = page.locator("input[data-qa='zipcode']");
    this.mobileNumberInput = page.locator("input[data-qa='mobile_number']");
    this.createAccountBtn = page.locator("button[data-qa='create-account']");
    this.successMessage = page.locator("b:has-text('Account Created!')");
    this.continueBtn = page.locator("a[data-qa='continue-button']");
  }

  async fillRegistrationForm(formData: {
    firstName: string;
    lastName: string;
    password: string;
    day: string;
    month: string;
    year: string;
    company?: string;
    address: string;
    address2?: string;
    country: string;
    state: string;
    city: string;
    zipcode: string;
    mobileNumber: string;
  }) {
    await this.titleMrRadio.click();
    await this.firstNameInput.fill(formData.firstName);
    await this.lastNameInput.fill(formData.lastName);
    await this.passwordInput.fill(formData.password);
    await this.daySelect.selectOption(formData.day);
    await this.monthSelect.selectOption(formData.month);
    await this.yearSelect.selectOption(formData.year);
    await this.newsletterCheckbox.check();
    await this.specialOffersCheckbox.check();
    
    if (formData.company) {
      await this.companyInput.fill(formData.company);
    }
    
    await this.firstAddressInput.fill(formData.address);
    
    if (formData.address2) {
      await this.secondAddressInput.fill(formData.address2);
    }
    
    await this.countrySelect.selectOption(formData.country);
    await this.stateInput.fill(formData.state);
    await this.cityInput.fill(formData.city);
    await this.zipcodeInput.fill(formData.zipcode);
    await this.mobileNumberInput.fill(formData.mobileNumber);
  }

  async clickCreateAccount() {
    await this.createAccountBtn.click();
  }

  async isSuccessMessageVisible() {
    return await this.successMessage.isVisible();
  }

  async clickContinue() {
    await this.continueBtn.click();
  }
}
