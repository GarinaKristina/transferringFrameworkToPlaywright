import { test } from "@playwright/test";
import { openHomePage, clickBySel } from "../helpers/actions";
import { expectPageHaveUrl } from "../helpers/expectations";

import { pages } from "./../pageobjects/index";

test.describe("Bank Accounts", () => {
  test("creates a new bank account", async () => {
    await openHomePage();
    await pages.SignInPage.login();

    await clickBySel(pages.HomePage.bankAccounts);
    await clickBySel(pages.HomePage.createButton);

    await expectPageHaveUrl();
  });
});
