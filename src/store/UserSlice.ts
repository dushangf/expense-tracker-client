import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import type { InitialState } from './types/UserTypes';
import { BASE_URL } from '../utils/constants';
import { User } from './types/UserTypes';

const token = localStorage.getItem('_auth');

export const getUserDetails = createAsyncThunk('user/details', async () => {
  const token = localStorage.getItem('_auth');

  try {
    const response = await axios.get(`${BASE_URL}/users/loggedIn`, {
      headers: { Authorization: 'Bearer ' + token },
    });

    return response.data;
  } catch (e: any) {
    // return rejectWithValue(e.response.data);
  }
});

export const postUser = createAsyncThunk(
  'user/post',
  async (user: User, { rejectWithValue }) => {
    try {
      delete user.confirm_password;
      const response = await axios.post(`${BASE_URL}/users`, user);

      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/update',
  async (user: User, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${BASE_URL}/users`, user, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });

      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const login = createAsyncThunk(
  'user/login',
  async (user: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, user);

      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const uploadProfilePicture = createAsyncThunk(
  'user/profile-picture',
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${BASE_URL}/users/picture`, data, {
        headers: { Authorization: 'Bearer ' + token },
      });

      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.response.data);
    }
  }
);

const initialState: InitialState = {
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

const UserSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserDetails.fulfilled, (state, action) => {
      state.details.data = action.payload;
    });
    builder.addCase(postUser.fulfilled, (state, action) => {
      state.post.error = false;
      state.post.data = action.payload;
    });
    builder.addCase(postUser.rejected, (state, action) => {
      state.post.pending = false;
      state.post.error = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.details.data = action.payload;
    });
    builder.addCase(uploadProfilePicture.fulfilled, (state, action) => {
      state.details.data = action.payload;
    });
  },
});

export default UserSlice.reducer;
