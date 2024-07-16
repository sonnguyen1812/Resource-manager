import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

export const fetchPosts = () => api.get('/posts');
export const fetchComments = () => api.get('/comments');
export const fetchAlbums = () => api.get('/albums');
export const fetchPhotos = () => api.get('/photos');
export const fetchTodos = () => api.get('/todos');
export const fetchUsers = () => api.get('/users');
export default api;