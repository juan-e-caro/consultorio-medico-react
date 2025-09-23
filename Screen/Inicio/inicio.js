import { ScrollView, StatusBar } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import CardComponent from "../../components/CardComponent";

export default function Inicio() {
    return (
        <ScrollView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />

            <View style={styles.header}>
                <Text style={styles.headerTitle}>Bienvenido</Text>
                <Text style={styles.headerSubtitle}>
                    Estado <Text style={styles.StatusText}>Habilitado</Text>
                </Text>
                <Text style={styles.headerSubtitle}>Selecciona una opción</Text>
            </View>

            <View style={styles.gridContainer}>
                <CardComponent
                    title=""
                    description=""
                    icon=""
                />
                <CardComponent
                    title=""
                    description=""
                    icon=""
                />
                <CardComponent
                    title=""
                    description=""
                    icon=""
                />
                <CardComponent
                    title=""
                    description=""
                    icon=""
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
