import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { SERVER_ADDR } from '../../utils/constants';
import { IError, IPost } from '../../utils/interfaces';
import { RootState } from '../store';

interface QueryParams {
  tags?: string;
  onlyNew?: boolean;
  noTagsNoNews?: boolean;
  author?: number;
  header?: string;
  offset?: number;
  limit?: number;
}

export const getPosts = createAsyncThunk<
  IPost[],
  QueryParams,
  {
    state: RootState;
    rejectValue: string;
  }
>('news/getPosts', async (params, { rejectWithValue, getState }) => {
  try {
    const { token } = getState().auth;
    const response = await axios.get(SERVER_ADDR + 'news', {
      headers: {
        token: token,
      },
      params: {
        ...params,
      },
    });
    return response.data.news.list;
  } catch (e) {
    return rejectWithValue((e as IError).message);
  }
});
