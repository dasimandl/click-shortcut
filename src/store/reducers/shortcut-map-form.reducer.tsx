import { createSlice } from '@reduxjs/toolkit';

const initialState: { entities: any } = { entities: {} };

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

      const { key, value }: { key: string; value: any } = action.payload;
      state.entities[key] = value;
    },
  },
});

export const { updateMapping } = mappingSlice.actions;

export default mappingSlice.reducer;
