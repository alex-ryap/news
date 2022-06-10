import { useContext } from 'react';
import { SnackbarContext } from '../hoc/SnackProvider';

export const useSnackbar = () => {
  return useContext(SnackbarContext);
};
