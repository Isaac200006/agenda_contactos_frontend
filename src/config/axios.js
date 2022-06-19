import axios from 'axios';
const port = "http://localhost:4000";

const clienteAxios = axios.create({
    baseURL: port
});

export default clienteAxios;