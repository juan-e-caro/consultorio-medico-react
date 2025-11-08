import { 
  View, 
  Text, 
  FlatList, 
  ActivityIndicator, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  Button 
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState, useCallback } from "react";
import { listarHistorial, eliminarHistorial } from "../../Src/Services/HistorialService";
import HistorialCard from "../../components/HistorialCard";

export default function ListarHistorial() {
  const [historial, setHistorial] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const handleHistorial = useCallback(async () => {
    setLoading(true);
    try {
      const result = await listarHistorial();
      if (result.success) {
        setHistorial(result.data);
      } else {
        Alert.alert("Error", result.message || "No se pudo cargar el historial");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo cargar el historial");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    handleHistorial();
    const unsubscribe = navigation.addListener("focus", handleHistorial);
    return unsubscribe;
  }, [navigation, handleHistorial]);

  const handleEditar = (historial) => {
    navigation.navigate("EditarHistorial", { historial });
  };

  const handleCrear = () => {
    navigation.navigate("EditarHistorial");
  };

  const handleEliminar = (id) => {
    Alert.alert(
      "Confirmar eliminación",
      "¿Estás seguro de que deseas eliminar este historial?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              const result = await eliminarHistorial(id);
              if (result.success) {
                handleHistorial();
              } else {
                Alert.alert("Error", result.message || "No se pudo eliminar el historial");
              }
            } catch (error) {
              Alert.alert("Error", "No se pudo eliminar el historial");
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#1976D2" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={historial}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <HistorialCard
            historial={item}
            onEdit={() => handleEditar(item)}
            onDelete={() => handleEliminar(item.id)}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No hay historial registrado</Text>}
      />

      <View style={styles.botonesContainer}>
        <TouchableOpacity style={styles.botonCrear} onPress={handleCrear}>
          <Text style={styles.textoBoton}>Nuevo Historial</Text>
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
