import { createSlice } from "@reduxjs/toolkit";


const loadingSlice = createSlice({
    name: "loading",
    initialState: {
        isLoading: false,
    },
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;  // true o false
        }
    }
});

export const { setLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
