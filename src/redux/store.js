import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './reducers/theme.reducer';

export const Store = configureStore({
  reducer: {
    theme: themeReducer,
  },
});
