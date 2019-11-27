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
    await page.goto('http://119.xianguoke.com.cn/#/login');
    //输入账号密码
    const uniqueIdElement = await page.$('#app > div > div > form > div.el-form-item.el-form-item--feedback.is-required > div > div > input');
    await uniqueIdElement.type('13311532562', { delay: 20 });
    const passwordElement = await page.$('#app > div > div > form > div:nth-child(2) > div > div > input', { delay: 20 });
    await passwordElement.type('a123456');
    //点击确定按钮进行登录
    let okButtonElement = await page.$('#app > div > div > form > div.el-form-item.login-btn-item.el-form-item--feedback > div > button');
    //等待页面跳转完成，一般点击某个按钮需要跳转时，都需要等待 page.waitForNavigation() 执行完毕才表示跳转成功
    await Promise.all([
        okButtonElement.click(),
        page.waitForNavigation()
    ]);
    console.log('admin 登录成功');
    await page.close();
    await browser.close();
})();