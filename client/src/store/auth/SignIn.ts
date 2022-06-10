import axios from 'axios';
import { SERVER_ADDR, TOKEN } from '../../utils/constants';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IError } from '../../utils/interfaces';
import { IUserData } from './authSlice';

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
    return rejectWithValue((e as IError).message);
  }
});
