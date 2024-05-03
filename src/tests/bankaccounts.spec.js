import { test, expect } from "@playwright/test";
import { openHomePage, clickBySel, sleep } from "../helpers/actions";
import { pages } from "./../pageobjects/index.js";
import Page from "@playwright/test";

test.describe("Bank Accounts", () => {
  test("creates a new bank account", async () => {
    await openHomePage();
    await pages.SignInPage.login();

    await clickBySel(pages.HomePage.bankAccounts);
    await clickBySel(pages.HomePage.createButton);
    await sleep();
    // const currentUrl = page.url();
    // console.log("----", currentUrl);
    // await sleep();
    // await expect(page).toHaveURL(currentUrl);
  });
});
