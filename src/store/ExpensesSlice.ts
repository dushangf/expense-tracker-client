import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import type { InitialState, Expense } from './types/ExpenseTypes';
import { BASE_URL } from '../utils/constants';

const token = localStorage.getItem('_auth');

export const getExpenseDetails = createAsyncThunk(
  'expense/details',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/expenses/${id}`);

      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const downloadReport = createAsyncThunk(
  'expense/report',
  async (category: string) => {
    const response = await axios.get(`${BASE_URL}/expenses/report/download`, {
      headers: { Authorization: 'Bearer ' + token },
      params: { category: category },
      responseType: 'blob',
    });

    window.open(URL.createObjectURL(response.data));
  }
);

export const postExpense = createAsyncThunk(
  'expense/post',
  async (data: Expense, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/expenses`, data);

      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const getAllExpenses = createAsyncThunk(
  'expense/list',
  async (filter: any, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/expenses/user/${filter.id}`,
        {
          params: { status: filter.status },
        }
      );

      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const updateExpense = createAsyncThunk(
  'expense/update',
  async (expense: Expense, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/expenses/${expense.id}`,
        expense
      );

      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const deleteExpense = createAsyncThunk(
  'expense/delete',
  async (id: string) => {
    try {
      const response = await axios.delete(`${BASE_URL}/expenses/${id}`);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState: InitialState = {
  list: {
    data: [],
    error: false,
    pending: false,
  },
  details: {
    data: {},
    error: false,
    pending: false,
  },
  post: {
    data: {},
    error: false,
    pending: false,
  },
  update: {
    data: {},
    error: false,
    pending: false,
  },
  delete: {
    data: {},
    error: false,
    pending: false,
  },
};

const ExpenseSlice = createSlice({
  name: 'expense',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getExpenseDetails.fulfilled, (state, action) => {
      state.details.data = action.payload;
    });
    builder.addCase(getAllExpenses.fulfilled, (state, action) => {
      state.list.data = action.payload;
    });
    builder.addCase(deleteExpense.fulfilled, (state, action) => {
      state.delete.data = action.payload;
    });
  },
});

export default ExpenseSlice.reducer;
