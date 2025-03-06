import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import TareaService from "../services/TareaService.js";
import UsuarioService from "../services/UsuarioService.js";
import {toast} from "react-toastify";

// Acciones asincrónicas
export const obtenerTarea = createAsyncThunk("tarea/obtenerTarea", async (datosFiltro, {rejectWithValue, dispatch}) => {
    try {
        const response = await TareaService.listarAdministrador(datosFiltro, datosFiltro.paginaActual, datosFiltro.numeroFilas);
        dispatch(listarTareasPorUsuario());
        response.data.paginaActual = datosFiltro.paginaActual
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

export const obtenerTareaPorId = createAsyncThunk("tarea/obtenerTareaPorId", async (id, {
    rejectWithValue,
    dispatch
}) => {
    try {
        await dispatch(listarUsuarios())
        const response = await TareaService.obtenerPorId(id);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

export const agregar = createAsyncThunk("tarea/agregar", async (taskData, {rejectWithValue, dispatch}) => {
    try {
        const response = await TareaService.crear(taskData);
        await dispatch(listarUsuarios())
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

export const actualizar = createAsyncThunk("tarea/actualizar", async ({id, tarea}, {rejectWithValue, dispatch}) => {
    try {
        const response = await TareaService.actualizar(id, tarea);
        await dispatch(listarUsuarios())
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

export const listarUsuarios = createAsyncThunk("tarea/listarUsuarios", async (id, {rejectWithValue}) => {
    try {
        const response = await UsuarioService.listar();
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

export const eliminar = createAsyncThunk("tarea/eliminar", async (id, {rejectWithValue, dispatch}) => {
    try {
        const response = await TareaService.eliminar(id);
        await listarTareasPorUsuario();
        return response
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

export const listarTareasPorUsuario = createAsyncThunk("tarea/listarUsuariosNotificaciones", async (data, {rejectWithValue}) => {
    try {
        const usuario = JSON.parse(localStorage.getItem("user"))
        const response = await TareaService.listarNotificacionesPorUsuario(usuario);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});


const tasksSlice = createSlice({
    name: "tarea",
    initialState: {
        tareas: [],
        usuarios: [],
        notificaciones: [],
        error: null,
        titulo: '',
        descripcion: '',
        estado: 0,
        paginaActual: 1,
        numeroFilas: 10,
        totalPaginas: 5,
        tareaSeleccionada: {
            id: null,
            titulo: "",
            descripcion: "",
            fechaCreacion: new Date().toISOString().split("T")[0],
            estadoId: 1,
            usuarioId: ""
        }
    },
    reducers: {
        setId: (state, action) => {
            state.tareaSeleccionada.id = action.id;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(obtenerTarea.fulfilled, (state, action) => {
                state.tareas = action.payload.tareas;
                state.totalPaginas = action.payload.totalPaginas;
                state.paginaActual = action.payload.paginaActual;
            })
            .addCase(obtenerTarea.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(agregar.fulfilled, (state, action) => {
                //state.tareas.push(action.payload);
            })
            .addCase(listarUsuarios.fulfilled, (state, action) => {
                state.usuarios = action.payload;
            })
            .addCase(actualizar.fulfilled, (state, action) => {
                const index = state.tareas.findIndex(task => task.id === action.payload.id);
                if (index !== -1) {
                    state.tareas[index] = action.payload;
                }
            })
            .addCase(obtenerTareaPorId.fulfilled, (state, action) => {
                state.tareaSeleccionada = action.payload;
            })
            .addCase(listarTareasPorUsuario.rejected, (state, action) => {
                state.error = action.error.message;
                console.log('NO sele han asignado ')
                console.log(state.notificaciones);
            })
            .addCase(listarTareasPorUsuario.fulfilled, (state, action) => {
                state.notificaciones = action.payload
                console.log('1. Create new scratch file from selection')
                console.log(state.notificaciones);
                if(!state.notificaciones) {
                    toast.warn(`A usted no se  le han asignado tareas`);
                    return
                }
                state.notificaciones?.forEach(n => {
                    if (n.nombreEstado === 'Pendiente') {
                        toast.info(`Tarea: ${n.titulo} - Descripción: ${n.descripcion}`);
                    }
                });
            });
    },
});
export const {setId} = tasksSlice.actions;
export default tasksSlice.reducer;