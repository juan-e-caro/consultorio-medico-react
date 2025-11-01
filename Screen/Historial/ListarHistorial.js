import { 
  View, 
  Text, 
  FlatList, 
  ActivityIndicator, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  RefreshControl 
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState, useCallback } from "react";
import { listarHistorial, eliminarHistorial } from "../../Src/Services/HistorialService";
import HistorialCard from "../../components/HistorialCard";

export default function ListarHistorial() {
  const [historial, setHistorial] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const handleHistorial = useCallback(async () => {
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
      setRefreshing(false);
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
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de Pacientes</Text>

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
        ListEmptyComponent={
          <Text style={styles.empty}>No hay historial registrado</Text>
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              handleHistorial();
            }}
          />
        }
      />

      <View style={styles.botonesContainer}>
        <TouchableOpacity style={styles.botonGuardar} onPress={handleCrear}>
          <Text style={styles.botonText}>Nuevo Historial</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botonCancelar}
          onPress={() => navigation.navigate("InicioHome")}
        >
          <Text style={styles.botonTextCancelar}>Volver al Inicio</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  empty: {
    textAlign: "center",
    marginTop: 40,
    color: "#888",
    fontSize: 16,
  },
  botonesContainer: {
    marginTop: 20,
  },
  botonGuardar: {
    backgroundColor: "#1976D2",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  botonCancelar: {
    backgroundColor: "#D32F2F",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  botonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  botonTextCancelar: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
