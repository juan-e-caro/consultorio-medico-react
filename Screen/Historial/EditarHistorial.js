import { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { crearHistorial, editarHistorial } from "../../Src/Services/HistorialService";

export default function EditarHistorial({ navigation, route }) {
  const historial = route.params?.historial;

  const [nombre, setNombre] = useState(historial ? historial.nombre : ""); // viene de paciente
  const [fecha, setFecha] = useState(historial ? historial.fecha : ""); // viene de citas
  const [diagnostico, setDiagnostico] = useState(historial ? historial.diagnostico : "");
  const [tratamiento, setTratamiento] = useState(historial ? historial.tratamiento : "");
  const [observaciones, setObservaciones] = useState(historial ? historial.observaciones : "");
  const [loading, setLoading] = useState(false);

  const esEdicion = !!historial;

  const handleGuardar = async () => {
    if (!nombre || !fecha || !diagnostico) {
      Alert.alert("Campos requeridos", "Por favor completa al menos nombre, fecha y diagnóstico");
      return;
    }

    setLoading(true);
    try {
      const payload = { nombre, fecha, diagnostico, tratamiento, observaciones };

      let result;
      if (esEdicion) {
        result = await editarHistorial(historial.id, payload);
      } else {
        result = await crearHistorial(payload);
      }

      if (result.success) {
        Alert.alert("Éxito", esEdicion ? "Historial actualizado correctamente" : "Historial creado correctamente");
        navigation.goBack();
      } else {
        Alert.alert("Error", result.message || "No se pudo guardar el historial");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar el historial");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelar = () => {
    navigation.navigate("ListarHistorial");
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{esEdicion ? "Editar Historial" : "Nuevo Historial"}</Text>

        <TextInput
          style={styles.input}
          placeholder="Nombre del paciente"
          value={nombre}
          onChangeText={setNombre}
        />

        <TextInput
          style={styles.input}
          placeholder="Fecha (YYYY-MM-DD)"
          value={fecha}
          onChangeText={setFecha}
        />

        <TextInput
          style={styles.input}
          placeholder="Diagnóstico"
          value={diagnostico}
          onChangeText={setDiagnostico}
        />

        <TextInput
          style={styles.input}
          placeholder="Tratamiento"
          value={tratamiento}
          onChangeText={setTratamiento}
        />

        <TextInput
          style={styles.input}
          placeholder="Observaciones"
          value={observaciones}
          onChangeText={setObservaciones}
          multiline
          numberOfLines={3}
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
