import api from "./Conexion";

export const listarEspecialidades = async () => {
    try{
        const response = await api.get("/listarEspecialidades");
        return { success: true, data: response.data};
    } catch (error) {
        console.error("error al listar Especialidades:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "error de conexión",
        };
    }
}

export const eliminarEspecialidades = async (id) => {
    try {
        await api.delete(`/eliminarEspecialidades/${id}`);
        return { success: true};
    } catch (error) {
        console.error("Error al eliminar Especialidades", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "error de conexión",
        };
    }
}

export const editarEspecialidades = async (id,data) => {
    try{
        const response = await api.put(`/actualizarEspecialidades/${id}`, data);
        return { success: true, data: response.data};
    } catch (error) {
        console.error("error al editar Especialidades:", error.response ? error.response.data : error.message);
        return{
            success: false,
            message: error.response ? error.response.data : "error de conexión",
        };
    }
};

export const crearEspecialidades = async (data) => {
  try {
    const response = await api.post("/crearEspecialidades", data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error(
      "error al crear Especialidades:",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      message: error.response ? error.response.data : "error de conexión",
    };
  }
};
