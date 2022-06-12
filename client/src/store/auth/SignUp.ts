import axios from 'axios';
import { SERVER_ADDR } from '../../utils/constants';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUserData } from './authSlice';
import { handleError } from '../../utils/commons';

const errorsMessages = new Map<number, string>();
errorsMessages.set(400, 'User with the login already exists');

export const signUp = createAsyncThunk<
  string,
  IUserData,
  { rejectValue: string }
>('auth/signUp', async (userData, { rejectWithValue }) => {
  try {
    const { login, password } = userData;
    await axios.post(SERVER_ADDR + 'auth/signup', {
      login,
      password,
    });
    return 'Success register user';
  } catch (e) {
    return rejectWithValue(handleError(e as Error, errorsMessages));
  }
});
