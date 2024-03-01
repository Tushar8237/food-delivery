import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    menuItems: [],
    menuItem : {},
    loading : false,
    error : false 
}

const updateSlice = createSlice({
    name : 'menuItem',
    initialState,
    reducers: {
        updateStart: (state, action) => {
            state.loading = true
            state.menuItem = action.payload
        },
        updateSuccess: (state, action) => {
            state.menuItem = action.payload,
            state.loading = false,
            state.error = false
        },
        updateFailure: (state, action) => {
            state.loading = false,
            state.error = action.payload
        },
        addMenuStart: (state) => {
            state.loading = true
        },
        addMenuSuccess: (state, action) => {
            state.menuItems = action.payload
            state.loading = false
            state.error = false
        },
        addMenuFailure: (state, action) => {
            state.menuItems = action.payload
            state.loading = false
            state.error = false
        }
    }
})

export const { addMenuStart, addMenuSuccess, addMenuFailure,  updateStart, updateSuccess, updateFailure } = updateSlice.actions

export default updateSlice.reducer