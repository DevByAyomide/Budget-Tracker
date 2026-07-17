import { createContext } from 'react';

export const CategoryFilterContext = createContext({
  category: 'All',
  setCategory: () => {},
  open: false,
  setOpen: () => {},
  onSelectCategory: () => {},
});

export const FilterRangeContext = createContext({
  range: [0, 100000],
  setRange: () => {},
});

export const FilterDateContext = createContext({
  dateRange: {
    startDate: undefined,
    endDate: undefined,
  },
  setDateRange: () => {},
  period: null,
  setPeriod: () => {},
});
