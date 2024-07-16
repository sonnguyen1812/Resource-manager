import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await api.get('/posts');
  return response.data;
});

export const fetchPostById = createAsyncThunk('posts/fetchPostById', async (postId) => {
  const response = await api.get(`/posts/${postId}`);
  return response.data;
});

export const fetchCommentsByPostId = createAsyncThunk('posts/fetchCommentsByPostId', async (postId) => {
  const response = await api.get(`/posts/${postId}/comments`);
  return response.data;
});

export const addComment = createAsyncThunk('posts/addComment', async ({ postId, body }) => {
  const response = await api.post(`/posts/${postId}/comments`, { body });
  return response.data;
});

export const fetchUsers = createAsyncThunk('posts/fetchUsers', async () => {
  const response = await api.get('/users');
  return response.data;
});

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [],
    selectedPost: null,
    comments: [],
    users: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.selectedPost = action.payload;
      })
      .addCase(fetchCommentsByPostId.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      });
  },
});

export default postSlice.reducer;
