import React from 'react';
import { useRoutes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import UserProfile from './pages/UserProfile';
import PostList from './pages/PostList';
import PostDetail from './pages/PostDetail';
import AlbumList from './pages/AlbumList';
import AlbumDetail from './pages/AlbumDetail';
import PhotoList from './pages/PhotoList';
import TodoList from './pages/TodoList';
import Layout from './components/Layout';

function App() {
  let routes = useRoutes([
    { path: "/", element: <Dashboard /> },
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/profile", element: <Layout><UserProfile /></Layout> },
    { path: "/posts", element: <Layout><PostList /></Layout> },
    { path: "/posts/:postId", element: <Layout><PostDetail /></Layout> },
    { path: "/albums", element: <Layout><AlbumList /></Layout> },
    { path: "/albums/:albumId", element: <Layout><AlbumDetail /></Layout> },
    { path: "/photos", element: <Layout><PhotoList /></Layout> },
    { path: "/todos", element: <Layout><TodoList /></Layout> },
  ]);

  return (
    <div>
      {routes}
    </div>
  );
}

export default App;
