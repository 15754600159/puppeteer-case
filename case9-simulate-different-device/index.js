// 未验证

const puppeteer = require('puppeteer');
const iPhone = puppeteer.devices['iPhone 6'];
puppeteer.launch().then(async browser => {
    const page = await browser.newPage();
    await page.emulate(iPhone);
    await page.goto('https://www.google.com');
    await browser.close();
});