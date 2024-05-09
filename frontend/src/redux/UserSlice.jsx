import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const UserDetailsSlice = createAsyncThunk(
  "user/fetchUserDetails",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/user/details",
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    userDetails: [],
    loading: false,
    error: false,
  },
  reducers: {
    clearUserDetails: (state) => {
      state.userDetails = [];
      console.log(state.userDetails, "in delete");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(UserDetailsSlice.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UserDetailsSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetails = action.payload;
        console.log(state.userDetails, "in slice");
      })
      .addCase(UserDetailsSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
export const { clearUserDetails } = userSlice.actions;
