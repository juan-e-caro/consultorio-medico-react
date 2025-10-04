import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert } from "react-native";
import { useState, useEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { obtenerdoctores } from "../../Src/Services/DoctoresService";

export default function Detalledoctores() {
  const route = useRoute();
  const navigation = useNavigation();
  const { idDoctores } = route.params;

  const [doctores, setdoctores] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargar = async () => {
      try {
        const result = await obtenerdoctores(idDoctores);
        if (result.success) setdoctores(result.data);
        else {
          Alert.alert("Error", result.message || "No se pudo cargar el doctores");
          navigation.goBack();
        }
      } catch {
        Alert.alert("Error", "Ocurrió un error al cargar el doctores");
        navigation.goBack();
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, [idDoctores]);

  if (loading) return <Loading texto="Cargando doctores..." />;
  if (!doctores) return <Empty texto="No se encontró el doctores." />;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Detalle de doctores</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Nombre:</Text>
        <Text style={styles.value}>{doctores.nombre}</Text>

        <Text style={styles.label}>Especialidad:</Text>
        <Text style={styles.value}>{doctores.especialidad}</Text>

        <Text style={styles.label}>Cédula:</Text>
        <Text style={styles.value}>{doctores.cedula}</Text>

        <Text style={styles.label}>Teléfono:</Text>
        <Text style={styles.value}>{doctores.telefono}</Text>
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
