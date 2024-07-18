import React, { createContext, useReducer, useContext } from 'react';
import axios from 'axios';

const PhotoContext = createContext();

const initialState = {
  items: [],
  selectedPhoto: null,
};

const photoReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PHOTOS':
      return { ...state, items: action.payload };
    case 'SET_SELECTED_PHOTO':
      return { ...state, selectedPhoto: action.payload };
    case 'ADD_PHOTO':
      return { ...state, items: [...state.items, action.payload] };
    default:
      return state;
  }
};

export const PhotoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(photoReducer, initialState);

  const fetchPhotos = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/photos');
      dispatch({ type: 'SET_PHOTOS', payload: response.data });
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  };

  const fetchPhotoById = async (photoId) => {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/photos/${photoId}`);
      dispatch({ type: 'SET_SELECTED_PHOTO', payload: response.data });
    } catch (error) {
      console.error('Error fetching photo by id:', error);
    }
  };

  const addPhoto = async (photo) => {
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/photos', photo);
      dispatch({ type: 'ADD_PHOTO', payload: response.data });
    } catch (error) {
      console.error('Error adding photo:', error);
    }
  };

  return (
    <PhotoContext.Provider value={{ state, fetchPhotos, fetchPhotoById, addPhoto }}>
      {children}
    </PhotoContext.Provider>
  );
};

export const usePhotoContext = () => {
  return useContext(PhotoContext);
};  