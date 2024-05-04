<template>
    <div class="d-flex principal">
        <div class="meio w-100 d-flex flex-column align-items-center">
            <div class="conversor d-flex flex-column justify-content-center">
                <div class="icone mb-4">
                    <img src="../storage/bitcoin.png" width="200" alt="">
                </div>
                <div class="dados d-flex justify-content-center flex-wrap">
                    <span class="d-flex container-input justify-content-between">
                        <span class="simbolo mx-2">QTD</span>
                        <input 
                            class="input-val px-2 text-end" 
                            v-model="quantidade"
                            @input="calcularInfos('qtd')"
                            @focusout="FocusOut"
                        >
                    </span>
                    <span style="font-size: 15px;" class="igualdade mx-2 align-self-center">igual á</span>
                    <span class="d-flex container-input justify-content-between">
                        <span class="simbolo mx-2">R$</span>
                        <input 
                            class="input-val px-2 text-end" 
                            v-model="valorBTC"
                            @focusout="FocusOut"
                            @input="calcularInfos('val')"
                        >
                    </span>
                </div>
            </div>
            <div class="text">
                <div class="mx-2 container">
                    <h2 >Preço médio do BTC nos últimos 30 dias</h2>
                    <div id="chart">
                        <apexchart type="area" height="350" :options="chartOptions" :series="series"></apexchart>
                    </div>
                    <h3>Valor do BTC agora</h3>
                    <p>Bitcoin é uma forma de dinheiro digital descentralizado, criado em 2009 por um indivíduo ou grupo de pessoas usando o pseudônimo Satoshi Nakamoto. Ele revolucionou a forma como pensamos sobre dinheiro e transações financeiras, oferecendo uma alternativa ao sistema financeiro tradicional controlado por governos e instituições financeiras.</p>

                    <p>Em vez de depender de uma autoridade central, como um banco central, para emitir e regular a moeda, o Bitcoin opera em uma rede peer-to-peer, onde as transações são verificadas e registradas por uma rede de computadores distribuídos em todo o mundo. Isso significa que o Bitcoin é imune à interferência governamental e à manipulação política.</p>

                    <p>Uma das características mais notáveis do Bitcoin é sua oferta limitada. Ao contrário das moedas fiduciárias, que podem ser impressas indefinidamente, o Bitcoin tem um limite máximo de 21 milhões de unidades. Isso confere ao Bitcoin uma escassez intrínseca, semelhante a metais preciosos como o ouro, o que pode potencialmente proteger seu valor contra a inflação.</p>

                    <p>Além disso, o Bitcoin oferece segurança e privacidade aos seus usuários por meio de técnicas criptográficas avançadas. As transações são registradas em um livro-razão público chamado blockchain, que é imutável e transparente. Isso significa que as transações de Bitcoin são seguras e não podem ser alteradas ou censuradas.</p>

                    <p>O Bitcoin também está se tornando cada vez mais aceito como forma de pagamento em todo o mundo. Desde empresas de tecnologia até varejistas e prestadores de serviços, muitos estão começando a aceitar Bitcoin como uma opção de pagamento legítima.</p>

                    <p>No entanto, é importante notar que o Bitcoin ainda é uma tecnologia em evolução e enfrenta desafios, como escalabilidade e volatilidade de preços. No entanto, muitos acreditam que o Bitcoin tem o potencial de revolucionar não apenas o sistema financeiro, mas também a forma como interagimos com o dinheiro e o valor.</p>

                    <p>Se você está interessado em explorar o mundo emocionante do Bitcoin, há uma abundância de recursos disponíveis para ajudá-lo a começar. De carteiras digitais a exchanges de criptomoedas, há muitas maneiras de comprar, vender e armazenar Bitcoin de forma segura e conveniente.</p>

                    <p>Junte-se à revolução do dinheiro digital e descubra o que o Bitcoin pode oferecer a você!</p>

                </div>
            </div>
        </div>
    </div>
</template>

<script>

import Axios from '../services/axiosmain'

export default {
    name: 'bitcoinHoje',
    data(){
        return {
            valorBTC: 1,
            quantidade: 1,
            hover: 'false',

            series: [],
        
            chartOptions: {},
        }
    },

    mounted(){
        this.priceBTC()
    },

    components: {
    },

    methods:{
        calcularInfos(info){
            if(info == 'qtd'){
                this.valorBTC = (this.valorBTCoriginal * this.quantidade).toLocaleString('pt-br', {minimumFractionDigits: 2})
            }else if(info == 'val'){
                this.quantidade = (this.valorBTC / this.valorBTCoriginal).toFixed(8)
            }
        },
        priceBTC(){
            this.historyBTC()
            Axios.priceBTC()
            .then(respost =>{
                this.valorBTCoriginal = respost.bitcoin.brl
                this.valorBTC = (this.valorBTCoriginal * this.quantidade).toLocaleString('pt-br', {minimumFractionDigits: 2})
            })
        },

        historyBTC(){
            Axios.historyBTC()
            .then(respost =>{
                var date = []
                var valor = []
                respost.prices.forEach(element => {
                    date.push(new Date(element[0]).getDate() + "/" + (new Date(element[0]).getMonth() + 1)+ "/" + new Date(element[0]).getFullYear())
                    valor.push(element[1])
                });

                // var label = []
                // var data = []
                // for (let i = 0; i < dados.length; i++) {
                //     label.push(dados[i][0])
                //     data.push(dados[i][1])
                // }
                this.series = [{
                    name: "Desktops",
                    data: valor
                }],

                this.chartOptions = {
                    chart: {
                        height: 350,
                        type: 'line',
                        zoom: {
                            enabled: false
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        curve: 'straight'
                    },
                    title: {
                        text: 'Product Trends by Month',
                        align: 'left'
                    },
                    grid: {
                        row: {
                            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                            opacity: 0.5
                        },
                    },
                    xaxis: {
                        categories: date,
                    }
                }
                
            })
        },

        FocusOut(){
            if(this.quantidade == ''){
                this.quantidade = 1
            }

            if(this.valorBTC == ''){
                this.valorBTC = 0
            }
        }
    },

    computed:{
        
    },

    watch:{
        
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
        .lateral{
            width: 200px;
        }
        .meio{
            .text{
                text-align: justify;
            }
            .conversor{
                font-size: 50px;
                height: 100vh;
                .dados{
                    .simbolo{
                        width: 90px;
                    }

                    .input-val{
                        border: none;
                        display: flex;
                        width: 250px;
                        border-radius: 10px;
                        background: none;
                        transition: all 800ms ease;
                    }

                    .container-input{
                        background-color: rgb(238, 238, 209);
                        border-radius: 10px;
                        min-width: 400px;
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
                        width: 350px;
                        transition: all 800ms ease;
                    }

                    span{
                        background: none;
                    }
                }

                // .dados:focus{
                //     .container-input{
                //         background-color: rgb(197, 197, 171);
                //     }

                //     .input-val{
                //         width: 430px;
                //         transition: all 800ms ease;
                //     }

                //     span{
                //         background: none;
                //     }
                // }
            }
        }
    }

    @media screen and (max-width: 1020px) {
        .igualdade{
            width: 100%;
        }
        .principal{
            .meio{
                .conversor{
                    font-size: 30px;
                    .dados{
                        .container-input{
                            min-width: 250px;
                        }
                        .input-val{
                            width: 150px;
                        }
                    }

                    .dados:focus-within{
                        .input-val{
                            width: 200px;
                        }
                    }
                }
            }
        }
        
    }

</style>