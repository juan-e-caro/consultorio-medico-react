import api from "./Conexion";

export const listarHorarios = async () => {
    try{
        const response = await api.get("/listarHorarios");
        return { success: true, data: response.data};
    } catch (error) {
        console.error("error al listar Horarios:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "error de conexión",
        };
    }
}

export const eliminarHorarios = async (id) => {
    try {
        await api.delete(`/eliminarHorarios${id}`);
        return { success: true};
    } catch (error) {
        console.error("Error al eliminar Horarios", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "error de conexión",
        };
    }
}

export const EditarHorarios = async (id,data) => {
    try{
        const response = await api.put(`/actualizarHorarios/${id}`, data);
        return { success: true, data: response.data};
    } catch (error) {
        console.error("error al editar Horarios:", error.response ? error.response.data : error.message);
        return{
            success: false,
            message: error.response ? error.response.data : "error de conexión",
        };
    }
};