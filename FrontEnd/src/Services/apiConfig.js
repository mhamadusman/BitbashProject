import axios from 'axios';
const baseURL = 'http://127.0.0.1:5000';

const api = axios.create({
    baseURL,
    headers:{
        'content-Type' :  'application/json',
    },
});

export default api;