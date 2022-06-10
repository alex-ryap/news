import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { SERVER_ADDR } from '../../utils/constants';
import { IError } from '../../utils/interfaces';
import { RootState } from '../store';
import { IAuthor } from './userSlice';

export const getAuthors = createAsyncThunk<
  IAuthor[],
  void,
  {
    state: RootState;
    rejectValue: string;
  }
>('user/getAuthors', async (_, { rejectWithValue, getState }) => {
  try {
    const { token } = getState().auth;
    const response = await axios.get(SERVER_ADDR + 'user/authors', {
      headers: {
        token: token,
      },
    });
    return response.data;
  } catch (e) {
    return rejectWithValue((e as IError).message);
  }
});
