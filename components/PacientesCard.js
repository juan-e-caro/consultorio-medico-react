import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function PacientesCard({ paciente, onEdit, onDelete }) { 
    return (
        <View style={styles.card}>
            <View style={styles.info}>
                <Text style={styles.nombre}>{paciente.usuarios?.nombre || "Nombre no disponible"}</Text>
                <Text style={styles.detalle}>Documento: {paciente.documento}</Text>
                <Text style={styles.detalle}>Teléfono: {paciente.telefono}</Text>
                <Text style={styles.detalle}>Dirección: {paciente.direccion}</Text>
                <Text style={styles.detalle}>Nacimiento: {formatearFecha(paciente.fechaNacimiento)}</Text>
                <Text style={styles.detalle}>Género: {paciente.genero}</Text>
            </View>
            <View style={styles.actions}>
                <TouchableOpacity onPress={onEdit} style={styles.iconBtn}>
                    <Ionicons name="create-outline" size={24} color="#0277BD" />
                </TouchableOpacity>
                <TouchableOpacity onPress={onDelete} style={styles.iconBtn}>
                    <Ionicons name="trash-outline" size={24} color="#C62828" />
                </TouchableOpacity>
            </View>
        </View>
    );
}


// Función utilitaria para mostrar la fecha en formato legible
function formatearFecha(fechaString) {
    if (!fechaString) return "No especificada";
    const fecha = new Date(fechaString);
    return fecha.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundColor: '#FFFFFF',
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    info: {
        flex: 1,
    },
    nombre: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1A237E',
    },
    detalle: {
        fontSize: 14,
        color: '#455A64',
        marginTop: 2,
    },
    actions: {
        flexDirection: 'row',
        marginLeft: 12,
    },
    iconBtn: {
        marginLeft: 12,
    },
});
