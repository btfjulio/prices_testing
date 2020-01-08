const puppeteer = require('puppeteer');


async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;
                if(totalHeight >= scrollHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}


async function sleep(miliseconds) {
    return new Promise(resolve => setTimeout(resolve, miliseconds));
}

async function scrapeIndexProducts(page, url) {
    await page.goto(url);
    await page.waitForSelector('.table-cell');
    await autoScroll(page);   
    const linksToCheck = await page.evaluate(() => {
        const results = [];
        document.querySelectorAll('.table-cell')
            .forEach((product) => {
                const url = product.querySelector('a').href;
                results.push(url);
            });
        return results;
    })  
    return linksToCheck; 
}

async function scrapeProductsDesc(linksToCheck, page) {
    const products = [];
    for (var i = 0; i < linksToCheck.length; i++) {
        await page.goto(linksToCheck[i]);
        await page.waitForSelector('h1');
        const price = await page.evaluate(() => {
            let price = document.querySelectorAll('h1')[1].innerText.match(/\$([0-9\.]+)\b/g);
            if (price) {
                price = price[0].replace(/[^0-9]/g, ''); 
            } else {
                price = 'not found on title';
            }
            return price
        });
        const link = await page.evaluate(() => document.querySelectorAll('a')[7].href) 
        products.push({link, price});
    };
    console.log(products);
}

async function main() {
    const url = "https://app.savewhey.com.br/"
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1');
    const linksToCheck = await scrapeIndexProducts(page, url);
    const productsToTest = await scrapeProductsDesc(
            linksToCheck,
            page
         );
    await browser.close();
    return;
}


main()