import { createSlice } from '@reduxjs/toolkit';

const initialState: { entities: any } = {
  entities: { 0: {}, 1: {}, 2: {}, 3: {} },
};

const mappingSlice = createSlice({
  name: 'mapping',
  initialState,
  reducers: {
    updateMapping(state, action) {
      console.log(
        '🚀 ~ file: shortcut-map-form.reducer.tsx ~ line 10 ~ updateMapping ~ action',
        action
      );
      console.log(
        '🚀 ~ file: shortcut-map-form.reducer.tsx ~ line 10 ~ updateMapping ~ state',
        state
      );

      const {
        key,
        value,
        field,
      }: { key: string; value: any; field: any } = action.payload;
      state.entities[key][field] = value;
      console.log(
        '🚀 ~ file: shortcut-map-form.reducer.tsx ~ line 21 ~ updateMapping ~ state.entities',
        state.entities
      );
    },
  },
});

export const { updateMapping } = mappingSlice.actions;

export default mappingSlice.reducer;
