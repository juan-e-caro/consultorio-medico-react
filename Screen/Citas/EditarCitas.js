import React, { useState, useEffect } from "react";
import { View,Text,StyleSheet,TouchableOpacity,Alert,ActivityIndicator,ScrollView,KeyboardAvoidingView,Platform,} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";

import {crearCitas,EditarCitas,} from "../../Src/Services/CitasService";
import { listarDoctores } from "../../Src/Services/DoctoresService";
import { listarPacientes } from "../../Src/Services/PacientesService";
import { listarHorarios } from "../../Src/Services/HorariosService";

export default function EditarCita({ navigation, route }) {
  const cita = route.params?.cita;

  const [doctores, setDoctores] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [horariosDoctor, setHorariosDoctor] = useState([]);

  const [idPaciente, setIdPaciente] = useState(cita ? String(cita.idPaciente) : "");
  const [idDoctor, setIdDoctor] = useState(cita ? String(cita.idDoctor) : "");
  const [idHorario, setIdHorario] = useState(cita ? String(cita.idHorario) : "");
  const [fecha, setFecha] = useState(cita ? new Date(cita.fecha) : new Date());
  const [estado, setEstado] = useState(cita ? cita.estado : "pendiente");

  const [loading, setLoading] = useState(false);
  const [showFechaPicker, setShowFechaPicker] = useState(false);

  const esEdicion = !!cita;

  // Cargar doctores y pacientes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const doctoresResponse = await listarDoctores();
        const pacientesResponse = await listarPacientes();

        if (doctoresResponse.success) setDoctores(doctoresResponse.data || []);
        if (pacientesResponse.success) setPacientes(pacientesResponse.data || []);
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "No se pudo cargar doctores o pacientes");
      }
    };
    fetchData();
  }, []);

  // Cargar horarios del doctor seleccionado
  useEffect(() => {
    const fetchHorariosDoctor = async () => {
      if (!idDoctor) {
        setHorariosDoctor([]);
        return;
      }
      try {
        const response = await listarHorarios();
        if (response.success) {
          // Filtrar horarios por idDoctor manualmente
          const horariosFiltrados = response.data.filter(
            (h) => String(h.idDoctor) === String(idDoctor)
          );
          setHorariosDoctor(horariosFiltrados || []);
        }
      } catch (error) {
        console.error("Error al obtener horarios:", error);
        setHorariosDoctor([]);
      }
    };
    fetchHorariosDoctor();
  }, [idDoctor]);


  const formatFecha = (date) => {
    const y = date.getFullYear();
    const m = (date.getMonth() + 1).toString().padStart(2, "0");
    const d = date.getDate().toString().padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const handleGuardar = async () => {
    if (!idPaciente || !idDoctor || !idHorario || !fecha || !estado) {
      Alert.alert("Campos requeridos", "Por favor completa todos los campos");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        idPaciente: Number(idPaciente),
        idDoctor: Number(idDoctor),
        idHorario: Number(idHorario),
        fecha: formatFecha(fecha),
        estado,
      };

      let result;
        if (esEdicion) {
          result = await EditarCitas(cita.id, payload);
        } else {
          result = await crearCitas(payload);
        }

      if (result?.success) {
        Alert.alert(
          "Éxito",
          esEdicion
            ? "Cita actualizada correctamente"
            : "Cita creada correctamente"
        );
        navigation.goBack();
      } else {
        Alert.alert("Error", result?.message || "No se pudo guardar la cita");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No se pudo guardar la cita");
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
        <Text style={styles.title}>{esEdicion ? "Editar Cita" : "Nueva Cita"}</Text>

        <Text style={styles.label}>Paciente:</Text>
        <Picker
          selectedValue={idPaciente}
          onValueChange={(value) => setIdPaciente(value)}
          style={styles.input}
          enabled={!loading}
        >
          <Picker.Item label="Seleccione un paciente" value="" />
          {pacientes.map((pac) => (
            <Picker.Item
              key={pac.id}
              label={pac.nombre || pac.usuarios?.nombre || "Sin nombre"}
              value={String(pac.id)}
            />
          ))}
        </Picker>

        <Text style={styles.label}>Doctor:</Text>
        <Picker
          selectedValue={idDoctor}
          onValueChange={(value) => setIdDoctor(value)}
          style={styles.input}
          enabled={!loading}
        >
          <Picker.Item label="Seleccione un doctor" value="" />
          {doctores.map((doctor) => (
            <Picker.Item
              key={doctor.id}
              label={doctor.nombre || doctor.usuarios?.nombre || "Sin nombre"}
              value={String(doctor.id)}
            />
          ))}
        </Picker>

        {idDoctor !== "" && horariosDoctor.length > 0 && (
          <View style={styles.horariosBox}>
            <Text style={styles.label}>Horarios disponibles:</Text>
            {horariosDoctor.map((h) => (
              <Text key={h.id} style={styles.horarioItem}>
                • {h.horaInicio} - {h.horaFin} (Consultorio {h.consultorio?.numero || h.idConsultorio})
              </Text>
            ))}
          </View>
        )}

        <Text style={styles.label}>Horario:</Text>
        <Picker
          selectedValue={idHorario}
          onValueChange={(value) => setIdHorario(value)}
          style={styles.input}
          enabled={!loading}
        >
          <Picker.Item label="Seleccione un horario" value="" />
          {horariosDoctor.map((h) => (
            <Picker.Item
              key={h.id}
              label={`${h.horaInicio} - ${h.horaFin}`}
              value={String(h.id)}
            />
          ))}
        </Picker>

        <Text style={styles.label}>Fecha:</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowFechaPicker(true)}
        >
          <Text>{formatFecha(fecha)}</Text>
        </TouchableOpacity>
        {showFechaPicker && (
          <DateTimePicker
            value={fecha}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowFechaPicker(false);
              if (selectedDate) setFecha(selectedDate);
            }}
          />
        )}

        <Text style={styles.label}>Estado:</Text>
        <Picker
          selectedValue={estado}
          onValueChange={(value) => setEstado(value)}
          style={styles.input}
          enabled={!loading}
        >
          <Picker.Item label="Pendiente" value="pendiente" />
          <Picker.Item label="Confirmada" value="confirmada" />
          <Picker.Item label="Cancelada" value="cancelada" />
          <Picker.Item label="Finalizada" value="finalizada" />
        </Picker>

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
        ) : (
          <>
            <TouchableOpacity
              style={[styles.botonGuardar, loading && { opacity: 0.6 }]}
              onPress={handleGuardar}
              disabled={loading}
            >
              <Text style={styles.botonText}>{esEdicion ? "Actualizar" : "Guardar"}</Text>
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
  horariosBox: {
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  horarioItem: {
    fontSize: 14,
    marginLeft: 10,
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
