import { expect } from "@playwright/test";
import { newPageIfNeeded, getElement } from "./actions";

export async function expectPageHaveUrl() {
  const page = await newPageIfNeeded();
  const currentUrl = page.url();
  await expect(page).toHaveURL(currentUrl);
}

export async function elementContain(selector, text) {
  const page = await newPageIfNeeded();

  const hasText = await page.$$eval(
    selector,
    (elements, text) => {
      for (const element of elements) {
        if (element.textContent.includes(text)) {
          return true;
        }
      }
      return false;
    },
    text
  );

  if (!hasText) {
    throw new Error(`Text '${text}' not found in any element with selector '${selector}'.`);
  }
}

export async function expectToBeVisibleAndTextContain(selector, text) {
  const element = await getElement(selector);
  await expect(element).toBeVisible();
  await expect(element).toContainText(text);
}

export async function expectNoteVisible(selector) {
  const element = await getElement(selector);
  await expect(element).not.toBeVisible();
}
