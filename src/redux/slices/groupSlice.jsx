import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

export const addGroup = createAsyncThunk(
  "[POST]/user-groups",
  async ({name,companyId = "1"}, thunkAPI) => {
    try {
      const res = await Axios.post(`https://api.kavio.co/api/user-groups`,{
        name,
        companyId
      });
      if(res?.status === 200){
        return res?.data;
      }
    } catch (err) {
      const message =
        err?.response?.data?.message || err?.message || "Beklenmeyen bir hata";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateGroup = createAsyncThunk(
  "[PUT]/user-groups/${id}",
  async ({name,id,companyId = "1"}, thunkAPI) => {
    try {
      const res = await Axios.put(`https://api.kavio.co/api/user-groups/${id}`,{
        name,
        companyId
      });
      if(res?.status === 200){
        return res?.data;
      }
    } catch (err) {
      const message =
        err?.response?.data?.message || err?.message || "Beklenmeyen bir hata";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteGroup = createAsyncThunk(
  "[DELETE]/user-groups/${id}",
  async ({id}, thunkAPI) => {
    try {
      const res = await Axios.delete(`https://api.kavio.co/api/user-groups/${id}`);
      if(res?.status === 200){
        return res?.data;
      }
    } catch (err) {
      console.log('err', err)
      const message =
        err?.response?.data?.detail || err?.message || "Beklenmeyen bir hata";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const groupSlice = createSlice({
  name: "groups",
  initialState: {
    isLoading:false,
    isSuccess:false,
    isError:false,
    message:"",
  },
  reducers: {
    resetGroupSlice : (state) => {
        state.isLoading=false,
        state.isSuccess=false,
        state.isError=false,
        state.message=""
    } 
  },
  extraReducers: (builder) => {
    builder
      .addCase(addGroup.pending, (state) => {
        state.isLoading =true;
      })
      .addCase(addGroup.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Grup başarıyla oluşturuldu"
      })
      .addCase(addGroup.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action?.payload;
      })
      .addCase(updateGroup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateGroup.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Grup başarıyla güncellendi"
      })
      .addCase(updateGroup.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action?.payload;
      })
      .addCase(deleteGroup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteGroup.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Grup başarıyla silindi"
      })
      .addCase(deleteGroup.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action?.payload;
      })
  },
});

export const {resetGroupSlice} = groupSlice.actions;

export default groupSlice.reducer;
