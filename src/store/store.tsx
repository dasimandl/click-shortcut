import { configureStore } from '@reduxjs/toolkit';
import { logger } from 'redux-logger';
import shortcutMapReducer from './reducers/shortcut-map-form.reducer';

const store = configureStore({
  reducer: {
    mapping: shortcutMapReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
export default store;
