const axios = require('axios');
const fetch = require("node-fetch");
const cheerio = require('cheerio')

async function getHTML(url) {
    const json = await fetch("https://api.saudifitness.com.br/api/v2/subcategoria/spots/filtro", {"headers":{"accept":"*/*","accept-language":"en-US,en;q=0.9,la;q=0.8","Access-Control-Allow-Origin": "*","Access-Control-Allow-Credentials":"true", "content-type":"application/x-www-form-urlencoded; charset=UTF-8","sec-fetch-mode":"cors","sec-fetch-site":"cross-site"},"referrer":"https://www.lojacorpoperfeito.com.br/bcaa","referrerPolicy":"no-referrer-when-downgrade","body":"idEstrutura=2475&idapp=1&idun=1&netapp=false&pagina=1&filtroscarregados=false&ordenacao=1&hascookie=false","method":"POST","mode":"cors"});
    console.log(json) ;
    return json; 
}

function getProducts(html) {
    const $ = cheerio.load(html);
    console.log($('script[id="sf_template_spot"]').html())       
}

async function main( ) {
    const html = await getHTML("https://www.lojacorpoperfeito.com.br/hipercaloricos-e-massas");
    getProducts(html);
}

main()

