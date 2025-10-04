import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { crearCitas, EditarCitas } from "../../Src/Services/CitasService";

export default function EditarCita({ navigation, route }) {
  const cita = route.params?.cita;

  const [pacienteId, setPacienteId] = useState(cita ? cita.pacienteId : "");
  const [idDoctores, setidDoctores] = useState(cita ? cita.idDoctores : "");
  const [fecha, setFecha] = useState(cita ? new Date(cita.fecha) : new Date());
  const [horaInicio, setHoraInicio] = useState(cita ? new Date(cita.horaInicio) : new Date());
  const [horaFin, setHoraFin] = useState(cita ? new Date(cita.horaFin) : new Date());
  const [estado, setEstado] = useState(cita ? cita.estado : "Pendiente");
  const [loading, setLoading] = useState(false);

  const [pacientes, setPacientes] = useState([]);
  const [doctores, setdoctores] = useState([]);

  const [showFecha, setShowFecha] = useState(false);
  const [showHoraInicio, setShowHoraInicio] = useState(false);
  const [showHoraFin, setShowHoraFin] = useState(false);

  const esEdicion = !!cita;

  const handleGuardar = async () => {
    if (!pacienteId || !idDoctores || !fecha || !horaInicio || !horaFin || !estado) {
      Alert.alert("Campos requeridos", "Por favor completa todos los campos");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        pacienteId,
        idDoctores,
        fecha: fecha.toISOString().split("T")[0], // YYYY-MM-DD
        horaInicio: horaInicio.toTimeString().split(" ")[0].slice(0,5), // HH:MM
        horaFin: horaFin.toTimeString().split(" ")[0].slice(0,5), // HH:MM
        estado,
      };

      let result;
      if (esEdicion) {
        result = await EditarCitas(cita.id, payload);
      } else {
        result = await crearCitas(payload);
      }

      if (result.success) {
        Alert.alert("Éxito", esEdicion ? "Cita actualizada correctamente" : "Cita creada correctamente");
        navigation.goBack();
      } else {
        Alert.alert("Error", result.message || "No se pudo guardar la cita");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar la cita");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelar = () => {
    navigation.navigate("ListarCitas");
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{esEdicion ? "Editar Cita" : "Nueva Cita"}</Text>

        <Text style={styles.label}>Paciente:</Text>
        <Picker
          selectedValue={pacienteId}
          onValueChange={(value) => setPacienteId(value)}
          style={styles.input}
        >
          <Picker.Item label="Seleccione un paciente" value="" />
          {pacientes.map((pac) => (
            <Picker.Item key={pac.id} label={pac.nombre} value={pac.id} />
          ))}
        </Picker>

        <Text style={styles.label}>doctores:</Text>
        <Picker
          selectedValue={idDoctores}
          onValueChange={(value) => setidDoctores(value)}
          style={styles.input}
        >
          <Picker.Item label="Seleccione un doctores" value="" />
          {doctores.map((doc) => (
            <Picker.Item key={doc.id} label={doc.nombre} value={doc.id} />
          ))}
        </Picker>

        <Text style={styles.label}>Fecha:</Text>
        <TouchableOpacity style={styles.dateButton} onPress={() => setShowFecha(true)}>
          <Text>{fecha.toISOString().split("T")[0]}</Text>
        </TouchableOpacity>
        {showFecha && (
          <DateTimePicker
            value={fecha}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowFecha(false);
              if (selectedDate) setFecha(selectedDate);
            }}
          />
        )}

        <Text style={styles.label}>Hora Inicio:</Text>
        <TouchableOpacity style={styles.dateButton} onPress={() => setShowHoraInicio(true)}>
          <Text>{horaInicio.toTimeString().slice(0, 5)}</Text>
        </TouchableOpacity>
        {showHoraInicio && (
          <DateTimePicker
            value={horaInicio}
            mode="time"
            display="default"
            onChange={(event, selectedTime) => {
              setShowHoraInicio(false);
              if (selectedTime) setHoraInicio(selectedTime);
            }}
          />
        )}

        <Text style={styles.label}>Hora Fin:</Text>
        <TouchableOpacity style={styles.dateButton} onPress={() => setShowHoraFin(true)}>
          <Text>{horaFin.toTimeString().slice(0, 5)}</Text>
        </TouchableOpacity>
        {showHoraFin && (
          <DateTimePicker
            value={horaFin}
            mode="time"
            display="default"
            onChange={(event, selectedTime) => {
              setShowHoraFin(false);
              if (selectedTime) setHoraFin(selectedTime);
            }}
          />
        )}

        <Text style={styles.label}>Estado:</Text>
        <Picker
          selectedValue={estado}
          onValueChange={(value) => setEstado(value)}
          style={styles.input}
        >
          <Picker.Item label="Pendiente" value="Pendiente" />
          <Picker.Item label="Confirmada" value="Confirmada" />
          <Picker.Item label="Cancelada" value="Cancelada" />
          <Picker.Item label="Completada" value="Completada" />
        </Picker>

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
