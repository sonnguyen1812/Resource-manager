import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Typography, Card, CardContent } from '@mui/material';
import { usePostContext } from '../context/PostContext';
import { useUserContext } from '../context/UserContext';
import { useCommentContext } from '../context/CommentContext';

const PostDetail = () => {
  const { postId } = useParams();
  const { state: { selectedPost, comments }, fetchPostById, fetchCommentsByPostId } = usePostContext();
  const { state: { items: users }, fetchUsers } = useUserContext();
  const { addComment } = useCommentContext();

  useEffect(() => {
    fetchPostById(postId);
    fetchCommentsByPostId(postId);
    fetchUsers();
  }, [fetchPostById, fetchCommentsByPostId, fetchUsers, postId]);

  const handleAddComment = () => {
    const body = prompt('Enter your comment:');
    if (body) {
      addComment({ postId, body });
    }
  };

  if (!selectedPost) return null;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4">{selectedPost.title}</Typography>
        <Typography variant="subtitle1">Author: {users.find(user => user.id === selectedPost.userId)?.name}</Typography>
        <Typography variant="body1">{selectedPost.body}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">Comments</Typography>
        <Grid container spacing={2}>
          {comments.map(comment => (
            <Grid item xs={12} key={comment.id}>
              <Card>
                <CardContent>
                  <Typography variant="body1">{comment.body}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <button onClick={handleAddComment}>Add Comment</button>
      </Grid>
    </Grid>
  );
};

export default PostDetail;
