import { useState } from "react";
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
import { crearHorarios, editarHorarios } from "../../Src/Services/HorariosService";

export default function EditarHorario({ navigation, route }) {
  const horario = route.params?.horario;
  const doctores = route.params?.doctores || [];
  const consultorios = route.params?.consultorios || [];

  const [idDoctores, setidDoctores] = useState(horario ? horario.idDoctores : "");
  const [dia, setDia] = useState(horario ? horario.dia : "");
  const [horaInicio, setHoraInicio] = useState(horario ? horario.horaInicio : "");
  const [horaFin, setHoraFin] = useState(horario ? horario.horaFin : "");
  const [consultorioId, setConsultorioId] = useState(horario ? horario.idConsultorios : "");
  const [loading, setLoading] = useState(false);

  const esEdicion = !!horario;

  const handleGuardar = async () => {
    if (!idDoctores || !dia || !horaInicio || !horaFin || !consultorioId) {
      Alert.alert("Campos requeridos", "Por favor completa todos los campos");
      return;
    }

    // Validación simple de hora (opcional)
    const horaRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (!horaRegex.test(horaInicio) || !horaRegex.test(horaFin)) {
      Alert.alert("Formato de hora incorrecto", "Usa el formato HH:MM (ej: 08:00)");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        idDoctores,
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
          {esEdicion ? "Editar Horario" : "Nuevo Horario"}
        </Text>

        <Text style={styles.label}>Doctor:</Text>
        <Picker
          selectedValue={idDoctores}
          onValueChange={(value) => setidDoctores(value)}
          style={styles.input}
          enabled={!loading}
        >
          <Picker.Item label="Seleccione un doctor" value="" />
          {doctores.map((doc) => (
            <Picker.Item key={doc.id} label={doc.nombre} value={doc.id} />
          ))}
        </Picker>

        <TextInput
          style={styles.input}
          placeholder="Día (ej: Lunes)"
          value={dia}
          onChangeText={setDia}
          editable={!loading}
        />

        <TextInput
          style={styles.input}
          placeholder="Hora Inicio (ej: 08:00)"
          value={horaInicio}
          onChangeText={setHoraInicio}
          editable={!loading}
        />

        <TextInput
          style={styles.input}
          placeholder="Hora Fin (ej: 17:00)"
          value={horaFin}
          onChangeText={setHoraFin}
          editable={!loading}
        />

        <Text style={styles.label}>Consultorio:</Text>
        <Picker
          selectedValue={consultorioId}
          onValueChange={(value) => setConsultorioId(value)}
          style={styles.input}
          enabled={!loading}
        >
          <Picker.Item label="Seleccione un consultorio" value="" />
          {consultorios.map((con) => (
            <Picker.Item
              key={con.id}
              label={`Consultorio ${con.numero}`}
              value={con.id}
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
