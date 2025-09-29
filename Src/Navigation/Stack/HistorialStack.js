// HistorialStack.js
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListarHistorial from "../../../Screen/Historial/ListarHistorial";
import DetalleHistorial from "../../../Screen/Historial/DetalleHistorial";
import EditarHistorial from "../../../Screen/Historial/EditarHistorial";

const Stack = createNativeStackNavigator();

export default function HistorialStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ListarHistorial" component={ListarHistorial} />
      <Stack.Screen name="DetalleHistorial" component={DetalleHistorial} />
      <Stack.Screen name="EditarHistorial" component={EditarHistorial} />
    </Stack.Navigator>
  );
}
