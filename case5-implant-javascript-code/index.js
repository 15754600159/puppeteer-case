const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        slowMo: 100, // 放慢速度
        headless: false, // 显示ui
        defaultViewport: { width: 1440, height: 780 },
        ignoreHTTPSErrors: false, //忽略 https 报错
        args: ['--start-fullscreen'] //全屏打开页面
    });
    const page = await browser.newPage();
    await page.goto('https://www.baidu.com/');
    //注册一个 Node.js 函数，在浏览器里运行
    await page.exposeFunction('md5', text =>
        crypto.createHash('md5').update(text).digest('hex')
    );
    //通过 page.evaluate 在浏览器里执行JavaScript代码
    await page.evaluate(async () => {
        // my code
        alert('111111');
        //在页面中调用 Node.js 环境中的函数
        const myHash = await window.md5('PUPPETEER');
        console.log(`md5 of ${myString} is ${myHash}`);
    });
    await page.close();
    await browser.close();
})();