import { StatusBar } from "expo-status-bar";
import { StyleSheet} from "react-native";
import AppNavegacion from "./Src/Navigation/AppNavegacion";

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <AppNavegacion />
    </>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
