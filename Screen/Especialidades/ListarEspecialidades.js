import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet, Alert, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { listarEspecialidades, eliminarEspecialidades } from "../../Src/Services/EspecialidadesService";
import EspecialidadesCard from "../../components/EspecialidadesCard";

export default function ListarEspecialidades() {
    const [especialidades, setEspecialidades] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    const handleEspecialidades = async () => {
        setLoading(true);
        try {
            const result = await listarEspecialidades();
            if(result.success){
                setEspecialidades(result.data);
            } else {
                Alert.alert("Error", result.message || "No se pudieron cargar las especialidades");
            }
        } catch (error) {
            Alert.alert("Error", "No se pudieron cargar las especialidades");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', handleEspecialidades);
        return () => unsubscribe();
    }, [navigation]);

    const handleEditar = (especialidad) => {
        navigation.navigate("EditarEspecialidades", { especialidad });
    };

    const handleCrear = () => {
        navigation.navigate("EditarEspecialidades");
    };

    const handleEliminar = (id) => {
        Alert.alert(
            "Confirmar eliminación",
            "¿Estás seguro de que deseas eliminar esta especialidad?",
            [
                { text: "Cancelar", style: "cancel" },
                { 
                    text: "Eliminar", 
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const result = await eliminarEspecialidades(id);
                            if(result.success){
                                handleEspecialidades();
                            } else {
                                Alert.alert("Error", result.message || "No se pudo eliminar la especialidad");
                            }
                        } catch (error) {
                            Alert.alert("Error", "No se pudo eliminar la especialidad");
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
                data={especialidades}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <EspecialidadesCard
                        especialidad={item}
                        onEdit={() => handleEditar(item)}
                        onDelete={() => handleEliminar(item.id)}
                    />
                )}
                ListEmptyComponent={<Text style={styles.empty}>No hay especialidades registradas</Text>}
            />

            <View style={styles.botonesContainer}>
                <TouchableOpacity style={styles.botonCrear} onPress={handleCrear}>
                    <Text style={styles.textoBoton}>Nueva Especialidad</Text>
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
