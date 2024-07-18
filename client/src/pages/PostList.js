import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Typography, Card, CardContent } from '@mui/material';
import { usePostContext } from '../context/PostContext';

const PostList = () => {
  const { state: { items: posts }, fetchPosts } = usePostContext();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4">Posts</Typography>
      </Grid>
      {posts.map(post => (
        <Grid item xs={12} key={post.id}>
          <Card>
            <CardContent>
              <Typography variant="h5">{post.title}</Typography>
              <Typography variant="body1">{post.body}</Typography>
              <Typography variant="subtitle2">
                <Link to={`/posts/${post.id}`}>View Details</Link>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default PostList;
