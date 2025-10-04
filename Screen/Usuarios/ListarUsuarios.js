import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet, Alert, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { listarUsuarios, eliminarUsuarios } from "../../Src/Services/UsuariosService";
import UsuariosCard from "../../components/UsuariosCard";

export default function ListarUsuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    const handleUsuarios = async () => {
        setLoading(true);
        try {
            const result = await listarUsuarios();
            if(result.success){
                setUsuarios(result.data);
            } else {
                Alert.alert("Error", result.message || "No se pudieron cargar los usuarios");
            }
        } catch (error) {
            Alert.alert("Error", "No se pudieron cargar los usuarios");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', handleUsuarios);
        return () => unsubscribe();
    }, [navigation]);

    const handleEditar = (usuario) => {
        navigation.navigate("EditarUsuarios", { usuario });
    };

    const handleCrear = () => {
        navigation.navigate("EditarUsuarios");
    };

    const handleEliminar = (id) => {
        Alert.alert(
            "Confirmar eliminación",
            "¿Estás seguro de que deseas eliminar este usuario?",
            [
                { text: "Cancelar", style: "cancel" },
                { 
                    text: "Eliminar", 
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const result = await eliminarUsuarios(id);
                            if(result.success){
                                handleUsuarios();
                            } else {
                                Alert.alert("Error", result.message || "No se pudo eliminar el usuario");
                            }
                        } catch (error) {
                            Alert.alert("Error", "No se pudo eliminar el usuario");
                        }
                    }
                }
            ]
        );
    };

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#1976D2"/>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={usuarios}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <UsuariosCard
                        usuarios={item}
                        onEdit={() => handleEditar(item)}
                        onDelete={() => handleEliminar(item.id)}
                    />
                )}
                ListEmptyComponent={<Text style={styles.empty}>No hay usuarios registrados</Text>}
            />

            <View style={styles.botonesContainer}>
                <TouchableOpacity style={styles.botonCrear} onPress={handleCrear}>
                    <Text style={styles.textoBoton}>+ Nuevo Usuario</Text>
                </TouchableOpacity>

                <Button
                    title="Volver al Inicio"
                    onPress={() => navigation.navigate("InicioHome")}
                    color="#4CAF50"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    empty: {
        textAlign: "center",
        marginTop: 40,
        color: "#888",
        fontSize: 16,
    },
    botonesContainer: {
        padding: 16,
    },
    botonCrear: {
        backgroundColor: "#1976D2",
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        alignItems: "center",
    },
    textoBoton: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});
