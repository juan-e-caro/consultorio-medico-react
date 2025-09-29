// DoctoresStack.js
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListarDoctores from "../../../Screen/Doctoress/ListarDoctores";
import DetalleDoctores from "../../../Screen/Doctores/DetalleDoctores";
import EditarDoctores from "../../../Screen/Doctores/EditarDoctores";

const Stack = createNativeStackNavigator();

export default function DoctoresStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ListarDoctores" component={ListarDoctores} />
      <Stack.Screen name="DetalleDoctores" component={DetalleDoctores} />
      <Stack.Screen name="EditarDoctores" component={EditarDoctores} />
    </Stack.Navigator>
  );
}
