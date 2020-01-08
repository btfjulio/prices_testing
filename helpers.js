
module.exports = {
    sleep: async (miliseconds) => {
        return new Promise(resolve => setTimeout(resolve, miliseconds));
    },

    stores: {
        'lojacorpoperfeito': {
            priceTag: '.shefp-descount-price',
        },
        'boasaudesuplementos': {
            priceTag: '.skuDescountPrice',
        },
        'corpoidealsuplementos': {
            priceTag: '.instant-price',
        },
        'netshoes': {
            priceTag: '.price__currency',
        }
    }
} 
