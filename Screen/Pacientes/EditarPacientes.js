import { useState } from "react";
import {View,Text,TextInput,StyleSheet,TouchableOpacity,Alert,ActivityIndicator,ScrollView,KeyboardAvoidingView,Platform,} from "react-native";
import { crearPaciente, EditarPaciente } from "../../Src/Services/PacientesService";

export default function EditarPacientes({ navigation, route }) {
  const paciente = route.params?.paciente;

  const [nombre, setNombre] = useState(paciente ? paciente.nombre : "");
  const [documento, setDocumento] = useState(paciente ? paciente.documento : "");
  const [telefono, setTelefono] = useState(paciente ? paciente.telefono : "");
  const [direccion, setDireccion] = useState(paciente ? paciente.direccion : "");
  const [nacimiento, setNacimiento] = useState(paciente ? paciente.nacimiento : "");
  const [genero, setGenero] = useState(paciente ? paciente.genero : "");
  const [loading, setLoading] = useState(false);

  const esEdicion = !!paciente;

  const handleGuardar = async () => {
    if (!nombre || !documento || !telefono || !direccion || !nacimiento || !genero) {
      Alert.alert("Campos requeridos", "Por favor completa todos los campos");
      return;
    }

    setLoading(true);
    try {
      const payload = { nombre, documento, telefono, direccion, nacimiento, genero };

      let result;
      if (esEdicion) {
        result = await EditarPacientes(paciente.id, payload);
      } else {
        result = await crearPaciente(payload);
      }

      if (result?.success) {
        Alert.alert(
          "Éxito",
          esEdicion
            ? "Paciente actualizado correctamente"
            : "Paciente creado correctamente"
        );
        navigation.goBack();
      } else {
        Alert.alert("Error", result?.message || "No se pudo guardar el paciente");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar el paciente");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelar = () => {
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>
          {esEdicion ? "Editar Paciente" : "Nuevo Paciente"}
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={nombre}
          onChangeText={setNombre}
        />

        <TextInput
          style={styles.input}
          placeholder="Documento"
          keyboardType="numeric"
          value={documento}
          onChangeText={setDocumento}
        />

        <TextInput
          style={styles.input}
          placeholder="Teléfono"
          keyboardType="phone-pad"
          value={telefono}
          onChangeText={setTelefono}
        />

        <TextInput
          style={styles.input}
          placeholder="Dirección"
          value={direccion}
          onChangeText={setDireccion}
        />

        <TextInput
          style={styles.input}
          placeholder="Fecha de nacimiento (YYYY-MM-DD)"
          value={nacimiento}
          onChangeText={setNacimiento}
        />

        <Text style={styles.label}>Género:</Text>
        <View style={styles.generoContainer}>
          {["Masculino", "Femenino", "Otro"].map((item) => (
            <TouchableOpacity
              key={item}
              style={[styles.generoButton, genero === item && styles.generoSelected]}
              onPress={() => setGenero(item)}
              disabled={loading}
            >
              <Text
                style={[styles.generoText, genero === item && styles.generoTextSelected]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
        ) : (
          <>
            <TouchableOpacity
              style={[styles.botonGuardar, loading && { opacity: 0.6 }]}
              onPress={handleGuardar}
              disabled={loading}
            >
              <Text style={styles.botonText}>
                {esEdicion ? "Actualizar" : "Guardar"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.botonCancelar, loading && { opacity: 0.6 }]}
              onPress={handleCancelar}
              disabled={loading}
            >
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
  label: {
    marginBottom: 5,
    fontWeight: "bold",
  },
  generoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  generoButton: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 8,
    alignItems: "center",
  },
  generoSelected: {
    backgroundColor: "#007bff",
    borderColor: "#007bff",
  },
  generoText: {
    color: "#000",
  },
  generoTextSelected: {
    color: "#fff",
    fontWeight: "bold",
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
