import { AnyAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ERRORS } from './constants';
import { FulfilledAction, PendingAction, RejectedAction } from './types';

// changed tabs
export function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

// error handling
export const handleError = (
  error: Error,
  errorsMessages?: Map<number, string>
) => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      return (
        errorsMessages?.get(error.response.status) ||
        ERRORS.get(error.response.status) ||
        'Unknown error from server'
      );
    } else if (error.request) {
      return 'Server not responding';
    }
  }
  return 'Something wrong...';
};

// common actions handling
export const isPendingAction = (action: AnyAction): action is PendingAction => {
  return action.type.endsWith('/pending');
};

export const isFullfiledAction = (
  action: AnyAction
): action is FulfilledAction => {
  return action.type.endsWith('/fulfilled');
};

export const isRejectedAction = (
  action: AnyAction
): action is RejectedAction => {
  return action.type.endsWith('/rejected');
};
