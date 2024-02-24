import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist'
import storage from "redux-persist/lib/storage";
import userReducer from './user/userSlice'
import restroReducer from './restaurants/restaurantsSlice'
import cartReducer from './cart-items/cartSlice'

const rootReducer = combineReducers({
    user : userReducer,
    restro : restroReducer,
    cart : cartReducer,
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