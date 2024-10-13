import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
    baseURL: 'https://localhost:7162/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;