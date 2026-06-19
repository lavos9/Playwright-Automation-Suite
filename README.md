# CEP-V2 Test Automation

This package contains test automation for CEP-V2 application.

## Setup

1. Install dependencies from the root:
   ```bash
   npm install
   ```

2. Configure environment variables:
   - Create a `.env` file in the root with:
     - `CEP_V2_BASE_URL` - Base URL for CEP-V2 application
     - `CEP_V2_USER_EMAIL` - User email for authentication
     - `CEP_V2_PASSWORD` - User password for authentication

## Running Tests

### Playwright Tests
```bash
# From root
npm run test:cep-v2

# From this package
npm test
```

### Cucumber Tests
```bash
# From root
npm run cucumber:cep-v2

# From this package
npm run cucumber
```

## Project Structure

- `tests/` - Playwright test specs
- `pages/` - Page Object Models
- `src/features/` - Cucumber feature files
- `src/step-definitions/` - Cucumber step definitions
- `src/support/` - Cucumber world setup
- `helpers/` - Utility functions and constants
- `models/` - TypeScript interfaces and types
- `testsData/` - Test data files
- `reports/` - Test reports
