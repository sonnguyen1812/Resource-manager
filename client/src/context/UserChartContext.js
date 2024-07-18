import React, { createContext, useContext } from 'react';

const UserChartContext = createContext();

export const UserProvider = ({ children }) => {
  // Replace with actual logic to fetch or manage user data
  const posts = []; // Initialize with your data or fetch logic
  const albums = []; // Initialize with your data or fetch logic
  const photos = []; // Initialize with your data or fetch logic
  const todos = []; // Initialize with your data or fetch logic

  return (
    <UserChartContext.Provider value={{ posts, albums, photos, todos }}>
      {children}
    </UserChartContext.Provider>
  );
};

export const useUserChartContext = () => useContext(UserChartContext);
