import axios from 'axios';
import { SERVER_ADDR } from '../../utils/constants';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IError } from '../../utils/interfaces';
import { IUserData } from './authSlice';

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
    return rejectWithValue((e as IError).message);
  }
});
