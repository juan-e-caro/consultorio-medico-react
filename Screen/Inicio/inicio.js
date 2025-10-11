import { ScrollView, StatusBar, Alert, Button, View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CardComponent from "../../components/CardComponent";

export default function Inicio({ navigation }) {
    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem("userToken");
            Alert.alert("Sesión cerrada", "Has cerrado sesión correctamente.");
        } catch (error) {
            console.error("Error cerrando sesión:", error);
            Alert.alert("Error", "No se pudo cerrar sesión.");
        }
    };

    return (
        <ScrollView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />

            <View style={styles.header}>
                <Text style={styles.headerTitle}>Bienvenido</Text>
                <Text style={styles.headerSubtitle}>
                    Estado: <Text style={styles.statusText}>Habilitado</Text>
                </Text>
                <Text style={styles.headerSubtitle}>Selecciona una opción</Text>
            </View>

            <View style={styles.gridContainer}>
                <CardComponent
                    title="Usuarios"
                    description="Ver lista de usuarios"
                    icon="person-outline"
                    onPress={() => navigation.navigate("ListarUsuarios")}
                />
                <CardComponent
                    title="doctores"
                    description="Ver lista de doctores"
                    icon="medkit-outline"
                    onPress={() => navigation.navigate("ListarDoctores")}
                />
                <CardComponent
                    title="Especialidades"
                    description="Ver lista de especialidades"
                    icon="list-outline"
                    onPress={() => navigation.navigate("ListarEspecialidades")}
                />
                <CardComponent
                    title="Pacientes"
                    description="Ver lista de pacientes"
                    icon="people-outline"
                    onPress={() => navigation.navigate("ListarPacientes")}
                />
                <CardComponent
                    title="Consultorios"
                    description="Ver lista de consultorios"
                    icon="home-outline"
                    onPress={() => navigation.navigate("ListarConsultorios")}
                />
                <CardComponent
                    title="Horarios"
                    description="Ver horarios disponibles"
                    icon="time-outline"
                    onPress={() => navigation.navigate("ListarHorarios")}
                />
                <CardComponent
                    title="Citas"
                    description="Ver citas agendadas"
                    icon="calendar-outline"
                    onPress={() => navigation.navigate("ListarCitas")}
                />
                <CardComponent
                    title="Historial Médico"
                    description="Ver historial médico"
                    icon="clipboard-outline"
                    onPress={() => navigation.navigate("ListarHistorial")}
                />
            </View>

            <View style={{ padding: 16 }}>
                <Button
                    title="Cerrar sesión"
                    onPress={handleLogout}
                    color="#D32F2F"
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f9fafd",
    },
    header: {
        padding: 20,
        backgroundColor: "#1976D2",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#ffffff",
        marginBottom: 5,
    },
    headerSubtitle: {
        fontSize: 16,
        color: "#BBDEFB",
    },
    statusText: {
        fontWeight: "bold",
        color: "#64B5F6",
    },
    gridContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        padding: 16,
    },
});