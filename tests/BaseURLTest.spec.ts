import { test, expect } from "@playwright/test";

test("Open base URL automationexercise.com", async ({ page }) => {
    await page.goto("/");
    
    // Verify the page loaded successfully
    await expect(page).toHaveTitle(/Automation Exercise|E-commerce practice website/i);
});
