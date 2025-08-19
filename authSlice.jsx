import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/api'; 

export const signupUser = createAsyncThunk(
  'userAuth/signupUser',
  async (userData, thunkAPI) => {
    try {
      const res = await axios.post('/auth/signup', userData);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);

const authSlice = createSlice({
  name: 'userAuth',
  initialState: {
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false,
  },
  reducers: {
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload;
        //localStorage.setItem('authToken', action.payload.token);
      })
  },
});

export const { clearAuthError } = authSlice.actions;
export default authSlice.reducer;
