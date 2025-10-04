import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function HistorialCard({ historial, onEdit, onDelete }) {
    const nombrePaciente = historial.pacientes?.usuarios?.nombre || "Paciente no disponible";
    const nombredoctores = historial.citas?.doctores?.usuarios?.nombre || "Doctor no disponible";

    return (
        <View style={styles.card}>
            <View style={styles.info}>
                <Text style={styles.nombre}>{nombrePaciente}</Text>

                <Text style={styles.detalle}>Doctor: {nombredoctores}</Text>

                <Text style={styles.label}>Diagnóstico:</Text>
                <Text style={styles.detalle}>{historial.diagnostico}</Text>

                <Text style={styles.label}>Tratamiento:</Text>
                <Text style={styles.detalle}>{historial.tratamiento}</Text>

                <Text style={styles.label}>Observaciones:</Text>
                <Text style={styles.detalle}>{historial.observaciones}</Text>
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


function formatearFecha(fechaStr) {
    if (!fechaStr) return "No especificada";
    const fecha = new Date(fechaStr);
    return fecha.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        backgroundColor: "#FFFFFF",
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    info: {
        flex: 1,
    },
    nombre: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#1A237E",
        marginBottom: 4,
    },
    detalle: {
        fontSize: 14,
        color: "#455A64",
        marginTop: 2,
    },
    label: {
        marginTop: 8,
        fontSize: 14,
        fontWeight: "bold",
        color: "#37474F",
    },
    valor: {
        fontSize: 14,
        color: "#455A64",
        marginTop: 2,
    },
    actions: {
        flexDirection: "row",
        marginLeft: 12,
    },
    iconBtn: {
        marginLeft: 12,
    },
});
