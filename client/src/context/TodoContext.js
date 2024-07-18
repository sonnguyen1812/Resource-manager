import React, { createContext, useReducer, useContext, useCallback } from 'react';
import axios from 'axios';

const TodoContext = createContext();

const initialState = {
  items: [],
  selectedTodo: null,
};

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TODOS':
      return { ...state, items: action.payload };
    case 'SET_SELECTED_TODO':
      return { ...state, selectedTodo: action.payload };
    case 'ADD_TODO':
      return { ...state, items: [...state.items, action.payload] };
    default:
      return state;
  }
};

export const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const fetchTodos = useCallback(async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
      dispatch({ type: 'SET_TODOS', payload: response.data });
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  }, []);

  const fetchTodoById = useCallback(async (todoId) => {
    if (!todoId) return;
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/todos/${todoId}`);
      dispatch({ type: 'SET_SELECTED_TODO', payload: response.data });
    } catch (error) {
      console.error('Error fetching todo by id:', error);
    }
  }, []);

  const addTodo = useCallback(async (todo) => {
    if (!todo) return;
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/todos', todo);
      dispatch({ type: 'ADD_TODO', payload: response.data });
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  }, []);

  return (
    <TodoContext.Provider value={{ state, fetchTodos, fetchTodoById, addTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  return useContext(TodoContext);
};