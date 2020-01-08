const Helpers = require('./helpers')
const puppeteer = require('puppeteer');

prods = [
    { link: 'http://bit.ly/2QuGKMC', price: '281' },
    { link: 'http://bit.ly/37TXvH5', price: '94' },
    { link: 'http://bit.ly/34APyEA', price: '122' },
    { link: 'http://bit.ly/2tzwfhY', price: '104' },
    { link: 'http://bit.ly/39Tb9vQ', price: '61' },
    { link: 'http://bit.ly/2MXWcPj', price: '41' },
    { link: 'http://bit.ly/2MXWcPj', price: '153' },
    { link: 'http://bit.ly/2F6argk', price: '93' },
    { link: 'http://bit.ly/35hHmta', price: '79' },
    { link: 'http://bit.ly/2sBmjVh', price: '58' },
    { link: 'http://bit.ly/2ZLZxpP', price: '97' },
    { link: 'http://bit.ly/37y8wO0', price: '99' },
    { link: 'http://bit.ly/2SOliUg', price: '59' },
    { link: 'http://bit.ly/2Ei7oBh', price: '143' },
    { link: 'http://bit.ly/2Fb8teL', price: '210' },
    { link: 'http://bit.ly/3582EJK', price: '76' },
    { link: 'http://bit.ly/2yO8gLf', price: '135' },
    { link: 'http://bit.ly/368Wx96', price: '37' },
    { link: 'http://bit.ly/368Wx96', price: '133' },
    { link: 'http://bit.ly/34XZZ53', price: '83' },
    { link: 'http://bit.ly/36JuqNX', price: '177' },
    { link: 'http://bit.ly/2ZubbFr', price: '122' },
    { link: 'http://bit.ly/2F7XAdT', price: '53' },
    { link: 'http://bit.ly/2QmKDC4', price: '55' },
    { link: 'http://bit.ly/2SrNQmr', price: '24' },
    { link: 'http://bit.ly/2SrSpgu', price: '140' },
    { link: 'http://bit.ly/2EM2xZD', price: '86' },
    { link: 'http://bit.ly/2Qdmeyz', price: '79' },
    { link: 'http://bit.ly/2EGNpwy', price: '94' },
    { link: 'http://bit.ly/3978HRN', price: '87' },
    { link: 'http://bit.ly/2ENYiwl', price: '39' },
    { link: 'http://bit.ly/391on9d', price: '295' },
    { link: 'http://bit.ly/2OWNIt0', price: '99' },
    { link: 'http://bit.ly/2S7MLjr', price: '97' },
    { link: 'http://bit.ly/2tzb5Rj', price: '98' },
    { link: 'https://amzn.to/2PXhT2D', price: '128' },
    { link: 'http://bit.ly/2toJlOY', price: '84' },
    { link: 'http://bit.ly/34dEux0', price: '47' },
    { link: 'http://bit.ly/2Z1hfFs', price: '74' },
    { link: 'http://bit.ly/2S9o9XR', price: '65' },
    { link: 'http://bit.ly/2En2fbn', price: '225' },
    { link: 'http://bit.ly/2kigcAS', price: 'not found on title' },
    { link: 'http://bit.ly/36utc91', price: '42' },
    { link: 'http://bit.ly/36swidF', price: '103' },
    { link: 'http://bit.ly/2PaAnNG', price: '33' },
    { link: 'http://bit.ly/2RoAGX0', price: '22' },
    { link: 'http://bit.ly/2LH4WIQ', price: '129' },
    { link: 'http://bit.ly/2slVV11', price: '35' },
    { link: 'http://bit.ly/2R62Gy8', price: '65' },
    { link: 'https://amzn.to/2qrFzTV', price: '203' },
    { link: 'http://bit.ly/2KvFoO9', price: '23' },
    { link: 'http://bit.ly/34S0kXC', price: '38' }
]

async function checkDiscount(prod, page) {
    const website = page.url().match(/(?<=www.)(.*)(?=\.com)/)[0];
    const webpagePriceTag = Helpers.stores[website].priceTag;
    if(webpagePriceTag) {
        await page.waitForSelector(webpagePriceTag);
        const currentPrice = await page.evaluate((webpagePriceTag) => document.querySelector(webpagePriceTag).innerText.replace(/[^0-9]/g, ''), webpagePriceTag);
        console.log(Math.floor(currentPrice/100) == prod.price);
    }
    return; 
}

async function visitPages(prods, page) {
    for (var i = 0; i < prods.length; i++) {
        await page.goto(prods[i].link);
        await Helpers.sleep(2000);
        prods[i].discount = await checkDiscount(prods[i], page);
    }
}

async function discountCheck(prods) {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1');
    const checkedProds = await visitPages(prods, page);
    console.log(checkedProds);
    await browser.close();
    return;
}

discountCheck(prods);