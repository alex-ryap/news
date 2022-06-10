import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { SERVER_ADDR } from '../../utils/constants';
import { IError } from '../../utils/interfaces';
import { RootState } from '../store';

interface IPost {
  header: string;
  description: string;
  tags: string[];
  state: string;
  publicationDate: number;
}

export const createPost = createAsyncThunk<
  string,
  IPost,
  {
    state: RootState;
    rejectValue: string;
  }
>('news/createNews', async (newPost, { rejectWithValue, getState }) => {
  try {
    const { token } = getState().auth;
    await axios.post(
      SERVER_ADDR + 'news',
      {
        ...newPost,
      },
      {
        headers: {
          token: token,
        },
      }
    );
    return 'Post created';
  } catch (e) {
    return rejectWithValue((e as IError).message);
  }
});
