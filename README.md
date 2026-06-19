# Automation Exercise Test Suite

Playwright test automation for [automationexercise.com](https://automationexercise.com) with comprehensive test coverage using TypeScript and Page Object Model pattern.

## Overview

This test suite automates 26 test cases for the Automation Exercise platform. Currently, **Test Cases 1-8 are implemented and passing**:

- **Test Case 1**: Register User - Creates new account with random data
- **Test Case 2**: Login User - Logs in with credentials saved from Test Case 1
- **Test Case 3**: Incorrect Login - Verifies error message for wrong credentials
- **Test Case 4**: Logout User - Verifies logout functionality
- **Test Case 5**: Register with Existing Email - Verifies duplicate email error
- **Test Case 6**: Contact Us Form - Fills and submits contact form with dialog handling
- **Test Case 7**: Verify Test Cases Page - Navigates to test cases page and verifies heading
- **Test Case 8**: Search Product & Add to Cart - Searches for product and adds to cart

## Key Features

- **Credential Persistence**: Test credentials saved between tests (Test 1 → Test 2)
- **Random Data Generation**: Unique users, emails, and data for each test run
- **Tag-Based Execution**: Run specific tests using @test1, @test2 tags
- **Page Object Model**: Clean separation of UI interactions and test logic
- **Error Handling**: Proper dialog and modal handling
- **TypeScript Support**: Strict type checking with full TypeScript configuration

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. No configuration needed - base URL is set to `https://automationexercise.com` in `playwright.config.ts`

## Running Tests

### Run All Implemented Tests (1-8)
```bash
npx playwright test tests/AutomationExercise.spec.ts --grep "@test1|@test2|@test3|@test4|@test5|@test6|@test7|@test8" --headed
```

### Run Specific Test
```bash
# Test Case 1 only
npx playwright test tests/AutomationExercise.spec.ts --grep "@test1" --headed

# Test Case 2 only
npx playwright test tests/AutomationExercise.spec.ts --grep "@test2" --headed
```

### Run All Tests (Headless)
```bash
npx playwright test tests/AutomationExercise.spec.ts
```

### Run with HTML Report
```bash
npx playwright show-report
```

## Project Structure

```
├── tests/
│   ├── AutomationExercise.spec.ts      # Main test suite (Tests 1-8)
│   └── BaseURLTest.spec.ts             # Base URL verification test
├── pages/
│   ├── HomePage.ts                     # Home page interactions
│   ├── SignupLoginPage.ts              # Signup/Login page
│   ├── RegistrationDetailsPage.ts      # Registration form
│   ├── ContactUsPage.ts                # Contact Us form
│   ├── ProductsPage.ts                 # Products page
│   ├── ProductDetailsPage.ts           # Product details
│   ├── CartPage.ts                     # Shopping cart
│   └── CheckoutPage.ts                 # Checkout page
├── helpers/
│   ├── testData.ts                     # Test data and random generation
│   ├── credentialsManager.ts           # Credential persistence
│   ├── testDataPool.json               # Data pools for random generation
│   └── utils.ts                        # Utility functions
├── playwright.config.ts                # Playwright configuration
├── tsconfig.json                       # TypeScript configuration
└── README.md                           # This file
```

## Credential Persistence

The system stores test credentials between tests in `test-credentials.json`:

- **Test Case 1** creates and saves credentials
- **Tests 2-5** retrieve saved credentials for testing dependent flows
- Credentials persist across multiple test runs for continuity

## Random Data Generation

Test data is generated per test run:

- **Email format**: `user{timestamp}{random}@example.com` (e.g., `user97093ez7r@example.com`)
- **Name, address, phone**: Randomly selected from predefined pools
- **Password**: Random with uppercase, lowercase, numbers, and symbols
- **Unique per run**: No conflicts between test runs

## Test Data Location

Random data pools are stored in `helpers/testDataPool.json` with arrays for:
- First names
- Last names
- Companies
- Addresses
- States/Cities
- Zipcodes
- Mobile numbers
- Passwords

## Page Object Model

Each page has dedicated methods for interactions:

```typescript
// Example: HomePage
const homePage = new HomePage(page);
await homePage.navigate();
await homePage.clickProducts();
await homePage.clickCart();
```

## Browser Support

- **Chromium** (default)
- **Firefox** (configure in playwright.config.ts)
- **WebKit** (configure in playwright.config.ts)

## Configuration

### Base URL
```typescript
// playwright.config.ts
baseURL: 'https://automationexercise.com'
```

### Timeout
- Test timeout: 60 seconds (default)
- Navigation timeout: 30 seconds (default)

## TypeScript Configuration

- **Strict mode**: Enabled
- **Target**: ES2020
- **Module**: ESNext
- **Types**: Includes Node.js types

## Status

✅ Test Cases 1-8: **PASSING**  
🔄 Other Test Cases : **To be implemented**

## Next Steps

Remaining 18 test cases to implement covering:
- Subscription verification
- Search and filtering
- Reviews and ratings
- Checkout flows
- Invoice download
- Scroll functionality

## Running Tests in VS Code

1. Install the Playwright Test for VS Code extension
2. Open test file and click "Run" or use `npm test`
3. View results in the integrated terminal and Playwright Inspector

## Troubleshooting

### Test Timeout
Increase timeout in `playwright.config.ts`:
```typescript
timeout: 120000 // 120 seconds
```

### Credential Issues
Delete `test-credentials.json` to reset credentials for next run

### Element Not Found
Use Playwright Inspector to debug locators:
```bash
npx playwright codegen https://automationexercise.com
```

## License

Test automation suite for educational purposes.
