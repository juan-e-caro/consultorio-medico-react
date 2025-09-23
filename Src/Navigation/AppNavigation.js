import { NavigationContainer } from "@react-navigation/native";
import AuthNavegacion from "../../../Appclub/Src/Navigation/AuthNavegacion";

import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {useState, useEffect, useRef, use} from "react";
import { ActivityIndicator, View, StyleSheet, AppState } from "react-native";

export default function AppNavegacion() {
    const [isLoading, setIsLoading] = useState(true);
    const [userToken, setUserToken] = useState(null);
    const appState = useRef(AppState.currentState);
    
    const LoadToken = async () => {
        try {
            const token = await AsyncStorage.getItem("userToken");
            setUserToken(token);
        } catch (error) {
            console.error("Error al cargar el token desde AsyncStorage", error);
        } finally {
            setIsLoading(false);
        }
    };

    //se ejecuta cuando el componente se monta
    useEffect(()   =>{
        LoadToken();
    })

    //se ejecuta cuando hay cambio de estado en la app (inactiva/activa/background)
    useEffect(() =>{
        const handleAppStateChange =(nextAppState)=>{
            if(appState.current.match(/inactive|background/) && nextAppState === "active"){
                console.log("La aplicación ha vuelto al primer plano, verificando el token...");
                LoadToken();
            }
            appState.current = nextAppState;
        };
        const subscription = AppState.addEventListener("change", handleAppStateChange);
        return () =>subscription.remove();
    },[]);

    //se ejecuta en un intervalo de 2 segundos
    useEffect(()   =>{
          const interval = setInterval(()=>{
            if (AppState.currentState === "active") {
                LoadToken();
            }
          }, 2000);
        return () => clearInterval(interval);
    },[]);

    return (
        <NavigationContainer>
            {userToken ? <NavegacionPrincipal /> : <AuthNavegacion /> }
        </NavigationContainer>
    );
}