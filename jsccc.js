const axios = require('axios');
const fetch = require("node-fetch");
const cheerio = require('cheerio')

async function getHTML(url) {
    const html = await fetch("https://www.netshoes.com.br/whey-protein-100-super-pure-907-g-body-size-refil-integralmedica-baunilha-252-7170-799");
    return html; 
}

function getProducts(html) {
    const $ = cheerio.load(html);
    console.log($('script[text/javascript]').html())       
}

async function main( ) {
    const html = await getHTML("https://www.lojacorpoperfeito.com.br/hipercaloricos-e-massas");
    getProducts(html);
}

main()
