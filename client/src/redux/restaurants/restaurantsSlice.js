import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    restro : [],
    loading : true,
    error : false 
}

const restroSlice = createSlice({
    name : 'restaurants',
    initialState,
    reducers: {
        restroStart: (state) => {
            state.loading = true
        },
        restroSuccess: (state, action) => {
            state.restro = action.payload,
            state.loading = false,
            state.error = false
        },
        restroFailure: (state, action) => {
            state.loading = false,
            state.error = action.payload
        }
    }
})

export const { restroStart, restroSuccess, restroFailure } = restroSlice.actions

export default restroSlice.reducer
