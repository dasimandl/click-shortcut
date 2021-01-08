import { configureStore } from '@reduxjs/toolkit';
import shortcutMapReducer from './reducers/shortcut-map-form.reducer';

const store = configureStore({
  reducer: {
    mapping: shortcutMapReducer,
  },
});
export default store;
