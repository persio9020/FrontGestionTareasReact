import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import tasksSlice from "./tasksSlice";
import loadingSlice from "./loadingSlice.jsx";

const store = configureStore({
    reducer: {
        auth: authReducer,
        tarea: tasksSlice,
        loading: loadingSlice
    },
});

export default store;