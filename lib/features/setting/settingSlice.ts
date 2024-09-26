import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SettingState = {
    theme: "light" | "dark";
    language: "en" | "fr";
    isUseEditor: boolean;
    tokenFileUpload: string
}
const initialState: SettingState = {
    theme: "light",
    language: "en",
    isUseEditor: false,
    tokenFileUpload: ""
}
const settingSlice = createSlice({
    name: "setting",
    initialState,
    reducers: {
        setTokenFileUpload(state, action: PayloadAction<string>) {
            state.tokenFileUpload = action.payload
        },
        toggleTheme(state) {
            state.theme = state.theme === "light" ? "dark" : "light";
        },
        toggleLanguage(state, action) {
            state.language = action.payload;
        },
        toggleEditor(state, action) {
            state.isUseEditor = action.payload;
        },
    }
})
export const { toggleEditor, toggleLanguage, toggleTheme, setTokenFileUpload } = settingSlice.actions;
export default settingSlice.reducer