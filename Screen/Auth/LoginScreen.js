import { View, Text, TextInput, StyleSheet, Alert, ActivityIndicator } from "react-native";
import BottonComponent from "../../components/BottonComponent";
import { useState } from "react";
import { loginUser } from "../../Src/Services/AuthService";
import AsyncStorage from "@react-native-async-storage/async-storage"; // import para token dev

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email.trim() || !password.trim()) {
            Alert.alert("Error", "Por favor completa todos los campos.");
            return;
        }

        setLoading(true);

        const result = await loginUser(email, password);

        setLoading(false);

        if(result.success){
            // Login correcto → navegar a inicio
            navigation.replace("inicio"); // replace evita volver al login
        } else {
            Alert.alert("Error de autenticación", result.message?.message || result.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Iniciar Sesión</Text>

            <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!loading}
                placeholderTextColor="#90CAF9"
            />

            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                editable={!loading}
                placeholderTextColor="#90CAF9"
            />

            <BottonComponent
                title={loading ? "" : "Iniciar Sesión"}
                onPress={handleLogin}
                style={{ backgroundColor: "#1976D2" }}
            />

            {loading && <ActivityIndicator size="large" color="#0D47A1" style={{ marginTop: 16 }} />}

            <BottonComponent
                title="¿No tienes cuenta? Regístrate"
                onPress={() => navigation.navigate("registro")}
                style={{ backgroundColor: "#4CAF50", marginTop: 16 }}
            />
        </View>
    );
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
});
