// ConsultoriosStack.js
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListarConsultorios from "../../../Screen/Consultorios/ListarConsultorios";
import DetalleConsultorios from "../../../Screen/Consultorios/DetalleConsultorios";
import EditarConsultorios from "../../../Screen/Consultorios/EditarConsultorios";

const Stack = createNativeStackNavigator();

export default function ConsultoriosStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ListarConsultorios" component={ListarConsultorios} />
      <Stack.Screen name="DetalleConsultorios" component={DetalleConsultorios} />
      <Stack.Screen name="EditarConsultorios" component={EditarConsultorios} />
    </Stack.Navigator>
  );
}
