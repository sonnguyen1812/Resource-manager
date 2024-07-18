import React, { useEffect } from 'react';
import { Grid, Typography, Card, CardContent } from '@mui/material';
import { usePhotoContext } from '../context/PhotoContext';

const PhotoList = () => {
  const { state: { items: photos }, fetchPhotos } = usePhotoContext();

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4">Photos</Typography>
      </Grid>
      {photos.map(photo => (
        <Grid item xs={12} key={photo.id}>
          <Card>
            <CardContent>
              <Typography variant="h5">{photo.title}</Typography>
              <img src={photo.url} alt={photo.title} style={{ maxWidth: '100%' }} />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default PhotoList;
