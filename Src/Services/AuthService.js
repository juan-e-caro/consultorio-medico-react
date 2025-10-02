import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./Conexion";

export const loginUser = async (email, password) => {
  try {
    const response = await api.post('/login', { email, password });
    const token = response.data.access_token;
    if (token) {
      await AsyncStorage.setItem("userToken", token);
    }
    return { success: true, token };
  } catch (error) {
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexión",
    };
  }
};

export const registerUser = async (name, email, password, password_confirmation, roles) => {
  try {
    console.log({ name, email, password, password_confirmation, roles });
    const response = await api.post('/registrar', {
      name,
      email,
      password,
      password_confirmation,
      roles,
    });
    const token = response.data.access_token;
    if (token) {
      await AsyncStorage.setItem("userToken", token);
    }
    return {
      success: true,
      message: "Usuario registrado correctamente",
      token,
    };
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Error al registrar";
    return {
      success: false,
      message,
    };
  }
};
