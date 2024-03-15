<template>
    <div class="d-flex principal">
        <div class="lateral1">
            teste
        </div>
        <div class="meio w-100 d-flex flex-column">
            <div class="conversor d-flex flex-column justify-content-center">
                <div class="icone mb-4">
                    <img src="../storage/bitcoin.png" width="200" alt="">
                </div>
                <div class="dados d-flex justify-content-center">
                    <span class="d-flex container-input">
                        <span class="simbolo mx-2">QTD</span>
                        <input 
                            class="input-val px-2 text-end" 
                            v-model="quantidade"
                            @focusout="FocusOut"
                        >
                    </span>
                    <span style="font-size: 15px;" class="igualdade mx-2 align-self-center">igual á</span>
                    <span class="d-flex container-input">
                        <span class="simbolo mx-2">R$</span>
                        <input 
                            disabled
                            class="input-val px-2 text-end" 
                            v-model="valorBTC"
                        >
                    </span>
                </div>
            </div>
            <div class="text-start">
                <h2 >Preço médio do BTC nos últimos 30 dias</h2>
                <GChart 
                    class="grafico"
                    type="LineChart"
                    :data="chartData"
                    :options="chartOptions"
                />
                <h3>Valor do BTC agora</h3>
                <p>
                    O valor do BTC hoje está R${{valorBTC}}.<br>
                    O valor do BTC aqui é atualizada para que você fique informado sobre o valor do BTC.<br>
                    <br>
                    O valor do BTC hoje é somente para informação.
                </p>
                <h3>Informaçoes sobre o BTC</h3>
                <p>
                    Bitcoin (BTC) é uma moeda digital criada em 2009. <br>
                    Ela é gerada por um processo chamado “mineração” e <br>
                    todas as transações são registradas em um banco de <br>
                    dados online chamado “blockchain”. 
                </p>
                <p> O valor do Bitcoin é determinado pelo mercado. <br>
                    Ele é conhecido por seu uso anônimo <br>
                    e pode ser usado para uma variedade de propósitos, <br>
                    incluindo investimentos e compras online.<br>
                </p>
            </div>
        </div>
        <div class="lateral2">
            teste
        </div>
    </div>
</template>

<script>

import { GChart } from 'vue-google-charts'
import Axios from '../services/axiosmain'

export default {
    name: 'bitcoinHoje',
    data(){
        return {
            valorBTC: 1,
            quantidade: 1,
            hover: 'false',

            chartData: ([
                ['Year', 'BTC'],
                // Treat first row as data as well.
            ]),
            
            chartOptions: {
                backgroundColor: 'rgb(236, 236, 236)',
                chart: {
                    title: 'Company Performance',
                    subtitle: 'Sales, Expenses, and Profit: 2014-2017',
                }
            },
            mediaarray: ([]),
            focus: false
        }
    },

    mounted(){
        this.priceBTC()
        // this.historyBTC()
    },

    components: {
        GChart
    },

    methods:{
        priceBTC(){
            Axios.priceBTC()
            .then(respost =>{
                console.log(respost)
                this.valorBTCoriginal = respost.bitcoin.brl
                this.valorBTC = (this.valorBTCoriginal * this.quantidade).toLocaleString('pt-br', {minimumFractionDigits: 2})
            })
        },

        historyBTC(){
            Axios.HistoryBTC()
            .then(respost =>{
                var old = null;

                var valores = [];
                var dados = [];
                var media = 0;
                for (let i = 0; i < respost.prices.length; i++) {
                    if(old == null){
                        valores.push(respost.prices[i][1])
                    }else if(old == new Date(respost.prices[i][0]).getDate() + "/" + (new Date(respost.prices[i][0]).getMonth() + 1)+ "/" + new Date(respost.prices[i][0]).getFullYear()){
                        valores.push(respost.prices[i][1])
                    }else{
                        for (let i = 0; i < valores.length; i++) {
                           media = media + valores[i]
                        }
                        
                        dados.push([old, media / valores.length])


                        valores = []
                        media = 0
                    }
                    
                    old = new Date(respost.prices[i][0]).getDate() + "/" + (new Date(respost.prices[i][0]).getMonth() + 1)+ "/" + new Date(respost.prices[i][0]).getFullYear()

                }

                for (let i = 0; i < dados.length; i++) {
                    this.chartData.push([dados[i][0], dados[i][1]])
                }


                
            })
        },

        FocusOut(){
            if(this.quantidade == ''){
                this.quantidade = 1
            }
        }
    },

    computed:{
        
    },

    watch:{
        quantidade: function() {
            this.valorBTC = (this.valorBTCoriginal * this.quantidade).toLocaleString('pt-br', {minimumFractionDigits: 2})
        }
    }
}
</script>

<style lang="scss" scoped>
    @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@800&display=swap');

    *{
        font-family: 'JetBrains Mono';
        color: rgb(70, 70, 70);
        background-color: rgb(236, 236, 236);
    }

    .principal {
        .meio{
            .conversor{
                font-size: 50px;
                height: 100vh;
                .dados{
                    .input-val{
                        border: none;
                        display: flex;
                        width: 360px;
                        border-radius: 10px;
                        background: none;
                        transition: all 800ms ease;
                    }

                    .container-input{
                        background-color: rgb(238, 238, 209);
                        border-radius: 10px;
                    }

                    .igualdade{
                        background: none;
                    }

                    span{
                        background-color: rgb(238, 238, 209);
                    }

                    .input-val:focus-visible{
                        outline: none;
                    }
                }

                .dados:focus-within{
                    .container-input{
                        background-color: rgb(197, 197, 171);
                    }

                    .input-val{
                        width: 430px;
                        transition: all 800ms ease;
                    }

                    span{
                        background: none;
                    }
                }

                .dados:hover{
                    .container-input{
                        background-color: rgb(197, 197, 171);
                    }

                    .input-val{
                        width: 430px;
                        transition: all 800ms ease;
                    }

                    span{
                        background: none;
                    }
                }
            }
        }
    }

</style>