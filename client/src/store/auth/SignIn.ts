import axios from 'axios';
import { SERVER_ADDR, TOKEN } from '../../utils/constants';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUserData } from './authSlice';
import { handleError } from '../../utils/commons';

const errorsMessages = new Map<number, string>();
errorsMessages.set(401, 'Wrong login or password');

export const signIn = createAsyncThunk<
  string,
  IUserData,
  { rejectValue: string }
>('auth/signIn', async (userData, { rejectWithValue }) => {
  try {
    const { login, password } = userData;
    const response = await axios.post(SERVER_ADDR + 'auth/login', {
      login,
      password,
    });
    const token = response.data?.token;
    if (token) {
      localStorage.setItem(TOKEN, token);
    }
    return token;
  } catch (e) {
    return rejectWithValue(handleError(e as Error, errorsMessages));
  }
});
