import axios from 'axios';
import { ERRORS } from './constants';

export function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

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
