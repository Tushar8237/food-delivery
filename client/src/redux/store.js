import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist'
import storage from "redux-persist/lib/storage";
import userReducer from './user/userSlice'

const rootReducer = combineReducers({
    user : userReducer
})

const persisConfig = {
    key : "root",
    version: 1,
    storage
}

const persistReducers = persistReducer(persisConfig, rootReducer)

export const store = configureStore({
    reducer: persistReducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
}) 

export const persistor = persistStore(store)