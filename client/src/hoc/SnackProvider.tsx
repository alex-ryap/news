import { Alert, AlertColor, Snackbar } from '@mui/material';
import { ActionCreatorWithoutPayload } from '@reduxjs/toolkit';
import { createContext, FC, ReactNode, useState } from 'react';
import { useAppDispatch } from '../store/hooks';
import { SNACK_TIMEOUT } from '../utils/constants';

interface ISnackbarContext {
  showMessage: (
    type: AlertColor,
    message: string,
    action: ActionCreatorWithoutPayload<string>
  ) => void;
}

export const SnackbarContext = createContext<ISnackbarContext>(null!);

interface ISnackbarProviderProps {
  children: ReactNode;
}

export const SnackbarProvider: FC<ISnackbarProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState<string>();
  const [type, setType] = useState<AlertColor>('info');
  const [isOpen, setIsOpen] = useState<boolean>();

  const showMessage = (
    type: AlertColor,
    message: string,
    action: ActionCreatorWithoutPayload<string>
  ) => {
    dispatch(action());
    setType(type);
    setMessage(message);
    setIsOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    resetValues();
  };

  const resetValues = () => {
    setIsOpen(false);
    setTimeout(() => {
      setMessage('');
      setType('info');
    }, 500);
  };

  const value = {
    showMessage,
  };

  return (
    <>
      <SnackbarContext.Provider value={value}>
        {children}
      </SnackbarContext.Provider>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isOpen}
        autoHideDuration={SNACK_TIMEOUT}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={type} variant="filled">
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};
