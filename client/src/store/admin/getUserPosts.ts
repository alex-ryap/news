import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { SERVER_ADDR } from '../../utils/constants';
import { IError } from '../../utils/interfaces';
import { RootState } from '../store';
import { IUserPost } from './adminSlice';

export const getUserPosts = createAsyncThunk<
  IUserPost[],
  number,
  {
    state: RootState;
    rejectValue: string;
  }
>('admin/getUserNews', async (id, { rejectWithValue, getState }) => {
  try {
    const { token } = getState().auth;
    const response = await axios.get(SERVER_ADDR + `admin/user/${id}/news`, {
      headers: {
        token: token,
      },
    });
    return response.data;
  } catch (e) {
    return rejectWithValue((e as IError).message);
  }
});
