const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.tracing.start({ path: './trace.json' });
    await page.goto('https://www.baidu.com');
    await page.tracing.stop();
    /*
        continue analysis from 'trace.json'
    */
    browser.close();
})();