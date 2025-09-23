import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../../../Appclub/Screen/Auth/LoginScreen";
import RegistroScreen from "../../../Appclub/Screen/Auth/RegistroScreen";

const stack = createNativeStackNavigator();

export default function AuthNavegacion(){
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