// InicioStack.js
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Inicio from "../../../Screen/Inicio/inicio";

// Usuarios
import ListarUsuarios from "../../../Screen/Usuarios/ListarUsuarios";
import DetalleUsuario from "../../../Screen/Usuarios/DetalleUsuarios";
import EditarUsuario from "../../../Screen/Usuarios/EditarUsuarios";


const Stack = createNativeStackNavigator();

export default function InicioStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/* Pantalla principal */}
            <Stack.Screen name="Inicio" component={Inicio} />

            {/* Usuarios */}
            <Stack.Screen name="ListarUsuarios" component={ListarUsuarios} />
            <Stack.Screen name="DetalleUsuario" component={DetalleUsuario} />
            <Stack.Screen name="EditarUsuario" component={EditarUsuario} />
        </Stack.Navigator>
    );
}
