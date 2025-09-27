import api from "./Conexion";

export const listarDoctores = async () => {
    try{
        const response = await api.get("/listarDoctores");
        return { success: true, data: response.data};
    } catch (error) {
        console.error("error al listar Doctores:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "error de conexión",
        };
    }
}

export const eliminarDoctores = async (id) => {
    try {
        await api.delete(`/eliminarDoctores${id}`);
        return { success: true};
    } catch (error) {
        console.error("Error al eliminar Doctores", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "error de conexión",
        };
    }
}

export const EditarDoctores = async (id,data) => {
    try{
        const response = await api.put(`/actualizarDoctores/${id}`, data);
        return { success: true, data: response.data};
    } catch (error) {
        console.error("error al editar Doctores:", error.response ? error.response.data : error.message);
        return{
            success: false,
            message: error.response ? error.response.data : "error de conexión",
        };
    }
};