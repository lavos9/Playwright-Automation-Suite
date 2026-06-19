import sql from "mssql"
import { expect, Locator, Page } from "@playwright/test";
import { BASE_TIMEOUT } from "./constants";

export function formatDateToISOLocal(dateInput: Date | string): string {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export function formatDateToISO(dateInput: Date | string): string {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  return date.toISOString().split('T')[0];
}


export function getDateNDaysFromNow(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return formatDateToISO(date);
}


export function formatDateToMMDDYYYY(dateInput: Date | string): string {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  const mm = (date.getMonth() + 1).toString().padStart(2, "0");
  const dd = date.getDate().toString().padStart(2, "0");
  const yyyy = date.getFullYear();
  return `${mm}/${dd}/${yyyy}`;
}

export function getDateTimeLabel(date: Date = new Date()): string {
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const yyyy = date.getFullYear();

  let hr = date.getHours();
  const min = String(date.getMinutes()).padStart(2, '0');
  const suffix = hr >= 12 ? 'pm' : 'am';
  hr = hr % 12 || 12;
  const paddedHr = String(hr).padStart(2, '0');
  return `${mm}-${dd}-${yyyy}, ${paddedHr}:${min} ${suffix}.`;
}

export async function highlight(locator: Locator) {
  await locator.evaluate(el => {
    el.setAttribute('data-playwright-highlight', 'true');
    el.style.outline = "3px solid orange";
  });
}

export function getLocatorUsingAttributes(page: Page | Locator, attribute: string, attrValue: string): Locator {
  switch (attribute.toLowerCase()) {
    case 'id':
      return page.locator(`input#${attrValue}, textarea#${attrValue}, select#${attrValue}, button#${attrValue}, [id='${attrValue}']`);
    case 'name':
      return page.locator(`input[name="${attrValue}"], textarea[name="${attrValue}"], select[name="${attrValue}"], button[name="${attrValue}"], [name='${attrValue}']`);
    case 'label':
      if ('getByLabel' in page) {
        return (page as Page).getByLabel(attrValue);
      }
      return (page as Locator).locator(`label:has-text("${attrValue}")`);
    case 'testid':
    case 'data-testid':
      if ('getByTestId' in page) {
        return (page as Page).getByTestId(attrValue);
      }
      return (page as Locator).locator(`[data-testid="${attrValue}"]`);
    case 'text':
      if ('getByText' in page) {
        return (page as Page).getByText(attrValue, { exact: true });
      }
      return (page as Locator).locator(`:scope:has-text("${attrValue}")`);
    case 'text-contains':
      if ('getByText' in page) {
        return (page as Page).getByText(attrValue);
      }
      return (page as Locator).locator(`has-text("${attrValue}")`);
    case 'xpath':
      return page.locator(attrValue);
    case 'placeholder':
      if ('getByPlaceholder' in page) {
        return (page as Page).getByPlaceholder(attrValue);
      }
      return (page as Locator).locator(`[placeholder="${attrValue}"]`);
    case 'table-cell':
      return page.locator(`td:has-text("${attrValue}")`);
    case 'role':
      if ('getByRole' in page) {
        return (page as Page).getByRole(attrValue as any);
      }
      return (page as Locator).locator(`[role="${attrValue}"]`);
    case 'aria-label':
      return page.locator(`[aria-label="${attrValue}"]`);
    default:
      throw new Error(`Unsupported attribute type: ${attribute}`);
  }
}


export function getLocatorByGivenElement(card: Locator, label: string, value: string, elementName: string): Locator {
  switch (elementName.toLowerCase()) {
    case 'radio':
      return card
        .locator('label', { hasText: label }).first()
        .locator('..').locator('[role="radiogroup"]')
        .locator('label', { hasText: value }).first();
    case 'checkbox':
      return card.locator('label', { hasText: label }).first().locator('input[type=checkbox]');
    default:
      return card.getByText(label).first();
  }
}


export async function getOrderRowFromTable(page: Page, testCode: string, mrn: string, accessionNo: string, sampleType: string) {
  const rows = page.locator('tr').all();
  for (const row of await rows) {
    const text = await row.innerText();
    if (
      text.includes(mrn) &&
      text.includes(testCode) &&
      text.includes(sampleType) &&
      text.includes(accessionNo)
    ) {
      expect(row.getByRole('cell', { name: mrn })).toBeVisible({ timeout: BASE_TIMEOUT })
      expect(row.getByRole('cell', { name: testCode })).toBeVisible({ timeout: BASE_TIMEOUT })
      expect(row.getByRole('cell', { name: sampleType.toUpperCase() })).toBeVisible({ timeout: BASE_TIMEOUT })
      expect(row.getByRole('cell', { name: accessionNo })).toBeVisible({ timeout: BASE_TIMEOUT })
      return row;
    }
  }
  throw new Error(
    `No row found matching: testCode: ${testCode}, mrn: ${mrn}, sampleType: ${sampleType}, accessionNo: ${accessionNo} (checked ${(await rows).length} rows)`
  );
}

export async function executeQuery(query: string): Promise<any> {
  if (query.length < 1) {
    throw new Error("DB name and query is mandatory!");
  }
  try {
    const pool = await sql.connect({
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      server: process.env.DB_SERVER,
      options: { encrypt: true, trustServerCertificate: true }
    });
    const result = await pool.request().query(query);
    await pool.close();
    return result;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}
