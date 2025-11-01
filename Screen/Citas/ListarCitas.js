import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet, Alert, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { listarCitas, eliminarCitas } from "../../Src/Services/CitasService";
import CitasCard from "../../components/CitasCard";

export default function ListarCitas() {
    const [citas, setCitas] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    const handleCitas = async () => {
        setLoading(true);
        try {
            const result = await listarCitas();
            if(result.success){
                setCitas(result.data);
            } else {
                Alert.alert("Error", result.message || "No se pudieron cargar las citas");
            }
        } catch (error) {
            Alert.alert("Error", "No se pudieron cargar los citas");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', handleCitas);
        return () => unsubscribe();
    }, [navigation]);

    const handleEditar = (cita) => {
        navigation.navigate("EditarCitas", { cita });
    };

    const handleCrear = () => {
        navigation.navigate("EditarCitas");
    };

    const handleEliminar = (id) => {
        Alert.alert(
            "Confirmar eliminación",
            "¿Estás seguro de que deseas eliminar esta cita?",
            [
                { text: "Cancelar", style: "cancel" },
                { 
                    text: "Eliminar", 
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const result = await eliminarCitas(id);
                            if(result.success){
                                handleCitas();
                            } else {
                                Alert.alert("Error", result.message || "No se pudo eliminar la cita");
                            }
                        } catch (error) {
                            Alert.alert("Error", "No se pudo eliminar la cita");
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
                data={citas}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <CitasCard
                        cita={item}
                        onEdit={() => handleEditar(item)}
                        onDelete={() => handleEliminar(item.id)}
                    />
                )}
                ListEmptyComponent={<Text style={styles.empty}>No hay citas registradas</Text>}
            />

            <View style={styles.botonesContainer}>
                <TouchableOpacity style={styles.botonCrear} onPress={handleCrear}>
                    <Text style={styles.textoBoton}>Nueva Cita</Text>
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
