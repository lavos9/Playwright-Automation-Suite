import { Page, Locator } from "@playwright/test";

export class ProductsPage {
  readonly page: Page;
  readonly productsList: Locator;
  readonly productItems: Locator;
  readonly searchInput: Locator;
  readonly searchBtn: Locator;
  readonly categoryMenu: Locator;
  readonly brandMenu: Locator;
  readonly addToCartBtns: Locator;
  readonly viewProductBtns: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productsList = page.locator(".features_items");
    this.productItems = page.locator(".productinfo");
    this.searchInput = page.locator("input#search_product");
    this.searchBtn = page.locator("button#submit_search");
    this.categoryMenu = page.locator(".left-sidebar .category-products");
    this.brandMenu = page.locator(".left-sidebar .brands-name");
    this.addToCartBtns = page.locator(".productinfo .btn");
    this.viewProductBtns = page.locator("a:has-text('View Product')");
  }

  async searchProduct(productName: string) {
    await this.searchInput.fill(productName);
    await this.searchBtn.click();
  }

  async selectCategory(categoryName: string) {
    await this.page.locator(`a:has-text('${categoryName}')`).click();
  }

  async selectBrand(brandName: string) {
    await this.page.locator(`a:has-text('${brandName}')`).click();
  }

  async addProductToCart(index: number = 0) {
    await this.addToCartBtns.nth(index).click();
  }

  async viewProduct(index: number = 0) {
    await this.viewProductBtns.nth(index).click();
  }

  async getProductCount() {
    return await this.productItems.count();
  }
}
