<template>
    <div>
        <div id="cotacao" class="justify-content-center">
            <div class="mx-auto container position-absolute top-50 start-50 translate-middle">
                <div class="mx-auto tamanho mb-5 row justify-content-center">
                    <img id="icone" src="../storage/bnb.png" alt="">
                </div>
                <div id="tamanho" class="mx-auto">
                    <div  id="sombra" class="justify-content-center">
                        <div class="sombra row">
                            <span id="cifrao" class="col text-center">QTD:</span>
                            
                            <input
                            @mouseover="mouseOver"
                            @focusin="FocusIn"
                            @focusout="FocusOut"
                            type="number"
                            v-model="quantidade"
                            id="btn-quantidade"
                            class="col ms-4"
                            >

                        </div>
                    </div>

                    <div class="row m-auto">
                        <h3 id="vale" class="m-auto">Vale</h3>
                    </div>
                    
                    <div id="sombra2" class="col">
                        <div  class="row justify-content-center">
                            <span id="cifrao" class="col text-center">US$:</span>

                            <input 
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
        <div class="justify-content-center">
            <h1>Gráfico do BNB nos últimos 30 dias</h1>
            <GChart 
                class="mx-auto"
                style="width: 900px; height: 500px;"
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
                ['2014', 1000],
                ['2015', 1170],
                ['2016', 660],
                ['2017', 1030],
                ['2014', 1000],
                // Treat first row as data as well.
            ]),
            
            chartOptions: {
                chart: {
                title: 'Company Performance',
                subtitle: 'Sales, Expenses, and Profit: 2014-2017',
                }
            }
        }
    },

    components: {
        GChart
    },

    mounted(){
        this.BNB()
    },

    methods:{
        BNB(){
            Axios.Teste()
            .then(respost =>{
                console.log(respost)
                this.valorBnb = respost.binancecoin.usd
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
            document.getElementById("tamanho").style.width = '50rem';
        },

        FocusOut(){
            document.getElementById("sombra").style.backgroundColor = 'transparent';
            document.getElementById("sombra").style.borderRadius = '1rem';
            document.getElementById("sombra2").style.backgroundColor = 'transparent';
            document.getElementById("sombra2").style.borderRadius = '1rem';
            document.getElementById("tamanho").style.width = '25rem';

            if(this.quantidade == ''){
                this.quantidade = 1
            }
            
        },
        Teste(){
        },
    },

    computed:{
        ValorBnb: function(){
            return (this.valorBnb * this.quantidade)
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
        width: 25rem;
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