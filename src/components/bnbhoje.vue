<template>
    <div class="principal">
        <div class="lateral1">
        </div>
        <div class="meio">
            <div class="conversor">
                <div class="icone">
                    <img src="../storage/binance.png" alt="">
                </div>
                <div class="dados">
                    <span id="simbolo">QTD</span>
                    <input 
                        id="btn-quantidade" 
                        v-model="quantidade"
                        @mouseout="mouseOut"
                        @mouseover="mouseOver"
                        @focusin="FocusIn"
                        @focusout="FocusOut">
                    <span id="igualdade">Vale</span>
                    <span id="simbolo2">US$</span>
                    <input 
                        id="btn-valor" 
                        v-model="ValorBnb" 
                        @mouseout="mouseOut"
                        @mouseover="mouseOver"
                        @focusin="FocusIn"
                        @focusout="FocusOut">
                </div>
            </div>
            <div class="conteudo">
                <h2 >Preço médio do BNB nos últimos 30 dias</h2>
                <GChart 
                    class="grafico"
                    type="LineChart"
                    :data="chartData"
                    :options="chartOptions"
                />
                <h3>Valor do BNB agora</h3>
                <p>
                    O valor do BNB hoje está US${{valorBnb}}.<br>
                    O valor do BNB aqui é atualizada para que você fique informado sobre o valor do BNB.<br>
                    <br>
                    O valor do BNB hoje é somente para informação.
                </p>
                <h3>Informaçoes sobre o BNB</h3>
                <p>
                    O BNB é o token nativo da rede Binance Smart Chain e da Binance Chain. <br>
                    Criado e Emitido pela primeira vez em julho de 2017 na plataforma da Ethereum,<br>
                    o BNB é um token que permite aos holders pagar menos taxas de trading na Binance.<br>
                    <br>
                    Todas as transações feitos na Binance Smart Chain<br>
                    e na Binance Chain são pagas em BEP-20 ou BEP-2.<br>
                    A moeda tem um fornecimento limitado de 200 milhões, <br>
                    e a Binance realiza queimas trimestrais de BNB como medida deflacionária. <br>
                    As queimadas ocorrerão até que o fornecimento total seja reduzido para 100 milhões.<br>
                    <br>
                    informaçoes fornecidas pela propria plataforma da Binance
                </p>
            </div>
        </div>
        <!-- <div id="cotacao" class="justify-content-center">
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
        </div> -->
        <div class="lateral2">
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
            mediaarray: ([]),
            focus: false
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

        mouseOver(){
            document.getElementById("simbolo2").style.backgroundColor = 'rgba(243, 247, 52, 0.267)';
            document.getElementById("simbolo").style.backgroundColor = 'rgba(243, 247, 52, 0.267)';
            document.getElementById("btn-quantidade").style.backgroundColor = 'rgba(243, 247, 52, 0.267)';
            document.getElementById("btn-valor").style.backgroundColor = 'rgba(243, 247, 52, 0.267)';
        },

        mouseOut(){
            if(this.focus == false){
                document.getElementById("simbolo2").style.backgroundColor = 'transparent';
                document.getElementById("simbolo").style.backgroundColor = 'transparent';
                document.getElementById("btn-quantidade").style.backgroundColor = 'transparent';
                document.getElementById("btn-valor").style.backgroundColor = 'transparent';
            }
        },

        FocusIn(){
            document.getElementById("simbolo2").style.backgroundColor = 'rgba(243, 247, 52, 0.267)';
            document.getElementById("simbolo").style.backgroundColor = 'rgba(243, 247, 52, 0.267)';
            document.getElementById("simbolo2").style.transition = 'all 800ms ease';
            document.getElementById("simbolo").style.transition = 'all 800ms ease';
            document.getElementById("btn-quantidade").style.backgroundColor = 'rgba(243, 247, 52, 0.267)';
            document.getElementById("btn-valor").style.backgroundColor = 'rgba(243, 247, 52, 0.267)';
            document.getElementById("btn-quantidade").style.width = '400px';
            document.getElementById("btn-valor").style.width = '400px';
            document.getElementById("btn-quantidade").style.transition = 'all 800ms ease';
            document.getElementById("btn-valor").style.transition = 'all 800ms ease';
            document.getElementById("btn-quantidade").style.outline = '0';
            document.getElementById("btn-valor").style.outline = '0';

            this.focus = true
        },

        FocusOut(){
            document.getElementById("simbolo2").style.backgroundColor = 'transparent';
            document.getElementById("simbolo").style.backgroundColor = 'transparent';
            document.getElementById("btn-quantidade").style.backgroundColor = 'transparent';
            document.getElementById("btn-valor").style.backgroundColor = 'transparent';
            document.getElementById("btn-quantidade").style.width = '100px';
            document.getElementById("btn-valor").style.width = '200px';
            document.getElementById("btn-quantidade").style.transition = 'all 800ms ease';
            document.getElementById("btn-valor").style.transition = 'all 800ms ease';

            this.focus = false

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
        font-family: 'JetBrains Mono';
        color: rgb(70, 70, 70);
        display: flex;
    }

    span{
        font-size: 3rem;
        color: rgb(124, 124, 124);
        align-items:center;
        border-radius: 10px 0 0 10px;
    }

    input{
        border-radius: 0 10px 10px 0;
    }

    p{
        word-break: break-all;
        margin: 0 0 55px 0;
        font-family: 'JetBrains', monospace;
    }

    .lateral1{
        flex-grow: 1;
    }

    .lateral2{
        flex-grow: 1;
    }

    .meio{
        flex-grow: 3;
        flex-direction: column;
        justify-content:center;
        align-items:center;
    }

    .conversor{
        margin: 200px 0 0 0;
        flex-direction: column;
    }

    .conteudo{
        margin: 800px 0 0 0;
        flex-direction: column;
        justify-content:center;
        align-items:center;
        text-align: left;
    }

    .icone{
        justify-content:center;
    }

    .grafico{
        width: 100%;
        height: 300px;
        margin: 5px 0px 30px 0;
    }

    #btn-quantidade{
        width: 100px;
        font-size: 3rem;
        text-align: center;
        text-decoration: none;
        border: none;
    }

    #btn-valor{
        width: 200px;
        font-size: 3rem;
        text-decoration: none;
        border: none;
    }

    #igualdade{
        font-size: 20px;
        margin: 10px;
        color: rgb(113, 185, 113);
    }

    

    /* 
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
    } */
</style>