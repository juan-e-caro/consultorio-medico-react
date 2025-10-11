import { View, Text, TextInput, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import BottonComponent from '../../components/BottonComponent';
import React, { useState } from 'react';
import { registerUser } from '../../Src/Services/AuthService';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function RegistroScreen({ navigation }) {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmarPassword, setConfirmarPassword] = useState("");
    const [rol, setRol] = useState("Paciente");  // Estado para el rol, default "usuario"
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        if (!nombre.trim() || !email.trim() || !password.trim() || !confirmarPassword.trim()) {
            Alert.alert("Error", "Por favor completa todos los campos.");
            return;
        }

        if(password !== confirmarPassword){
            Alert.alert("Error", "Las contraseñas no coinciden.");
            return;
        }

        setLoading(true);

        // Envía el rol también
        const result = await registerUser(nombre, email, password, confirmarPassword, "Paciente");

        setLoading(false);

        if(result.success){
            Alert.alert("Registro exitoso", "Usuario registrado correctamente.");
            await AsyncStorage.setItem("userToken", result.token); 
        } else {
            Alert.alert("Error al registrar", result.message?.message || result.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registro</Text>

            <TextInput
                style={styles.input}
                placeholder='Nombre completo'
                value={nombre}
                onChangeText={setNombre}
                editable={!loading}
            />
            <TextInput
                style={styles.input}
                placeholder='Correo Electrónico'
                value={email}
                onChangeText={setEmail}
                keyboardType='email-address'
                autoCapitalize='none'
                editable={!loading}
            />
            <TextInput
                style={styles.input}
                placeholder='Contraseña'
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                editable={!loading}
            />
            <TextInput
                style={styles.input}
                placeholder='Confirmar Contraseña'
                secureTextEntry
                value={confirmarPassword}
                onChangeText={setConfirmarPassword}
                editable={!loading}
            />

            <BottonComponent
                title={loading ? "" : "Registrarse"}
                onPress={handleRegister}
                style={{ backgroundColor: "#1976D2" }}
            />

            {loading && <ActivityIndicator size="large" color="#0D47A1" style={{ marginTop: 16 }} />}

            <BottonComponent
                title="Iniciar sesión"
                onPress={() => navigation.navigate("login")}
                style={{ backgroundColor: "#4CAF50", marginTop: 16 }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 24,
        paddingVertical: 32,
        backgroundColor: "#E3F2FD",
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
        marginBottom: 30,
        textAlign: "center",
        color: "#0D47A1",
        letterSpacing: 1,
    },
    input: {
        height: 52,
        borderColor: "#90CAF9",
        borderWidth: 1.8,
        borderRadius: 12,
        paddingHorizontal: 20,
        marginBottom: 18,
        backgroundColor: "#FFFFFF",
        color: "#0D47A1",
        fontSize: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    pickerContainer: {
        borderColor: "#90CAF9",
        borderWidth: 1.8,
        borderRadius: 12,
        marginBottom: 18,
        backgroundColor: "#FFFFFF",
        paddingVertical: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    label: {
        fontSize: 17,
        color: "#0D47A1",
        marginLeft: 16,
        marginBottom: 6,
        fontWeight: "600",
    },
    picker: {
        height: 54,
        color: "#0D47A1",
        marginHorizontal: 12,
    },
});

