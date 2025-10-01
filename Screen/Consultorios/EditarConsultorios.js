import { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { crearConsultorios, editarConsultorios } from "../../Src/Services/ConsultoriosService";

export default function EditarConsultorio({ navigation, route }) {
  const consultorio = route.params?.consultorio;

  const [numero, setNumero] = useState(consultorio ? consultorio.numero : "");
  const [ubicacion, setUbicacion] = useState(consultorio ? consultorio.ubicacion : "");
  const [loading, setLoading] = useState(false);

  const esEdicion = !!consultorio;

  const handleGuardar = async () => {
    if (!numero || !ubicacion) {
      Alert.alert("Campos requeridos", "Por favor completa todos los campos");
      return;
    }

    setLoading(true);
    try {
      const payload = { numero, ubicacion };

      let result;
      if (esEdicion) {
        result = await editarConsultorios(consultorio.id, payload);
      } else {
        result = await crearConsultorios(payload);
      }

      if (result.success) {
        Alert.alert("Éxito", esEdicion ? "Consultorio actualizado correctamente" : "Consultorio creado correctamente");
        navigation.goBack();
      } else {
        Alert.alert("Error", result.message || "No se pudo guardar el consultorio");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar el consultorio");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelar = () => {
    navigation.navigate("ListarConsultorios");
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{esEdicion ? "Editar Consultorio" : "Nuevo Consultorio"}</Text>

        <TextInput
          style={styles.input}
          placeholder="Número"
          value={numero}
          onChangeText={setNumero}
        />

        <TextInput
          style={styles.input}
          placeholder="Ubicación"
          value={ubicacion}
          onChangeText={setUbicacion}
        />

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
        ) : (
          <>
            <TouchableOpacity style={styles.botonGuardar} onPress={handleGuardar}>
              <Text style={styles.botonText}>{esEdicion ? "Actualizar" : "Guardar"}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botonCancelar} onPress={handleCancelar}>
              <Text style={styles.botonTextCancelar}>Cancelar</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  botonGuardar: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  botonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  botonCancelar: {
    backgroundColor: "#D32F2F",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  botonTextCancelar: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
