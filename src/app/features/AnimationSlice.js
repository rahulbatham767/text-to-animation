import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  feedback,
  fetchImage,
  fetchVideo,
  login,
  register,
  saveVideo,
} from "./Api";
import axios from "axios";

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
export const User_fetchVideo = createAsyncThunk(
  "TextAnimation/fetch_video",
  async (data, thunkApi) => {
    console.log(data);
    try {
      const response = await fetchVideo(data);
      console.log(response);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
export const User_fetch_Image = createAsyncThunk(
  "TextAnimation/fetch_image",
  async (data, thunkApi) => {
    console.log(data);
    try {
      const response = await fetchImage(data);
      console.log(response);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const Get_Status = createAsyncThunk(
  "Animation/getStatus",
  async (data, thunkApi) => {
    // Accept both title and data
    console.log(data);

    function parseUUIDFromURL(data) {
      const urlParams = new URLSearchParams(data);
      return urlParams.get("uuid");
    }

    const uuid = parseUUIDFromURL(data);

    const options = {
      method: "GET",
      url: "https://runwayml.p.rapidapi.com/status",
      params: {
        uuid: uuid,
      },
      headers: {
        "X-RapidAPI-Key": "ed8f46302dmsh1db6a3e079aec90p16e316jsnaf351c7f69ce",
        "X-RapidAPI-Host": "runwayml.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);

      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
export const User_Show_videos = createAsyncThunk(
  "TextAnimation/show_video",
  async (data, thunkApi) => {
    console.log(data);
    try {
      const response = await saveVideo(data);
      console.log(response);
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
    fetchedData: [],
    uuid: "",
    taskQueue: [],
    status: "idle",
    fetch_Status: { title: "", uuid: "" },
    video_Fetched: false,
    show_video: [],
    imgData: [],
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
    Transmission: (state, action) => {
      state.video_Fetched = false;
      state.show_video = [...state.show_video, action.payload];
      state.fetchedData = [];
      state.status = "success";
      state.uuid = "";
      state.fetch_Status = { title: "", uuid: "" };
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(User_Login.fulfilled, (state, action) => {
        state.LoggedIn = true;
        state.LoggedUser = action.payload;
        state.error = null;
        state.loading = false;
        state.video_Fetched = false;
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
        state.success = false;
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(User_Feedback.fulfilled, (state, action) => {
        // Handle feedback fulfilled

        state.success = true;
        state.message = action.payload;
        state.loading = false;
      })
      .addCase(User_Feedback.pending, (state) => {
        state.loading = true;
        state.fetch_Status = {
          title: "",
          uuid: "",
        };
        state.success = false;
      })
      .addCase(User_Feedback.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.success = false;
      })
      .addCase(User_fetchVideo.fulfilled, (state, action) => {
        // Handle feedback fulfilled
        console.log(action.payload);
        state.video_Fetched = true;
        state.success = true;
        state.taskQueue.push(action.payload);
        state.status = "task in queue";
        state.loading = false;
        state.uuid = action.payload.uuid;
        state.fetch_Status = {
          title: action.meta.arg,
          uuid: action.payload.uuid,
        };
        state.status = "Video Generation in Progress...";
      })
      .addCase(User_fetchVideo.pending, (state) => {
        state.loading = true;

        state.success = false;
      })
      .addCase(User_fetchVideo.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.success = false;
        state.status = "idle";
      })
      .addCase(User_fetch_Image.fulfilled, (state, action) => {
        // Handle feedback fulfilled
        console.log(action.payload);

        state.success = true;
        state.imgData = action.payload;
        state.loading = false;
      })
      .addCase(User_fetch_Image.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(User_fetch_Image.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.success = false;
      })
      .addCase(Get_Status.fulfilled, (state, action) => {
        // Handle feedback fulfilled
        console.log(action.payload);

        state.success = true;
        state.loading = false;
        state.fetchedData = action.payload;
        state.status = action.payload.status;
        state.video_Fetched = false;
      })
      .addCase(Get_Status.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(Get_Status.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.status = action.payload.status;
        state.success = false;
        state.status = "idle";
      })
      .addCase(User_Show_videos.fulfilled, (state, action) => {
        // Handle feedback fulfilled
        state.success = true;
        state.loading = false;
        state.show_video = action.payload;
      })
      .addCase(User_Show_videos.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(User_Show_videos.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.success = false;
      }),
});
export const { logoutStart, logoutSuccess, Transmission } =
  AnimationSlice.actions;
export default AnimationSlice.reducer;
