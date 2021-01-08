import { createSlice } from '@reduxjs/toolkit';

const initialState: { entities: any } = { entities: {} };

const mappingSlice = createSlice({
  name: 'mapping',
  initialState,
  reducers: {
    updateMapping(state, action) {
      const { key, value }: { key: string; value: any } = action.payload;
      state.entities[key] = value;
    },
  },
});

export const { updateMapping } = mappingSlice.actions;

export default mappingSlice.reducer;
