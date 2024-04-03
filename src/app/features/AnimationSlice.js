import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { feedback, login, register } from "./Api";
import axios from "axios";

const url = "http://localhost:8080/api/v1/";

// Async Thunks
export const User_Login = createAsyncThunk(
  "TextAnimation/login",
  async (data, thunkApi) => {
    try {
      const response = await login(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const User_Register = createAsyncThunk(
  "TextAnimation/register",
  async (data, thunkApi) => {
    try {
      const response = await register(data);
      console.log(response);

      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const User_Feedback = createAsyncThunk(
  "TextAnimation/feedback",
  async (data, thunkApi) => {
    try {
      const response = await feedback(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

// Slice
const AnimationSlice = createSlice({
  name: "TextAnimation",
  initialState: {
    loading: false,
    LoggedIn: false,
    LoggedUser: [],
    error: null,
    success: false,
    message: "",
  },
  reducers: {
    logoutStart: (state) => {
      state.loading = true;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.LoggedIn = false;
      state.LoggedUser = [];
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(User_Login.fulfilled, (state, action) => {
        state.LoggedIn = true;
        state.LoggedUser = action.payload;
        state.error = null;
        state.loading = false;
        state.success = true;
      })
      .addCase(User_Login.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(User_Login.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.success = false;
      })
      .addCase(User_Register.fulfilled, (state, action) => {
        state.LoggedIn = true;
        state.LoggedUser = action.payload;
        state.success = true;
        state.error = null;
        state.loading = false;
      })
      .addCase(User_Register.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(User_Register.rejected, (state, action) => {
        console.log(action.payload);
        state.success = false;
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(User_Feedback.fulfilled, (state, action) => {
        // Handle feedback fulfilled

        state.success = true;
        state.message = action.payload.message;
        state.loading = false;
      })
      .addCase(User_Feedback.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(User_Feedback.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.success = false;
      }),
});
export const { logoutStart, logoutSuccess } = AnimationSlice.actions;
export default AnimationSlice.reducer;
