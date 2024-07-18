import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Typography, Card, CardContent } from '@mui/material';
import { useAlbumContext } from '../context/AlbumContext';
import { usePhotoContext } from '../context/PhotoContext';

const AlbumDetail = () => {
  const { albumId } = useParams();
  const { state: { selectedAlbum }, fetchAlbumById } = useAlbumContext();
  const { state: { items: photos }, fetchPhotosByAlbumId } = usePhotoContext();

  useEffect(() => {
    fetchAlbumById(albumId);
    fetchPhotosByAlbumId(albumId);
  }, [fetchAlbumById, fetchPhotosByAlbumId, albumId]);

  if (!selectedAlbum) return null;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4">{selectedAlbum.title}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">Photos</Typography>
        <Grid container spacing={2}>
          {photos.map(photo => (
            <Grid item xs={12} key={photo.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{photo.title}</Typography>
                  <img src={photo.url} alt={photo.title} style={{ maxWidth: '100%' }} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AlbumDetail;
