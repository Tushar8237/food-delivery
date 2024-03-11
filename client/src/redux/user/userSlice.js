import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentUser: null,
    userData: null,
    loading: false,
    error: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        singInStart: (state) => {
            state.loading = true
        },
        singInSuccess: (state, action) => {
            state.currentUser = action.payload
            state.loading = false
            state.error = false
        },
        singInFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        updateUserStart: (state) => {
            state.loading = true
        },
        updateUserSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = false
        },
        updateUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        deleteUserStart: (state) => {
            state.loading = true 
        },
        deleteUserSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = false;
        },
        deleteUserFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        getUserStart: (state) => {
            state.loading = true 
        },
        getUserSuccess: (state, action) => {
            state.userData = action.payload;
            state.loading = false;
            state.error = false;
        },
        getUserFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        getUserDataClear: (state) => {
            state.userData = null
            state.loading = false
            state.loading = false
        },
        signOut: (state) => {
            state.currentUser = null
            state.loading = false
            state.error + false
        }
    }
})

export const { 
    singInStart, 
    singInSuccess, 
    singInFailure, 
    updateUserStart, 
    updateUserSuccess, 
    updateUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    getUserStart,
    getUserSuccess,
    getUserFailure,
    getUserDataClear,
    signOut 
} = userSlice.actions

export default userSlice.reducer