// src/pages/UserProfile.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, fetchUserById } from '../redux/slices/userSlice';
import {createTheme, ThemeProvider } from '@mui/material/styles';
import {
  Box,
  List,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Divider,
  Paper,
  CssBaseline,
  ListItemButton
} from '@mui/material';

const defaultTheme = createTheme();

const UserProfile = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.items);
  const selectedUser = useSelector((state) => state.users.selectedUser);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (selectedUserId !== null) {
      dispatch(fetchUserById(selectedUserId));
    }
  }, [dispatch, selectedUserId]);

  const handleUserClick = (userId) => {
    setSelectedUserId(userId);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', p: 3 }}>
        <Box sx={{ flex: 1 }}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6">User List</Typography>
            <List>
              {users.map((user) => (
                <ListItemButton
                  button
                  key={user.id}
                  onClick={() => handleUserClick(user.id)}
                  selected={selectedUserId === user.id}
                >
                  <ListItemAvatar>
                    <Avatar>{user.name.charAt(0)}</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={user.name} secondary={user.email} />
                </ListItemButton>
              ))}
            </List>
          </Paper>
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box sx={{ flex: 2, ml: 3 }}>
          {selectedUser && (
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6">User Details</Typography>
              <Typography variant="body1"><strong>Name:</strong> {selectedUser.name}</Typography>
              <Typography variant="body1"><strong>Username:</strong> {selectedUser.username}</Typography>
              <Typography variant="body1"><strong>Email:</strong> {selectedUser.email}</Typography>
              <Typography variant="body1"><strong>Phone:</strong> {selectedUser.phone}</Typography>
              <Typography variant="body1"><strong>Website:</strong> {selectedUser.website}</Typography>
              <Typography variant="body1"><strong>Company:</strong> {selectedUser.company.name}</Typography>
              <Typography variant="body1"><strong>Address:</strong> {`${selectedUser.address.suite}, ${selectedUser.address.street}, ${selectedUser.address.city}, ${selectedUser.address.zipcode}`}</Typography>
            </Paper>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default UserProfile;
