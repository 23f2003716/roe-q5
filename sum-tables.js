// sum-tables.js
const { chromium } = require('playwright');

(async () => {
  const urls = [
    "https://sanand0.github.io/tdsdata/js_table/?seed=16",
    "https://sanand0.github.io/tdsdata/js_table/?seed=17",
    "https://sanand0.github.io/tdsdata/js_table/?seed=18",
    "https://sanand0.github.io/tdsdata/js_table/?seed=19",
    "https://sanand0.github.io/tdsdata/js_table/?seed=20",
    "https://sanand0.github.io/tdsdata/js_table/?seed=21",
    "https://sanand0.github.io/tdsdata/js_table/?seed=22",
    "https://sanand0.github.io/tdsdata/js_table/?seed=23",
    "https://sanand0.github.io/tdsdata/js_table/?seed=24",
    "https://sanand0.github.io/tdsdata/js_table/?seed=25",
  ];

  let totalSum = 0;

  const browser = await chromium.launch();
  const page = await browser.newPage();

  for (const url of urls) {
    await page.goto(url);
    const pageSum = await page.evaluate(() => {
      const tables = Array.from(document.querySelectorAll("table"));
      let sum = 0;

      for (const table of tables) {
        const cells = table.querySelectorAll("td, th");
        for (const cell of cells) {
          const num = parseFloat(cell.innerText.replace(/[^0-9.\-]/g, ""));
          if (!isNaN(num)) sum += num;
        }
      }

      return sum;
    });

    totalSum += pageSum;
  }

  console.log(`TOTAL_SUM: ${totalSum}`);
  await browser.close();
})();
