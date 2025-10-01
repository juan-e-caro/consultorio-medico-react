import { View, Text, TextInput, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import BottonComponent from '../../components/BottonComponent';
import React, { useState } from 'react';
import { registerUser } from '../../Src/Services/AuthService'; // Ajusta la ruta

export default function RegistroScreen({ navigation }) {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmarPassword, setConfirmarPassword] = useState("");
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

        const result = await registerUser(nombre, email, password, confirmarPassword);

        setLoading(false);

        if(result.success){
            Alert.alert("Registro exitoso", "Usuario registrado correctamente.");
            navigation.replace("login"); // o navega a login
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
        padding: 16,
        backgroundColor: "#E3F2FD", // Azul muy claro
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 24,
        textAlign: "center",
        color: "#0D47A1", // Azul oscuro
    },
    input: {
        height: 50,
        borderColor: "#90CAF9", // Azul suave
        borderWidth: 1.5,
        borderRadius: 8,
        paddingHorizontal: 16,
        marginBottom: 16,
        backgroundColor: "#FFFFFF",
        color: "#0D47A1",
    },
});
