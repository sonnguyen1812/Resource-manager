import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPhotos } from '../redux/slices/photoSlice';
import { Container, Typography, Grid, Card, CardMedia, CardContent, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const PhotoList = () => {
  const dispatch = useDispatch();
  const photos = useSelector((state) => state.photos.items);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('asc');

  useEffect(() => {
    dispatch(fetchPhotos());
  }, [dispatch]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const filteredPhotos = photos.filter(photo => photo.title.includes(filter));
  const sortedPhotos = filteredPhotos.sort((a, b) => sort === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title));

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Photo List</Typography>
      <FormControl fullWidth margin="normal">
        <TextField label="Filter" variant="outlined" value={filter} onChange={handleFilterChange} />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>Sort</InputLabel>
        <Select value={sort} onChange={handleSortChange}>
          <MenuItem value="asc">Ascending</MenuItem>
          <MenuItem value="desc">Descending</MenuItem>
        </Select>
      </FormControl>
      <Grid container spacing={2}>
        {sortedPhotos.map((photo) => (
          <Grid item xs={12} sm={6} md={4} key={photo.id}>
            <Card>
              <CardMedia component="img" alt={photo.title} height="140" image={photo.url} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {photo.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PhotoList;
