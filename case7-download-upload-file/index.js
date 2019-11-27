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
        page.waitForNavigation({
            timeout: 30 * 1000,
            waitUntil: ['networkidle0']
        })
    ]);
    console.log('admin 登录成功');

    // 点击头部导航
    let headerNavElement = await page.$('#app > div > div.top-nav > div.top-menu > div:nth-child(6)');
    await headerNavElement.click();

    // 点击left导航
    let leftNavElement = await page.$('#app > div > div.left-nav > div.left-nav-list > div > div.el-scrollbar__wrap.el-scrollbar__wrap--hidden-default > div > ul > li:nth-child(4)');
    await leftNavElement.click();

    // 点击创建课程
    let addCourseButtonElement = await page.waitForSelector('#app > div > div.education-container.fold-in > div > div > div.page-content > div.select-bar > button.el-button.el-button--primary.create-course-btn');
    await addCourseButtonElement.click();



    //通过 CDP 会话设置下载路径
    const cdp = await page.target().createCDPSession();
    await cdp.send('Page.setDownloadBehavior', {
        behavior: 'allow', //允许所有下载请求
        downloadPath: './'  //设置下载路径
    });
    //点击按钮触发下载
    await (await page.waitForSelector('#app > div > div.education-container.fold-in > div > div > div.page-content > div.add-box-header > button')).click();
    //等待文件出现，轮训判断文件是否出现  有bug
    // await Page.waitForFile('./试题标准模板.xlsx');

    // //上传时对应的 inputElement 必须是<input>元素
    // let inputElement = await page.waitForXPath('//input[@type="file"]');
    // await inputElement.uploadFile('/path/to/file');

    await page.waitFor(2000);

    await page.close();
    browser.close();
})();