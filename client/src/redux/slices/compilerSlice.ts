import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CompilerSliceStateType {
    fullCode: {
        html: string,
        css: string
        javascript: string
    }
    currentLanguage: "html" | "css" | "javascript";
    // currentCode: string
}

const initialState: CompilerSliceStateType = {
    fullCode: {
        html: "This is html",
        css: "This is CSS",
        javascript: "This is JS",
    },
    currentLanguage: "html",
    // currentCode: ""
}

const compilerSlice = createSlice({
    name: "compilerSlice",
    initialState,
    reducers: {
        updateCurrentLanguage: (state, action: PayloadAction<CompilerSliceStateType["currentLanguage"]>) => {
            state.currentLanguage = action.payload
        },
        updateCodeValue: (state, action: PayloadAction<string>) => {
            state.fullCode[state.currentLanguage] = action.payload
        },
        // updateCurrentCode: (state, action: PayloadAction<string>) => {
        //     state.currentCode = action.payload
        // }
    }
})

export default compilerSlice.reducer
export const { updateCurrentLanguage, updateCodeValue, } = compilerSlice.actions