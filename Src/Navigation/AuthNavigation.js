import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../../Screen/Auth/LoginScreen"
import RegistroScreen from "../../Screen/Auth/RegistroScreen";

const stack = createNativeStackNavigator();

export default function AuthNavigation(){
    return(
        <stack.Navigator>
            <stack.Screen
                name="login"
                component={LoginScreen}
                options={{ title: 'iniciar sesión' }}
            />
            <stack.Screen
                name="registro"
                component={RegistroScreen}
                options={{ title: 'Registro' }}
            />
        </stack.Navigator>
    )
}