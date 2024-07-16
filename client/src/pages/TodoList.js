import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTodos } from '../redux/slices/todoSlice';
import { Container, Typography, List, ListItem, ListItemText, TextField, MenuItem, Select, FormControl, InputLabel, Checkbox, ListItemSecondaryAction } from '@mui/material';

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.items);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('asc');

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const filteredTodos = todos.filter(todo => todo.title.includes(filter));
  const sortedTodos = filteredTodos.sort((a, b) => sort === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title));

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Todo List</Typography>
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
      <List>
        {sortedTodos.map((todo) => (
          <ListItem key={todo.id}>
            <ListItemText primary={todo.title} />
            <ListItemSecondaryAction>
              <Checkbox edge="end" checked={todo.completed} />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default TodoList;
