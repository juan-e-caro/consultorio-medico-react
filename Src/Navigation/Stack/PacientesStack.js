// PacientesStack.js
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListarPacientes from "../../../Screen/Pacientes/ListarPacientess";
import DetallePacientes from "../../../Screen/Pacientes/DetallePacientes";
import EditarPacientes from "../../../Screen/Pacientes/EditarPacientes";

const Stack = createNativeStackNavigator();

export default function PacientesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ListarPacientes" component={ListarPacientes} />
      <Stack.Screen name="DetallePacientes" component={DetallePacientes} />
      <Stack.Screen name="EditarPacientes" component={EditarPacientes} />
    </Stack.Navigator>
  );
}
