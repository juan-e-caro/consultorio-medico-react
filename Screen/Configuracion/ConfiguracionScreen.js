import { View, Text, Switch, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";

export default function ConfiguracionScreen() {
  const [modoOscuro, setModoOscuro] = useState(false);
  const [compartirDatos, setCompartirDatos] = useState(false);
  const [notificaciones, setNotificaciones] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuración</Text>

      {/* Privacidad */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Privacidad</Text>
        <View style={styles.row}>
          <Text>Compartir datos con doctoreses</Text>
          <Switch value={compartirDatos} onValueChange={setCompartirDatos} />
        </View>
      </View>

      {/* Apariencia */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Apariencia</Text>
        <View style={styles.row}>
          <Text>Modo oscuro</Text>
          <Switch value={modoOscuro} onValueChange={setModoOscuro} />
        </View>
      </View>

      {/* Notificaciones */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notificaciones</Text>
        <View style={styles.row}>
          <Text>Recibir notificaciones generales</Text>
          <Switch value={notificaciones} onValueChange={setNotificaciones} />
        </View>
      </View>

      {/* Ayuda */}
      <TouchableOpacity style={styles.section}>
        <Text style={styles.sectionTitle}>Ayuda y soporte</Text>
      </TouchableOpacity>

      {/* Acerca de */}
      <TouchableOpacity style={styles.section}>
        <Text style={styles.sectionTitle}>Acerca de</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:20 },
  title: { fontSize:24, fontWeight:"bold", marginBottom:20 },
  section: { marginBottom:20, paddingVertical:10, borderBottomWidth:1, borderBottomColor:"#ccc" },
  sectionTitle: { fontSize:18, fontWeight:"600" },
  row: { flexDirection:"row", justifyContent:"space-between", alignItems:"center", marginTop:10 },
});
