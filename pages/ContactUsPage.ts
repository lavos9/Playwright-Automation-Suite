import { Page, Locator } from "@playwright/test";

export class ContactUsPage {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly subjectInput: Locator;
  readonly messageTextarea: Locator;
  readonly uploadFileInput: Locator;
  readonly submitBtn: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.locator("input[data-qa='name']");
    this.emailInput = page.locator("input[data-qa='email']");
    this.subjectInput = page.locator("input[data-qa='subject']");
    this.messageTextarea = page.locator("textarea[data-qa='message']");
    this.uploadFileInput = page.locator("input[name='upload_file']");
    this.submitBtn = page.locator("input[data-qa='submit-button']");
    this.successMessage = page.locator("div.alert.alert-success");
  }

  async fillContactForm(formData: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) {
    await this.nameInput.fill(formData.name);
    await this.emailInput.fill(formData.email);
    await this.subjectInput.fill(formData.subject);
    await this.messageTextarea.fill(formData.message);
  }

  async uploadFile(filePath: string) {
    await this.uploadFileInput.setInputFiles(filePath);
  }

  async submit() {
    await this.submitBtn.click();
  }

  async isSuccessMessageVisible() {
    return await this.successMessage.isVisible();
  }

  async handleAlertDialog() {
    this.page.once("dialog", dialog => {
      dialog.accept();
    });
  }
}
