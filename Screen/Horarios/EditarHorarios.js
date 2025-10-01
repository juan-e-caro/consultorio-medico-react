import { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { crearHorarios, editarHorarios } from "../../Src/Services/HorariosService";
import { obtenerdoctores } from "../../Src/Services/DoctoresService";
import { obtenerConsultorios } from "../../Src/Services/ConsultoriosService";

export default function EditarHorario({ navigation, route }) {
  const horario = route.params?.horario;

  const [doctoresId, setdoctoresId] = useState(horario ? horario.doctoresId : "");
  const [dia, setDia] = useState(horario ? horario.dia : "");
  const [horaInicio, setHoraInicio] = useState(horario ? horario.horaInicio : "");
  const [horaFin, setHoraFin] = useState(horario ? horario.horaFin : "");
  const [consultorioId, setConsultorioId] = useState(horario ? horario.consultorioId : "");
  const [loading, setLoading] = useState(false);

  const [doctores, setDoctores] = useState([]);
  const [consultorios, setConsultorios] = useState([]);

  const esEdicion = !!horario;

  useEffect(() => {
    // cargar doctoreses y consultorios
    const cargarDatos = async () => {
      try {
        const listaDoctores = await obtenerdoctores();
        const listaConsultorios = await obtenerConsultorios();
        setDoctores(listaDoctores || []);
        setConsultorios(listaConsultorios || []);
      } catch (error) {
        console.log("Error al cargar listas", error);
      }
    };
    cargarDatos();
  }, []);

  const handleGuardar = async () => {
    if (!doctoresId || !dia || !horaInicio || !horaFin || !consultorioId) {
      Alert.alert("Campos requeridos", "Por favor completa todos los campos");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        doctoresId,
        dia,
        horaInicio,
        horaFin,
        consultorioId,
      };

      let result;
      if (esEdicion) {
        result = await editarHorarios(horario.id, payload);
      } else {
        result = await crearHorarios(payload);
      }

      if (result.success) {
        Alert.alert("Éxito", esEdicion ? "Horario actualizado correctamente" : "Horario creado correctamente");
        navigation.goBack();
      } else {
        Alert.alert("Error", result.message || "No se pudo guardar el horario");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar el horario");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelar = () => {
    navigation.navigate("ListarHorarios");
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{esEdicion ? "Editar Horario" : "Nuevo Horario"}</Text>

        <Text style={styles.label}>doctores:</Text>
        <Picker
          selectedValue={doctoresId}
          onValueChange={(value) => setdoctoresId(value)}
          style={styles.input}
        >
          <Picker.Item label="Seleccione un doctores" value="" />
          {doctoreses.map((doc) => (
            <Picker.Item key={doc.id} label={doc.nombre} value={doc.id} />
          ))}
        </Picker>

        <TextInput
          style={styles.input}
          placeholder="Día"
          value={dia}
          onChangeText={setDia}
        />

        <TextInput
          style={styles.input}
          placeholder="Hora Inicio (ej: 08:00)"
          value={horaInicio}
          onChangeText={setHoraInicio}
        />

        <TextInput
          style={styles.input}
          placeholder="Hora Fin (ej: 17:00)"
          value={horaFin}
          onChangeText={setHoraFin}
        />

        <Text style={styles.label}>Consultorio:</Text>
        <Picker
          selectedValue={consultorioId}
          onValueChange={(value) => setConsultorioId(value)}
          style={styles.input}
        >
          <Picker.Item label="Seleccione un consultorio" value="" />
          {consultorios.map((con) => (
            <Picker.Item key={con.id} label={`Consultorio ${con.numero}`} value={con.id} />
          ))}
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
