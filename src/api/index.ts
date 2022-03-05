import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'https://rickandmortyapi.com/api',
    timeout: 10000,
});