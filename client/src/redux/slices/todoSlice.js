import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
  return response.data;
});

export const fetchTodoById = createAsyncThunk('todos/fetchTodoById', async (todoId) => {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/todos/${todoId}`);
  return response.data;
});

export const addTodo = createAsyncThunk('todos/addTodo', async ({ userId, title, completed }) => {
  const response = await axios.post('https://jsonplaceholder.typicode.com/todos', {
    userId,
    title,
    completed,
  });
  return response.data;
});

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    selectedTodo: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(fetchTodoById.fulfilled, (state, action) => {
        state.selectedTodo = action.payload;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export default todoSlice.reducer;
