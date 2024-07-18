import React, { createContext, useReducer, useContext } from 'react';
import axios from 'axios';

const PostContext = createContext();

const initialState = {
  items: [],
  selectedPost: null,
  comments: [],
  users: [],
  status: 'idle',
  error: null,
};

const postReducer = (state, action) => {
  switch (action.type) {
    case 'SET_POSTS':
      return { ...state, items: action.payload };
    case 'SET_SELECTED_POST':
      return { ...state, selectedPost: action.payload };
    case 'SET_COMMENTS':
      return { ...state, comments: action.payload };
    case 'ADD_COMMENT':
      return { ...state, comments: [...state.comments, action.payload] };
    case 'SET_USERS':
      return { ...state, users: action.payload };
    case 'SET_STATUS':
      return { ...state, status: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export const PostProvider = ({ children }) => {
  const [state, dispatch] = useReducer(postReducer, initialState);

  const fetchPosts = async () => {
    dispatch({ type: 'SET_STATUS', payload: 'loading' });
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      dispatch({ type: 'SET_POSTS', payload: response.data });
      dispatch({ type: 'SET_STATUS', payload: 'succeeded' });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      dispatch({ type: 'SET_STATUS', payload: 'failed' });
    }
  };

  const fetchPostById = async (postId) => {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    dispatch({ type: 'SET_SELECTED_POST', payload: response.data });
  };

  const fetchCommentsByPostId = async (postId) => {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
    dispatch({ type: 'SET_COMMENTS', payload: response.data });
  };

  const addComment = async (postId, body) => {
    const response = await axios.post(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`, { body });
    dispatch({ type: 'ADD_COMMENT', payload: response.data });
  };

  const fetchUsers = async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    dispatch({ type: 'SET_USERS', payload: response.data });
  };

  return (
    <PostContext.Provider value={{ state, fetchPosts, fetchPostById, fetchCommentsByPostId, addComment, fetchUsers }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = () => {
  return useContext(PostContext);
};
