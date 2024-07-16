import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './slices/postSlice';
import albumsReducer from './slices/albumSlice';
import photosReducer from './slices/photoSlice';
import todosReducer from './slices/todoSlice';
import usersReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    albums: albumsReducer,
    photos: photosReducer,
    todos: todosReducer,
    users: usersReducer,
  },
});

export default store;