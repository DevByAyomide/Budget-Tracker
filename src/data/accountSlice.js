import { createSelector, createSlice } from '@reduxjs/toolkit';

export const initialState = {
  data: [],
  balance: 0,
  activeFilter: {
    category: 'All',
    range: {
      min: 0,
      max: 100000,
    },
    period: null,
    dateRange: {
      startDate: undefined,
      endDate: undefined,
    },
  },
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      const category = action.payload.category ?? 'Income';
      state.data.push({
        id: crypto.randomUUID(),
        date: new Date().toISOString(),
        avatarFallback: category === 'Income' ? 'Credit' : 'Debit',
        ...action.payload,
        category,
      });
      state.balance += category === 'Income' ? action.payload.amount : -action.payload.amount;
    },

    setFilter: (state, action) => {
      state.activeFilter = action.payload;
    },

    clearFilter: (state) => {
      state.activeFilter = initialState.data;
    },
  },
});

const selectAccount = (state) => state.account;

export const filteredTransaction = createSelector([selectAccount], ({ data, activeFilter }) => {
  const { category, range, period, dateRange } = activeFilter;

  // No filter selected -> return everything
  if (!category && !range && !period && !dateRange) {
    return data;
  }

  return data.filter((transaction) => {
    const txDate = new Date(transaction.date);

    // CATEGORY
    if (category && transaction.category !== category) {
      return false;
    }

    // AMOUNT
    if (range) {
      if (transaction.amount < range.min || transaction.amount > range.max) {
        return false;
      }
    }

    // CUSTOM DATE
    if (dateRange) {
      const start = new Date(dateRange.startDate);
      const end = new Date(dateRange.endDate);

      if (txDate < start || txDate > end) {
        return false;
      }
    }

    // LAST X DAYS
    else if (period) {
      const diff = (Date.now() - txDate.getTime()) / (1000 * 60 * 60 * 24);

      if (diff > period) {
        return false;
      }
    }

    return true;
  });
});

export const { addTransaction, setFilter, clearFilter } = accountSlice.actions;
export default accountSlice.reducer;
