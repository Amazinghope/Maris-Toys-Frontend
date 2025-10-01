import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE || "http://localhost:5002/api",
    timeout: 20000,
    withCredentials: true,
});

export default API