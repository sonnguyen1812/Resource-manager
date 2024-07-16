import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchPosts } from '../redux/slices/postSlice';
import { Container, Grid, Card, CardContent, Typography, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const PostList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const posts = useSelector((state) => state.posts.items);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('asc');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
  };

  const handlePostClick = (postId) => {
    navigate(`/posts/${postId}`);
  };

  const filteredPosts = posts
    .filter((post) =>
      post.title.toLowerCase().includes(filter.toLowerCase())
    )
    .filter((post) => (userId ? post.userId === parseInt(userId) : true));

  const sortedPosts = filteredPosts.sort((a, b) => {
    if (sort === 'asc') {
      return a.title.localeCompare(b.title);
    } else {
      return b.title.localeCompare(a.title);
    }
  });

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Posts
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
        {sortedPosts.map((post) => (
          <Grid item xs={12} md={6} lg={4} key={post.id}>
            <Card onClick={() => handlePostClick(post.id)}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {post.title}
                </Typography>
                <Typography variant="body2">
                  {post.body}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PostList;
