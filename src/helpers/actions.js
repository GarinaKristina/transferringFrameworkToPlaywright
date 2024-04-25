export async function visualSnapshot(page, testName, maybeName) {
  let snapshotTitle = testName;
  if (maybeName) {
    snapshotTitle = snapshotTitle + " - " + maybeName;
  }

  await page.screenshot({
    path: `.src/visualSnapshots/${snapshotTitle}.png`,
    fullPage: true,
  });
}

export async function getBySel(page, selector, ...args) {
  return page.locator(`[data-test=${selector}]`, ...args);
}

export async function getBySelLike(page, selector, ...args) {
  return page.locator(`[data-test*=${selector}]`, ...args);
}

export async function login(page, username, password, { rememberUser = false } = {}) {
  const signinPath = "/signin";

  console.log(`🔐 Authenticating | ${username}`);

  await Promise.all([page.route("**/login", (route) => route.continue()), page.route("**/checkAuth", (route) => route.continue())]);

  const currentPath = await page.evaluate(() => window.location.pathname);
  if (currentPath !== signinPath) {
    await page.goto(signinPath);
  }

  const beforeSnapshot = await page.screenshot();

  await (await getBySel("signin-username")).fill(username);
  await (await getBySel("signin-password")).fill(password);

  if (rememberUser) {
    await page.check('[data-test="signin-remember-me"] input');
  }

  await Promise.all([page.waitForNavigation(), page.click('[data-test="signin-submit"]')]);

  const [loginUser, userProfile] = await Promise.all([
    page.waitForResponse((response) => response.url().includes("/login")),
    page.waitForResponse((response) => response.url().includes("/checkAuth")),
  ]);

  const userId = loginUser.ok() ? await loginUser.json().then((data) => data.user.id) : null;

  const afterSnapshot = await page.screenshot();

  console.log({
    username,
    password,
    rememberUser,
    userId,
  });

  return { beforeSnapshot, afterSnapshot };
}

export async function reactComponent($el) {
  const componentHandle = await $el.evaluateHandle((el) => {
    return window.ReactDOM ? window.ReactDOM.findDOMNode(el) : null;
  });

  if (!componentHandle) {
    throw new Error("Component not found");
  }

  const component = await componentHandle.jsonValue();

  console.log({
    component,
  });

  return component;
}
