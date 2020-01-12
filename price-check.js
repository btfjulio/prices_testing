const {stores, sleep} = require('./helpers')
const puppeteer = require('puppeteer');

async function checkDiscount(prod, page, website) {
    const { priceTag } = stores[website];
    if(priceTag) {
        const currentPrice = await page.evaluate((priceTag) => {
            let price = document.querySelector(priceTag);
            return price ? price.innerText.replace(/[^0-9]/g, '') : null 
        }, priceTag)
        console.log(Math.floor(currentPrice/100), prod.price)
        return currentPrice ? Math.floor(currentPrice/100) > prod.price : 'no price found';
    }
    return 'no price found'
}

async function checkAvailability(page, website) {
    const { notAvailableTag } = stores[website];
    if(notAvailableTag) {
        const currentAvailability = await page.evaluate((notAvailableTag) => {
            let availability = document.querySelector(notAvailableTag.class); 
            return availability ? availability.innerText ===  notAvailableTag.text : null 
        }, notAvailableTag)
        return currentAvailability ? 'not available' : 'available';
    }
    return 'availability no found'
}


async function discountCheck(prods, page) {
    for (let prod of prods) {
        await page.goto(prod.link);
        await sleep(5000);
        const website = page.url().match(/(?<=(www|m).)(.*)(?=\.com)/)[0];
        prod.discount = await checkDiscount(prod, page, website);
        prod.availability = await checkAvailability(page, website);
        console.log(prod)
    }
    return prods
}

module.exports = discountCheck