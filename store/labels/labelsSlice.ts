import { createSlice } from '@reduxjs/toolkit';

export interface LabelsState {
  labels: any;
}

let initialState: LabelsState = {
    labels:[]
};

const labelsSlice = createSlice({
  name: 'galleries',
  initialState,
  reducers: {
    setLabels: (state, action) => {
      state.labels = action.payload;
    },
  },
});

export const { setLabels } = labelsSlice.actions;

export default labelsSlice.reducer;
