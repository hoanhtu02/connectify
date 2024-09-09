import { createSlice } from "@reduxjs/toolkit";

type SettingState = {
    theme: "light" | "dark";
    language: "en" | "fr";
    isUseEditor: boolean;
}
const initialState: SettingState = {
    theme: "light",
    language: "en",
    isUseEditor: false,
}
const settingSlice = createSlice({
    name: "setting",
    initialState,
    reducers: {
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
export const { toggleEditor, toggleLanguage, toggleTheme } = settingSlice.actions;
export default settingSlice.reducer