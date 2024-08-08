import { configureStore } from "@reduxjs/toolkit";
import compilerSlice from "./slices/compilerSlice";
import { api } from "./slices/api";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    compilerSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

// Defining the RootState type, representing the entire state of the store
export type RootState = ReturnType<typeof store.getState>;
