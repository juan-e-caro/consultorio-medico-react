import { View, Text, StyleSheet, ActivityIndicator, Alert, Image } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottonComponent from "../../components/BottonComponent"; // Revisa que este botón esté bien diseñado
import api from "../../Src/Services/Conexion";

export default function PerfilScreen() {
    const [usuario, setUsuario] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const cargarPerfil = async () => {
            try {
                const token = await AsyncStorage.getItem("userToken");
                if (!token) {
                    Alert.alert("Token no encontrado", "Redirigiendo al login.");
                    return;
                }

                const response = await api.get("/me");
                setUsuario(response.data);
            } catch (error) {
                console.error("Error al cargar el perfil:", error);

                if (error.response) {
                    Alert.alert(
                        "Error del servidor",
                        `Error ${error.response.status}: ${error.response.data?.message || "Error al cargar el perfil"}`,
                        [
                            {
                                text: "OK",
                                onPress: async () => {
                                    await AsyncStorage.removeItem("userToken");
                                }
                            }
                        ]
                    );
                } else if (error.request) {
                    Alert.alert(
                        "Error de conexión",
                        "No se pudo conectar al servidor. Verifica tu conexión a Internet.",
                        [
                            {
                                text: "OK",
                                onPress: async () => {
                                    await AsyncStorage.removeItem("userToken");
                                }
                            }
                        ]
                    );
                } else {
                    Alert.alert(
                        "Error",
                        "Ocurrió un error inesperado.",
                        [
                            {
                                text: "OK",
                                onPress: async () => {
                                    await AsyncStorage.removeItem("userToken");
                                }
                            }
                        ]
                    );
                }
            } finally {
                setCargando(false);
            }
        };

        cargarPerfil();
    }, []);

    if (cargando) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0d6efd" />
                <Text style={styles.loadingText}>Cargando perfil...</Text>
            </View>
        );
    }

    if (!usuario) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Perfil de Usuario</Text>
                <View style={styles.card}>
                    <Text style={styles.errorText}>No se pudo cargar el perfil.</Text>
                </View>
            </View>
        );
    }

    const { name, email } = usuario.user;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Perfil de Usuario</Text>

            <View style={styles.card}>
                {/* Avatar de ejemplo */}
                <Image
                    style={styles.avatar}
                    source={{
                        uri: "https://ui-avatars.com/api/?name=" + encodeURIComponent(name || "User"),
                    }}
                />

                {/* Info del perfil */}
                <Text style={styles.label}><Text style={styles.labelTitle}>Nombre:</Text> {name || "No disponible"}</Text>
                <Text style={styles.label}><Text style={styles.labelTitle}>Correo:</Text> {email || "No disponible"}</Text>

                {/* Separador */}
                <View style={styles.divider} />

                {/* Botón personalizado */}
                <BottonComponent
                    title="Cerrar sesión"
                    onPress={async () => {
                        await AsyncStorage.removeItem("userToken");
                        Alert.alert("Sesión cerrada", "Has cerrado sesión correctamente.");
                        // Puedes redirigir al login si lo necesitas aquí
                    }}
                    color="#dc3545"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f9fa',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#212529',
        textAlign: 'center',
    },
    card: {
        width: '100%',
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        alignItems: 'center',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
        color: '#343a40',
    },
    labelTitle: {
        fontWeight: 'bold',
        color: '#495057',
    },
    divider: {
        height: 1,
        backgroundColor: '#dee2e6',
        width: '100%',
        marginVertical: 20,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#6c757d',
    },
    errorText: {
        color: '#dc3545',
        fontSize: 16,
        textAlign: 'center',
    },
});
