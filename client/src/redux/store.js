import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from './slices/authSlice';
import contactSliceReducer from './slices/contactSlice'

const Store = configureStore({
    reducer: {
        auth: authSliceReducer,
        contacts: contactSliceReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
    devTools: true
})

export default Store;