// InicioStack.js
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Inicio from "../../../Screen/Inicio/inicio";

// Usuarios
import ListarUsuarios from "../../../Screen/Usuarios/ListarUsuarios";
import DetalleUsuarios from "../../../Screen/Usuarios/DetalleUsuarios";
import EditarUsuarios from "../../../Screen/Usuarios/EditarUsuarios";

// Especialidades
import ListarEspecialidades from "../../../Screen/Especialidades/ListarEspecialidades";
import DetalleEspecialidades from "../../../Screen/Especialidades/DetalleEspecialidades";
import EditarEspecialidades from "../../../Screen/Especialidades/EditarEspecialidades";

// doctores
import ListarDoctores from "../../../Screen/Doctores/ListarDoctores";
import DetalleDoctores from "../../../Screen/Doctores/DetalleDoctores";
import EditarDoctores from "../../../Screen/Doctores/EditarDoctores";

// Pacientes
import ListarPacientes from "../../../Screen/Pacientes/ListarPacientes";
import DetallePacientes from "../../../Screen/Pacientes/DetallePacientes";
import EditarPacientes from "../../../Screen/Pacientes/EditarPacientes";

// Consultorios
import ListarConsultorios from "../../../Screen/Consultorios/ListarConsultorios";
import DetalleConsultorios from "../../../Screen/Consultorios/DetalleConsultorios";
import EditarConsultorios from "../../../Screen/Consultorios/EditarConsultorios";

// Horarios
import ListarHorarios from "../../../Screen/Horarios/ListarHorarios";
import DetalleHorarios from "../../../Screen/Horarios/DetalleHorarios";
import EditarHorarios from "../../../Screen/Horarios/EditarHorarios";

// Citas
import ListarCitas from "../../../Screen/Citas/ListarCitas";
import DetalleCitas from "../../../Screen/Citas/DetalleCitas";
import EditarCitas from "../../../Screen/Citas/EditarCitas";

// Historial
import ListarHistorial from "../../../Screen/Historial/ListarHistorial";
import DetalleHistorial from "../../../Screen/Historial/DetalleHistorial";
import EditarHistorial from "../../../Screen/Historial/EditarHistorial";

const Stack = createNativeStackNavigator();

export default function InicioStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/* Pantalla principal */}
            <Stack.Screen name="InicioHome" component={Inicio} />

            {/* Usuarios */}
            <Stack.Screen name="ListarUsuarios" component={ListarUsuarios} />
            <Stack.Screen name="DetalleUsuarios" component={DetalleUsuarios} />
            <Stack.Screen name="EditarUsuarios" component={EditarUsuarios} />

            {/* Especialidades */}
            <Stack.Screen name="ListarEspecialidades" component={ListarEspecialidades} />
            <Stack.Screen name="DetalleEspecialidades" component={DetalleEspecialidades} />
            <Stack.Screen name="EditarEspecialidades" component={EditarEspecialidades} />

            {/* doctores */}
            <Stack.Screen name="ListarDoctores" component={ListarDoctores} />
            <Stack.Screen name="DetalleDoctores" component={DetalleDoctores} />
            <Stack.Screen name="EditarDoctores" component={EditarDoctores} />

            {/* Pacientes */}
            <Stack.Screen name="ListarPacientes" component={ListarPacientes} />
            <Stack.Screen name="DetallePacientes" component={DetallePacientes} />
            <Stack.Screen name="EditarPacientes" component={EditarPacientes} />

            {/* Consultorios */}
            <Stack.Screen name="ListarConsultorios" component={ListarConsultorios} />
            <Stack.Screen name="DetalleConsultorios" component={DetalleConsultorios} />
            <Stack.Screen name="EditarConsultorios" component={EditarConsultorios} />

            {/* Horarios */}
            <Stack.Screen name="ListarHorarios" component={ListarHorarios} />
            <Stack.Screen name="DetalleHorarios" component={DetalleHorarios} />
            <Stack.Screen name="EditarHorarios" component={EditarHorarios} />

            {/* Citas */}
            <Stack.Screen name="ListarCitas" component={ListarCitas} />
            <Stack.Screen name="DetalleCitas" component={DetalleCitas} />
            <Stack.Screen name="EditarCitas" component={EditarCitas} />

            {/* Historial */}
            <Stack.Screen name="ListarHistorial" component={ListarHistorial} />
            <Stack.Screen name="DetalleHistorial" component={DetalleHistorial} />
            <Stack.Screen name="EditarHistorial" component={EditarHistorial} />
        </Stack.Navigator>
    );
}
