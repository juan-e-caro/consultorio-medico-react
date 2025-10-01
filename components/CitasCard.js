import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function CitasCard({ cita, onEdit, onDelete }) {
    const nombrePaciente = cita.paciente?.usuario?.nombre || "Paciente no disponible";
    const nombredoctores = cita.doctores?.usuario?.nombre || "doctores no disponible";
    const horaInicio = cita.horario?.horaInicio || "??:??";
    const horaFin = cita.horario?.horaFin || "??:??";

    return (
        <View style={styles.card}>
            <View style={styles.info}>
                <Text style={styles.nombre}>{nombrePaciente}</Text>
                <Text style={styles.detalle}>doctores: {nombredoctores}</Text>
                <Text style={styles.detalle}>Fecha: {formatearFecha(cita.fecha)}</Text>
                <Text style={styles.detalle}>Horario: {horaInicio} - {horaFin}</Text>
                <Text style={[styles.estado, getEstadoStyle(cita.estado)]}>
                    Estado: {cita.estado}
                </Text>
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

function getEstadoStyle(estado) {
    switch (estado.toLowerCase()) {
        case "confirmada":
            return { color: "#388E3C" }; // verde
        case "pendiente":
            return { color: "#F9A825" }; // amarillo
        case "cancelada":
            return { color: "#C62828" }; // rojo
        default:
            return { color: "#455A64" }; // gris
    }
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
    estado: {
        fontSize: 14,
        fontWeight: "bold",
        marginTop: 6,
    },
    actions: {
        flexDirection: "row",
        marginLeft: 12,
    },
    iconBtn: {
        marginLeft: 12,
    },
});
