import React, { useState, useEffect } from "react";
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

import {
  crearHorarios,
  editarHorarios,
  listarHorariosPorDoctor, // <- asegúrate de tener este servicio
} from "../../Src/Services/HorariosService";
import { listarDoctores } from "../../Src/Services/DoctoresService";
import { listarConsultorios } from "../../Src/Services/ConsultoriosService";

export default function EditarHorario({ navigation, route }) {
  const horario = route.params?.horario;

  const [doctores, setDoctores] = useState([]);
  const [consultorios, setConsultorios] = useState([]);
  const [horariosDoctor, setHorariosDoctor] = useState([]);

  const [idDoctor, setIdDoctor] = useState(horario ? String(horario.idDoctor) : "");
  const [dia, setDia] = useState(horario ? horario.diaSemana : "");
  const [idConsultorio, setIdConsultorio] = useState(horario ? horario.idConsultorio : "");

  const [loading, setLoading] = useState(false);
  const esEdicion = !!horario;

  // Cargar doctores y consultorios
  useEffect(() => {
    const fetchData = async () => {
      try {
        const doctoresResponse = await listarDoctores();
        const consultoriosResponse = await listarConsultorios();

        if (doctoresResponse.success) setDoctores(doctoresResponse.data || []);
        else console.warn("Fallo al cargar doctores:", doctoresResponse.message);

        if (consultoriosResponse.success) setConsultorios(consultoriosResponse.data || []);
        else console.warn("Fallo al cargar consultorios:", consultoriosResponse.message);

      } catch (error) {
        console.error(error);
        Alert.alert("Error", "No se pudo cargar doctores o consultorios");
      }
    };
    fetchData();
  }, []);

  // Cargar horarios relacionados con el doctor seleccionado
  useEffect(() => {
    const fetchHorariosDoctor = async () => {
      if (!idDoctor) {
        setHorariosDoctor([]);
        return;
      }

      try {
        const response = await listarHorarios();
        if (response.success) {
          const filtrados = response.data.filter(
            (h) => String(h.idDoctor) === String(idDoctor)
          );
          setHorariosDoctor(filtrados);
        } else {
          console.warn("Fallo al cargar horarios:", response.message);
          setHorariosDoctor([]);
        }
      } catch (error) {
        console.error("Error al obtener horarios:", error);
        Alert.alert("Error", "No se pudieron obtener los horarios");
        setHorariosDoctor([]);
      }
    };

    fetchHorariosDoctor();
  }, [idDoctor]);



  const handleGuardar = async () => {
    if (!idDoctor || !dia || !idConsultorio) {
      Alert.alert("Campos requeridos", "Por favor completa todos los campos");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        idDoctor: Number(idDoctor),
        diaSemana: dia,
        idConsultorio: Number(idConsultorio),
      };

      const result = esEdicion
        ? await editarHorarios(horario.id, payload)
        : await crearHorarios(payload);

      if (result?.success) {
        Alert.alert(
          "Éxito",
          esEdicion ? "Horario actualizado correctamente" : "Horario creado correctamente"
        );
        navigation.goBack();
      } else {
        Alert.alert("Error", result?.message || "No se pudo guardar el horario");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No se pudo guardar el horario");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelar = () => navigation.goBack();

  const diasSemana = [
    { label: "Lunes", value: "Lunes" },
    { label: "Martes", value: "Martes" },
    { label: "Miércoles", value: "Miércoles" },
    { label: "Jueves", value: "Jueves" },
    { label: "Viernes", value: "Viernes" },
    { label: "Sábado", value: "Sábado" },
    { label: "Domingo", value: "Domingo" },
  ];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>
          {esEdicion ? "Editar Horario" : "Nuevo Horario"}
        </Text>

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
              label={doctor.usuarios?.nombre || doctor.nombre || "Sin nombre"}
              value={String(doctor.id)}
            />
          ))}
        </Picker>

        {idDoctor !== "" && horariosDoctor.length > 0 && (
          <View style={styles.input}>
            <Text style={styles.label}>Horarios actuales del doctor:</Text>
            {horariosDoctor.map((h) => (
              <Text key={h.id} style={{ marginVertical: 3 }}>
                • {h.diaSemana}: Consultorio {h.consultorio?.numero || h.idConsultorio}
              </Text>
            ))}
          </View>
        )}

        <Text style={styles.label}>Día:</Text>
        <Picker
          selectedValue={dia}
          onValueChange={(value) => setDia(value)}
          style={styles.input}
          enabled={!loading}
        >
          <Picker.Item label="Seleccione un día" value="" />
          {diasSemana.map((d) => (
            <Picker.Item key={d.value} label={d.label} value={d.value} />
          ))}
        </Picker>

        <Text style={styles.label}>Consultorio:</Text>
        <Picker
          selectedValue={idConsultorio}
          onValueChange={(value) => setIdConsultorio(value)}
          style={styles.input}
          enabled={!loading}
        >
          <Picker.Item label="Seleccione un consultorio" value="" />
          {consultorios.map((con) => (
            <Picker.Item
              key={con.id}
              label={`Consultorio ${con.numero}`}
              value={String(con.id)}
            />
          ))}
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
