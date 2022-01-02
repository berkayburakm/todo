import { TodoState } from '../todoContext';
export const ContextWrapper = ({ children }) => {
  return <TodoState>{children}</TodoState>;
};
