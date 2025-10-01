// doctoresesStack.js
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Listardoctoreses from "../../../Screen/doctoresess/Listardoctoreses";
import Detalledoctoreses from "../../../Screen/doctoreses/Detalledoctoreses";
import Editardoctoreses from "../../../Screen/doctoreses/Editardoctoreses";

const Stack = createNativeStackNavigator();

export default function doctoresesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Listardoctoreses" component={Listardoctoreses} />
      <Stack.Screen name="Detalledoctoreses" component={Detalledoctoreses} />
      <Stack.Screen name="Editardoctoreses" component={Editardoctoreses} />
    </Stack.Navigator>
  );
}
