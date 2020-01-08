
module.exports = {
    sleep: async (miliseconds) => {
        return new Promise(resolve => setTimeout(resolve, miliseconds));
    },

    stores: {
        'lojacorpoperfeito': {
            priceTag: '.shefp-descount-price',
            notAvailableTag:'.alertMe > span'
        },
        'boasaudesuplementos': {
            priceTag: '.skuDescountPrice',
            notAvailableTag:'.bss-price'
        },
        'corpoidealsuplementos': {
            priceTag: '.instant-price',
            notAvailableTag:'.bt-notifyme'
        }
        // 'netshoes': {
        //     priceTag: '.price__currency',
        // },
        // 'amazon': {
        //     priceTag: '.a-color-price'
        // }
    }
} 

