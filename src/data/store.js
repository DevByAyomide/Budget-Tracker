import { configureStore } from '@reduxjs/toolkit';
import accountSlice, { initialState } from './accountSlice';

const persistedState = JSON.parse(localStorage.getItem('account'));

const store = configureStore({
  reducer: {
    account: accountSlice,
  },
  preloadedState: {
    account: persistedState || initialState,
  },
});

export default store;

store.subscribe(() => {
  // localStorage.clear();
  localStorage.setItem('account', JSON.stringify(store.getState().account));
});
