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
      const amount = Number(action.payload.amount) || 0;
      const date = action.payload.date
        ? new Date(action.payload.date).toISOString()
        : new Date().toISOString();
      state.data.push({
        id: crypto.randomUUID(),
        avatarFallback: category === 'Income' ? 'Credit' : 'Debit',
        description: action.payload.description || (category === 'Income' ? 'Income' : 'Expense'),
        amount,
        category,
        date,
      });
      state.balance = state.data.reduce(
        (acc, t) => acc + (t.category === 'Income' ? Number(t.amount) : -Number(t.amount)),
        0
      );
    },

    editTransaction: (state, action) => {
      const { id, description, category, amount, date } = action.payload;
      const index = state.data.findIndex((t) => t.id === id);
      if (index !== -1) {
        const old = state.data[index];
        const newCategory = category !== undefined ? category : old.category;
        const newAmount = amount !== undefined ? Number(amount) : old.amount;
        const newDate = date !== undefined ? new Date(date).toISOString() : old.date;
        state.data[index] = {
          ...old,
          description: description !== undefined ? description : old.description,
          category: newCategory,
          amount: newAmount,
          date: newDate,
          avatarFallback: newCategory === 'Income' ? 'Credit' : 'Debit',
        };
        state.balance = state.data.reduce(
          (acc, t) => acc + (t.category === 'Income' ? Number(t.amount) : -Number(t.amount)),
          0
        );
      }
    },

    deleteTransaction: (state, action) => {
      const id = action.payload;
      state.data = state.data.filter((t) => t.id !== id);
      state.balance = state.data.reduce(
        (acc, t) => acc + (t.category === 'Income' ? Number(t.amount) : -Number(t.amount)),
        0
      );
    },

    setFilter: (state, action) => {
      state.activeFilter = action.payload;
    },

    clearFilter: (state) => {
      state.activeFilter = initialState.activeFilter;
    },
  },
});

export const selectAccount = (state) => state.account;
export const selectAllTransactions = (state) => state.account.data;
export const selectBalance = (state) => state.account.balance;

export const filteredTransaction = createSelector([selectAccount], ({ data, activeFilter }) => {
  const { category, range, period, dateRange } = activeFilter;

  // No filter selected -> return everything
  if (!category && !range && !period && !dateRange) {
    return data;
  }

  return data.filter((transaction) => {
    const txDate = new Date(transaction.date);

    // CATEGORY
    if (category && category !== 'All' && transaction.category !== category) {
      return false;
    }

    // AMOUNT
    if (range) {
      if (transaction.amount < range.min || transaction.amount > range.max) {
        return false;
      }
    }

    // CUSTOM DATE
    if (dateRange && dateRange.startDate && dateRange.endDate) {
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

export function calculateMonthlyAnalytics(transactions, year, month) {
  const monthTransactions = transactions.filter((t) => {
    if (!t.date) return false;
    const d = new Date(t.date);
    if (isNaN(d.getTime())) return false;
    return d.getFullYear() === year && d.getMonth() === month;
  });

  const incomeTransactions = monthTransactions.filter((t) => t.category === 'Income');
  const expenseTransactions = monthTransactions.filter((t) => t.category !== 'Income');

  const totalIncome = incomeTransactions.reduce((acc, t) => acc + (Number(t.amount) || 0), 0);
  const totalExpenses = expenseTransactions.reduce((acc, t) => acc + (Number(t.amount) || 0), 0);
  const netCashFlow = totalIncome - totalExpenses;

  const categoryMap = {};
  for (const t of expenseTransactions) {
    const cat = t.category || 'Miscellaneous';
    const amt = Number(t.amount) || 0;
    if (!categoryMap[cat]) {
      categoryMap[cat] = {
        category: cat,
        amount: 0,
        count: 0,
      };
    }
    categoryMap[cat].amount += amt;
    categoryMap[cat].count += 1;
  }

  const categoryBreakdown = Object.values(categoryMap).map((item) => ({
    ...item,
    percentage: totalExpenses > 0 ? (item.amount / totalExpenses) * 100 : 0,
  }));

  return {
    year,
    month,
    monthTransactions,
    incomeTransactions,
    expenseTransactions,
    totalIncome,
    totalExpenses,
    netCashFlow,
    categoryBreakdown,
    hasTransactions: monthTransactions.length > 0,
    hasExpenses: expenseTransactions.length > 0,
    hasIncome: incomeTransactions.length > 0,
  };
}

export const { addTransaction, editTransaction, deleteTransaction, setFilter, clearFilter } = accountSlice.actions;
export default accountSlice.reducer;

