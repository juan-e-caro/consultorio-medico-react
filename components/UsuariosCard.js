import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function UsuariosCard({usuarios, onEdit, onDelete}) {
    return(
        <View style={styles.card}>
            <View style={styles.info}>
                <Text style={styles.nombre}>{usuarios.nombre}</Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
            </View>
            <View style={styles.actions}>
                <TouchableOpacity onPress={onEdit} style={styles.iconBtn}>
                    <Ionicons name="create-outline" size={24} color="#1976D2"/>
                </TouchableOpacity>
                <TouchableOpacity onPress={onDelete} style={styles.iconBtn}>
                    <Ionicons name="trash-outline" size={24} color="#D32F2F"/>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

});