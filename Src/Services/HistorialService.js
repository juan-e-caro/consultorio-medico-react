import api from "./Conexion";

export const listarHistorial = async () => {
    try{
        const response = await api.get("/listarHistorial");
        return { success: true, data: response.data};
    } catch (error) {
        console.error("error al listar Historial:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "error de conexión",
        };
    }
}

export const eliminarHistorial = async (id) => {
    try {
        await api.delete(`/eliminarHistorial/${id}`);
        return { success: true};
    } catch (error) {
        console.error("Error al eliminar Historial", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "error de conexión",
        };
    }
}

export const EditarHistorial = async (id,data) => {
    try{
        const response = await api.put(`/actualizarHistorial/${id}`, data);
        return { success: true, data: response.data};
    } catch (error) {
        console.error("error al editar Historial:", error.response ? error.response.data : error.message);
        return{
            success: false,
            message: error.response ? error.response.data : "error de conexión",
        };
    }
};

export const crearHistorial = async (data) => {
  try {
    const response = await api.post("/crearHistorial", data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error(
      "error al crear Historiales:",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      message: error.response ? error.response.data : "error de conexión",
    };
  }
};