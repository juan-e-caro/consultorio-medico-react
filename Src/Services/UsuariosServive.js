import api from "./Conexion";

export const listarUsuarios = async () => {
    try{
        const response = await api.get("/listarUsuarios");
        return { success: true, data: response.data};
    } catch (error) {
        console.error("error al listar usuarios:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "error de conexión",
        };
    }
}

export const eliminarUsuarios = async (id) => {
    try {
        await api.delete(`/eliminarUsuarios${id}`);
        return { success: true};
    } catch (error) {
        console.error("Error al eliminar usuarios", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "error de conexión",
        };
    }
}

export const EditarUsuarios = async (id,data) => {
    try{
        const response = await api.put(`/actualizarUsuarios/${id}`, data);
        return { success: true, data: response.data};
    } catch (error) {
        console.error("error al editar usuarios:", error.response ? error.response.data : error.message);
        return{
            success: false,
            message: error.response ? error.response.data : "error de conexión",
        };
    }
};