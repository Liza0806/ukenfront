import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PaymentState } from "../types/types";

import { fetchAllPayments } from "../thunks/thunks";

const initialState: PaymentState = {
  paymentStatus: "",
  error: undefined,
  payments: [],
  isLoading: false,
};

const paymentSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {
    setPaymentStatus(state, action: PayloadAction<string>) {
      state.paymentStatus = action.payload;
    },
    setError(state, action: PayloadAction<string | undefined>) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPayments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllPayments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.payments = action.payload;
      })
      .addCase(fetchAllPayments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setPaymentStatus, setError } = paymentSlice.actions;
export default paymentSlice.reducer;
