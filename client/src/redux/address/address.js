import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    address: [],
    loading: false,
    error: false,
}

const addressSlice = createSlice({
    name: "address",
    initialState,
    reducers: {
        getAddressStart: (state) => {
            state.loading = true
        },
        getAddressSuccess: (state, action) => {
            state.address = action.payload
            state.loading = false
            state.error = false

        },
        getAddressFailure: (state, action) => {
            state.error = action.payload
            state.loading = false
        }
    }
}) 

export const { getAddressStart, getAddressSuccess, getAddressFailure } = addressSlice.actions

export default addressSlice.reducer