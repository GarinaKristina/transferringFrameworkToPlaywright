import { test, expect } from "@playwright/test";
import { openHomePage, clickBySel, newPageIfNeeded } from "../helpers/actions";
import { pages } from "./../pageobjects/index.js";

test.describe("Bank Accounts", () => {
  test("creates a new bank account", async () => {
    await openHomePage();
    await pages.SignInPage.login();

    await clickBySel(pages.HomePage.bankAccounts);
    await clickBySel(pages.HomePage.createButton);

    const page = await newPageIfNeeded();
    const currentUrl = page.url();
    await expect(page).toHaveURL(currentUrl);
  });
});
