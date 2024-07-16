import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchPostById, fetchCommentsByPostId, addComment } from '../redux/slices/postSlice';
import { Container, Card, CardContent, Typography, TextField, Button, List, ListItem, ListItemText } from '@mui/material';

const PostDetail = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const post = useSelector((state) => state.posts.selectedPost);
  const comments = useSelector((state) => state.posts.comments);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    if (postId) {
      dispatch(fetchPostById(postId));
      dispatch(fetchCommentsByPostId(postId));
    }
  }, [dispatch, postId]);

  const handleAddComment = () => {
    if (newComment.trim()) {
      dispatch(addComment({ postId, body: newComment }));
      setNewComment('');
    }
  };

  return (
    <Container>
      {post && (
        <Card>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              {post.title}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {post.body}
            </Typography>
          </CardContent>
        </Card>
      )}

      <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
        Comments
      </Typography>
      <List>
        {comments.map((comment) => (
          <ListItem key={comment.id}>
            <ListItemText primary={comment.body} />
          </ListItem>
        ))}
      </List>

      <TextField
        label="New Comment"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        sx={{ mt: 3, mb: 3 }}
      />
      <Button variant="contained" color="primary" onClick={handleAddComment}>
        Add Comment
      </Button>
    </Container>
  );
};

export default PostDetail;
