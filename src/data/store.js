import { configureStore } from '@reduxjs/toolkit';
import accountSlice from './accountSlice';
const persistedState = JSON.parse(localStorage.getItem('account'));
console.log('Persisted State:', persistedState);

const store = configureStore({
  reducer: {
    account: accountSlice,
  },
  preloadedState: {
    account: persistedState || { data: [], balance: 0 },
  },
});

export default store;

store.subscribe(() => {
  localStorage.setItem('account', JSON.stringify(store.getState().account));
});
