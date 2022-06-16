import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { SERVER_ADDR } from '../../utils/constants';
import { RootState } from '../store';
import { IUserPost } from './adminSlice';
import { handleError } from '../../utils/commons';

const errorsMessages = new Map<number, string>();
errorsMessages.set(404, 'User not found');

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
    return rejectWithValue(handleError(e as Error, errorsMessages));
  }
});
