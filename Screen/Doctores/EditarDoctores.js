import { useState, useEffect } from "react";
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

// Importa tus servicios
import {
  creardoctores,
  editardoctores,
  obtenerUsuarios,
  obtenerEspecialidades,
} from "../../Src/Services/DoctoresService"; // Ajusta rutas si es necesario

export default function Editardoctores({ navigation, route }) {
  const doctores = route.params?.doctores;

  const [usuarios, setUsuarios] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);

  const [idUsuario, setIdUsuario] = useState(doctores ? doctores.idUsuario : "");
  const [idEspecialidad, setIdEspecialidad] = useState(
    doctores ? doctores.idEspecialidad : ""
  );
  const [cedula, setCedula] = useState(doctores ? doctores.cedula : "");
  const [telefono, setTelefono] = useState(doctores ? doctores.telefono : "");

  const [loading, setLoading] = useState(false);
  const [loadingDatos, setLoadingDatos] = useState(true);

  const esEdicion = !!doctores;

  useEffect(() => {
    const cargarDatos = async () => {
      setLoadingDatos(true);
      try {
        const usuariosRes = await obtenerUsuarios();
        const especialidadesRes = await obtenerEspecialidades();

        setUsuarios(usuariosRes || []);
        setEspecialidades(especialidadesRes || []);
      } catch (error) {
        Alert.alert(
          "Error",
          "No se pudieron cargar los datos necesarios para el formulario."
        );
      } finally {
        setLoadingDatos(false);
      }
    };

    cargarDatos();
  }, []);

  const handleGuardar = async () => {
    if (!idUsuario || !idEspecialidad || !cedula || !telefono) {
      Alert.alert("Campos requeridos", "Por favor completa todos los campos");
      return;
    }

    setLoading(true);
    try {
      const payload = { idUsuario, idEspecialidad, cedula, telefono };

      let result;
      if (esEdicion) {
        result = await editardoctores(doctores.id, payload);
      } else {
        result = await creardoctores(payload);
      }

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

  if (loadingDatos) {
    return (
      <View style={[styles.container, { justifyContent: "center", flex: 1 }]}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{ textAlign: "center", marginTop: 10 }}>
          Cargando datos...
        </Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>
          {esEdicion ? "Editar Doctor" : "Nuevo Doctor"}
        </Text>

        <Text>Selecciona el usuario</Text>
        <Picker
          selectedValue={idUsuario}
          onValueChange={(itemValue) => setIdUsuario(itemValue)}
          style={styles.input}
        >
          <Picker.Item label="Selecciona un usuario" value="" />
          {usuarios.map((user) => (
            <Picker.Item key={user.id} label={user.nombre} value={user.id} />
          ))}
        </Picker>

        <Text>Selecciona la especialidad</Text>
        <Picker
          selectedValue={idEspecialidad}
          onValueChange={(itemValue) => setIdEspecialidad(itemValue)}
          style={styles.input}
        >
          <Picker.Item label="Selecciona una especialidad" value="" />
          {especialidades.map((esp) => (
            <Picker.Item key={esp.id} label={esp.nombre} value={esp.id} />
          ))}
        </Picker>

        <TextInput
          style={styles.input}
          placeholder="Cédula"
          keyboardType="numeric"
          value={cedula}
          onChangeText={setCedula}
        />

        <TextInput
          style={styles.input}
          placeholder="Teléfono"
          keyboardType="phone-pad"
          value={telefono}
          onChangeText={setTelefono}
        />

        {loading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={{ marginTop: 20 }}
          />
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
