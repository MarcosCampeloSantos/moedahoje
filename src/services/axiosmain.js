import {httpsCoin} from './config.js'

export default{
    PriceBNB: async () => {
        try {
            const response = await httpsCoin.get('simple/price?ids=binancecoin&vs_currencies=usd',
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

    HistoryBNB: async () => {
        try {
            const response = await httpsCoin.get('coins/binancecoin/contract/BNB/market_chart/?vs_currency=usd&days=30',
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