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
