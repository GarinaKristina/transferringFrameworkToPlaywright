import { test, expect } from "@playwright/test";
import { openHomePage } from "../helpers/actions";
import SignInPage from "./../pageobjects/signInPage";

test.describe("Bank Accounts", () => {
  test("creates a new bank account", async ({ page }) => {
    await openHomePage();
    await SignInPage.login();
  });
});
