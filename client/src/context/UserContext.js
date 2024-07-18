import React, { createContext, useReducer, useContext } from 'react';
import axios from 'axios';

const UserContext = createContext();

const initialState = {
  items: [],
  selectedUser: null,
};

const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USERS':
      return { ...state, items: action.payload };
    case 'SET_SELECTED_USER':
      return { ...state, selectedUser: action.payload };
    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const fetchUsers = async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    dispatch({ type: 'SET_USERS', payload: response.data });
  };

  const fetchUserById = async (userId) => {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
    dispatch({ type: 'SET_SELECTED_USER', payload: response.data });
  };

  return (
    <UserContext.Provider value={{ state, fetchUsers, fetchUserById }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
