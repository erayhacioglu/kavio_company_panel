import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../services/Axios";
import AxiosNoToken from "../../services/AxiosNoToken";
import { generateMessage } from "../../helpers";

export const login = createAsyncThunk(
  "admin/login",
  async (loginData, thunkAPI) => {
    try {
      const res = await AxiosNoToken.post(`/admin/login`, loginData);
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

export const hydrateAuth = createAsyncThunk(
  "auth/hydrate",
  async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return null;
    try {
      const res = await Axios.get("/company-admin");
      if (res?.status === 200 && res?.data?.id) {
        return res?.data;
      }
    } catch (error) {
      console.log('error', error)
      // return thunkAPI.rejectWithValue(generateMessage(error, "Hydrate Error"));
    }
  }
);

export const getUserInfo = createAsyncThunk(
  "/company-admin",
  async (_, thunkAPI) => {
    try {
      const res = await Axios.get(`/company-admin`);
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
    isAuthenticated: false,
    isHydrated: false,
  },
  reducers: {
    userSliceReset: (state) => {
      (state.isLoading = false),
        (state.isSuccess = false),
        (state.isError = false),
        (state.message = "");
    },
    logout(state) {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("accessToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action?.payload;
      })
      .addCase(hydrateAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(hydrateAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isAuthenticated = !!action?.payload;
        state.isHydrated = true;
        state.user = action?.payload;
      })
      .addCase(hydrateAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.isAuthenticated = false;
        state.isHydrated = true;
        state.user = null;
        state.message = action?.payload;
      })
      .addCase(getUserInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isAuthenticated = true;
        state.user = action?.payload;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.isAuthenticated = false;
        state.user = null;
        state.message = action?.payload;
      });
  },
});

export const { userSliceReset, logout } = userSlice.actions;

export default userSlice.reducer;
