// CitasStack.js
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListarCitas from "../../../Screen/Citas/ListarCitas";
import DetalleCitas from "../../../Screen/Citas/DetalleCitas";
import EditarCitas from "../../../Screen/Citas/EditarCitas";

const Stack = createNativeStackNavigator();

export default function CitasStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ListarCitas" component={ListarCitas} />
      <Stack.Screen name="DetalleCitas" component={DetalleCitas} />
      <Stack.Screen name="EditarCitas" component={EditarCitas} />
    </Stack.Navigator>
  );
}
