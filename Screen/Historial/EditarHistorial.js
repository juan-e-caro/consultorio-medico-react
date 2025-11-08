import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

import { crearHistorial, editarHistorial } from "../../Src/Services/HistorialService";
import { listarPacientes } from "../../Src/Services/PacientesService";
import { listarCitas } from "../../Src/Services/CitasService";

export default function EditarHistorial({ navigation, route }) {
  const historial = route.params?.historial;

  const [pacientes, setPacientes] = useState([]);
  const [citas, setCitas] = useState([]);

  const [idPaciente, setIdPaciente] = useState(historial ? String(historial.idPaciente) : "");
  const [idCita, setIdCita] = useState(historial ? String(historial.idCita) : "");
  const [diagnostico, setDiagnostico] = useState(historial?.diagnostico || "");
  const [tratamiento, setTratamiento] = useState(historial?.tratamiento || "");
  const [observaciones, setObservaciones] = useState(historial?.observaciones || "");
  const [loading, setLoading] = useState(false);

  const esEdicion = !!historial;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pacientesResponse, citasResponse] = await Promise.all([
          listarPacientes(),
          listarCitas(),
        ]);

        if (pacientesResponse.success) {
          setPacientes(pacientesResponse.data || []);
        } else {
          setPacientes([]);
          Alert.alert("Error", "No se pudieron cargar los pacientes");
        }

        if (citasResponse.success) {
          setCitas(citasResponse.data || []);
        } else {
          setCitas([]);
          Alert.alert("Error", "No se pudieron cargar las citas");
        }
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "No se pudo cargar la información del servidor");
      }
    };

    fetchData();
  }, []);

  const handleGuardar = async () => {
    if (!idPaciente || !idCita || !diagnostico.trim()) {
      Alert.alert("Campos requeridos", "Por favor completa los campos obligatorios");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        idPaciente: Number(idPaciente),
        idCita: Number(idCita),
        diagnostico: diagnostico.trim(),
        tratamiento: tratamiento.trim(),
        observaciones: observaciones.trim(),
      };

      const result = esEdicion
        ? await editarHistorial(historial.id, payload)
        : await crearHistorial(payload);

      if (result?.success) {
        Alert.alert(
          "Éxito",
          esEdicion
            ? "Historial actualizado correctamente"
            : "Historial creado correctamente",
          [{ text: "OK", onPress: () => navigation.goBack() }]
        );
      } else {
        Alert.alert("Error", result?.message || "No se pudo guardar el historial");
      }
    } catch (error) {
      console.error("Error al guardar historial:", error);
      Alert.alert("Error", "No se pudo guardar el historial");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>
          {esEdicion ? "Editar Historial" : "Nuevo Historial"}
        </Text>

        {/* Paciente */}
        <Text style={styles.label}>Paciente:</Text>
        <Picker
          selectedValue={idPaciente}
          onValueChange={(value) => setIdPaciente(value)}
          enabled={!loading}
          style={styles.input}
        >
          <Picker.Item label="Seleccione un paciente" value="" />
          {pacientes.map((paciente) => (
            <Picker.Item
              key={paciente.id}
              label={paciente.nombre || paciente.usuarios?.nombre || "Sin nombre"}
              value={String(paciente.id)}
            />
          ))}
        </Picker>

        {/* Cita */}
        <Text style={styles.label}>Cita:</Text>
        <Picker
          selectedValue={idCita}
          onValueChange={(value) => setIdCita(value)}
          enabled={!loading}
          style={styles.input}
        >
          <Picker.Item label="Seleccione una cita" value="" />
          {citas.map((cita) => (
            <Picker.Item
              key={cita.id}
              label={cita.fecha ? cita.fecha : "Sin fecha"}
              value={String(cita.id)}
            />
          ))}
        </Picker>

        {/* Diagnóstico */}
        <Text style={styles.label}>Diagnóstico:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese diagnóstico"
          value={diagnostico}
          onChangeText={setDiagnostico}
          editable={!loading}
        />

        {/* Tratamiento */}
        <Text style={[styles.label, { marginTop: 10 }]}>Tratamiento:</Text>
        <TextInput
          style={[styles.input, styles.multiline]}
          placeholder="Ingrese tratamiento"
          value={tratamiento}
          onChangeText={setTratamiento}
          multiline
          editable={!loading}
        />

        {/* Observaciones */}
        <Text style={[styles.label, { marginTop: 10 }]}>Observaciones:</Text>
        <TextInput
          style={[styles.input, styles.multiline]}
          placeholder="Ingrese observaciones"
          value={observaciones}
          onChangeText={setObservaciones}
          multiline
          editable={!loading}
        />

        {/* Botones */}
        {loading ? (
          <ActivityIndicator size="large" color="#1976D2" style={{ marginTop: 20 }} />
        ) : (
          <>
            <TouchableOpacity style={styles.botonGuardar} onPress={handleGuardar}>
              <Text style={styles.botonText}>
                {esEdicion ? "Actualizar" : "Guardar"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.botonCancelar}
              onPress={() => navigation.goBack()}
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
    fontSize: 22,
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  multiline: {
    textAlignVertical: "top",
    height: 80,
  },
  botonGuardar: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  botonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  botonCancelar: {
    backgroundColor: "#D32F2F",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  botonTextCancelar: {
    color: "#fff",
    fontWeight: "bold",
  },
});
