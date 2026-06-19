import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { SignupLoginPage } from "../pages/SignupLoginPage";
import { RegistrationDetailsPage } from "../pages/RegistrationDetailsPage";
import { ProductsPage } from "../pages/ProductsPage";
import { ProductDetailsPage } from "../pages/ProductDetailsPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { ContactUsPage } from "../pages/ContactUsPage";
import { testData, generateUniqueEmail, generateRandomUserData } from "../helpers/testData";
import { saveCredentials, getCredentials } from "../helpers/credentialsManager";

// Test Case 1: Register User
test("@test1 Test Case 1: Register User", async ({ page }) => {
  const homePage = new HomePage(page);
  const signupLoginPage = new SignupLoginPage(page);
  const registrationPage = new RegistrationDetailsPage(page);
  const randomUser = generateRandomUserData();

  await homePage.navigate();
  await homePage.clickSignupLogin();
  
  await signupLoginPage.fillSignupForm(randomUser.name, randomUser.email);
  await signupLoginPage.clickSignup();

  await registrationPage.fillRegistrationForm({
    firstName: randomUser.firstName,
    lastName: randomUser.lastName,
    password: randomUser.password,
    day: randomUser.day,
    month: randomUser.month,
    year: randomUser.year,
    company: randomUser.company,
    address: randomUser.address,
    address2: randomUser.address2,
    country: "India",
    state: randomUser.state,
    city: randomUser.city,
    zipcode: randomUser.zipcode,
    mobileNumber: randomUser.mobileNumber,
  });
  await registrationPage.clickCreateAccount();

  await expect(registrationPage.successMessage).toBeVisible();
  
  // Save credentials for use in other tests
  saveCredentials({
    email: randomUser.email,
    password: randomUser.password,
    firstName: randomUser.firstName,
    lastName: randomUser.lastName,
  });
  
  await registrationPage.clickContinue();
});

// Test Case 2: Login User with correct email and password
test("@test2 Test Case 2: Login User with correct email and password", async ({ page }) => {
  const homePage = new HomePage(page);
  const signupLoginPage = new SignupLoginPage(page);
  
  // Load credentials from Test Case 1
  const credentials = getCredentials();

  await homePage.navigate();
  await homePage.clickSignupLogin();

  await signupLoginPage.fillLoginForm(credentials.email, credentials.password);
  await signupLoginPage.clickLogin();

  // Verify successful login - check for "Logged in as" text in li element
  await expect(page.locator("li:has-text('Logged in as')")).toBeVisible({ timeout: 10000 });
  
  // Verify logout button with lock icon is present
  await expect(page.locator("a[href='/logout']:has(i.fa.fa-lock)")).toBeVisible({ timeout: 10000 });
});

// Test Case 3: Login User with incorrect email and password
test("@test3 Test Case 3: Login User with incorrect email and password", async ({ page }) => {
  const homePage = new HomePage(page);
  const signupLoginPage = new SignupLoginPage(page);

  // Use random invalid credentials
  const randomEmail = generateUniqueEmail();
  const randomPassword = "InvalidPass@123";

  await homePage.navigate();
  await homePage.clickSignupLogin();

  await signupLoginPage.fillLoginForm(randomEmail, randomPassword);
  await signupLoginPage.clickLogin();

  // Verify error message appears
  await expect(page.locator("p:has-text('Your email or password is incorrect!')")).toBeVisible({ timeout: 10000 });
});

// Test Case 4: Logout User
test("@test4 Test Case 4: Logout User", async ({ page }) => {
  const homePage = new HomePage(page);
  const signupLoginPage = new SignupLoginPage(page);

  // Load credentials from Test Case 1
  const credentials = getCredentials();

  await homePage.navigate();
  await homePage.clickSignupLogin();

  await signupLoginPage.fillLoginForm(credentials.email, credentials.password);
  await signupLoginPage.clickLogin();

  // Verify login successful
  await expect(page.locator("li:has-text('Logged in as')")).toBeVisible({ timeout: 10000 });
  await expect(page.locator("a[href='/logout']:has(i.fa.fa-lock)")).toBeVisible({ timeout: 10000 });

  // Click logout button
  await page.locator("a[href='/logout']").click();

  // Verify login text and logout button disappeared
  await expect(page.locator("li:has-text('Logged in as')")).not.toBeVisible({ timeout: 10000 });
  await expect(page.locator("a[href='/logout']")).not.toBeVisible({ timeout: 10000 });
});

// Test Case 5: Register User with existing email
test("@test5 Test Case 5: Register User with existing email", async ({ page }) => {
  const homePage = new HomePage(page);
  const signupLoginPage = new SignupLoginPage(page);

  // Load credentials from Test Case 1
  const credentials = getCredentials();

  await homePage.navigate();
  await homePage.clickSignupLogin();

  await signupLoginPage.fillSignupForm(credentials.firstName + " " + credentials.lastName, credentials.email);
  await signupLoginPage.clickSignup();

  // Verify error message for existing email
  await expect(page.locator("p:has-text('Email Address already exist!')")).toBeVisible({ timeout: 10000 });
});

// Test Case 6: Contact Us Form
test("@test6 Test Case 6: Contact Us Form", async ({ page }) => {
  const homePage = new HomePage(page);
  const contactUsPage = new ContactUsPage(page);

  await homePage.navigate();
  await homePage.clickContactUs();

  // Fill form fields directly to ensure data is entered
  await page.locator("input[data-qa='name']").fill(testData.contactUs.name);
  await page.locator("input[data-qa='email']").fill(testData.contactUs.email);
  await page.locator("input[data-qa='subject']").fill(testData.contactUs.subject);
  await page.locator("textarea[data-qa='message']").fill(testData.contactUs.message);

  // Verify fields are filled
  await expect(page.locator("input[data-qa='name']")).toHaveValue(testData.contactUs.name);
  await expect(page.locator("input[data-qa='email']")).toHaveValue(testData.contactUs.email);

  // Set up dialog handler before clicking submit
  page.once("dialog", async dialog => {
    console.log("Dialog: " + dialog.message());
    await dialog.accept();
  });

  // Click submit button
  await page.locator("input[data-qa='submit-button']").click();
  
  // Wait for form submission
  await page.waitForTimeout(2000);
});

// Test Case 7: Verify Test Cases Page
test("@test7 Test Case 7: Verify Test Cases Page", async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.navigate();
  await homePage.clickTestCases();

  await expect(page.locator("h2:has-text('Test Cases')")).toBeVisible();
});


// Test Case 8: Search Product
test("@test8 Test Case 8: Verify All Products and Add to Cart", async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.navigate();
  
  // Click Products link directly
  await page.locator("a[href='/products']").click();

  // Search for a product
  await page.locator("input#search_product").fill("Blue Top");
  await page.locator("button#submit_search").click();

  // Wait for search results
  await page.waitForTimeout(1000);

  // Verify View Product button with text
  await expect(page.locator("a:has-text('View Product')").first()).toBeVisible();

  // Verify Add to Cart button exists
  const addToCartBtn = page.locator("a.btn.btn-default.add-to-cart").first();
  await expect(addToCartBtn).toBeVisible();

  // Click Add to Cart button
  await addToCartBtn.click();

  // Wait for modal with "Added!" title
  await expect(page.locator("h4.modal-title.w-100:has-text('Added!')")).toBeVisible();

  // Click Continue Shopping button
  await page.locator("button.btn.btn-success.close-modal").click();
});

