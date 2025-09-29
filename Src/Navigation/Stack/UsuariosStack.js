// UsuariosStack.js
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListarUsuarios from "../../../Screen/Usuarios/ListarUsuarios";
import DetalleUsuarios from "../../../Screen/Usuarios/DetalleUsuarios";
import EditarUsuarios from "../../../Screen/Usuarios/EditarUsuarios";

const Stack = createNativeStackNavigator();

export default function UsuariosStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ListarUsuarios" component={ListarUsuarios} />
      <Stack.Screen name="DetalleUsuarios" component={DetalleUsuarios} />
      <Stack.Screen name="EditarUsuarios" component={EditarUsuarios} />
    </Stack.Navigator>
  );
}
