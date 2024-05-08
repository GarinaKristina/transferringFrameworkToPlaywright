import { test } from "@playwright/test";

import { openPage, clickBySel } from "../helpers/actions";
import { expectPageHaveUrl, elementContain } from "../helpers/expectations";

import { page } from "./../pageobjects/index";
import { bankName } from "./../data/constants";

test.describe("Bank Accounts", () => {
  test("creates a new bank account", async () => {
    await openPage();
    await page.SignInPage.login();

    await clickBySel(page.HomePage.bankAccounts);
    await clickBySel(page.HomePage.createButton);

    await expectPageHaveUrl();
    await page.CreateBankAccountPage.createNewAccount();
    await elementContain(page.HomePage.bankAccountsField, bankName);
  });

  test("should display bank account form errors", async () => {
    await openPage("/bankaccounts");
  });
});
