import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert } from "react-native";
import { useState, useEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { obtenerCita } from "../../Src/Services/CitasService";

export default function DetalleCita() {
  const route = useRoute();
  const navigation = useNavigation();
  const { citaId } = route.params;

  const [cita, setCita] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargar = async () => {
      try {
        const result = await obtenerCita(citaId);
        if (result.success) setCita(result.data);
        else {
          Alert.alert("Error", result.message || "No se pudo cargar la cita");
          navigation.goBack();
        }
      } catch {
        Alert.alert("Error", "Ocurrió un error al cargar la cita");
        navigation.goBack();
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, [citaId]);

  if (loading) return <Loading texto="Cargando cita..." />;
  if (!cita) return <Empty texto="No se encontró la cita." />;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Detalle de Cita</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Paciente:</Text>
        <Text style={styles.value}>{cita.pacienteNombre}</Text>

        <Text style={styles.label}>doctores:</Text>
        <Text style={styles.value}>{cita.doctoresNombre}</Text>

        <Text style={styles.label}>Fecha:</Text>
        <Text style={styles.value}>{cita.fecha}</Text>

        <Text style={styles.label}>Horario:</Text>
        <Text style={styles.value}>{cita.horaInicio} - {cita.horaFin}</Text>

        <Text style={styles.label}>Estado:</Text>
        <Text style={styles.value}>{cita.estado}</Text>
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
