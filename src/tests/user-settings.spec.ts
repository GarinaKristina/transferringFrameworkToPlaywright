// import seedDatabase from "../configs/config";
// import { test, expect } from "@playwright/test";

// test.describe("User Settings", () => {
// test.beforeEach(async () => {
// Replace this with actual Playwright code to seed the database
// console.log(await seedDatabase());

// // Intercepting network requests
// await page.route("PATCH", "/users/*", (route) => route.continue());
// await page.route("GET", "/notifications*", (route) => route.continue());

// // Replace with your actual login method in Playwright
// const user = await findUserInDatabase();

// if (await isMobile(page)) {
//   await page.click('[data-testid="sidenav-toggle"]');
// }

// await page.click('[data-testid="sidenav-user-settings"]');
// });
//
// test("renders the user settings form", async () => {
//   console.log(await seedDatabase());
//   await page.waitForResponse("GET", "/notifications*");
//   await expect(page.locator('[data-testid="user-settings-form"]')).toBeVisible();
//   await expect(page).toHaveURL(/\/user\/settings/);

//   // Replace visual snapshot with screenshot if necessary
//   await page.screenshot({ path: "User Settings Form.png" });
// });

// test("should display user setting form errors", async ({ page }) => {
//   for (const field of ["first", "last"]) {
//     const inputSelector = `[data-testid="${field}Name-input"]`;
//     await page.fill(inputSelector, "Abc");
//     await page.focus(inputSelector); // Triggers validation by simulating a tab out of the field
//     await page.keyboard.press("Tab");
//     await expect(page.locator(`#${field}Name-input-helper-text`)).toBeVisible();
//     await expect(page.locator(`#${field}Name-input-helper-text`)).toContainText(`Enter a ${field} name`);
//   }

//   // Similar process for other fields
//   await checkField(page, "email", "Enter an email address", "Must contain a valid email address");
//   await checkField(page, "phoneNumber", "Enter a phone number", "Phone number is not valid");

//   await expect(page.locator('[data-testid="submit"]')).toBeDisabled();
//   await page.screenshot({ path: "User Settings Form Errors and Submit Disabled.png" });
// });

// test("updates first name, last name, email and phone number", async ({ page }) => {
//   await page.fill('[data-testid="firstName"]', "New First Name");
//   await page.fill('[data-testid="lastName"]', "New Last Name");
//   await page.fill('[data-testid="email"]', "email@email.com");
//   await page.fill('[data-testid="phoneNumber-input"]', "6155551212");
//   await page.keyboard.press("Tab"); // Triggers validation

//   await expect(page.locator('[data-testid="submit"]')).not.toBeDisabled();
//   await page.click('[data-testid="submit"]');

//   await page.waitForResponse("PATCH", "/users/*");
//   if (await isMobile(page)) {
//     await page.click('[data-testid="sidenav-toggle"]');
//   }
//   await expect(page.locator('[data-testid="sidenav-user-full-name"]')).toContainText("New First Name");
//   await page.screenshot({ path: "User Settings Update Profile.png" });
// });
// });

// async function checkField(page, field, emptyError, invalidError) {
//   const inputSelector = `[data-testid="${field}-input"]`;
//   await page.fill(inputSelector, "abc");
//   await page.focus(inputSelector);
//   await page.keyboard.press("Tab");
//   await expect(page.locator(`#${field}-input-helper-text`)).toBeVisible();
//   await expect(page.locator(`#${field}-input-helper-text`)).toContainText(emptyError);

//   await page.fill(inputSelector, "abc@bob.");
//   await page.keyboard.press("Tab");
//   await expect(page.locator(`#${field}-input-helper-text`)).toContainText(invalidError);
// }
