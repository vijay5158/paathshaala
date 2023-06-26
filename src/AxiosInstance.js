import axios from "axios";


const AxiosInstance = axios.create({
    baseURL: process.env.BACKEND_URL
 })

export default AxiosInstance;