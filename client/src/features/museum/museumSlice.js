import {createSlice } from '@reduxjs/toolkit'

const initialState = {
    museumId: null,
}

export const museumSlice = createSlice({
    name: 'museum',
    initialState,
    reducers: {
        setMuseumId: (state, action) => {
            state.museumId = action.payload;
        },
    },

})

export const selectMuseumId = (state) => state.museum.museumId;

export const { setMuseumId } = museumSlice.actions;
export default museumSlice.reducer