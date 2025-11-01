import { useEffect, useState } from "react";
import {View,Text,TextInput,StyleSheet,TouchableOpacity,Alert, ActivityIndicator,ScrollView,KeyboardAvoidingView,Platform,} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";

import { crearPacientes, editarPacientes } from "../../Src/Services/PacientesService";
import { listarUsuarios } from "../../Src/Services/UsuariosService";

export default function EditarPacientes({ navigation, route }) {
  const paciente = route.params?.paciente;

  const [usuarios, setUsuarios] = useState([]);
  const [idUsuario, setIdUsuario] = useState(paciente ? String(paciente.idUsuario) : "");
  const [documento, setDocumento] = useState(paciente ? paciente.documento : "");
  const [telefono, setTelefono] = useState(paciente ? paciente.telefono : "");
  const [direccion, setDireccion] = useState(paciente ? paciente.direccion : "");
  const [nacimiento, setNacimiento] = useState(
    paciente && paciente.nacimiento ? new Date(paciente.nacimiento) : new Date()
  );
  const [genero, setGenero] = useState(paciente ? paciente.genero : "Masculino");
  const [showPicker, setShowPicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const esEdicion = !!paciente;

  useEffect(() => {
    async function fetchUsuarios() {
      try {
        const response = await listarUsuarios();
        if (response.success) {
          const pacientesUsuarios = response.data.filter(
            (usuario) => usuario.roles === "Paciente"
          );
          setUsuarios(pacientesUsuarios);
        } else {
          setUsuarios([]);
          Alert.alert("Error", "No se pudieron cargar los usuarios.");
        }
      } catch (error) {
        Alert.alert("Error", "No se pudo conectar al servidor.");
      }
    }
    fetchUsuarios();
  }, []);

  const handleGuardar = async () => {
    if (!idUsuario || !documento || !telefono || !direccion || !nacimiento || !genero) {
      Alert.alert("Campos requeridos", "Por favor completa todos los campos");
      return;
    }

    if (nacimiento > new Date()) {
      Alert.alert("Fecha inválida", "La fecha de nacimiento no puede ser futura");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        idUsuario: String(idUsuario),
        documento,
        telefono,
        direccion,
        nacimiento: nacimiento.toISOString().split("T")[0],
        genero,
      };

      const result = esEdicion
        ? await editarPacientes(paciente.id, payload)
        : await crearPacientes(payload);

      if (result.success) {
        Alert.alert(
          "Éxito",
          esEdicion ? "Paciente actualizado correctamente" : "Paciente creado correctamente"
        );
        navigation.goBack();
      } else {
        Alert.alert("Error", result.message || "No se pudo guardar el paciente");
      }
    } catch (error) {
      Alert.alert("Error", "Error al guardar el paciente");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelar = () => navigation.goBack();

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>
          {esEdicion ? "Editar Paciente" : "Nuevo Paciente"}
        </Text>

        {/* Usuario */}
        <Text style={styles.label}>Usuario:</Text>
        <Picker
          selectedValue={idUsuario}
          onValueChange={(value) => setIdUsuario(value)}
          style={styles.input}
          enabled={!loading}
        >
          <Picker.Item label="Seleccione un usuario" value="" />
          {usuarios.map((usuario) => (
            <Picker.Item key={usuario.id} label={usuario.nombre} value={String(usuario.id)} />
          ))}
        </Picker>

        {/* Documento */}
        <Text style={styles.label}>Documento:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese documento"
          keyboardType="numeric"
          value={documento}
          onChangeText={setDocumento}
          editable={!loading}
        />

        {/* Teléfono */}
        <Text style={styles.label}>Teléfono:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese teléfono"
          keyboardType="phone-pad"
          value={telefono}
          onChangeText={setTelefono}
          editable={!loading}
        />

        {/* Dirección */}
        <Text style={styles.label}>Dirección:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese dirección"
          value={direccion}
          onChangeText={setDireccion}
          editable={!loading}
        />

        {/* Fecha de nacimiento */}
        <Text style={styles.label}>Fecha de nacimiento:</Text>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowPicker(true)}
          disabled={loading}
        >
          <Text>{nacimiento.toISOString().split("T")[0]}</Text>
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            value={nacimiento}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowPicker(false);
              if (selectedDate) setNacimiento(selectedDate);
            }}
          />
        )}

        {/* Género */}
        <Text style={styles.label}>Género:</Text>
        <Picker
          selectedValue={genero}
          onValueChange={(value) => setGenero(value)}
          style={styles.input}
          enabled={!loading}
        >
          <Picker.Item label="Masculino" value="Masculino" />
          <Picker.Item label="Femenino" value="Femenino" />
          <Picker.Item label="Otro" value="Otro" />
        </Picker>

        {/* Botones */}
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
        ) : (
          <>
            <TouchableOpacity
              style={styles.botonGuardar}
              onPress={handleGuardar}
              disabled={loading}
            >
              <Text style={styles.botonText}>
                {esEdicion ? "Actualizar" : "Guardar"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.botonCancelar}
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
  dateButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    alignItems: "center",
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
