import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchAlbumById, fetchPhotosByAlbumId, addPhoto } from '../redux/slices/albumSlice';
import { Container, Card, CardContent, Typography, TextField, Button, Grid, CardMedia, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const AlbumDetail = () => {
  const { albumId } = useParams();
  const dispatch = useDispatch();
  const album = useSelector((state) => state.albums.selectedAlbum);
  const photos = useSelector((state) => state.albums.photos);
  const [newPhoto, setNewPhoto] = useState({ title: '', url: '', thumbnailUrl: '' });
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('asc');

  useEffect(() => {
    if (albumId) {
      dispatch(fetchAlbumById(albumId));
      dispatch(fetchPhotosByAlbumId(albumId));
    }
  }, [dispatch, albumId]);

  const handleAddPhoto = () => {
    if (newPhoto.title && newPhoto.url && newPhoto.thumbnailUrl) {
      dispatch(addPhoto({ albumId, ...newPhoto }));
      setNewPhoto({ title: '', url: '', thumbnailUrl: '' });
    }
  };

  const filteredPhotos = photos
    .filter((photo) =>
      photo.title.toLowerCase().includes(filter.toLowerCase())
    );

  const sortedPhotos = filteredPhotos.sort((a, b) => {
    if (sort === 'asc') {
      return a.title.localeCompare(b.title);
    } else {
      return b.title.localeCompare(a.title);
    }
  });

  return (
    <Container>
      {album && (
        <Card>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              {album.title}
            </Typography>
          </CardContent>
        </Card>
      )}

      <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
        Photos
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Filter"
            variant="outlined"
            fullWidth
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
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
      </Grid>

      <Grid container spacing={3}>
        {sortedPhotos.map((photo) => (
          <Grid item xs={12} md={4} lg={3} key={photo.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={photo.thumbnailUrl}
                alt={photo.title}
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {photo.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
        Add New Photo
      </Typography>
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        value={newPhoto.title}
        onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })}
        sx={{ mt: 2 }}
      />
      <TextField
        label="URL"
        variant="outlined"
        fullWidth
        value={newPhoto.url}
        onChange={(e) => setNewPhoto({ ...newPhoto, url: e.target.value })}
        sx={{ mt: 2 }}
      />
      <TextField
        label="Thumbnail URL"
        variant="outlined"
        fullWidth
        value={newPhoto.thumbnailUrl}
        onChange={(e) => setNewPhoto({ ...newPhoto, thumbnailUrl: e.target.value })}
        sx={{ mt: 2, mb: 3 }}
      />
      <Button variant="contained" color="primary" onClick={handleAddPhoto}>
        Add Photo
      </Button>
    </Container>
  );
};

export default AlbumDetail;
