import React, { createContext, useReducer, useContext } from 'react';
import axios from 'axios';

// Actions
const FETCH_ALBUMS_SUCCESS = 'FETCH_ALBUMS_SUCCESS';
const FETCH_ALBUM_BY_ID_SUCCESS = 'FETCH_ALBUM_BY_ID_SUCCESS';
const FETCH_PHOTOS_BY_ALBUM_ID_SUCCESS = 'FETCH_PHOTOS_BY_ALBUM_ID_SUCCESS';
const ADD_PHOTO_SUCCESS = 'ADD_PHOTO_SUCCESS';

// Initial State
const initialState = {
  albums: [],
  selectedAlbum: null,
  photos: [],
};

// Reducer
const albumReducer = (state, action) => {
  switch (action.type) {
    case FETCH_ALBUMS_SUCCESS:
      return { ...state, albums: action.payload };
    case FETCH_ALBUM_BY_ID_SUCCESS:
      return { ...state, selectedAlbum: action.payload };
    case FETCH_PHOTOS_BY_ALBUM_ID_SUCCESS:
      return { ...state, photos: action.payload };
    case ADD_PHOTO_SUCCESS:
      return { ...state, photos: [...state.photos, action.payload] };
    default:
      return state;
  }
};

// Context
const AlbumContext = createContext();

// Provider
export const AlbumProvider = ({ children }) => {
  const [state, dispatch] = useReducer(albumReducer, initialState);

  const fetchAlbums = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/albums');
      dispatch({ type: FETCH_ALBUMS_SUCCESS, payload: response.data });
    } catch (error) {
      console.error('Error fetching albums:', error);
    }
  };

  const fetchAlbumById = async (albumId) => {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/albums/${albumId}`);
      dispatch({ type: FETCH_ALBUM_BY_ID_SUCCESS, payload: response.data });
    } catch (error) {
      console.error('Error fetching album by id:', error);
    }
  };

  const fetchPhotosByAlbumId = async (albumId) => {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`);
      dispatch({ type: FETCH_PHOTOS_BY_ALBUM_ID_SUCCESS, payload: response.data });
    } catch (error) {
      console.error('Error fetching photos by album id:', error);
    }
  };

  const addPhoto = async (albumId, title, url, thumbnailUrl) => {
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/photos', {
        albumId,
        title,
        url,
        thumbnailUrl,
      });
      dispatch({ type: ADD_PHOTO_SUCCESS, payload: response.data });
    } catch (error) {
      console.error('Error adding photo:', error);
    }
  };

  return (
    <AlbumContext.Provider
      value={{ state, fetchAlbums, fetchAlbumById, fetchPhotosByAlbumId, addPhoto }}
    >
      {children}
    </AlbumContext.Provider>
  );
};

// Custom hook
export const useAlbumContext = () => {
  return useContext(AlbumContext);
};