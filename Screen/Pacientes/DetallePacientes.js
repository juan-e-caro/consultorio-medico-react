import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert } from "react-native";
import { useState, useEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { obtenerPaciente } from "../../Src/Services/PacientesService";

export default function DetallePaciente() {
  const route = useRoute();
  const navigation = useNavigation();
  const { pacienteId } = route.params;

  const [paciente, setPaciente] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargar = async () => {
      try {
        const result = await obtenerPaciente(pacienteId);
        if (result.success) setPaciente(result.data);
        else {
          Alert.alert("Error", result.message || "No se pudo cargar el paciente");
          navigation.goBack();
        }
      } catch {
        Alert.alert("Error", "Ocurrió un error al cargar el paciente");
        navigation.goBack();
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, [pacienteId]);

  if (loading) return <Loading texto="Cargando paciente..." />;
  if (!paciente) return <Empty texto="No se encontró el paciente." />;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Detalle de Paciente</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Nombre:</Text>
        <Text style={styles.value}>{paciente.nombre}</Text>

        <Text style={styles.label}>Documento:</Text>
        <Text style={styles.value}>{paciente.documento}</Text>

        <Text style={styles.label}>Teléfono:</Text>
        <Text style={styles.value}>{paciente.telefono}</Text>

        <Text style={styles.label}>Dirección:</Text>
        <Text style={styles.value}>{paciente.direccion}</Text>

        <Text style={styles.label}>Nacimiento:</Text>
        <Text style={styles.value}>{paciente.nacimiento}</Text>

        <Text style={styles.label}>Género:</Text>
        <Text style={styles.value}>{paciente.genero}</Text>
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
