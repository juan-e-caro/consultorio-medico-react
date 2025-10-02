import { useState } from "react";
import {View,Text,TextInput,StyleSheet,TouchableOpacity,Alert,ActivityIndicator,ScrollView,KeyboardAvoidingView,Platform,} from "react-native";
import { crearUsuarios, EditarUsuarios } from "../../Src/Services/UsuariosService";

export default function EditarUsuario({ navigation, route }) {
  const usuario = route.params?.usuario;

  const [nombre, setNombre] = useState(usuario ? usuario.nombre : "");
  const [email, setEmail] = useState(usuario ? usuario.email : "");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState(usuario ? usuario.rol : "");
  const [loading, setLoading] = useState(false);

  const esEdicion = !!usuario;

  const handleGuardar = async () => {
    if (!nombre || !email || !rol) {
      Alert.alert("Campos requeridos", "Por favor completa todos los campos");
      return;
    }

    // Validación básica de correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Correo inválido", "Por favor ingresa un correo válido");
      return;
    }

    setLoading(true);
    try {
      const payload = { nombre, email, rol };
      if (password) payload.password = password;

      let result;
      if (esEdicion) {
        result = await EditarUsuarios(usuario.id, payload);
      } else {
        result = await crearUsuarios(payload);
      }

      if (result?.success) {
        Alert.alert(
          "Éxito",
          esEdicion ? "Usuario actualizado correctamente" : "Usuario creado correctamente"
        );
        navigation.goBack();
      } else {
        Alert.alert("Error", result?.message || "No se pudo guardar el usuario");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar el usuario");
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
          {esEdicion ? "Editar Usuario" : "Nuevo Usuario"}
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={nombre}
          onChangeText={setNombre}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Contraseña (dejar en blanco para no cambiar)"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Text style={styles.label}>Rol:</Text>
        <View style={styles.rolesContainer}>
          {["paciente", "doctores", "administrador"].map((item) => (
            <TouchableOpacity
              key={item}
              style={[styles.rolButton, rol === item && styles.rolSelected]}
              onPress={() => setRol(item)}
              disabled={loading}
            >
              <Text
                style={[styles.rolText, rol === item && styles.rolTextSelected]}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

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
  rolesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  rolButton: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 8,
    alignItems: "center",
  },
  rolSelected: {
    backgroundColor: "#007bff",
    borderColor: "#007bff",
  },
  rolText: {
    color: "#000",
  },
  rolTextSelected: {
    color: "#fff",
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
