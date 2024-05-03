import { test } from "@playwright/test";
import { openHomePage, clickBySel } from "../helpers/actions";
import { expectPageHaveUrl } from "../helpers/expectations";
import { page } from "./../pageobjects/index";

test.describe("Bank Accounts", () => {
  test("creates a new bank account", async () => {
    await openHomePage();
    await page.SignInPage.login();

    await clickBySel(page.HomePage.bankAccounts);
    await clickBySel(page.HomePage.createButton);

    await expectPageHaveUrl();
    await page.CreateBankAccountPage.createNewAccount();
  });
});
