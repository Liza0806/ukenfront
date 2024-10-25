import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PaymentState {
  paymentStatus: string;
  error: string | null;
}

const initialState: PaymentState = {
  paymentStatus: '',
  error: null,
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setPaymentStatus(state, action: PayloadAction<string>) {
      state.paymentStatus = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setPaymentStatus, setError } = paymentSlice.actions;
export default paymentSlice.reducer;
