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
  publicataionDate: string;
}

export const updatePost = createAsyncThunk<
  string,
  IPost,
  {
    state: RootState;
    rejectValue: string;
  }
>(
  'admin/updateNews',
  async (updatedPost, { rejectWithValue, getState, dispatch }) => {
    try {
      const { token } = getState().auth;
      await axios.put(
        SERVER_ADDR + `admin/news/${updatedPost.id}`,
        {
          ...updatedPost,
        },
        {
          headers: {
            token: token,
          },
        }
      );
      return 'Post updated';
    } catch (e) {
      return rejectWithValue((e as IError).message);
    }
  }
);
