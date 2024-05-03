import { expect } from "@playwright/test";
import { newPageIfNeeded } from "./actions";

export async function expectPageHaveUrl() {
  const page = await newPageIfNeeded();
  const currentUrl = page.url();
  await expect(page).toHaveURL(currentUrl);
}
