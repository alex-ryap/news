import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { SERVER_ADDR } from '../../utils/constants';
import { IError } from '../../utils/interfaces';
import { RootState } from '../store';
import { deletePostFromStore } from './postsSlice';

export const deletePost = createAsyncThunk<
  string,
  number,
  {
    state: RootState;
    rejectValue: string;
  }
>('news/deleteteNews', async (id, { rejectWithValue, getState, dispatch }) => {
  try {
    const { token } = getState().auth;
    await axios.delete(SERVER_ADDR + `news/${id}`, {
      headers: {
        token: token,
      },
    });
    dispatch(deletePostFromStore(id));
    return 'Post deleted';
  } catch (e) {
    return rejectWithValue((e as IError).message);
  }
});
