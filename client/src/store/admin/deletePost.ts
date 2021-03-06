import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { SERVER_ADDR } from '../../utils/constants';
import { RootState } from '../store';
import { handleError } from '../../utils/commons';

export const deletePost = createAsyncThunk<
  string,
  number,
  {
    state: RootState;
    rejectValue: string;
  }
>('admin/deleteteNews', async (id, { rejectWithValue, getState }) => {
  try {
    const { token } = getState().auth;
    await axios.delete(SERVER_ADDR + `admin/news/${id}`, {
      headers: {
        token: token,
      },
    });
    return 'Post deleted';
  } catch (e) {
    return rejectWithValue(handleError(e as Error));
  }
});
