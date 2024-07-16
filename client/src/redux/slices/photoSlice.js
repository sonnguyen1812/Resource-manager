import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPhotos = createAsyncThunk('photos/fetchPhotos', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/photos');
  return response.data;
});

export const fetchPhotoById = createAsyncThunk('photos/fetchPhotoById', async (photoId) => {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/photos/${photoId}`);
  return response.data;
});

export const addPhoto = createAsyncThunk('photos/addPhoto', async ({ albumId, title, url, thumbnailUrl }) => {
  const response = await axios.post('https://jsonplaceholder.typicode.com/photos', {
    albumId,
    title,
    url,
    thumbnailUrl,
  });
  return response.data;
});

const photoSlice = createSlice({
  name: 'photos',
  initialState: {
    items: [],
    selectedPhoto: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhotos.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(fetchPhotoById.fulfilled, (state, action) => {
        state.selectedPhoto = action.payload;
      })
      .addCase(addPhoto.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export default photoSlice.reducer;
