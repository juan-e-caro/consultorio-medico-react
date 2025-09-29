// EspecialidadesStack.js
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListarEspecialidades from "../../../Screen/Especialidades/ListarEspecialidades";
import DetalleEspecialidades from "../../../Screen/Especialidadess/DetalleEspecialidades";
import EditarEspecialidades from "../../../Screen/Especialidades/EditarEspecialidades";

const Stack = createNativeStackNavigator();

export default function EspecialidadesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ListarEspecialidades" component={ListarEspecialidades} />
      <Stack.Screen name="DetalleEspecialidades" component={DetalleEspecialidades} />
      <Stack.Screen name="EditarEspecialidades" component={EditarEspecialidades} />
    </Stack.Navigator>
  );
}
