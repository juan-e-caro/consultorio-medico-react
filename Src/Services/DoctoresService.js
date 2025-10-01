import api from "./Conexion";

export const listardoctoreses = async () => {
    try{
        const response = await api.get("/listardoctoreses");
        return { success: true, data: response.data};
    } catch (error) {
        console.error("error al listar doctoreses:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "error de conexión",
        };
    }
}

export const eliminardoctoreses = async (id) => {
    try {
        await api.delete(`/eliminardoctoreses${id}`);
        return { success: true};
    } catch (error) {
        console.error("Error al eliminar doctoreses", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "error de conexión",
        };
    }
}

export const editardoctoreses = async (id,data) => {
    try{
        const response = await api.put(`/actualizardoctoreses/${id}`, data);
        return { success: true, data: response.data};
    } catch (error) {
        console.error("error al editar doctoreses:", error.response ? error.response.data : error.message);
        return{
            success: false,
            message: error.response ? error.response.data : "error de conexión",
        };
    }
};