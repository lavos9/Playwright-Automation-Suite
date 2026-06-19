import { FullConfig } from "@playwright/test";

async function globalSetup(config: FullConfig) {
  console.log("Running global setup for Automation Exercise tests");
}

export default globalSetup;