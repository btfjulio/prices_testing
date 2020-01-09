
module.exports = {
    sleep: async (miliseconds) => {
        return new Promise(resolve => setTimeout(resolve, miliseconds));
    },

    stores: {
        'lojacorpoperfeito': {
            priceTag: '.shefp-descount-price',
            notAvailableTag: {
                class: '.alertMe > span',
                text: 'Avise-me quando estiver disponível'
            }
        },
        'boasaudesuplementos': {
            priceTag: '.skuDescountPrice',
            notAvailableTag: {
                class: '.bss-price',
                text: 'Produto indisponível'
            }
        },
        'corpoidealsuplementos': {
            priceTag: '.instant-price',
            notAvailableTag: {
                class: '.bt-notifyme',
                text: 'AVISE-ME QUANDO CHEGAR'
            }
        },
        'netshoes': {
            priceTag: '.price__currency',
            notAvailableTag: {
            class: '.tell-me-button-wrapper > .title',
            text: 'Produto indisponível'
        }
        //     notAvailableTag: Produto indisponível 'text-not-avaliable'
        },
        'amazon': {
            priceTag: '.a-color-price'
        }
    }
} 

