import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../services/Axios";
import { generateMessage } from "../../helpers";

export const login = createAsyncThunk(
  "admin/login",
  async (loginData, thunkAPI) => {
    try {
      const res = await Axios.post(`/admin/login`, loginData);
      if (res?.status === 200 && res?.data?.accessToken) {
        localStorage.setItem("accessToken", res?.data?.accessToken);
        localStorage.setItem("refreshToken", res?.data?.refreshToken);
        localStorage.setItem("isLogin", true);
        return res?.data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(generateMessage(error, "Login Error"));
    }
  }
);

export const getUserInfo = createAsyncThunk(
  "/company-admin",
  async (_, thunkAPI) => {
    try {
      const res = await Axios.get(`/company-admin`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      console.log("res", res);
      if (res?.status === 200 && res?.data?.id) {
        return res?.data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(generateMessage(error, "UserInfo Error"));
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
    user: null,
    token: null,
  },
  reducers: {
    userSliceReset: (state) => {
      (state.isLoading = false),
        (state.isSuccess = false),
        (state.isError = false),
        (state.message = "");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.token = {
          accessToken: action?.payload?.accessToken,
          refreshToken: action?.payload?.refreshToken,
        };
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action?.payload;
      })
      .addCase(getUserInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action?.payload;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.user = null;
        state.message = action?.payload;
      });
  },
});

export const { userSliceReset } = userSlice.actions;

export default userSlice.reducer;
