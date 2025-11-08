import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";

import { crearHorarios, EditarHorarios } from "../../Src/Services/HorariosService";
import { listarDoctores } from "../../Src/Services/DoctoresService";
import { listarConsultorios } from "../../Src/Services/ConsultoriosService";

export default function EditarHorario({ navigation, route }) {
  const horario = route.params?.horario;

  const [doctores, setDoctores] = useState([]);
  const [consultorios, setConsultorios] = useState([]);

  const [idDoctor, setIdDoctor] = useState(horario ? String(horario.idDoctor) : "");
  const [idConsultorio, setIdConsultorio] = useState(
    horario ? String(horario.idConsultorio) : ""
  );
  const [horaInicio, setHoraInicio] = useState(
    horario ? new Date(`2025-01-01T${horario.horaInicio}`) : new Date()
  );
  const [horaFin, setHoraFin] = useState(
    horario ? new Date(`2025-01-01T${horario.horaFin}`) : new Date()
  );

  const [showInicioPicker, setShowInicioPicker] = useState(false);
  const [showFinPicker, setShowFinPicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const esEdicion = !!horario;

  useEffect(() => {
    async function fetchData() {
      try {
        const [resDoctores, resConsultorios] = await Promise.all([
          listarDoctores(),
          listarConsultorios(),
        ]);

        if (resDoctores.success) setDoctores(resDoctores.data || []);
        if (resConsultorios.success) setConsultorios(resConsultorios.data || []);
      } catch (error) {
        Alert.alert("Error", "No se pudieron cargar los datos.");
      }
    }
    fetchData();
  }, []);

  const handleGuardar = async () => {
    if (!idDoctor || !idConsultorio || !horaInicio || !horaFin) {
      Alert.alert("Campos requeridos", "Por favor completa todos los campos");
      return;
    }

    // Validación simple de rango horario
    if (horaInicio >= horaFin) {
      Alert.alert("Error", "La hora de inicio debe ser menor que la hora de fin");
      return;
    }

    // Función para formatear a HH:mm
    const formatTime = (date) => {
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    };

    setLoading(true);
    try {
      const payload = {
        idDoctor: Number(idDoctor),
        idConsultorio: Number(idConsultorio),
        horaInicio: formatTime(horaInicio),
        horaFin: formatTime(horaFin),
      };

      const result = esEdicion
        ? await EditarHorarios(horario.id, payload)
        : await crearHorarios(payload);

      if (result.success) {
        Alert.alert(
          "Éxito",
          esEdicion ? "Horario actualizado correctamente" : "Horario creado correctamente"
        );
        navigation.goBack();
      } else {
        Alert.alert("Error", result.message || "No se pudo guardar el horario");
      }
    } catch (error) {
      console.error("Error al guardar horario:", error);
      Alert.alert("Error", "Error al guardar el horario");
    } finally {
      setLoading(false);
    }
  };


  const handleCancelar = () => navigation.goBack();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>
          {esEdicion ? "Editar Horario" : "Nuevo Horario"}
        </Text>

        {/* Doctor */}
        <Text style={styles.label}>Doctor:</Text>
        <Picker
          selectedValue={idDoctor}
          onValueChange={(value) => setIdDoctor(value)}
          style={styles.input}
          enabled={!loading}
        >
          <Picker.Item label="Seleccione un doctor" value="" />
          {doctores.map((doc) => (
            <Picker.Item
              key={doc.id}
              label={doc.usuarios?.nombre || doc.nombre || "Sin nombre"}
              value={String(doc.id)}
            />
          ))}
        </Picker>

        {/* Consultorio */}
        <Text style={styles.label}>Consultorio:</Text>
        <Picker
          selectedValue={idConsultorio}
          onValueChange={(value) => setIdConsultorio(value)}
          style={styles.input}
          enabled={!loading}
        >
          <Picker.Item label="Seleccione un consultorio" value="" />
          {consultorios.map((c) => (
            <Picker.Item key={c.id} label={c.numero} value={String(c.id)} />
          ))}
        </Picker>

        {/* Hora de inicio */}
        <Text style={styles.label}>Hora de inicio:</Text>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowInicioPicker(true)}
          disabled={loading}
        >
          <Text>{horaInicio.toTimeString().split(" ")[0]}</Text>
        </TouchableOpacity>

        {showInicioPicker && (
          <DateTimePicker
            value={horaInicio}
            mode="time"
            is24Hour
            display="default"
            onChange={(event, selectedDate) => {
              setShowInicioPicker(false);
              if (selectedDate) setHoraInicio(selectedDate);
            }}
          />
        )}

        {/* Hora de fin */}
        <Text style={styles.label}>Hora de fin:</Text>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowFinPicker(true)}
          disabled={loading}
        >
          <Text>{horaFin.toTimeString().split(" ")[0]}</Text>
        </TouchableOpacity>

        {showFinPicker && (
          <DateTimePicker
            value={horaFin}
            mode="time"
            is24Hour
            display="default"
            onChange={(event, selectedDate) => {
              setShowFinPicker(false);
              if (selectedDate) setHoraFin(selectedDate);
            }}
          />
        )}

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
  label: {
    marginBottom: 5,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
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
