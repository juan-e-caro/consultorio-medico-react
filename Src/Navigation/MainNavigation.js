import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
import InicioStack from "../../../Appclub/Src/Navigation/Stack/InicioStack"
import PerfilScreen from "../../../Appclub/Screen/Perfil/PerfilScreen";
import ConfiguracionScreen from "../../../Appclub/Screen/Configuracion/ConfiguracionScreen";

export default function MainNavigation() {
    return(
        <table.Navigator
            screenOptions={{
                // Estilo barra de pestañas
                tabBarStyle: {
                    backgroundColor: '#eef6d7',
                    borderTopWidth: 1,
                    borderTopColor: '#3d481d',
                    height: 60,
                    paddingBottom: 5,
                    paddingTop: 5,
                },
                //colores iconos y texto
                tabBarActiveTintColor: "green",
                tabBarInactiveTintColor: "#808080",
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '600',
                    marginTop: 2,
                },
            }}
        >
            <Tab.Screen name="Inicio"
                component={InicioStack}
                options={{
                    headerShown: false,
                        tabBarIcon: ({ color, size}) => (
                            <Ionicons name="home" size={size} color={color} />
                        ),
                        tabBarLabel: 'Inicio'
                }}
            />
            <Tab.Screen name="Perfil" 
                component={PerfilScreen}
                options={{
                headerShown: false,
                    tabBarIcon: ({ color, size}) => (
                        <Feather name="user" size={size} color={color} />
                    ),
                    tabBarLable: 'Perfil',
                }}
            />
            <Tab.Screen name="Configuración" 
                component={ConfiguracionScreen}
                options={{
                headerShown: false,
                    tabBarIcon: ({ color, size}) => (
                        <Ionicons name="settings.outline" size={size} color={color} />
                    ),
                    tabBarLable: 'Configuración',
                }}
            />
        </table.Navigator>
    );
}