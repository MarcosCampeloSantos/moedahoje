import axios from "axios";

export const http = axios.create({
    baseURL: 'http://localhost:8000/api/'
})

export const httpsCoin = axios.create({
    baseURL: 'https://api.coingecko.com/api/v3/'
})