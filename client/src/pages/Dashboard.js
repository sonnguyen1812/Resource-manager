import React, { useEffect } from 'react';
import { Grid, Typography, Card, CardContent } from '@mui/material';
import { usePostContext } from '../context/PostContext';
import { useAlbumContext } from '../context/AlbumContext';
import { usePhotoContext } from '../context/PhotoContext';
import { useTodoContext } from '../context/TodoContext';
import UserDataChart from '../components/UserDataChart';

const Dashboard = () => {
  const { state: { items: posts = [] }, fetchPosts } = usePostContext();
  const { state: { items: albums = [] }, fetchAlbums } = useAlbumContext();
  const { state: { items: photos = [] }, fetchPhotos } = usePhotoContext();
  const { state: { items: todos = [] }, fetchTodos } = useTodoContext();

  useEffect(() => {
    fetchPosts();
    fetchAlbums();
    fetchPhotos();
    fetchTodos();
  }, [fetchPosts, fetchAlbums, fetchPhotos, fetchTodos]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4">Dashboard</Typography>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Card>
          <CardContent>
            <Typography variant="h5">Posts</Typography>
            <Typography variant="h6">{posts.length}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Card>
          <CardContent>
            <Typography variant="h5">Albums</Typography>
            <Typography variant="h6">{albums.length}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Card>
          <CardContent>
            <Typography variant="h5">Photos</Typography>
            <Typography variant="h6">{photos.length}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Card>
          <CardContent>
            <Typography variant="h5">Todos</Typography>
            <Typography variant="h6">{todos.length}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <UserDataChart />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
