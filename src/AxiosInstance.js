import axios from "axios";


const AxiosInstance = axios.create({
    baseURL: "https://api.paathshaala.me/api/"
 })

export default AxiosInstance;