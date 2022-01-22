import {httpsCoin} from './config.js'

export default{
    Teste: async () => {
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
}