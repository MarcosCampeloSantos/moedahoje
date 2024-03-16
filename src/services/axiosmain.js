import {httpsCoin} from './config.js'

export default{
    priceBTC: async () => {
        try {
            const response = await httpsCoin.get('simple/price?ids=bitcoin&vs_currencies=brl',
                {
                    headers: {
                        'accept': 'application/json',
                    }
                });
            return response.data;
        } catch (erro) {
            if (erro.response) {
                return erro.response.data;
            }
        }
    },

    historyBTC: async () => {
        try {
            const response = await httpsCoin.get('coins/bitcoin/market_chart?vs_currency=brl&days=30&interval=daily&precision=2',
                {
                    headers: {
                        'accept': 'application/json',
                    }
                });
            return response.data;
        } catch (erro) {
            if (erro.response) {
                return erro.response.data;
            }
        }
    },
}