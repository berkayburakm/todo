import React, { useContext } from 'react';
import { TodoContext } from '../contexts/todoContext';
import {
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const TodoItem = ({ todo, ...props }) => {
  const { state, action } = useContext(TodoContext);
  const { updateTodo, deleteTodo } = action;
  const { completed, description } = todo;

  const updateTodoItem = (todo) => {
    const updatedTodo = {
      id: todo.id,
      completed: !todo.completed
    };
    updateTodo(updatedTodo);
  };

  const deleteTodoItem = (e, todo) => {
    e.stopPropagation();
    deleteTodo(todo);
  };
  return (
    <ListItem
      key={todo.id}
      secondaryAction={
        <IconButton edge="end" aria-label="comments" onClick={(e) => deleteTodoItem(e, todo)}>
          <DeleteIcon color="error" />
        </IconButton>
      }
      disablePadding>
      <ListItemButton role={undefined} dense onClick={() => updateTodoItem(todo)}>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={completed}
            tabIndex={-1}
            disableRipple
            inputProps={{ 'aria-labelledby': todo.id }}
          />
        </ListItemIcon>
        <ListItemText
          id={todo.id}
          primary={description}
          style={{
            textDecoration: completed ? 'line-through' : 'none',
            color: completed ? '#999' : '#000'
          }}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default TodoItem;
