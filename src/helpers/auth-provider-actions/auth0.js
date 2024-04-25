export async function loginToAuth0(username, password) {
  console.log(`🔐 Authenticating | ${username}`);
  //   const urlBeforeLogin = page.url();

  const beforeSnapshot = await page.screenshot();

  await page.goto("/");

  await page.fill("input#username", username);
  await page.fill("input#password", password);

  await Promise.all([page.waitForNavigation(), page.click("button[value=default]")]);

  expect(page.url()).toBe("http://localhost:3000/");

  const hasAccessToken = await page.evaluate(() => {
    return localStorage.getItem("authState") !== null;
  });

  if (!hasAccessToken) {
    throw new Error("Access token not found in localStorage");
  }

  const afterSnapshot = await page.screenshot();

  return { beforeSnapshot, afterSnapshot };
}
