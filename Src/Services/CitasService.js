import api from "./Conexion";

export const listarCitas = async () => {
    try{
        const response = await api.get("/listarCitas");
        return { success: true, data: response.data};
    } catch (error) {
        console.error("error al listar Citas:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "error de conexión",
        };
    }
}

export const eliminarCitas = async (id) => {
    try {
        await api.delete(`/eliminarCitas${id}`);
        return { success: true};
    } catch (error) {
        console.error("Error al eliminar Citas", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "error de conexión",
        };
    }
}

export const EditarCitas = async (id,data) => {
    try{
        const response = await api.put(`/actualizarCitas/${id}`, data);
        return { success: true, data: response.data};
    } catch (error) {
        console.error("error al editar Citas:", error.response ? error.response.data : error.message);
        return{
            success: false,
            message: error.response ? error.response.data : "error de conexión",
        };
    }
};

export const crearCitas = async (data) => {
  try {
    const response = await api.post("/crearCitas", data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error(
      "error al crear Citas:",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      message: error.response ? error.response.data : "error de conexión",
    };
  }
};