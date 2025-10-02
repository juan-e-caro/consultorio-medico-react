import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet, Alert, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { listardoctores, eliminarDoctores } from "../../Src/Services/DoctoresService";
import DoctoresCard from "../../components/DoctoresCard";

export default function ListarDoctores() {
    const [doctores, setDoctores] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    const handleDoctores = async () => {
    setLoading(true);
    try {
        const result = await listardoctores();
        console.log("RESULTADO DE DOCTORES:", JSON.stringify(result.data, null, 2));
        
        if (result.success) {
        setDoctores(result.data);
        } else {
        Alert.alert("Error", result.message || "No se pudieron cargar los doctores");
        }
    } catch (error) {
        console.error("Error al cargar doctores:", error);
        Alert.alert("Error", "No se pudieron cargar los doctores");
    } finally {
        setLoading(false);
    }
    };


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', handleDoctores);
        return () => unsubscribe();
    }, [navigation]);

    const handleEditar = (doctores) => {
        navigation.navigate("EditarDoctores", { doctores });
    };

    const handleCrear = () => {
        navigation.navigate("EditarDoctores");
    };

    const handleEliminar = (id) => {
        Alert.alert(
            "Confirmar eliminación",
            "¿Estás seguro de que deseas eliminar este doctor?",
            [
                { text: "Cancelar", style: "cancel" },
                { 
                    text: "Eliminar", 
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const result = await eliminarDoctores(id);
                            if(result.success){
                                handleDoctores();
                            } else {
                                Alert.alert("Error", result.message || "No se pudo eliminar el doctor");
                            }
                        } catch (error) {
                            Alert.alert("Error", "No se pudo eliminar el doctor");
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
                data={doctores}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <DoctoresCard
                        doctores={item}
                        onEdit={() => handleEditar(item)}
                        onDelete={() => handleEliminar(item.id)}
                    />
                )}
                ListEmptyComponent={<Text style={styles.empty}>No hay doctores registrados</Text>}
            />

            <View style={styles.botonesContainer}>
                <TouchableOpacity style={styles.botonCrear} onPress={handleCrear}>
                    <Text style={styles.textoBoton}>Nuevo doctor</Text>
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
