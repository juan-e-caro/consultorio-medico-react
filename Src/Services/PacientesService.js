import api from "./Conexion";

export const listarPacientes = async () => {
    try{
        const response = await api.get("/listarPacientes");
        return { success: true, data: response.data};
    } catch (error) {
        console.error("error al listar pacientes:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "error de conexión",
        };
    }
}

export const eliminarPacientes = async (id) => {
    try {
        await api.delete(`/eliminarPacientes/${id}`);
        return { success: true};
    } catch (error) {
        console.error("Error al eliminar pacientes", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "error de conexión",
        };
    }
}

export const editarPacientes = async (id,data) => {
    try{
        const response = await api.put(`/actualizarPacientes/${id}`, data);
        return { success: true, data: response.data};
    } catch (error) {
        console.error("error al editar pacientes:", error.response ? error.response.data : error.message);
        return{
            success: false,
            message: error.response ? error.response.data : "error de conexión",
        };
    }
};