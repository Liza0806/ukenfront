import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PaymentState } from '../types/types';

const initialState: PaymentState = {
  paymentStatus: '',
  error: undefined,
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setPaymentStatus(state, action: PayloadAction<string>) {
      state.paymentStatus = action.payload;
    },
    setError(state, action: PayloadAction<string | undefined>) {
      state.error = action.payload;
    },
  },
});

export const { setPaymentStatus, setError } = paymentSlice.actions;
export default paymentSlice.reducer;
