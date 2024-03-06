import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  theme: localStorage.getItem('theme') || 'light',
};
const themeReducer = createSlice({
  name: 'themeReducer',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', state.theme);
    },
  },
});
export const { toggleTheme } = themeReducer.actions;

export default themeReducer.reducer;
