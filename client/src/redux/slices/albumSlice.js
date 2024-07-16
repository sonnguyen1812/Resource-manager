import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAlbums = createAsyncThunk('albums/fetchAlbums', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/albums');
  return response.data;
});

export const fetchAlbumById = createAsyncThunk('albums/fetchAlbumById', async (albumId) => {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/albums/${albumId}`);
  return response.data;
});

export const fetchPhotosByAlbumId = createAsyncThunk('albums/fetchPhotosByAlbumId', async (albumId) => {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`);
  return response.data;
});

export const addPhoto = createAsyncThunk('albums/addPhoto', async ({ albumId, title, url, thumbnailUrl }) => {
  const response = await axios.post('https://jsonplaceholder.typicode.com/photos', {
    albumId,
    title,
    url,
    thumbnailUrl,
  });
  return response.data;
});

const albumSlice = createSlice({
  name: 'albums',
  initialState: {
    items: [],
    selectedAlbum: null,
    photos: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbums.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(fetchAlbumById.fulfilled, (state, action) => {
        state.selectedAlbum = action.payload;
      })
      .addCase(fetchPhotosByAlbumId.fulfilled, (state, action) => {
        state.photos = action.payload;
      })
      .addCase(addPhoto.fulfilled, (state, action) => {
        state.photos.push(action.payload);
      });
  },
});

export default albumSlice.reducer;
