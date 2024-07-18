import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Typography, Card, CardContent } from '@mui/material';
import { useAlbumContext } from '../context/AlbumContext';

const AlbumList = () => {
  const { state: { items: albums }, fetchAlbums } = useAlbumContext();

  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4">Albums</Typography>
      </Grid>
      {albums.map(album => (
        <Grid item xs={12} key={album.id}>
          <Card>
            <CardContent>
              <Typography variant="h5">{album.title}</Typography>
              <Typography variant="subtitle2">
                <Link to={`/albums/${album.id}`}>View Details</Link>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default AlbumList;
