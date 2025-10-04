// doctoresStack.js
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Listardoctores from "../../../Screen/doctores/ListarDoctores";
import Detalledoctores from "../../../Screen/doctores/DetalleDoctores";
import Editardoctores from "../../../Screen/doctores/EditarDoctores";

const Stack = createNativeStackNavigator();

export default function doctoresStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Listardoctores" component={Listardoctores} />
      <Stack.Screen name="Detalledoctores" component={Detalledoctores} />
      <Stack.Screen name="Editardoctores" component={Editardoctores} />
    </Stack.Navigator>
  );
}
