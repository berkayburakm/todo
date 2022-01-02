import { useEffect, useState, useCallback, useContext } from 'react';
import TodoItem from './TodoItem';
import List from '@mui/material/List';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { TodoContext } from '../contexts/todoContext';
import CircularProgress from '@mui/material/CircularProgress';

const TodoList = () => {
  const [todoText, setTodoText] = useState('');
  const { state, action } = useContext(TodoContext);
  const { todos, loading } = state;
  const { getTodos, createTodo } = action;

  const getAllTodos = useCallback(() => {
    getTodos();
  }, []);

  const createNewTodo = async () => {
    if (!todoText) return;
    const todo = {
      description: todoText,
      completed: false
    };
    const status = await createTodo(todo);
    if (status === 201) {
      setTodoText('');
    }
  };
  useEffect(() => {
    getAllTodos();
  }, []);
  return (
    <Box sx={{ width: '75%', borderRadius: '30px', border: '1px solid grey', padding: '50px' }}>
      <Typography variant="h4" align="center">
        Todo List
      </Typography>
      {!loading ? (
        <>
          <List sx={{ width: '100%' }}>
            {todos?.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
            {todos?.length === 0 && (
              <Typography variant="h6" align="center" color="crimson">
                No todos yet, add one!
              </Typography>
            )}
          </List>
          <Divider sx={{ marginY: '20px' }} />
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
            <TextField
              id="outlined-basic"
              sx={{ width: '80%' }}
              label="Add new todo"
              variant="outlined"
              value={todoText}
              size="small"
              onChange={(e) => {
                setTodoText(e.target.value);
              }}
            />
            <Button
              variant="contained"
              color="success"
              sx={{ width: '19%' }}
              startIcon={<AddIcon />}
              onClick={() => createNewTodo()}>
              Add
            </Button>
          </Box>
        </>
      ) : (
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '50px'
          }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default TodoList;
