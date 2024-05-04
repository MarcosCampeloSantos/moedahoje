<template>
    <b-row class="justify-content-center align-items-center m-0" style="height: 100vh;">
        <b-col cols="5">
            <h1><b>Sites</b></h1>
            <b-card @click="$router.push({path:'bitcoinhoje'})" class="shadow" style="cursor: pointer;">
                <h2 class="m-0"><img src="../storage/bitcoin.png" class="mx-2" width="40" alt="">Valor Bitcoin</h2>
            </b-card>
        </b-col>
    </b-row>
</template>

<script>
export default {
    data() {
        return{

        }
    },
}
</script>