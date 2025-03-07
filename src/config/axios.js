import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8080/v1'
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/"; // Redirigir al login si el token expira
        }
        return Promise.reject(error);
    }
);


export default api;