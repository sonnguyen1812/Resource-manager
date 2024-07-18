import React, { useEffect } from 'react';
import { Grid, Typography, Card, CardContent, Checkbox } from '@mui/material';
import { useTodoContext } from '../context/TodoContext';

const TodoList = () => {
  const { state: { items: todos }, fetchTodos, toggleTodo } = useTodoContext();

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleToggleTodo = (todoId) => {
    toggleTodo(todoId);
    // Normally, you would also make an API call to update the todo
    // and handle any potential errors or side effects.
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4">Todos</Typography>
      </Grid>
      {todos.map(todo => (
        <Grid item xs={12} key={todo.id}>
          <Card>
            <CardContent>
              <Typography variant="h5">{todo.title}</Typography>
              <Typography variant="body1">{todo.completed ? 'Completed' : 'Incomplete'}</Typography>
              <Checkbox
                checked={todo.completed}
                onChange={() => handleToggleTodo(todo.id)}
                inputProps={{ 'aria-label': 'toggle todo' }}
              />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default TodoList;
