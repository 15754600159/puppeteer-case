// 未验证

let page = await browser.newPage();
await page.goto(url);
let btn = await page.waitForSelector('#btn');
//在点击按钮之前，事先定义一个 Promise，用于返回新 tab 的 Page 对象
const newPagePromise = new Promise(res =>
    browser.once('targetcreated',
        target => res(target.page())
    )
);
await btn.click();
//点击按钮后，等待新tab对象
let newPage = await newPagePromise;