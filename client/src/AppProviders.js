import React from 'react';
import { AlbumProvider } from './context/AlbumContext';
import { PhotoProvider } from './context/PhotoContext';
import { PostProvider } from './context/PostContext';
import { TodoProvider } from './context/TodoContext';
import { UserProvider } from './context/UserContext';

const AppProviders = ({ children }) => {
  return (
    <UserProvider>
      <TodoProvider>
        <PostProvider>
          <AlbumProvider>
            <PhotoProvider>
              {children}
            </PhotoProvider>
          </AlbumProvider>
        </PostProvider>
      </TodoProvider>
    </UserProvider>
  );
};

export default AppProviders;
