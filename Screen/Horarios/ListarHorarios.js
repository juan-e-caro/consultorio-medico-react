import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet, Alert, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { listarHorarios, eliminarHorarios } from "../../Src/Services/HorariosService";
import HorariosCard from "../../components/HorariosCard";

export default function ListarHorarios() {
    const [horarios, setHorarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    const handleHorarios = async () => {
        setLoading(true);
        try {
            const result = await listarHorarios();
            if(result.success){
                setHorarios(result.data);
            } else {
                Alert.alert("Error", result.message || "No se pudieron cargar los horarios");
            }
        } catch (error) {
            Alert.alert("Error", "No se pudieron cargar los horarios");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', handleHorarios);
        return () => unsubscribe();
    }, [navigation]);

    const handleEditar = (horarios) => {
        navigation.navigate("EditarHorarios", { horarios });
    };

    const handleCrear = () => {
        navigation.navigate("EditarHorarios");
    };

    const handleEliminar = (id) => {
        Alert.alert(
            "Confirmar eliminación",
            "¿Estás seguro de que deseas eliminar este horario?",
            [
                { text: "Cancelar", style: "cancel" },
                { 
                    text: "Eliminar", 
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const result = await eliminarHorarios(id);
                            if(result.success){
                                handleHorarios();
                            } else {
                                Alert.alert("Error", result.message || "No se pudo eliminar el horario");
                            }
                        } catch (error) {
                            Alert.alert("Error", "No se pudo eliminar el horario");
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
                data={horarios}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <HorariosCard
                        horarios={item}
                        onEdit={() => handleEditar(item)}
                        onDelete={() => handleEliminar(item.id)}
                    />
                )}
                ListEmptyComponent={<Text style={styles.empty}>No hay horarios registrados</Text>}
            />

            <View style={styles.botonesContainer}>
                <TouchableOpacity style={styles.botonCrear} onPress={handleCrear}>
                    <Text style={styles.textoBoton}>Nuevo Horario</Text>
                </TouchableOpacity>

                <Button
                    title="Volver al Inicio"
                    onPress={() => navigation.navigate("Inicio")}
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
