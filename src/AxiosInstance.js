import axios from "axios";

const live = "https://api.paathshaala.me/api/"
const local = "http://localhost:8000/api/"
const AxiosInstance = axios.create({
    baseURL: local
 })

export default AxiosInstance;