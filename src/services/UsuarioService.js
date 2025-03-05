import api from "../config/axios.js";

class UsuarioService {

    login(data){
        return api.post(`/login`, data)
    }

    crearUsuario(data){
        return api.post(`/registrarse`, data)
    }

    listar(){
        return api.get(`/listar`)
    }
}
export default new UsuarioService()