import defineConfig from "./../../playwright.config.js";

const { webkit } = require("playwright");

const url = defineConfig.use.baseURL;
let currentPage;

export async function newPage() {
  const browser = await webkit.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  return page;
}

async function newPageIfNeeded() {
  if (!currentPage) {
    const browser = await webkit.launch();
    const context = await browser.newContext();
    currentPage = await context.newPage();
  }
  return currentPage;
}

export async function openHomePage() {
  const page = await newPageIfNeeded();
  await page.goto(url);
}

export async function getElement(selector) {
  const page = await newPageIfNeeded();
  await page.pause(1000);
  console.log("--------------", page.locator(selector));
  return page.locator(selector);
}

// export async function getBySel(page, selector, ...args) {
//   return page.locator(`[data-test=${selector}]`, ...args);
// }

// export async function getBySelLike(page, selector, ...args) {
//   return page.locator(`[data-test*=${selector}]`, ...args);
// }

export async function typeInput(element, value) {
  return await element.fill(value);
}
