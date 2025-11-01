import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet, Alert, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { listarPacientes, eliminarPacientes } from "../../Src/Services/PacientesService";
import PacientesCard from "../../components/PacientesCard";

export default function ListarPacientes() {
    const [pacientes, setPacientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    const handlePacientes = async () => {
        setLoading(true);
        try {
            const result = await listarPacientes();
            if(result.success){
                setPacientes(result.data);
            } else {
                Alert.alert("Error", result.message || "No se pudieron cargar los pacientes");
            }
        } catch (error) {
            Alert.alert("Error", "No se pudieron cargar los pacientes");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', handlePacientes);
        return () => unsubscribe();
    }, [navigation]);

    const handleEditar = (paciente) => {
        navigation.navigate("EditarPacientes", { paciente });
    };

    const handleCrear = () => {
        navigation.navigate("EditarPacientes");
    };

    const handleEliminar = (id) => {
        Alert.alert(
            "Confirmar eliminación",
            "¿Estás seguro de que deseas eliminar este paciente?",
            [
                { text: "Cancelar", style: "cancel" },
                { 
                    text: "Eliminar", 
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const result = await eliminarPacientes(id);
                            if(result.success){
                                handlePacientes();
                            } else {
                                Alert.alert("Error", result.message || "No se pudo eliminar el paciente");
                            }
                        } catch (error) {
                            Alert.alert("Error", "No se pudo eliminar el paciente");
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
                data={pacientes}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <PacientesCard
                        paciente={item}
                        onEdit={() => handleEditar(item)}
                        onDelete={() => handleEliminar(item.id)}
                    />
                )}
                ListEmptyComponent={<Text style={styles.empty}>No hay pacientes registrados</Text>}
            />

            <View style={styles.botonesContainer}>
                <TouchableOpacity style={styles.botonCrear} onPress={handleCrear}>
                    <Text style={styles.textoBoton}>Nuevo Paciente</Text>
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
