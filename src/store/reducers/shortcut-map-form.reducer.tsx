import { createSlice } from '@reduxjs/toolkit';

const initialState: { entities: any } = {
  entities: { 0: {}, 1: {}, 2: {}, 3: {} },
};

const mappingSlice = createSlice({
  name: 'mapping',
  initialState,
  reducers: {
    updateMapping(state, action) {
      const {
        key,
        value,
        field,
      }: { key: string; value: any; field: any } = action.payload;
      state.entities[key][field] = value;
    },
    addEntity(state, action) {
      const { key }: { key: string; value: any; field: any } = action.payload;
      if (!state.entities[key]) {
        state.entities[key] = {};
      }
    },
    removeEntity(state, action) {
      const { key }: { key: string; value: any; field: any } = action.payload;
      delete state.entities[key];
    },
  },
});

export const { updateMapping, addEntity, removeEntity } = mappingSlice.actions;

export default mappingSlice.reducer;
