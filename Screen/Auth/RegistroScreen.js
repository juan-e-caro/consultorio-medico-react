import { View, Text, TextInput, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import BottonComponent from '../../components/BottonComponent';
import React, { useState } from 'react';
import { registerUser } from '../../Src/Services/AuthService';
import { Picker } from '@react-native-picker/picker'; // <-- Importa Picker

export default function RegistroScreen({ navigation }) {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmarPassword, setConfirmarPassword] = useState("");
    const [rol, setRol] = useState("usuario");  // Estado para el rol, default "usuario"
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
        const result = await registerUser(nombre, email, password, confirmarPassword, rol);

        setLoading(false);

        if(result.success){
            Alert.alert("Registro exitoso", "Usuario registrado correctamente.");
            navigation.replace("Inicio");
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

            {/* Picker para seleccionar rol */}
            <View style={styles.pickerContainer}>
                <Text style={styles.label}>Selecciona tu rol:</Text>
                <Picker
                    selectedValue={rol}
                    onValueChange={(itemValue) => setRol(itemValue)}
                    enabled={!loading}
                    style={styles.picker}
                >
                    <Picker.Item label="Usuario" value="usuario" />
                    <Picker.Item label="Doctor" value="doctor" />
                </Picker>
            </View>

            <BottonComponent
                title={loading ? "" : "Registrarse"}
                onPress={handleRegister}
                style={{ backgroundColor: "#1976D2" }}
            />

            {loading && <ActivityIndicator size="large" color="#0D47A1" style={{ marginTop: 16 }} />}

            <BottonComponent
                title="Iniciar sesión"
                onPress={() => navigation.navigate("Login")}
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
        backgroundColor: "#E3F2FD",
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 24,
        textAlign: "center",
        color: "#0D47A1",
    },
    input: {
        height: 50,
        borderColor: "#90CAF9",
        borderWidth: 1.5,
        borderRadius: 8,
        paddingHorizontal: 16,
        marginBottom: 16,
        backgroundColor: "#FFFFFF",
        color: "#0D47A1",
    },
    pickerContainer: {
        borderColor: "#90CAF9",
        borderWidth: 1.5,
        borderRadius: 8,
        marginBottom: 16,
        backgroundColor: "#FFFFFF",
    },
    label: {
        fontSize: 16,
        color: "#0D47A1",
        marginLeft: 12,
        marginTop: 8,
    },
    picker: {
        height: 50,
        color: "#0D47A1",
    },
});
