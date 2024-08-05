import {configureStore} from "@reduxjs/toolkit"
import compilerSlice from "./slices/compilerSlice"

export const store = configureStore({
    reducer:{
        compilerSlice
    }
})

// Defining the RootState type, representing the entire state of the store
export type RootState = ReturnType<typeof store.getState>