import { Page, Locator } from "@playwright/test";

export class ProductDetailsPage {
  readonly page: Page;
  readonly productName: Locator;
  readonly productPrice: Locator;
  readonly productRating: Locator;
  readonly addToCartBtn: Locator;
  readonly quantityInput: Locator;
  readonly writeReviewBtn: Locator;
  readonly reviewNameInput: Locator;
  readonly reviewEmailInput: Locator;
  readonly reviewTextarea: Locator;
  readonly submitReviewBtn: Locator;
  readonly successMessage: Locator;
  readonly recommendedItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productName = page.locator("h2");
    this.productPrice = page.locator("span:has-text('Rs.')").first();
    this.productRating = page.locator(".rating");
    this.addToCartBtn = page.locator("button:has-text('Add to cart')");
    this.quantityInput = page.locator("input#quantity");
    this.writeReviewBtn = page.locator("a:has-text('Write Your Review')");
    this.reviewNameInput = page.locator("input[id='name']");
    this.reviewEmailInput = page.locator("input[id='email']");
    this.reviewTextarea = page.locator("textarea[id='review']");
    this.submitReviewBtn = page.locator("button[id='button-review']");
    this.successMessage = page.locator("span:has-text('Thank you for your review')");
    this.recommendedItems = page.locator("div.recommended_items .productinfo");
  }

  async getProductName() {
    return await this.productName.textContent();
  }

  async getProductPrice() {
    return await this.productPrice.textContent();
  }

  async addToCart() {
    await this.addToCartBtn.click();
  }

  async setQuantity(quantity: string) {
    await this.quantityInput.fill(quantity);
  }

  async submitReview(reviewData: {
    name: string;
    email: string;
    review: string;
  }) {
    await this.reviewNameInput.fill(reviewData.name);
    await this.reviewEmailInput.fill(reviewData.email);
    await this.reviewTextarea.fill(reviewData.review);
    await this.submitReviewBtn.click();
  }

  async isReviewSuccessVisible() {
    return await this.successMessage.isVisible();
  }

  async getRecommendedItemsCount() {
    return await this.recommendedItems.count();
  }

  async addRecommendedItemToCart(index: number = 0) {
    const addBtn = this.recommendedItems.nth(index).locator("button:has-text('Add to cart')");
    await addBtn.click();
  }
}
