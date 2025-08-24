import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../services/Axios";
import { generateMessage } from "../../helpers";

export const addGroup = createAsyncThunk(
  "[POST]/user-groups",
  async ({name,companyId}, thunkAPI) => {
    try {
      const res = await Axios.post(`/user-groups`,{
        name,
        companyId
      });
      if(res?.status === 200){
        return res?.data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(generateMessage(error,"Add Group Error"));
    }
  }
);

export const updateGroup = createAsyncThunk(
  "[PUT]/user-groups/${id}",
  async ({name,id,companyId}, thunkAPI) => {
    try {
      const res = await Axios.put(`/user-groups/${id}`,{
        name,
        companyId
      });
      if(res?.status === 200){
        return res?.data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(generateMessage(error,"Update Group Error"));
    }
  }
);

export const deleteGroup = createAsyncThunk(
  "[DELETE]/user-groups/${id}",
  async ({id}, thunkAPI) => {
    try {
      const res = await Axios.delete(`/user-groups/${id}`);
      if(res?.status === 200){
        return res?.data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(generateMessage(error,"Delete Group Error"));
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
