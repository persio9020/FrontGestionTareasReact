import axios from "../config/axios.js";

class TareaService {

    crear(tarea) {
        return axios.post(`/tarea`, tarea)
    }

    actualizar(id, data) {
        return axios.put(`/tarea`, data)
    }

    eliminar(id) {
        return axios.delete(`/tarea/${id}`)
    }

    listarNotificacionesPorUsuario(datos) {
        return axios.get(`/tarea/usuario-notificaciones/${datos.id}`)
    }

    listarAdministrador(datosFiltro, paginaActual, numeroFilas) {
        return axios.get(`/tarea?titulo=${datosFiltro.titulo}&descripcion=${datosFiltro.descripcion}&estado=${datosFiltro.estado}&posicionPagina=${paginaActual}&numeroFilas=${numeroFilas}`)
    }

    obtenerPorId(id) {
        return axios.get(`/tarea/${id}`)
    }

}

export default new TareaService();