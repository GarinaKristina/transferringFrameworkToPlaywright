import defineConfig from "../../../playwright.config";
import { setSeedDatabase, filterDatabase } from "../../helpers/config";
import { test, expect } from "@playwright/test";

const baseUrl = defineConfig.use.baseURL;
const apiUsers = `${baseUrl}/users`;

test.describe("Users API", async () => {
  test.beforeAll(async ({ request }) => {
    const response = await request.get(apiUsers);
    console.log("before all response--------", response);
  });

  test.beforeEach(async ({ context }) => {
    await setSeedDatabase();

    const users = await filterDatabase({ table: "users", attrs: {} });
    context.authenticatedUser = users[0];
    context.searchUser = users[1];
  });

  test("example test", async ({ page, context }) => {
    console.log(context.authenticatedUser);
    console.log(context.searchUser);
  });
});
