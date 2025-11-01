import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function UsuariosCard({ usuarios, onEdit, onDelete }) {
    return (
        <View style={styles.card}>
            <View style={styles.info}>
                <Text style={styles.nombre}>{usuarios.nombre}</Text>
                <Text style={styles.email}>{usuarios.email}</Text>
                <Text style={styles.rol}>Rol: {usuarios.roles}</Text>
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

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
    email: {
        fontSize: 14,
        color: '#455A64',
        marginTop: 4,
    },
    rol: {
        fontSize: 14,
        color: '#388E3C',
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
