import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import BottonComponent from "../../components/BottonComponent";
import { useState } from "react";

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = () => {
        if (!email.trim() || !password.trim()) {
            Alert.alert("Error", "Por favor completa todos los campos.");
            return;
        }

        navigation.navigate("inicio");
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
                title="Iniciar Sesión"
                onPress={handleLogin}
                style={{ backgroundColor: "#1976D2" }}
            />

            <BottonComponent
                title="¿No tienes cuenta? Regístrate"
                onPress={() => navigation.navigate("registro")}
                style={{ backgroundColor: "#4CAF50" }}
            />
        </View>
    );
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
