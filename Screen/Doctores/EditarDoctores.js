import { useState, useEffect } from "react";
import {View,Text,TextInput,StyleSheet,TouchableOpacity,Alert,ActivityIndicator,ScrollView,KeyboardAvoidingView,Platform,} from "react-native";
import { Picker } from "@react-native-picker/picker";

import {getUsuarios,getEspecialidades,editarDoctores,crearDoctores,} from "../../Src/Services/DoctoresService";

export default function EditarDoctores({ navigation, route }) {
  const doctor = route.params?.doctores;

  const [usuarios, setUsuarios] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);

  const [idUsuario, setIdUsuario] = useState(doctor ? doctor.idUsuario : "");
  const [idEspecialidad, setIdEspecialidad] = useState(
    doctor ? doctor.idEspecialidad : ""
  );
  const [cedula, setCedula] = useState(doctor ? doctor.cedula : "");
  const [telefono, setTelefono] = useState(doctor ? doctor.telefono : "");
  const [loading, setLoading] = useState(false);

  const esEdicion = !!doctor;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usuariosData = await getUsuarios();
        const especialidadesData = await getEspecialidades();
        setUsuarios(usuariosData || []);
        setEspecialidades(especialidadesData || []);
      } catch (error) {
        Alert.alert("Error", "No se pudo cargar usuarios o especialidades");
      }
    };
    fetchData();
  }, []);

  const handleGuardar = async () => {
    if (!idUsuario || !idEspecialidad || !cedula || !telefono) {
      Alert.alert("Campos requeridos", "Por favor completa todos los campos");
      return;
    }

    setLoading(true);
    try {
      const payload = { idUsuario, idEspecialidad, cedula, telefono };

      const result = esEdicion
        ? await editarDoctores(doctor.id, payload)
        : await crearDoctores(payload);

      if (result?.success) {
        Alert.alert(
          "Éxito",
          esEdicion
            ? "Doctor actualizado correctamente"
            : "Doctor creado correctamente"
        );
        navigation.goBack();
      } else {
        Alert.alert("Error", result?.message || "No se pudo guardar el doctor");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar el doctor");
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
          {esEdicion ? "Editar Doctor" : "Nuevo Doctor"}
        </Text>

        {/* Usuario */}
        <Text style={styles.label}>Usuario:</Text>
        <Picker
          selectedValue={idUsuario}
          onValueChange={setIdUsuario}
          enabled={!loading}
          style={styles.input}
        >
          <Picker.Item label="Seleccione un usuario" value="" />
          {usuarios.map((usuario) => (
            <Picker.Item
              key={usuario.id}
              label={usuario.nombre}
              value={usuario.id}
            />
          ))}
        </Picker>

        {/* Especialidad */}
        <Text style={styles.label}>Especialidad:</Text>
        <Picker
          selectedValue={idEspecialidad}
          onValueChange={setIdEspecialidad}
          enabled={!loading}
          style={styles.input}
        >
          <Picker.Item label="Seleccione una especialidad" value="" />
          {especialidades.map((esp) => (
            <Picker.Item key={esp.id} label={esp.nombre} value={esp.id} />
          ))}
        </Picker>

        {/* Cédula */}
        <Text style={styles.label}>Cédula:</Text>
        <TextInput
          style={styles.input}
          placeholder=""
          value={cedula}
          onChangeText={setCedula}
          keyboardType="numeric"
          editable={!loading}
        />

        {/* Teléfono */}
        <Text style={styles.label}>Teléfono:</Text>
        <TextInput
          style={styles.input}
          placeholder=""
          value={telefono}
          onChangeText={setTelefono}
          keyboardType="phone-pad"
          editable={!loading}
        />

        {/* Botones */}
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={{ marginTop: 20 }}
          />
        ) : (
          <>
            <TouchableOpacity
              style={styles.botonGuardar}
              onPress={handleGuardar}
            >
              <Text style={styles.botonText}>
                {esEdicion ? "Actualizar" : "Guardar"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.botonCancelar}
              onPress={handleCancelar}
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
    color: "#333",
  },
  label: {
    marginBottom: 5,
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#fafafa",
    fontSize: 16,
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

