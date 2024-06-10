// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'; // Your combined reducers file

const store = configureStore({
  reducer: rootReducer, // Your combined reducers
  middleware: getDefaultMiddleware => {
    // Customize middleware here (optional)
    return getDefaultMiddleware();
  },
  devTools: true, // Enable Redux DevTools (optional)
  preloadedState: {}, // Initial state (optional)
});

export default store;