import * as React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PhotoAlbumIcon from '@mui/icons-material/PhotoAlbum';
import PhotoIcon from '@mui/icons-material/Photo';
import AssignmentIcon from '@mui/icons-material/Assignment';

export const mainListItems = (
  <div>
    <ListItem button component={Link} to="/">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button component={Link} to="/profile">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="User Profile" />
    </ListItem>
    <ListItem button component={Link} to="/posts">
      <ListItemIcon>
        <ListAltIcon />
      </ListItemIcon>
      <ListItemText primary="Posts" />
    </ListItem>
    <ListItem button component={Link} to="/albums">
      <ListItemIcon>
        <PhotoAlbumIcon />
      </ListItemIcon>
      <ListItemText primary="Albums" />
    </ListItem>
    <ListItem button component={Link} to="/photos">
      <ListItemIcon>
        <PhotoIcon />
      </ListItemIcon>
      <ListItemText primary="Photos" />
    </ListItem>
    <ListItem button component={Link} to="/todos">
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Todos" />
    </ListItem>
  </div>
);
