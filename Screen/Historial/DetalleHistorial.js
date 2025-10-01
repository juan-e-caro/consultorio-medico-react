import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert } from "react-native";
import { useState, useEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { obtenerHistorial } from "../../Src/Services/HistorialService";

export default function DetalleHistorial() {
  const route = useRoute();
  const navigation = useNavigation();
  const { historialId } = route.params;

  const [historial, setHistorial] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargar = async () => {
      try {
        const result = await obtenerHistorial(historialId);
        if (result.success) setHistorial(result.data);
        else {
          Alert.alert("Error", result.message || "No se pudo cargar el historial");
          navigation.goBack();
        }
      } catch {
        Alert.alert("Error", "Ocurrió un error al cargar el historial");
        navigation.goBack();
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, [historialId]);

  if (loading) return <Loading texto="Cargando historial..." />;
  if (!historial) return <Empty texto="No se encontró el historial." />;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Detalle de Historial</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Paciente:</Text>
        <Text style={styles.value}>{historial.pacienteNombre}</Text>

        <Text style={styles.label}>Fecha:</Text>
        <Text style={styles.value}>{historial.fecha}</Text>

        <Text style={styles.label}>Diagnóstico:</Text>
        <Text style={styles.value}>{historial.diagnostico}</Text>

        <Text style={styles.label}>Tratamiento:</Text>
        <Text style={styles.value}>{historial.tratamiento}</Text>

        <Text style={styles.label}>Observaciones:</Text>
        <Text style={styles.value}>{historial.observaciones}</Text>
      </View>
    </ScrollView>
  );
}

function Loading({ texto }) {
  return (
    <View style={styles.centered}>
      <ActivityIndicator size="large" color="#1976D2" />
      <Text>{texto}</Text>
    </View>
  );
}
function Empty({ texto }) {
  return (
    <View style={styles.centered}>
      <Text>{texto}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  infoContainer: { backgroundColor: "#f0f0f0", padding: 16, borderRadius: 10 },
  label: { fontWeight: "bold", marginTop: 10, color: "#333" },
  value: { fontSize: 16, marginTop: 2, color: "#555" },
});
