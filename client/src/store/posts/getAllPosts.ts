import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { SERVER_ADDR } from '../../utils/constants';
import { IPost } from '../../utils/interfaces';
import { RootState } from '../store';
import { handleError } from '../../utils/commons';

export const getAllPosts = createAsyncThunk<
  IPost[],
  void,
  {
    state: RootState;
    rejectValue: string;
  }
>('news/getAllNews', async (_, { rejectWithValue, getState }) => {
  try {
    const { token } = getState().auth;
    const response = await axios.get(SERVER_ADDR + `news/all`, {
      headers: {
        token: token,
      },
    });
    return response.data;
  } catch (e) {
    return rejectWithValue(handleError(e as Error));
  }
});
