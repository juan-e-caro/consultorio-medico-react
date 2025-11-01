import { useState, useEffect } from "react";
import { 
  View, Text, StyleSheet, TouchableOpacity, Alert, 
  ActivityIndicator, ScrollView, KeyboardAvoidingView, Platform 
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { crearCitas, EditarCitas } from "../../Src/Services/CitasService";
import { listarPacientes } from "../../Src/Services/PacientesService";
import { listarDoctores } from "../../Src/Services/DoctoresService";
import { listarHorarios } from "../../Src/Services/HorariosService";

export default function EditarCita({ navigation, route }) {
  const cita = route.params?.citas;

  const [idPaciente, setidPaciente] = useState(cita ? String(cita.idPaciente) : "");
  const [idDoctor, setidDoctor] = useState(cita ? String(cita.idDoctor) : "");
  const [idHorario, setidHorario] = useState(cita ? String(cita.idHorario) : "");
  const [fecha, setFecha] = useState(cita ? new Date(cita.fecha) : new Date());
  const [estado, setEstado] = useState(cita ? cita.estado : "Pendiente");
  const [loading, setLoading] = useState(false);

  const [pacientes, setPacientes] = useState([]);
  const [doctores, setDoctores] = useState([]);
  const [horarios, setHorarios] = useState([]);

  const [showFecha, setShowFecha] = useState(false);

  const esEdicion = !!cita;

  useEffect(() => {
    async function fetchData() {
      try {
        const pacientesResponse = await listarPacientes();
        const doctoresResponse = await listarDoctores();

        if (pacientesResponse.success) setPacientes(pacientesResponse.data);
        if (doctoresResponse.success) setDoctores(doctoresResponse.data);
      } catch (error) {
        Alert.alert("Error", "No se pudieron cargar pacientes o doctores");
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function cargarHorarios() {
      if (!idDoctor) {
        setHorarios([]);
        setidHorario("");
        return;
      }

      try {
        const res = await listarHorarios(); // obtiene todos los horarios
        if (res.success && Array.isArray(res.data)) {
          // Filtramos solo los del doctor seleccionado
          const filtrados = res.data.filter(
            (h) => String(h.idDoctor) === String(idDoctor)
          );
          setHorarios(filtrados);
        } else {
          setHorarios([]);
        }
      } catch (error) {
        Alert.alert("Error", "No se pudieron cargar los horarios");
      }
    }

    cargarHorarios();
  }, [idDoctor]);


  // 🔁 Cuando se selecciona un doctor, carga sus horarios
  useEffect(() => {
    async function cargarHorarios() {
      if (!idDoctor) {
        setHorarios([]);
        setidHorario("");
        return;
      }
      try {
        const res = await listarHorariosPorDoctor(idDoctor);
        if (res.success) setHorarios(res.data);
        else setHorarios([]);
      } catch {
        Alert.alert("Error", "No se pudieron cargar los horarios del doctor");
      }
    }
    cargarHorarios();
  }, [idDoctor]);

  const handleGuardar = async () => {
    if (!idPaciente || !idDoctor || !idHorario || !fecha || !estado) {
      Alert.alert("Campos requeridos", "Por favor completa todos los campos obligatorios");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        idPaciente,
        idDoctor,
        idHorario,
        fecha: fecha.toISOString().split("T")[0], // YYYY-MM-DD
        horaInicio: horaInicio.toTimeString().slice(0,5),
        horaFin: horaFin.toTimeString().slice(0,5),
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

  const handleCancelar = () => navigation.navigate("ListarCitas");

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{esEdicion ? "Editar Cita" : "Nueva Cita"}</Text>

        {/* PACIENTE */}
        <Text style={styles.label}>Paciente:</Text>
        <Picker selectedValue={idPaciente} onValueChange={setidPaciente} style={styles.input}>
          <Picker.Item label="Seleccione un paciente" value="" />
          {pacientes.map(p => (
            <Picker.Item key={p.id} label={p.usuarios.nombre} value={String(p.id)} />
          ))}
        </Picker>

        {/* DOCTOR */}
        <Text style={styles.label}>Doctor:</Text>
        <Picker selectedValue={idDoctor} onValueChange={setidDoctor} style={styles.input}>
          <Picker.Item label="Seleccione un doctor" value="" />
          {doctores.map(d => (
            <Picker.Item key={d.id} label={d.usuarios.nombre} value={String(d.id)} />
          ))}
        </Picker>

        {/* HORARIO */}
        {idDoctor && horarios.length > 0 && (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Horario disponible</Text>
            <Picker
              selectedValue={idHorario}
              onValueChange={(itemValue) => setidHorario(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Seleccione un horario" value="" />
              {horarios.map((h) => (
                <Picker.Item
                  key={h.id}
                  label={`${h.horaInicio} - ${h.horaFin}`}
                  value={h.id}
                />
              ))}
            </Picker>
          </View>
        )}

        {/* FECHA */}
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

        {/* ESTADO */}
        <Text style={styles.label}>Estado:</Text>
        <Picker selectedValue={estado} onValueChange={setEstado} style={styles.input}>
          <Picker.Item label="Pendiente" value="Pendiente" />
          <Picker.Item label="Confirmada" value="Confirmada" />
          <Picker.Item label="Cancelada" value="Cancelada" />
          <Picker.Item label="Completada" value="Completada" />
        </Picker>

        {/* BOTONES */}
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
  container: { padding: 20, backgroundColor: "#fff", flexGrow: 1 },
  title: { fontSize: 24, marginBottom: 20, fontWeight: "bold", textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginBottom: 15 },
  label: { marginBottom: 5, fontWeight: "bold" },
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
  botonCancelar: {
    backgroundColor: "#D32F2F",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  botonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  botonTextCancelar: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
