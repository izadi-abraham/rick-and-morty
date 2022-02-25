import axios from "axios";
import { AxiosInstance } from 'axios';


// class API {
//
//     private constructor() {
//         this.CreateAxiosInstance();
//     }
//
//     public static getInstance() {
//         if (!this.instance) {
//             this.instance = new API();
//         }
//         return this.instance;
//     }
//     private baseURL: string = 'https://rickandmortyapi.com/api';
//     private static instance: API;
//     public axios: AxiosInstance;
//     public CreateAxiosInstance() {
//         this.axios = axios.create({
//             baseURL: this.baseURL,
//             timeout: 100000,
//         });
//     }
// }

export const axiosInstance = axios.create({
    baseURL: 'https://rickandmortyapi.com/api',
    timeout: 10000,
});