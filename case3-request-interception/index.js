const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const blockTypes = new Set(['image', 'media', 'font']);
    await page.setRequestInterception(true); //开启请求拦截
    page.on('request', request => {
        const type = request.resourceType();
        const shouldBlock = blockTypes.has(type);
        if (shouldBlock) {
            //直接阻止请求
            console.log(`block ${type} type resource`)
            return request.abort();
        } else {
            //对请求重写
            return request.continue({
                //可以对 url，method，postData，headers 进行覆盖
                headers: Object.assign({}, request.headers(), {
                    'puppeteer-test': 'true'
                })
            });
        }
    });
    await page.goto('https://youdata.163.com');
    await page.close();
    await browser.close();
})();