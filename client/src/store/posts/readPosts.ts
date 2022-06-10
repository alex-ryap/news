import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { SERVER_ADDR } from '../../utils/constants';
import { IError } from '../../utils/interfaces';
import { RootState } from '../store';

export const readPosts = createAsyncThunk<
  string,
  number[],
  {
    state: RootState;
    rejectValue: string;
  }
>('news/readPosts', async (ids, { rejectWithValue, getState }) => {
  try {
    const { token } = getState().auth;
    const response = await axios.post(
      SERVER_ADDR + 'news/read',
      { ids },
      {
        headers: {
          token: token,
        },
      }
    );
    return response.data;
  } catch (e) {
    return rejectWithValue((e as IError).message);
  }
});
