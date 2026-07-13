import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  balance: 0,
};
const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    addAccount: (state, action) => {
      state.balance += action.payload.amount;
      state.data.push({ id: crypto.randomUUID(), tag: 'Income', date: new Date().toDateString(), ...action.payload });
    },
  },
});

export const { addAccount } = accountSlice.actions;
export default accountSlice.reducer;
