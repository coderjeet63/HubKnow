import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

// This file is just for convenience, exporting the hook from the context
export const useAuth = () => {
  return useContext(AuthContext);
};