import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import collectionService from "./collectionService";

export const getCollections = createAsyncThunk(
  "collection/get-collections",
  async (thunkAPI) => {
    try {
      return await collectionService.getCollections();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const createCollection = createAsyncThunk(
  "collection/create-collection",
  async (collectionData, thunkAPI) => {
    try {
      return await collectionService.createCollection(collectionData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getACollection = createAsyncThunk(
  "collection/get-collection",
  async (id, thunkAPI) => {
    try {
      return await collectionService.getCollection(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateACollection = createAsyncThunk(
  "collection/update-collection",
  async (collection, thunkAPI) => {
    try {
      return await collectionService.updateCollection(collection);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteACollection = createAsyncThunk(
  "collection/delete-collection",
  async (id, thunkAPI) => {
    try {
      return await collectionService.deleteCollection(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  collections: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const collectionSlice = createSlice({
  name: "collections",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCollections.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCollections.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.collections = action.payload;
      })
      .addCase(getCollections.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createCollection.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCollection.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdCollection = action.payload;
      })
      .addCase(createCollection.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateACollection.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateACollection.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedCollection = action.payload;
      })
      .addCase(updateACollection.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getACollection.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getACollection.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.collectionName = action.payload.title;
      })
      .addCase(getACollection.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteACollection.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteACollection.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedCollection = action.payload.title;
      })
      .addCase(deleteACollection.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});
export default collectionSlice.reducer;
