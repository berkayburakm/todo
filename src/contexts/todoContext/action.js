import { useReducer, createContext } from 'react';
import {
  CREATE_TODO_START,
  CREATE_TODO_SUCCESS,
  CREATE_TODO_ERROR,
  UPDATE_TODO_START,
  UPDATE_TODO_SUCCESS,
  UPDATE_TODO_ERROR,
  DELETE_TODO_START,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_ERROR,
  GET_TODOS_START,
  GET_TODOS_SUCCESS,
  GET_TODOS_ERROR
} from './types';
import { reducer } from './reducer';
import { getAxiosInstance } from '../../utils';
const Context = createContext();

const initialState = {
  loading: false,
  error: null,
  todos: [],
  notification: null
};

const State = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const clearNotification = () => {
    dispatch({ type: 'CLEAR_NOTIFICATION' });
  };

  const getTodos = async () => {
    dispatch({
      type: GET_TODOS_START
    });
    try {
      const axios = await getAxiosInstance();
      const response = await axios.get('/todos');
      const { status, data } = response;
      if (status === 200) {
        dispatch({
          type: GET_TODOS_SUCCESS,
          payload: data.sort((a, b) => a.completed - b.completed)
        });
      } else {
        dispatch({
          type: GET_TODOS_ERROR,
          payload: data.meta.errors.map((error) => error.message).join(' ')
        });
      }
    } catch (error) {
      console.error('Get todos error: ', error);
    }
  };

  const createTodo = async (todo) => {
    dispatch({
      type: CREATE_TODO_START
    });
    try {
      const axios = await getAxiosInstance();
      const response = await axios.post('/todos', todo);
      const { status, data } = response;
      if (status === 201) {
        dispatch({
          type: CREATE_TODO_SUCCESS,
          payload: data
        });
      } else {
        dispatch({
          type: CREATE_TODO_ERROR,
          payload: data.meta.errors.map((error) => error.message).join(' ')
        });
      }
      return status;
    } catch (error) {
      console.error('Create todo error: ', error);
    }
  };

  const updateTodo = async (todo) => {
    dispatch({
      type: UPDATE_TODO_START
    });
    try {
      const axios = await getAxiosInstance();
      const response = await axios.put(`/todos/${todo.id}`, todo);
      const { status, data } = response;
      if (status === 200) {
        dispatch({
          type: UPDATE_TODO_SUCCESS,
          payload: data
        });
        getTodos();
      } else {
        dispatch({
          type: UPDATE_TODO_ERROR,
          payload: data.meta.errors.map((error) => error.message).join(' ')
        });
      }
    } catch (error) {
      console.error('Update todo error: ', error);
    }
  };

  const deleteTodo = async (todo) => {
    dispatch({
      type: DELETE_TODO_START
    });
    try {
      const axios = await getAxiosInstance();
      const response = await axios.delete(`/todos/${todo.id}`);
      const { status, data } = response;
      if (status === 200) {
        dispatch({
          type: DELETE_TODO_SUCCESS,
          payload: data
        });
        getTodos();
      } else {
        dispatch({
          type: DELETE_TODO_ERROR,
          payload: data.meta.errors.map((error) => error.message).join(' ')
        });
      }
    } catch (error) {
      console.error('Delete todo error: ', error);
    }
  };

  return (
    <Context.Provider
      value={{
        state: {
          todos: state.todos,
          loading: state.loading,
          notification: state.notification
        },
        action: {
          getTodos,
          createTodo,
          updateTodo,
          deleteTodo,
          clearNotification
        }
      }}>
      {children}
    </Context.Provider>
  );
};

export { Context, State };
