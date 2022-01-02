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
  GET_TODOS_ERROR,
  CLEAR_NOTIFICATION
} from './types';

export const reducer = (state, action) => {
  switch (action.type) {
    case CLEAR_NOTIFICATION:
      return {
        ...state,
        notification: null
      };
    case CREATE_TODO_START:
      return {
        ...state,
        loading: true,
        error: null,
        notification: null
      };
    case CREATE_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        todos: [...state.todos, action.payload],
        notification: {
          message: 'Todo created successfully',
          severity: 'success'
        }
      };
    case CREATE_TODO_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case UPDATE_TODO_START:
      return {
        ...state,
        loading: true,
        error: null,
        notification: null
      };
    case UPDATE_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload.id) {
            return action.payload;
          }
          return todo;
        })
      };
    case UPDATE_TODO_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case DELETE_TODO_START:
      return {
        ...state,
        loading: true,
        error: null,
        notification: null
      };
    case DELETE_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
        notification: {
          message: 'Todo deleted successfully',
          severity: 'info'
        }
      };
    case DELETE_TODO_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case GET_TODOS_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    case GET_TODOS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        todos: action.payload
      };
    case GET_TODOS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};
