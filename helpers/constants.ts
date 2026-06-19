// PlayWright Automation Suite Configuration
// Base URL: automationexercise.com
export const BASE_TIMEOUT = 80000;
export const NAV_TIMEOUT = 80000;
//index/homepage
export const HOMEPAGE_BUTTON_LABELS = [
  "Orders",
  "Batch",
  "Quality Control",
  "Review",
  "Report",
  "Curation",
  "Confirmation",
];

export const WEB_URLS = {
  "Online Orders Page": "/orders/sample/online",
  "Manual Orders Page": "/orders/sample/manual",
  "Accessioned Orders Page": "/orders/sample/accessioned",
  "Archived Orders Page": "/orders/sample/archived",
}
//online orders
export const ONLINE_ORDERS_TABLE_HEADERS: string[] = [
  "Notes",
  "",
  "Flag",
  "Full Name",
  "Gender",
  "Birth Date",
  "Test Code",
  "Hospital Code",
  "Collection Date",
  "Accession Number",
  "Ordered Date",
  "Medical Ref. Number",
  "SampleType",
  "Bill Type",
  "Asset Tag",
];

export const MANUAL_ORDERS_TABLE_HEADERS: string[] = [
  "Notes",
  "",
  "Flag",
  "Full Name",
  "Birth Date",
  "Test Code",
  "Hospital Code",
  "Collection Date",
  "Accession Number",
  "Ordered Date",
  "Medical Ref. Number",
  "SampleType",
  "Bill Type",
  "Entered By",
  "Entered On"
];

export const DEX_ENV_URL={
  "QA": "https://automationexercise.com",
  "UAT": "https://automationexercise.com",
}