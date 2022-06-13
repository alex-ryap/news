import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { SERVER_ADDR } from '../../utils/constants';
import { IPost } from '../../utils/interfaces';
import { RootState } from '../store';
import { handleError } from '../../utils/commons';

interface QueryParams {
  tags?: string;
  onlyNew?: boolean;
  noTagsNoNews?: boolean;
  author?: number;
  header?: string;
  offset?: number;
  limit?: number;
}

export interface IPostsResponse {
  list: IPost[];
  total: number;
}

export const getPosts = createAsyncThunk<
  IPostsResponse,
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

    console.log(response.data);

    return response.data.news;
  } catch (e) {
    return rejectWithValue(handleError(e as Error));
  }
});
