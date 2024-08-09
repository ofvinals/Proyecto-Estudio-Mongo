import { createSlice } from '@reduxjs/toolkit';
import { cashExtraReducers } from './extraReducers';

const initialState = {
  cashs: [],
  cash: null,
  status: 'Inactivo',
  statusCash: 'Inactivo',
  statusSign: 'Inactivo',
  statusUpdate: 'Inactivo',
  statusDelete: 'Inactivo',
  error: null,
};

export const cashSlice = createSlice({
  name: 'cashs',
  initialState,
  reducers: {
    clearCash(state) {
      state.cash = null;
    },
  },
  extraReducers: cashExtraReducers,
});

export default cashSlice.reducer;
export const { clearCash } = cashSlice.actions;
