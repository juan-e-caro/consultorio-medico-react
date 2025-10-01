import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet, Alert, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { listarConsultorios, eliminarConsultorios} from "../../Src/Services/ConsultoriosService";
import ConsultoriosCard from "../../components/ConsultoriosCard";

export default function ListarConsultorios() {
    const [consultorios, setConsultorios] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    const handleConsultorios = async () => {
        setLoading(true);
        try {
            const result = await listarConsultorios();
            if(result.success){
                setConsultorios(result.data);
            } else {
                Alert.alert("Error", result.message || "No se pudieron cargar los consultorios");
            }
        } catch (error) {
            Alert.alert("Error", "No se pudieron cargar los consultorios");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', handleConsultorios);
        return () => unsubscribe();
    }, [navigation]);

    const handleEditar = (consultorios) => {
        navigation.navigate("EditarConsultorios", { consultorios });
    };

    const handleCrear = () => {
        navigation.navigate("EditarConsultorios");
    };

    const handleEliminar = (id) => {
        Alert.alert(
            "Confirmar eliminación",
            "¿Estás seguro de que deseas eliminar esteconsultorio?",
            [
                { text: "Cancelar", style: "cancel" },
                { 
                    text: "Eliminar", 
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const result = await eliminarConsultorios(id);
                            if(result.success){
                                handleConsultorios();
                            } else {
                                Alert.alert("Error", result.message || "No se pudo eliminar el consultorio");
                            }
                        } catch (error) {
                            Alert.alert("Error", "No se pudo eliminar el consultorio");
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
                data={consultorios}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <ConsultoriosCard
                        consultorio={item}
                        onEdit={() => handleEditar(item)}
                        onDelete={() => handleEliminar(item.id)}
                    />
                )}
                ListEmptyComponent={<Text style={styles.empty}>No hay consultorios registrados</Text>}
            />

            <View style={styles.botonesContainer}>
                <TouchableOpacity style={styles.botonCrear} onPress={handleCrear}>
                    <Text style={styles.textoBoton}>Nuevo Consultorio</Text>
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
