import { test } from "@playwright/test";

import {
  openPage,
  clickBySel,
  typeInput,
  clearBlurTypeInput,
  clearBlurInput,
  blurInput,
  focusBlurInput,
  sleep,
  clearInput,
} from "../helpers/actions";
import { expectPageHaveUrl, elementContain, expectToBeVisibleAndTextContain, expectNoteVisible } from "../helpers/expectations";

import { page } from "./../pageobjects/index";
import { bankName } from "./../data/constants";

test.describe("Bank Accounts", () => {
  // test("creates a new bank account", async () => {
  //   await openPage();
  //   await page.SignInPage.login();

  //   await clickBySel(page.HomePage.bankAccounts);
  //   await clickBySel(page.HomePage.createButton);

  //   await expectPageHaveUrl();
  //   await page.CreateBankAccountPage.createNewAccount();
  //   await elementContain(page.HomePage.bankAccountsField, bankName);
  // });

  test("should display bank account form errors", async () => {
    await openPage("/bankaccounts");
    await page.SignInPage.login();

    await clickBySel(page.HomePage.bankAccounts);
    await clickBySel(page.HomePage.createButton);

    await clearBlurTypeInput(page.CreateBankAccountPage.bankNameInput, "The");
    await expectToBeVisibleAndTextContain(page.CreateBankAccountPage.warningText, "Enter a bank name");

    await blurInput(page.CreateBankAccountPage.bankNameInput, "The");
    await expectToBeVisibleAndTextContain(page.CreateBankAccountPage.warningText, "Must contain at least 5 characters");
    await clearInput(page.CreateBankAccountPage.bankNameInput);
    // await sleep();

    await clearBlurInput(page.CreateBankAccountPage.routingNumberInput);
    await expectToBeVisibleAndTextContain(page.CreateBankAccountPage.warningRoutingText, "Enter a valid bank routing number");

    await blurInput(page.CreateBankAccountPage.routingNumberInput, "12345678");
    await expectToBeVisibleAndTextContain(page.CreateBankAccountPage.warningRoutingText, "Must contain a valid routing number");
    await clearBlurInput(page.CreateBankAccountPage.routingNumberInput);

    await blurInput(page.CreateBankAccountPage.routingNumberInput, "123456789");
    await expectNoteVisible(page.CreateBankAccountPage.warningRoutingText);

    // await sleep();

    await focusBlurInput(page.CreateBankAccountPage.accountNumberInput);
    await expectToBeVisibleAndTextContain(page.CreateBankAccountPage.warningAccountText, "Enter a valid bank account number");

    await blurInput(page.CreateBankAccountPage.accountNumberInput, "12345678");
    await expectToBeVisibleAndTextContain(page.CreateBankAccountPage.warningAccountText, "Must contain at least 9 digits");
    await clearInput(page.CreateBankAccountPage.accountNumberInput);

    await blurInput(page.CreateBankAccountPage.accountNumberInput, "123456789");
    await expectNoteVisible(page.CreateBankAccountPage.warningAccountText);
    await clearInput(page.CreateBankAccountPage.accountNumberInput);

    await blurInput(page.CreateBankAccountPage.accountNumberInput, "123456789111");
    await expectNoteVisible(page.CreateBankAccountPage.warningAccountText);
    await clearInput(page.CreateBankAccountPage.accountNumberInput);
  });
});
