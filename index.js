const puppeteer = require('puppeteer');
const cheerio = require('cheerio');


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
    const response = await page.goto(url);
    const headers = response.headers();
    console.log(headers);
    await page.waitForSelector('.table-cell');
    await autoScroll(page);   
    sleep(5000);
    const  html = await page.evaluate(()=> document.body.innerHTML);
    const results = await page.evaluate(()=> document.querySelectorAll('.table-cell'));
    console.log(results);
    const prods = results.map((product) => {
            const url = product.querySelector('a').attr('href');
            return { url }
        });
    // const productsDesc = await scrapeProductsDesc(
    //     products,
    //     pagehttps://app.savewhey.com.br/
    //   );
    // return productsDesc    
    return prods; 
}


async function main() {
    // await connectToMongoDb();
    const url = "https://app.savewhey.com.br/"
    const browser = await puppeteer.launch({
        headless: false
        // args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1');
    // await page.setViewport({ width: 1920, height: 926 });
    const products = await scrapeIndexProducts(page, url);
    // console.log(products);
    console.log('End of puppeteer');
    // await browser.close();
    return;
}


main()