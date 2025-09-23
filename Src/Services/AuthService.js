import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./Conexion";

export const loginUser = async (email,password) => {
    try{
        const response = await api.post('/login', {email, password});
        const token = response.data.token;
        console.log("Respuesta del servidor:", response.data);
        console.log("Token recibido:", token);
        if(token){
            await AsyncStorage.setItem("userToken", token);
        } else{
            console.error("no se recibio token en la respuesta");
        }
        return { success: true, token};
    } catch(error){
        console.error("Error al inicias sesión:", error.response ? error.response.data : error.message);

        return {
            success: false,
            message: error.response ? error.response.data : "Error de conexión",
        };
    }
};