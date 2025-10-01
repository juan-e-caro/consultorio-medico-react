import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert } from "react-native";
import { useState, useEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { obtenerConsultorio } from "../../Src/Services/ConsultoriosService";

export default function DetalleConsultorio() {
  const route = useRoute();
  const navigation = useNavigation();
  const { consultorioId } = route.params;

  const [consultorio, setConsultorio] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargar = async () => {
      try {
        const result = await obtenerConsultorio(consultorioId);
        if (result.success) setConsultorio(result.data);
        else {
          Alert.alert("Error", result.message || "No se pudo cargar el consultorio");
          navigation.goBack();
        }
      } catch {
        Alert.alert("Error", "Ocurrió un error al cargar el consultorio");
        navigation.goBack();
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, [consultorioId]);

  if (loading) return <Loading texto="Cargando consultorio..." />;
  if (!consultorio) return <Empty texto="No se encontró el consultorio." />;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Detalle de Consultorio</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Número:</Text>
        <Text style={styles.value}>{consultorio.numero}</Text>

        <Text style={styles.label}>Ubicación:</Text>
        <Text style={styles.value}>{consultorio.ubicacion}</Text>
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
