import { createSlice } from '@reduxjs/toolkit';

export const homeSlice = createSlice({
    name : 'home',
    initialState : {
        url : {},
        genres : {},
    },

    reducers : {
        getApiConfiguration : (state, action) =>{
            state.url = action.payload;
        },
        getGenres : (state, action) =>{
            state.genres = action.payload;
        },
    },
});

// Action creators are generated from each case reducer
export const { getApiConfiguration, getGenres } = homeSlice.actions;

// reducer
export default homeSlice.reducer;