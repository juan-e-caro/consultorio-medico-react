import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Your Laravel API base URL
const API_BASE_URL = "http://10.2.234.3:8000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Public routes that don't require Authorization header
const RutasPublicas = ['/login', '/registrar'];

api.interceptors.request.use(
  async (config) => {
    // Check if current request URL matches any public route
    const esRutaPublica = RutasPublicas.some(ruta => config.url.includes(ruta));

    if (!esRutaPublica) {
      // Get token from AsyncStorage
      const userToken = await AsyncStorage.getItem("userToken");
      if (userToken) {
        // Add Bearer token to headers
        config.headers.Authorization = `Bearer ${userToken}`;
      }
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

      // Clear token on unauthorized
      await AsyncStorage.removeItem("userToken");
      console.log("Token expirado o no autorizado. Redirigiendo al login...");
      // Optionally, trigger a logout or navigation to login here
    }

    return Promise.reject(error);
  }
);

export default api;
