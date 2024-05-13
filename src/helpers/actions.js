import defineConfig from "./../../playwright.config.js";
const { webkit } = require("playwright");

const url = defineConfig.use.baseURL;
let currentPage;

//work with pages
export async function newPage() {
  const browser = await webkit.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  return page;
}

export async function newPageIfNeeded() {
  if (!currentPage) {
    const browser = await webkit.launch();
    const context = await browser.newContext();
    currentPage = await context.newPage();
  }
  return currentPage;
}

export async function openPage(path = "") {
  const page = await newPageIfNeeded();
  await page.goto(`${url}${path}`);
}

//get elements
export async function getElement(selector) {
  const page = await newPageIfNeeded();
  const locator = page.locator(selector);
  return locator;
}

export async function getBySel(selector) {
  const page = await newPageIfNeeded();
  const locator = page.locator(`[data-test=${selector}]`);
  return locator;
}

//work with input
export async function typeInput(element, value) {
  return await element.fill(value);
}

// click
export async function clickElement(selector) {
  await (await getElement(selector)).click();
}

export async function clickBySel(button) {
  const locator = `[data-test=${button}]`;
  return clickElement(locator);
}

//others
export async function sleep() {
  const page = await newPageIfNeeded();
  await page.pause(1000);
}

export async function clearBlurTypeInput(selector, text) {
  const element = await getElement(selector);
  await typeInput(element, text);
  await element.clear();
  await element.blur();
}

export async function clearBlurInput(selector) {
  const element = await getElement(selector);
  await element.clear();
  await element.blur();
}

export async function blurInput(selector, text) {
  const element = await getElement(selector);
  await typeInput(element, text);
  await element.blur();
}

export async function focusBlurInput(selector) {
  const element = await getElement(selector);
  await element.focus();
  await element.blur();
}
