import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { SERVER_ADDR } from '../../utils/constants';
import { IError } from '../../utils/interfaces';
import { RootState } from '../store';
import { IUserData } from './adminSlice';

export const getUsers = createAsyncThunk<
  IUserData[],
  void,
  {
    state: RootState;
    rejectValue: string;
  }
>('admin/getUsers', async (_, { rejectWithValue, getState }) => {
  try {
    const { token } = getState().auth;
    const response = await axios.get(SERVER_ADDR + 'admin/users', {
      headers: {
        token: token,
      },
    });
    return response.data;
  } catch (e) {
    return rejectWithValue((e as IError).message);
  }
});
