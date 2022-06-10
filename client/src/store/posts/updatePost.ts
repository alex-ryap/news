import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { SERVER_ADDR } from '../../utils/constants';
import { IError } from '../../utils/interfaces';
import { RootState } from '../store';

interface IPost {
  id: number;
  header: string;
  description: string;
  tags: string[];
  state: string;
  publicationDate: number;
}

export const updatePost = createAsyncThunk<
  string,
  IPost,
  {
    state: RootState;
    rejectValue: string;
  }
>('news/updatePost', async (updatedPost, { rejectWithValue, getState }) => {
  try {
    const { token } = getState().auth;
    const response = await axios.put(
      SERVER_ADDR + `news/${updatedPost.id}`,
      {
        ...updatedPost,
      },
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
