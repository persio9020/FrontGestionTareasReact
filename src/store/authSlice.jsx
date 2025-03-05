import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UsuarioService from "../services/UsuarioService";


// Función para verificar si el token ha expirado
const isTokenExpired = (token) => {
    if (!token) return true;
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 < Date.now();
};

export const registrarse = createAsyncThunk("/registrarse", async (usuario, {rejectWithValue, dispatch}) => {
    try {
        const response = await UsuarioService.crearUsuario(usuario)
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

// Acción asíncrona para iniciar sesión
export const loginUser = createAsyncThunk("auth/loginUser", async (userData, { rejectWithValue }) => {
    try {
        const response =  await UsuarioService.login(userData);
        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.usuario));
        }
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: JSON.parse(localStorage.getItem("user")) || null,
        token: localStorage.getItem("token") || null,
        error: null,
        loading: false
    },
    reducers: {
        cerrarSesion: (state) => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            state.user = null;
            state.token = null;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                if (isTokenExpired(action.payload.token)) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    state.user = null;
                    state.token = null;
                    state.error = "Sesión expirada, inicie sesión nuevamente.";
                    return;
                }
                state.loading = false;
                state.user = action.payload.usuario;
                state.token = action.payload.token;
            })
            .addCase(loginUser.rejected, (state, action) => {
                console.log('rejected')
                state.loading = false;
                state.error = action;
            });
    },
});

export const { cerrarSesion } = authSlice.actions;

export default authSlice.reducer;
