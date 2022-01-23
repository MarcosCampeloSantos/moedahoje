<template>
    <div>
        <div id="cotacao" class="justify-content-center">
            <div class="mx-auto container position-absolute top-50 start-50 translate-middle">
                <div class="mx-auto tamanho mb-5 row justify-content-center">
                    <img id="icone" src="../storage/bnb.png" alt="">
                </div>
                <div id="tamanho" class=" row mx-auto">
                    <div  id="sombra" class="col justify-content-center">
                        <div class="sombra row">
                            <span id="cifrao" class="col-4 text-center">QTD:</span>
                            
                            <input
                            autocomplete="off"
                            @mouseover="mouseOver"
                            @focusin="FocusIn"
                            @focusout="FocusOut"
                            type="number"
                            v-model="quantidade"
                            id="btn-quantidade"
                            class="col ms-4 text-center"
                            >

                        </div>
                    </div>

                    <div class="m-auto col-2">
                        <h3 id="vale" class="m-auto">Vale</h3>
                    </div>
                    
                    <div id="sombra2" class="col">
                        <div  class="row justify-content-center">
                            <span id="cifrao" class="col-4 text-center">US$:</span>

                            <input 
                            @mouseover="mouseOver"
                            @focusin="FocusIn"
                            @focusout="FocusOut"
                            id="btn-valor" class="m-2 align-middle col m-auto" 
                            placeholder="0,00"
                            v-model="ValorBnb"
                            >
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-100">
            <h1>Gráfico do BNB nos últimos 30 dias</h1>
            <GChart 
                class="mx-auto"
                style="width: 40%"
                type="LineChart"
                :data="chartData"
                :options="chartOptions"
            />
        </div>
    </div>
</template>

<script>

import { GChart } from 'vue-google-charts'
import Axios from '../services/axiosmain'

export default {
    name: 'DracoHoje',
    data(){
        return {
            valorBnb: '',
            quantidade: 1,
            hover: 'false',

            chartData: ([
                ['Year', 'BNB'],
                // Treat first row as data as well.
            ]),
            
            chartOptions: {
                chart: {
                title: 'Company Performance',
                subtitle: 'Sales, Expenses, and Profit: 2014-2017',
                }
            },
            mediaarray: ([])
        }
    },

    mounted(){
        this.priceBNB()
        this.historyBNB()
    },

    components: {
        GChart
    },

    methods:{
        priceBNB(){
            Axios.PriceBNB()
            .then(respost =>{
                console.log(respost)
                this.valorBnb = respost.binancecoin.usd
            })
        },

        historyBNB(){
            Axios.HistoryBNB()
            .then(respost =>{
                var old = null;

                var valores = [];
                var teste = [];
                var media = 0;
                for (let i = 0; i < respost.prices.length; i++) {
                    if(old == null){
                        valores.push(respost.prices[i][1])
                    }else if(old == new Date(respost.prices[i][0]).getDate() + "/" + new Date(respost.prices[i][0]).getMonth()+ "/" + new Date(respost.prices[i][0]).getFullYear()){
                        valores.push(respost.prices[i][1])
                    }else{
                        for (let i = 0; i < valores.length; i++) {
                           media = media + valores[i]
                        }
                        
                        teste.push([old, media / valores.length])


                        valores = []
                        media = 0
                    }
                    
                    old = new Date(respost.prices[i][0]).getDate() + "/" + new Date(respost.prices[i][0]).getMonth()+ "/" + new Date(respost.prices[i][0]).getFullYear()

                }

                for (let i = 0; i < teste.length; i++) {
                    this.chartData.push([teste[i][0], teste[i][1]])
                }

                console.log(teste)

                
            })
        },

        mouseOver(){
            document.getElementById("sombra").style.backgroundColor = 'rgba(243, 247, 52, 0.267)';
            document.getElementById("sombra").style.borderRadius = '1rem';
            document.getElementById("sombra2").style.backgroundColor = 'rgba(243, 247, 52, 0.267)';
            document.getElementById("sombra2").style.borderRadius = '1rem';
        },

        FocusIn(){
            document.getElementById("sombra").style.backgroundColor = 'rgba(243, 247, 52, 0.267)';
            document.getElementById("sombra").style.borderRadius = '1rem';
            document.getElementById("sombra2").style.backgroundColor = 'rgba(243, 247, 52, 0.267)';
            document.getElementById("sombra2").style.borderRadius = '1rem';
            document.getElementById("tamanho").style.width = '100%';
        },

        FocusOut(){
            document.getElementById("sombra").style.backgroundColor = 'transparent';
            document.getElementById("sombra").style.borderRadius = '1rem';
            document.getElementById("sombra2").style.backgroundColor = 'transparent';
            document.getElementById("sombra2").style.borderRadius = '1rem';
            document.getElementById("tamanho").style.width = '80%';

            if(this.quantidade == ''){
                this.quantidade = 1
            }
            
        },
        Teste(){
        },
    },

    computed:{
        ValorBnb: function(){
            return (this.valorBnb * this.quantidade).toLocaleString('pt-br', {minimumFractionDigits: 2})
        },
    }
}
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@800&display=swap');

    *{
        font-family: 'JetBrains Mono', monospace;
        color: rgb(70, 70, 70);
    }

    input{
        background-color: transparent;
        border-radius: 1rem;
    }

    input:focus {
        box-shadow: 0 0 0 0;
        outline: 0;
    }

    h1{
        pointer-events: none;
    }

    input[type=number]::-webkit-inner-spin-button { 
        -webkit-appearance: none;
    }

    #tamanho{
        width: 80%;
        transition: all 1000ms ease;
    }

    #cotacao{
        height: 1080px;
    }

    #vale{
        color: rgb(139, 228, 146);
    }

    #icone{
        width: 13rem;
        height: 11.5rem;
    }

    #btn-quantidade{
        width: 1rem;
        font-size: 3rem;
        text-decoration: none;
        border: none;
    }

    #btn-quantidade :focus-visible{
        width: auto;
    }

    #btn-valor{
        font-size: 3rem;
        text-decoration: none;
        border: none;
    }

    #sombra {
        transition: all 1000ms ease;
    }

    #sombra2 {
        transition: all 1000ms ease;
    }
    
    #cifrao{
        font-size: 3rem;
    }
</style>