import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from './slices/authSlice';


const Store = configureStore({
    reducer: {
        auth: authSliceReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
    devTools: true
})

export default Store;