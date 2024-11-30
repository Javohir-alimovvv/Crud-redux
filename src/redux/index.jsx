import { configureStore } from "@reduxjs/toolkit";
import counterReduser from './slice/counterSlice'
import { api } from "./api";

export const store = configureStore({
    reducer: {
        counter: counterReduser,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(api.middleware),
})
