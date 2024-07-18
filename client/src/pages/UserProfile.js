import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid, Typography, Card, CardContent } from "@mui/material";
import { usePostContext } from "../context/PostContext";
import { useAlbumContext } from "../context/AlbumContext";
import { useTodoContext } from "../context/TodoContext";
import { useUserContext } from "../context/UserContext";

const UserProfile = () => {
    const { userId } = useParams();
    const {
        state: { items: posts },
        fetchPosts,
    } = usePostContext();
    const {
        state: { items: albums },
        fetchAlbums,
    } = useAlbumContext();
    const {
        state: { items: todos },
        fetchTodos,
    } = useTodoContext();
    const {
        state: { items: users, selectedUser },
        fetchUsers,
        fetchUserById,
    } = useUserContext();

    useEffect(() => {
        fetchPosts();
        fetchAlbums();
        fetchTodos();
        fetchUsers();
        fetchUserById(userId);
    }, [
        fetchPosts,
        fetchAlbums,
        fetchTodos,
        fetchUsers,
        fetchUserById,
        userId,
    ]);

    if (!selectedUser) return null;

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h4">User Profile</Typography>
                <Card>
                    <CardContent>
                        <Typography variant="h5">
                            {selectedUser.name}
                        </Typography>
                        <Typography variant="subtitle1">
                            {selectedUser.email}
                        </Typography>
                        <Typography variant="subtitle1">
                            Username: {selectedUser.username}
                        </Typography>
                        <Typography variant="subtitle1">
                            Phone: {selectedUser.phone}
                        </Typography>
                        <Typography variant="subtitle1">
                            Website: {selectedUser.website}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h5">Users</Typography>
                <Grid container spacing={2}>
                    {users.map((user) => (
                        <Grid item xs={12} key={user.id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">
                                        {user.name}
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        {user.email}
                                    </Typography>
                                    {/* Display other user information */}
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
                <Typography variant="h5">Posts</Typography>
                <Grid container spacing={2}>
                    {posts.map((post) => (
                        <Grid item xs={12} key={post.id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">
                                        {post.title}
                                    </Typography>
                                    <Typography variant="body1">
                                        {post.body}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography variant="h5">Albums</Typography>
                <Grid container spacing={2}>
                    {albums.map((album) => (
                        <Grid item xs={12} key={album.id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">
                                        {album.title}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h5">Todos</Typography>
                <Grid container spacing={2}>
                    {todos.map((todo) => (
                        <Grid item xs={12} key={todo.id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">
                                        {todo.title}
                                    </Typography>
                                    <Typography variant="body1">
                                        {todo.completed
                                            ? "Completed"
                                            : "Incomplete"}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default UserProfile;
