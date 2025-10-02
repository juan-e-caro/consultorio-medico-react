import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert } from "react-native";
import { useState, useEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { obtenerUsuario } from "../../Src/Services/UsuariosService";

export default function DetalleUsuarios() {
  const route = useRoute();
  const navigation = useNavigation();
  const { usuarioId } = route.params; // id pasado desde ListarUsuarios

  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarUsuario = async () => {
      setLoading(true);
      try {
        const result = await obtenerUsuario(usuarioId);
        if (result.success) {
          setUsuario(result.data);
        } else {
          Alert.alert("Error", result.message || "No se pudo cargar el usuario");
          navigation.goBack();
        }
      } catch (error) {
        Alert.alert("Error", "Ocurrió un error al cargar el usuario");
        navigation.goBack();
      } finally {
        setLoading(false);
      }
    };

    cargarUsuario();
  }, [usuarioId]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#1976D2" />
        <Text>Cargando usuario...</Text>
      </View>
    );
  }

  if (!usuario) {
    return (
      <View style={styles.centered}>
        <Text>No se encontró el usuario.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Detalle de Usuario</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Nombre:</Text>
        <Text style={styles.value}>{usuario.nombre}</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{usuario.email}</Text>

        <Text style={styles.label}>Rol:</Text>
        <Text style={styles.value}>{usuario.rol}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  infoContainer: {
    backgroundColor: "#f0f0f0",
    padding: 16,
    borderRadius: 10,
  },
  label: {
    fontWeight: "bold",
    marginTop: 10,
    color: "#333",
  },
  value: {
    fontSize: 16,
    marginTop: 2,
    color: "#555",
  },
});
