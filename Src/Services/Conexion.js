import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Cambia esta URL por la de tu backend Laravel
const API_BASE_URL = "http://10.2.234.43:8000/api"; 

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Rutas que no requieren token
const RutasPublicas = ['/login', '/registrar'];

api.interceptors.request.use(
  async (config) => {
    const esRutaPublica = RutasPublicas.some(ruta => config.url.includes(ruta));

    let userToken = null;
    if (!esRutaPublica) {
      userToken = await AsyncStorage.getItem("userToken");
    }

    if (userToken) {
      config.headers.Authorization = `Bearer ${userToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const esRutaPublica = RutasPublicas.some(ruta => originalRequest.url.includes(ruta));

    if (error.response && error.response.status === 401 && !originalRequest._retry && !esRutaPublica) {
      originalRequest._retry = true;
      await AsyncStorage.removeItem("userToken");
      console.log("Token expirado o no autorizado. Redirigiendo al login...");
    }

    return Promise.reject(error);
  }
);

export default api;
