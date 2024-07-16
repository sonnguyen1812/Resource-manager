import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAlbums } from '../redux/slices/albumSlice';
import { Container, Grid, Card, CardContent, Typography, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const AlbumList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const albums = useSelector((state) => state.albums.items);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('asc');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    dispatch(fetchAlbums());
  }, [dispatch]);

  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
  };

  const handleAlbumClick = (albumId) => {
    navigate(`/albums/${albumId}`);
  };

  const filteredAlbums = albums
    .filter((album) =>
      album.title.toLowerCase().includes(filter.toLowerCase())
    )
    .filter((album) => (userId ? album.userId === parseInt(userId) : true));

  const sortedAlbums = filteredAlbums.sort((a, b) => {
    if (sort === 'asc') {
      return a.title.localeCompare(b.title);
    } else {
      return b.title.localeCompare(a.title);
    }
  });

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Albums
      </Typography>
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <TextField
            label="Filter"
            variant="outlined"
            fullWidth
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Sort</InputLabel>
            <Select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              label="Sort"
            >
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="User ID"
            variant="outlined"
            fullWidth
            value={userId}
            onChange={handleUserIdChange}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        {sortedAlbums.map((album) => (
          <Grid item xs={12} md={6} lg={4} key={album.id}>
            <Card onClick={() => handleAlbumClick(album.id)}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {album.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AlbumList;
