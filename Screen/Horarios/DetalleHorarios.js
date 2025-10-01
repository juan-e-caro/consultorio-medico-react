import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert } from "react-native";
import { useState, useEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { obtenerHorario } from "../../Src/Services/HorariosService";

export default function DetalleHorario() {
  const route = useRoute();
  const navigation = useNavigation();
  const { horarioId } = route.params;

  const [horario, setHorario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargar = async () => {
      try {
        const result = await obtenerHorario(horarioId);
        if (result.success) setHorario(result.data);
        else {
          Alert.alert("Error", result.message || "No se pudo cargar el horario");
          navigation.goBack();
        }
      } catch {
        Alert.alert("Error", "Ocurrió un error al cargar el horario");
        navigation.goBack();
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, [horarioId]);

  if (loading) return <Loading texto="Cargando horario..." />;
  if (!horario) return <Empty texto="No se encontró el horario." />;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Detalle de Horario</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>doctores:</Text>
        <Text style={styles.value}>{horario.doctoresNombre}</Text>

        <Text style={styles.label}>Día:</Text>
        <Text style={styles.value}>{horario.dia}</Text>

        <Text style={styles.label}>Hora inicio:</Text>
        <Text style={styles.value}>{horario.horaInicio}</Text>

        <Text style={styles.label}>Hora fin:</Text>
        <Text style={styles.value}>{horario.horaFin}</Text>

        <Text style={styles.label}>Consultorio:</Text>
        <Text style={styles.value}>{horario.consultorioNumero}</Text>
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
