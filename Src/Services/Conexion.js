import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "<poner aqui url>/api";

const api = axios.create({
    baseURL: API_BASE_URL,
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
});

const RutasPublicas= ['/login', '/registrar'];

api.interceptors.request.use(

    async (config) => {
        const EsRutaPublica = RutasPublicas.some(ruta => config.url.includes(ruta));
        if(!EsRutaPublica){
            const userToken = await AsyncStorage.getItem("userToken");
        }
        if (userToken) {
            config.headers.Authorization = `Bearer ${userToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,

    async(error) =>{
        const originalRequest = error.config;
        const isRutaPublica = RutasPublicas.some(ruta => originalRequest.url.includes(ruta));

        if(error.response && error.response.status === 401 && !originalRequest._retry && !isRutaPublica){
            originalRequest._retry = true;
            await AsyncStorage.removeItem("userToken");
            console.log("Token exporido o no autorizado, Redirigiendo al login");
        }
        return Promise.reject(error);
    }
);

export default api;
