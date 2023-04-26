import { configureStore } from '@reduxjs/toolkit';
import userReducer from './UserSlice';
import expenseReducer from './ExpensesSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    expense: expenseReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
