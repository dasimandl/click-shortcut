import { createSlice } from '@reduxjs/toolkit';

const initialState: { coordinates: any; rowIndex: number | null } = {
  coordinates: { x: null, y: null },
  rowIndex: null,
};

const mappingSlice = createSlice({
  name: 'mapping',
  initialState,
  reducers: {
    updateCoordinates(state, action) {
      const { key, value }: { key: string; value: any } = action.payload;
      state.coordinates = value;
    },
    initGetMousePosition(state, action) {
      const { index }: { index: number } = action.payload;
      state.rowIndex = index;
    },
  },
});

export const { updateCoordinates, initGetMousePosition } = mappingSlice.actions;

export default mappingSlice.reducer;
