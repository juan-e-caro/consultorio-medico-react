import api from "./Conexion";

export const listarConsultorios = async () => {
    try{
        const response = await api.get("/listarConsultorios");
        return { success: true, data: response.data};
    } catch (error) {
        console.error("error al listar Consultorios:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "error de conexión",
        };
    }
}

export const eliminarConsultorios = async (id) => {
    try {
        await api.delete(`/eliminarConsultorios${id}`);
        return { success: true};
    } catch (error) {
        console.error("Error al eliminar Consultorios", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "error de conexión",
        };
    }
}

export const EditarConsultorios = async (id,data) => {
    try{
        const response = await api.put(`/actualizarConsultorios/${id}`, data);
        return { success: true, data: response.data};
    } catch (error) {
        console.error("error al editar Consultorios:", error.response ? error.response.data : error.message);
        return{
            success: false,
            message: error.response ? error.response.data : "error de conexión",
        };
    }
};

export const crearConsultorios = async (data) => {
  try {
    const response = await api.post("/crearConsultorios", data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error(
      "error al crear Consultorios:",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      message: error.response ? error.response.data : "error de conexión",
    };
  }
};

