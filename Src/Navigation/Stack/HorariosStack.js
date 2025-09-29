// HorariosStack.js
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListarHorarios from "../../../Screen/Horarios/ListarHorarios";
import DetalleHorarios from "../../../Screen/Horarios/DetalleHorarios";
import EditarHorarios from "../../../Screen/Horarios/EditarHorarios";

const Stack = createNativeStackNavigator();

export default function HorariosStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ListarHorarios" component={ListarHorarios} />
      <Stack.Screen name="DetalleHorarios" component={DetalleHorarios} />
      <Stack.Screen name="EditarHorarios" component={EditarHorarios} />
    </Stack.Navigator>
  );
}
