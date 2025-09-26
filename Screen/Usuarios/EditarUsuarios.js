import { useState } from "react";
import {View,Text,TextInput,StyleSheet,TouchableOpacity,Alert,ActivityIndicator,ScrollView,KeyboardAvoidingView,Platform,} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { crearUsuarios, EditarUsuarios } from "../../Src/Services/UsuariosServive";

export default function EditarUsuariosScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const usuario = route.params?.usuario;

  const [nombre, setNombre] = useState(usuario ? usuario.nombre : "");
  const [email, setEmail] = useState(usuario ? usuario.email : "");
  const [password, setPassword] = useState(usuario ? usuario.password : "");
  const [rol, setRol] = useState(usuario ? usuario.rol : "");
  const [loading, setLoading] = useState(false);

  const esEdicion = !!usuario;

  const HandleGuardar = async () => {
    if (!nombre || !email || !password || !rol) {
      Alert.alert("Campos requeridos", "Por favor completa todos los campos");
      return;
    }

    setLoading(true);
    try {
      let result;
      if (esEdicion) {
        result = await EditarUsuarios(usuario.id, {
          nombre,
          email,
          password,
          rol,
        });
      } else {
        result = await crearUsuarios({
          nombre,
          email,
          password,
          rol,
        });
      }

      if (result.success) {
        Alert.alert("Éxito", esEdicion ? "Usuario actualizado correctamente" : "Usuario creado correctamente");
        navigation.goBack();
      } else {
        Alert.alert("Error", result.message || "No se pudo guardar el usuario");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar el usuario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{esEdicion ? "Editar Usuario" : "Nuevo Usuario"}</Text>

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
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Text style={styles.label}>Rol:</Text>
        <View style={styles.rolesContainer}>
          {["paciente", "doctor", "administrador"].map((item) => (
            <TouchableOpacity
              key={item}
              style={[styles.rolButton, rol === item && styles.rolSelected]}
              onPress={() => setRol(item)}
            >
              <Text style={[styles.rolText, rol === item && styles.rolTextSelected]}>
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
        ) : (
          <TouchableOpacity style={styles.botonGuardar} onPress={HandleGuardar}>
            <Text style={styles.botonText}>{esEdicion ? "Actualizar" : "Guardar"}</Text>
          </TouchableOpacity>
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
  },
  botonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
