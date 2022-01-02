import { Container } from '@mui/material';
import Notification from './components/Notification';
import TodoList from './components/TodoList';
import { TodoContext } from './contexts/todoContext';
import { useContext, useEffect } from 'react';

function App() {
  const { state } = useContext(TodoContext);
  const { notification } = state;
  return (
    <>
      <Container
        sx={{ display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center' }}>
        <TodoList />
        {notification && <Notification notification={notification} />}
      </Container>
    </>
  );
}

export default App;
