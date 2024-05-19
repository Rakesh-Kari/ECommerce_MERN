import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { categoryWiseProduct } from "../../../backend/controllers/product";

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

export const getUserDetails = createAsyncThunk(
  "alluserdetails",
  async (thunkAPI) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/user/all-users",
        { withCredentials: true }
      );
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.respone.data.message);
    }
  }
);

export const getAllProducts = createAsyncThunk(
  "/getAllProducts",
  async (thunkAPI) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/product/allproducts",
        { withCredentials: true }
      );
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const getProductById = createAsyncThunk(
  "getProductById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/product/productById/${id}`,
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

export const countAddToCart = createAsyncThunk(
  "countAddToCart",
  async (thunkAPI) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/cart/count",
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.respone.data.message);
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    userDetails: [],
    allDetails: [],
    allProducts: [],
    singleProduct: [],
    count: [],
    categoryWiseProduct: [],
    loading: false,
    error: false,
  },
  reducers: {
    clearUserDetails: (state) => {
      state.userDetails = [];
      console.log(state.userDetails, "in delete");
    },
    clearCount: (state) => {
      (state.count = []), console.log(state.count, "is deleted");
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
      })
      .addCase(getUserDetails.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.allDetails = action.payload;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllProducts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.allProducts = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getProductById.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.singleProduct = action.payload;
      })
      .addCase(getProductById.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload.message);
      })
      .addCase(countAddToCart.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(countAddToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.count = action.payload;
      })
      .addCase(countAddToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
export const { clearUserDetails, clearCount } = userSlice.actions;
